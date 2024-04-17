const Contribution = require("../models/Contribution")
const Faculty = require("../models/Faculty")
const Event = require("../models/Event")
const { User, Otp } = require("../models/User")
const { cloudinary, uploadImage } = require("../middlewares/cloudinary")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const sanitizeHtml = require('sanitize-html');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Profile = require("../models/Profile");



const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const contributionController = {
  submitContribution: async (req, res) => {
    try {
      const imagesPaths = req.body.firebaseUrls.filter(url => url.match(/\.(jpeg|jpg|gif|png)$/i));
      const filesPaths = req.body.firebaseUrls.filter(url => !url.match(/\.(jpeg|jpg|gif|png)$/i));
      console.log(imagesPaths)
      console.log(filesPaths)
      if (imagesPaths.length === 0) {
        return res.status(403).json("Image is required");
      }
      if (filesPaths.length === 0) {
        return res.status(403).json("File is required");
      }
      const cleanContent = sanitizeHtml(req.body.content, {
        allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
          'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
          'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img'],
        allowedAttributes: {
          a: ['href', 'name', 'target'],
          img: ['src'],
          iframe: ['src'],
          div: ['class'],
        },
        allowedSchemes: ['http', 'https'],
        allowedSchemesByTag: {
          img: ['data', 'http'],
        }
      });
      const newContribution = new Contribution({
        title: req.body.title,
        content: cleanContent,
        image: imagesPaths,
        file: filesPaths,
        userID: req.user.id,
        eventID: req.body.eventID
      });
      const contribution = await newContribution.save();
      const event = await Event.findById(req.body.eventID);
      const profiles = await Profile.find({ facultyID: event.facultyId }).exec();

      const userIds = profiles.map(profile => profile.userID);
      const marketingCoordinators = await User.find({
        _id: { $in: userIds },
        role: 'marketing coordinator'
      }).exec();
      const emailAddresses = marketingCoordinators.map(coordinator => coordinator.email).join(',')
      const Student = await User.findById(req.user.id);
      if (!emailAddresses) {
        return res.status(500).json("Please set role for marketing coordinator");
      }
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailAddresses,
        subject: 'New Submission',
        html: `<p>Student<b> ${Student.userName} </b> submitted</p><br>`,
      };
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
      res.status(201).json(contribution);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, ...error });
    }
  },
  getContributionByEvent: async (req, res) => {
    try {
      let query = { isPublic: true, eventID: req.params.id };
      const role = req.user.role;
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { eventID: req.params.id };
      }
      const contributions = await Contribution.find(query)
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
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
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = {};
      }
      const contributions = await Contribution.find(query)
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
        });
      res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ message: error.message, ...error });
    }
  },

  getMyContribution: async (req, res) => {
    try {
      const userID = req.user.id
      const contribution = await Contribution.find({ userID: userID })
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
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
            _id: new mongoose.Types.ObjectId(req.params.id)
          }
        },
        {
          $lookup: {
            from: "profiles",
            localField: "userID",
            foreignField: "userID",
            as: "userProfile"
          }
        },
        {
          $unwind: {
            path: "$userProfile",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "profiles",
            let: { user_ids: "$comments.userID" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$userID", "$$user_ids"]
                  }
                }
              }
            ],
            as: "commentProfiles"
          }
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
                            cond: { $eq: ["$$profile.userID", "$$comment.userID"] }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
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
              avatar: "$userProfile.avatar"
            },
            comments: 1
          }
        }
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
        return res.status(404).send('Contribution not found');
      }
      if (req.user.id != contribution.userID && !(req.user.role == 'admin' || req.user.role == 'marketing manager' || req.user.role == 'marketing coordinator')) {
        return res.status(404).json("You do not have permission");
      }

      const imagesPaths = req.body.firebaseUrls?.filter(url => url.match(/\.(jpeg|jpg|gif|png)$/i));
      const filesPaths = req.body.firebaseUrls?.filter(url => !url.match(/\.(jpeg|jpg|gif|png)$/i));

      const existingImages = req.body.image ? (Array.isArray(req.body.image) ? req.body.image : [req.body.image]) : [];
      const existingFiles = req.body.file ? (Array.isArray(req.body.file) ? req.body.file : [req.body.file]) : [];

      if (req.body.title === "") {
        return res.status(403).json("Title is not null");
      }
      if (req.body.content === "") {
        return res.status(403).json("Content is not null");
      }

      const updatedImages = [...imagesPaths, ...existingImages];
      const updatedFiles = [...filesPaths, ...existingFiles];

      const updatedContribution = await Contribution.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        image: updatedImages.length > 0 ? updatedImages : contribution.image,
        file: updatedFiles.length > 0 ? updatedFiles : contribution.file
      }, { new: true });

      res.status(200).json(updatedContribution);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, ...error });
    }
  },
  deleteContribution: async (req, res) => {
    try {
      const contribution = await Contribution.findById(req.params.id)
      if (!contribution) {
        return res.status(404).json("contribution not found");
      }
      if (req.user.id != contribution.userID && !(req.user.role == 'admin' || req.user.role == 'marketing manager' || req.user.role == 'marketing coordinator')) {
        return res.status(404).json("You do not have permission");
      }
      await Contribution.findByIdAndDelete(req.params.id)
      res.status(200).json("Delete Successfully")
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchByTitleContribution: async (req, res) => {
    try {
      const keyword = req.body.keyword;
      const role = req.user.role;
      let query = { title: new RegExp(keyword, "i"), isPublic: true };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { title: new RegExp(keyword, "i")};
      }
      const contributions = await Contribution.find(query)
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
        });
      return res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  searchByNameContribution: async (req, res) => {
    try {
      const keyword = req.body.keyword;
      const role = req.user.role;
      const users = await User.find({ userName: new RegExp(keyword, "i") }).select('_id');
      const userIds = users.map(user => user._id);
      let query = { userID: { $in: userIds }, isPublic: true, eventID: req.cookies.eventId };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { userID: { $in: userIds }, eventID: req.cookies.eventId };
      }
      const contributions = await Contribution.find(query)
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
        });

      return res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  filterContributionDesc: async (req, res) => {
    try {
      const role = req.user.role;
      let query = { isPublic: true, eventID: req.cookies.eventId };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { eventID: req.cookies.eventId };
      }
      const contributions = await Contribution.find(query)
        .sort({ createdAt: -1 })
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
        });
      return res.status(200).json(contributions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterContributionAsc: async (req, res) => {
    try {
      const role = req.user.role;
      let query = { isPublic: true, eventID: req.cookies.eventId };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { eventID: req.cookies.eventId };
      }
      const contributions = await Contribution.find(query)
        .sort({ createdAt: 1 })
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
        });
      return res.status(200).json(contributions);
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
    ).populate({
      path: 'userID',
      select: 'userName -_id'
    }).populate({
      path: 'comments.userID',
      select: 'userName -_id'
    });
    if (!updatedContribution) {
      return res.status(404).json({ message: "Unable to publish contribution." });
    }
    res.status(200).json(updatedContribution);
  },
  commentContribution: async (req, res) => {
    try {
      const contributionId = req.params.id;
      const userId = req.user.id;
      const user = await Profile.findOne({ userID: userId })

      if (!user.firstName || !user.lastName || !user.avatar) {
        return res.status(403).json({ message: "You need to set your name and your avatar before comment" })
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
        return res.status(403).json({ message: "You cannot comment because the contribution is expired" });
      }
      const newComment = {
        comment: commentContent,
        userID: userId
      };
      var contribution = await Contribution.findByIdAndUpdate(contributionId, {
        $push: { comments: newComment }
      }, { new: true });

      res.status(200).json(contribution);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
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
      const facultyStats = await Promise.all(allFaculties.map(async (faculty) => {
        const events = await Event.find({ facultyId: faculty._id });
        let numberOfContributions = 0;
        let numberOfContributors = new Set();

        for (let event of events) {
          const contributions = await Contribution.find({
            eventID: event._id,
            createdAt: { $gte: startDate, $lte: endDate }
          });
          contributions.forEach(contribution => {
            numberOfContributions++;
            numberOfContributors.add(contribution.userID.toString());
          });
        }

        totalContributions += numberOfContributions;
        return {
          facultyName: faculty.facultyName,
          numberOfContributions,
          numberOfContributors: numberOfContributors.size
        };
      }));

      const statistics = facultyStats.map(faculty => {
        const percentage = (totalContributions > 0)
          ? (faculty.numberOfContributions / totalContributions * 100)
          : 0;     
        return {
          ...faculty,
          contributionPercentage: isNaN(percentage) ? 0 : percentage
        };
      });

      res.status(200).json({ statistics, totalContributions });
      //check validate date
        var startDate = new Date(req.body.startDate);
        var endDate = new Date(req.body.endDate);
        if (startDate.getTime() > endDate.getTime()) {
            return res.status(500).json({ message: "The start date must be earlier than the end date" });
        }
        // use agg faculty find event relate in scope date
        const facultyStatistics = await Faculty.aggregate([
            {
                $lookup: {
                    from: 'events',
                    let: { facultyId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$facultyId', '$$facultyId'] },
                                createEvent: { $gte: startDate, $lte: endDate }
                            }
                        },
                        {
                          //find contribution
                            $lookup: {
                                from: 'contributions',
                                let: { eventId: '$_id' },
                                pipeline: [
                                    { 
                                        $match: { 
                                            $expr: { 
                                                $and: [
                                                  // scope date
                                                    { $eq: ['$eventID', '$$eventId'] },
                                                    { $gte: ['$createdAt', startDate] },
                                                    { $lte: ['$createdAt', endDate] }
                                                ]
                                            } 
                                        } 
                                    },
                                    { $count: 'totalContributions' },
                                    { $project: { _id: 0, userId: 1 } },
                                ],
                                as: 'contributions',
                            },
                        },
                        {
                          //collect result
                            $unwind: {
                                path: '$contributions',
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                        {
                          //calculate total contributions and unique contributors by department:
                            $group: {
                                _id: '$_id',
                                totalContributions: { $sum: '$contributions.totalContributions' },

                            },
                        },
                    ],
                    as: 'eventsWithStatistics',
                },
            },
            {
              //calculate total all contributions 
                $addFields: {
                    totalContributions: { $sum: '$eventsWithStatistics.totalContributions' }
                    
                },
            },
            {//faculty
                $group: {
                    _id: null,
                    overallTotal: { $sum: '$totalContributions' },
                    faculties: { $push: '$$ROOT' }
                },
            },
            {
                $unwind: '$faculties'
            },
            {//show result final and remove 
              $project: {
                _id: 0,
                facultyName: '$faculties.facultyName',
                totalContributions: '$faculties.totalContributions',
                
                percentageOfTotal: {
                    $cond: {
                        if: { $eq: ['$overallTotal', 0] },
                        then: 0,
                        else: {
                            $multiply: [
                                { $divide: ['$faculties.totalContributions', '$overallTotal'] },
                                100
                            ]
                        }
                    }
                },
                
            }
            }
        ]);
       
        res.status(200).json(facultyStatistics);
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
            comments: { $size: 0 }
          }
        }
      ]);
      const noCommentsAfter14Days = await Contribution.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $size: "$comments" }, 0] },
                { $lt: ["$createdAt", new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)] }
              ]
            }
          }
        }
      ]);

      res.status(200).json({
        noComments,
        noCommentsAfter14Days
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getContributionByYear: async (req, res) => {
        try {
          const contributionsByYearAndFaculty = await Contribution.aggregate([
            // Bước 1: Nhóm các contribution theo năm, facultyID và userID
            {
              $lookup: {
                from: 'users', // collection name của User
                localField: 'userID',
                foreignField: '_id',
                as: 'user'
              }
            },
            {
              $lookup: {
                from: 'faculties', // collection name của Faculty
                localField: 'user.facultyID', // supposing the faculty ID is stored in user's document
                foreignField: '_id',
                as: 'faculty'
              }
            },
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  faculty: '$faculty.facultyName', // supposing the name of the faculty is stored in faculty's document
                  userID: '$userID'
                },
                count: { $sum: 1 }
              }
            },
            // Bước 2: Nhóm lại theo năm và faculty để tính tổng số lượng contribution của mỗi faculty trong mỗi năm
            {
              $group: {
                _id: {
                  year: '$_id.year',
                  faculty: '$_id.faculty'
                },
                totalContributions: { $sum: '$count' }
              }
            },
            // Bước 3: Kết quả cuối cùng
            {
              $project: {
                _id: 0,
                year: '$_id.year',
                faculty: '$_id.faculty',
                totalContributions: 1
              }
            }
          ]);
    
          res.status(200).json(contributionsByYearAndFaculty);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: error.message });
        }
      }
    };
module.exports = contributionController;
