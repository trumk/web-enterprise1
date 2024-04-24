const Contribution = require("../models/Contribution");
const Faculty = require("../models/Faculty");
const Event = require("../models/Event");
const { User, Otp } = require("../models/User");
const { cloudinary, uploadImage } = require("../middlewares/cloudinary");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sanitizeHtml = require("sanitize-html");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Profile = require("../models/Profile");
const Notification = require("../models/Notification");
const notification = require("../models/Notification");
const contribution = require("../models/Contribution");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const contributionController = {
  submitContribution: async (req, res) => {
    try {
      const imagesPaths = req.body.firebaseUrls.filter((url) =>
        url.match(/\.(jpeg|jpg|gif|png)$/i)
      );
      const filesPaths = req.body.firebaseUrls.filter(
        (url) => !url.match(/\.(jpeg|jpg|gif|png)$/i)
      );
      if (imagesPaths.length === 0) {
        return res.status(403).json("Image is required");
      }
      if (filesPaths.length === 0) {
        return res.status(403).json("File is required");
      }
      const cleanContent = sanitizeHtml(req.body.content, {
        allowedTags: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "p",
          "a",
          "ul",
          "ol",
          "nl",
          "li",
          "b",
          "i",
          "strong",
          "em",
          "strike",
          "code",
          "hr",
          "br",
          "div",
          "table",
          "thead",
          "caption",
          "tbody",
          "tr",
          "th",
          "td",
          "pre",
          "iframe",
          "img",
        ],
        allowedAttributes: {
          a: ["href", "name", "target"],
          img: ["src"],
          iframe: ["src"],
          div: ["class"],
        },
        allowedSchemes: ["http", "https"],
        allowedSchemesByTag: {
          img: ["data", "http"],
        },
      });

      const event = await Event.findById(req.body.eventID);
      const profiles = await Profile.find({
        facultyID: event.facultyId,
      }).exec();

      const userIds = profiles.map((profile) => profile.userID);
      const marketingCoordinators = await User.find({
        _id: { $in: userIds },
        role: "marketing coordinator",
      }).exec();
      const emailAddresses = marketingCoordinators
        .map((coordinator) => coordinator.email)
        .join(",");
      const Student = await Profile.findOne({ userID: req.user.id });
      if(!Student.firstName || !Student.lastName || !Student.avatar){
        return res.status(403).json("You need to set your profile before submitting")
      }
      if (!emailAddresses) {
        return res
          .status(500)
          .json("This faculty doesn't have a Marketing Condinator");
      }
      const faculty = await Faculty.findById(event.facultyId);
      const newContribution = new Contribution({
        title: req.body.title,
        content: cleanContent,
        image: imagesPaths,
        file: filesPaths,
        userID: req.user.id,
        eventID: req.body.eventID,
        facultyID: faculty._id,
      });
      const contribution = await newContribution.save();
      const marketingID = marketingCoordinators
      .map((coordinator) => coordinator._id)
      .join(",");
      const message = `<p>Student<b> ${Student.firstName} ${Student.lastName}</b> has submitted new contribution</p><br>`;
      let notification = new Notification({
        message,
        userID: marketingID,
        peopleID: [req.user.id],
        contributionID: contribution._id
      });
      await notification.save();
      // const mailOptions = {
      //   from: process.env.EMAIL,
      //   to: emailAddresses,
      //   subject: `<b>New Submission</b>`,
      //   html: `<p>Student<b>${Student.firstName} ${Student.lastName}</b> has submitted new contribution</p><br>`,
      // };
      // await new Promise((resolve, reject) => {
      //   transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //       reject(error);
      //     } else {
      //       resolve(info);
      //     }
      //   });
      // });
      // res.status(201).json(contribution);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, ...error });
    }
  },
  getContributionByEvent: async (req, res) => {
    try {
      let query = { isPublic: true, eventID: req.params.id };
      const role = req.user.role;
      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = { eventID: req.params.id };
      }
      const contributions = await Contribution.find(query)
        .populate({
          path: "userID",
          select: "userName -_id",
        })
        .populate({
          path: "comments.userID",
          select: "userName -_id",
        });
      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ message: error.message, ...error });
    }
  },
  getContributionByDashBoard: async (req, res) => {
    try {
      let query = { isPublic: true };
      const role = req.user.role;
      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = {};
      }
      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: {
              topic: "$event.topic",
            },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
      ]);
      // .populate({
      //   path: 'userID',
      //   select: 'userName -_id'
      // })
      // .populate({
      //   path: 'comments.userID',
      //   select: 'userName -_id'
      // });
      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ message: error.message, ...error });
    }
  },
  getContributionByCoordinator: async (req, res) => {
    try {
      const facultyId = await Profile.findOne({ userID: req.user.id });
      let query = { isPublic: true, facultyID: { $in: facultyId.facultyID } };
      const role = req.user.role;
      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = { facultyID: { $in: facultyId.facultyID } };
      }
      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: {
              topic: "$event.topic",
            },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
      ]);
      // .populate({
      //   path: 'userID',
      //   select: 'userName -_id'
      // })
      // .populate({
      //   path: 'comments.userID',
      //   select: 'userName -_id'
      // });
      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ message: error.message, ...error });
    }
  },
  getMyContribution: async (req, res) => {
    try {
      const userID = req.user.id;
      const contribution = await Contribution.find({ userID: userID })
        .populate({
          path: "userID",
          select: "userName -_id",
        })
        .populate({
          path: "comments.userID",
          select: "userName -_id",
        });
      if (!contribution) {
        return res.status(404).json({ message: "Contribution not found." });
      }
      res.status(200).json(contribution);
    } catch (error) {
      res.status(500).json({ message: error.message, ...error });
    }
  },

  getOneContribution: async (req, res) => {
    try {
      const contributions = await Contribution.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "profiles",
            let: { user_ids: "$comments.userID" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$userID", "$$user_ids"],
                  },
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "userID",
                  foreignField: "_id",
                  as: "user",
                },
              },
              {
                $unwind: {
                  path: "$user",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $addFields: {
                  "commentRole": "$user.role",
                },
              },
            ],
            as: "commentProfiles",
          },
        },
        {
          $addFields: {
            comments: {
              $map: {
                input: "$comments",
                as: "comment",
                in: {
                  $mergeObjects: [
                    "$$comment",
                    {
                      userProfile: {
                        $first: {
                          $filter: {
                            input: "$commentProfiles",
                            as: "profile",
                            cond: {
                              $eq: ["$$profile.userID", "$$comment.userID"],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            comments: {
              $map: {
                input: "$comments",
                as: "comment",
                in: {
                  $mergeObjects: [
                    "$$comment",
                    {
                      role: "$$comment.userRole",
                    },
                  ],
                },
              },
            },
          },
        },
      ]);

      if (contributions.length === 0) {
        return res.status(404).json({ message: "Contribution not found." });
      }

      await res.status(200).json(contributions[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  editContribution: async (req, res) => {
    try {
      const contribution = await Contribution.findById(req.params.id);
      if (!contribution) {
        return res.status(404).send("Contribution not found");
      }
      if (
        req.user.id != contribution.userID &&
        !(
          req.user.role == "admin" ||
          req.user.role == "marketing manager" ||
          req.user.role == "marketing coordinator"
        )
      ) {
        return res.status(404).json("You do not have permission");
      }

      const firebaseUrls = Array.isArray(req.body.firebaseUrls)
        ? req.body.firebaseUrls
        : [];

      const imagesPaths = firebaseUrls?.filter((url) =>
        url.match(/\.(jpeg|jpg|gif|png)$/i)
      );
      const filesPaths = firebaseUrls?.filter(
        (url) => !url.match(/\.(jpeg|jpg|gif|png)$/i)
      );

      const existingImages = req.body.image
        ? Array.isArray(req.body.image)
          ? req.body.image
          : [req.body.image]
        : [];
      const existingFiles = req.body.file
        ? Array.isArray(req.body.file)
          ? req.body.file
          : [req.body.file]
        : [];

      if (req.body.title === "") {
        return res.status(403).json("Title is not null");
      }
      if (req.body.content === "") {
        return res.status(403).json("Content is not null");
      }

      const updatedImages = [...imagesPaths, ...existingImages];
      const updatedFiles = [...filesPaths, ...existingFiles];

      if (updatedImages.length === 0) {
        return res.status(403).json("Image is required");
      }
      if (updatedFiles.length === 0) {
        return res.status(403).json("File is required");
      }

      const updatedContribution = await Contribution.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          content: req.body.content,
          image: updatedImages.length > 0 ? updatedImages : [],
          file: updatedFiles.length > 0 ? updatedFiles : [],
        },
        { new: true }
      );

      res.status(200).json(updatedContribution);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, ...error });
    }
  },
  deleteContribution: async (req, res) => {
    try {
      const contribution = await Contribution.findById(req.params.id);
      if (!contribution) {
        return res.status(404).json("contribution not found");
      }
      if (
        req.user.id != contribution.userID &&
        !(
          req.user.role == "admin" ||
          req.user.role == "marketing manager" ||
          req.user.role == "marketing coordinator"
        )
      ) {
        return res.status(404).json("You do not have permission");
      }
      await Contribution.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchByTitleContribution: async (req, res) => {
    try {
      const keyword = req.body.keyword;
      const role = req.user.role;
      const profile = await Profile.findOne({ userID: req.user.id });
      let query = { title: new RegExp(keyword, "i"), isPublic: true };
      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = { title: new RegExp(keyword, "i") };
      }
      if(role === "guest"){
        query = { title: new RegExp(keyword, "i"), isPublic: true, facultyID: { $in: profile.facultyID  }};
      }
      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: {
              topic: "$event.topic",
            },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
      ]);
      return res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchByNameContribution: async (req, res) => {
    try {
      const keyword = req.body.keyword;
      const role = req.user.role;
      const users = await User.find({
        userName: new RegExp(keyword, "i"),
      }).select("_id");
      const userIds = users.map((user) => user._id);
      let query = {
        userID: { $in: userIds },
        isPublic: true,
        eventID: req.cookies.eventId,
      };
      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = { userID: { $in: userIds }, eventID: req.cookies.eventId };
      }
      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: {
              topic: "$event.topic",
            },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
      ]);

      return res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  filterContributionDesc: async (req, res) => {
    try {
      let query = { isPublic: true };
      const role = req.user.role;

      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = {};
      }

      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $unwind: {
            path: "$event",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: {
              topic: "$event.topic",
            },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterContributionAsc: async (req, res) => {
    try {
      let query = { isPublic: true };
      const role = req.user.role;

      if (
        role === "admin" ||
        role === "marketing coordinator" ||
        role === "marketing manager"
      ) {
        query = {};
      }

      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $unwind: {
            path: "$event",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: {
              topic: "$event.topic",
            },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
        {
          $sort: { createdAt: 1 },
        },
      ]);

      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  publishContribution: async (req, res) => {
    const contributionId = req.params.id;
    const contribution = await Contribution.findById(contributionId);
    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found." });
    }
    const updatedContribution = await Contribution.findByIdAndUpdate(
      contributionId,
      { isPublic: true },
      { new: true }
    )
      .populate({
        path: "userID",
        select: "userName -_id",
      })
      .populate({
        path: "comments.userID",
        select: "userName -_id",
      });
    if (!updatedContribution) {
      return res
        .status(404)
        .json({ message: "Unable to publish contribution." });
    }
    const message = `Marketing Coordinator published your contribution.`;
    let notification = new Notification({
      message,
      userID: contribution.userID,
      peopleID: [req.user.id],
      contributionID: contributionId
    });
    await notification.save();
    res.status(200).json(updatedContribution);
  },
  commentContribution: async (req, res) => {
    try {
      const contributionId = req.params.id;
      const userId = req.user.id;
      const user = await Profile.findOne({ userID: userId });
      if (!user.firstName || !user.lastName || !user.avatar) {
        return res
          .status(403)
          .json({
            message: "You need to set your name and your avatar before comment",
          });
      }

      const commentContent = req.body.comment;

      var contribution1 = await Contribution.findById(contributionId);
      if (!contribution1) {
        return res.status(404).json({ message: "Contribution not found" });
      }
      var currentDate = new Date();
      var contributionDate = new Date(contribution1.createdAt);
      var targetDate = new Date(contributionDate);
      targetDate.setDate(targetDate.getDate() + 14);
      if (currentDate.getTime() > targetDate.getTime()) {
        return res
          .status(403)
          .json({
            message: "You cannot comment because the contribution is expired",
          });
      }
      const newComment = {
        comment: commentContent,
        userID: userId,
      };
      var contribution = await Contribution.findByIdAndUpdate(
        contributionId,
        {
          $push: { comments: newComment },
        },
        { new: true }
      );
      if (contribution.userID != userId) {
        let notification = await Notification.findOne({ contributionID: contributionId });
        if (!notification) {
          const message = `<b>${user.firstName} ${user.lastName}</b> commented in your contribution.`;
          notification = new Notification({
            message,
            userID: contribution1.userID,
            peopleID: [userId],
            contributionID: contributionId
          });
          await notification.save();
        } else {
          const index = notification.peopleID.indexOf(userId);
          if (index > -1) {
            notification.peopleID.splice(index, 1)
          }
          notification.peopleID.unshift(userId);
          notification.viewed = false;
          notification.createdAt = new Date().getTime();

          const peopleNames = await Profile.find({
            userID: { $in: notification.peopleID },
          });

          const sortedNames = notification.peopleID.map((id) =>
            peopleNames.find((p) => p.userID.toString() === id.toString())
          );

          const peopleNamesList = sortedNames.map((p) => `<b>${p.firstName} ${p.lastName}</b>`);

          if (peopleNamesList.length > 3) {
            const firstTwo = peopleNamesList.slice(0, 2).join(", ");
            const othersCount = peopleNamesList.length - 2;
            notification.message = `${firstTwo} and ${othersCount} other people commented in your contribution.`;
          } else if (peopleNamesList.length === 3) {
            notification.message = `${peopleNamesList.slice(0, 2).join(", ")} and ${peopleNamesList[2]} commented in your contribution.`;
          } else {
            notification.message = `${peopleNamesList.join(", ")} commented in your contribution.`;
          }
          await notification.save();
        }
      }
      res.status(200).json(contribution);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getAllNotification: async (req, res) => {
    try {
      const userId = req.user.id;

      let notifications = await Notification.find({ userID: userId })
        .sort([
          ['viewed', 1],
          ['createdAt', -1]
        ]);
      notifications = await Promise.all(
        notifications.map(async (notification) => {
          let avatar = null;
          if (notification.peopleID.length > 0) {
            const firstPerson = notification.peopleID[0];
            const profile = await Profile.findOne({ userID: firstPerson });
            if (profile) {
              avatar = profile.avatar;
            }
          }
          return {
            ...notification._doc,
            avatar: avatar,
            peopleID: undefined,
          };
        })
      );
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneNotification: async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id)
      const contributionID = notification.contributionID.toString()
      const contributions = await Contribution.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(contributionID),
          },
        },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "profiles",
            let: { user_ids: "$comments.userID" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$userID", "$$user_ids"],
                  },
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "userID",
                  foreignField: "_id",
                  as: "user",
                },
              },
              {
                $unwind: {
                  path: "$user",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $addFields: {
                  "commentRole": "$user.role",
                },
              },
            ],
            as: "commentProfiles",
          },
        },
        {
          $addFields: {
            comments: {
              $map: {
                input: "$comments",
                as: "comment",
                in: {
                  $mergeObjects: [
                    "$$comment",
                    {
                      userProfile: {
                        $first: {
                          $filter: {
                            input: "$commentProfiles",
                            as: "profile",
                            cond: {
                              $eq: ["$$profile.userID", "$$comment.userID"],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            comments: {
              $map: {
                input: "$comments",
                as: "comment",
                in: {
                  $mergeObjects: [
                    "$$comment",
                    {
                      role: "$$comment.userRole",
                    },
                  ],
                },
              },
            },
          },
        },
      ]);

      if (contributions.length === 0) {
        return res.status(404).json({ message: "Contribution not found." });
      }
      await Notification.findByIdAndUpdate(req.params.id, {viewed: true});
      await res.status(200).json(contributions[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getStatistic: async (req, res) => {
    try {
      let startDate = new Date(req.body.startDate);
      startDate.setDate(startDate.getDate() + 151);
      let endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 365);
      const allFaculties = await Faculty.find();

      let totalContributions = 0;
      const facultyStats = await Promise.all(
        allFaculties.map(async (faculty) => {
          const events = await Event.find({ facultyId: faculty._id });
          let numberOfContributions = 0;
          let numberOfContributors = new Set();

          for (let event of events) {
            const contributions = await Contribution.find({
              eventID: event._id,
              createdAt: { $gte: startDate, $lte: endDate },
            });
            contributions.forEach((contribution) => {
              numberOfContributions++;
              numberOfContributors.add(contribution.userID.toString());
            });
          }

          totalContributions += numberOfContributions;
          return {
            facultyName: faculty.facultyName,
            numberOfContributions,
            numberOfContributors: numberOfContributors.size,
          };
        })
      );

      const statistics = facultyStats.map((faculty) => {
        const percentage =
          totalContributions > 0
            ? (faculty.numberOfContributions / totalContributions) * 100
            : 0;
        return {
          ...faculty,
          contributionPercentage: isNaN(percentage) ? 0 : percentage,
        };
      });

      res.status(200).json({ statistics, totalContributions });
    } catch (error) {
      console.error("Error in getStatistic:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getExceptionReports: async (req, res) => {
    try {
      const noComments = await Contribution.aggregate([
        {
          $match: {
            comments: { $size: 0 },
          },
        },
      ]);
      const noCommentsAfter14Days = await Contribution.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $size: "$comments" }, 0] },
                {
                  $lt: [
                    "$createdAt",
                    new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                  ],
                },
              ],
            },
          },
        },
      ]);

      res.status(200).json({
        noComments,
        noCommentsAfter14Days,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
 getContributionByGuest : async (req, res) => {
    try {
      const profile = await Profile.findOne({ userID: req.user.id });
  
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      const query = {
        isPublic: true,
        facultyID: { $in: profile.facultyID },
      };
  
      const contributions = await Contribution.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile",
          },
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "events",
            localField: "eventID",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $unwind: {
            path: "$event",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            content: 1,
            image: 1,
            file: 1,
            isPublic: 1,
            eventID: { topic: "$event.topic" },
            author: {
              firstName: "$userProfile.firstName",
              lastName: "$userProfile.lastName",
              avatar: "$userProfile.avatar",
            },
            createdAt: 1,
          },
        },
      ]);
      return res.status(200).json(contributions);
    } catch (error) {
      console.error("Error in getContributionByGuest:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  
};

module.exports = contributionController;
