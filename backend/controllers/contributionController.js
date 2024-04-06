const Contribution = require("../models/Contribution")
const Faculty = require("../models/Faculty")
const Event = require("../models/Event")
const { User, Otp } = require("../models/User")
const { cloudinary, uploadImage } = require("../middlewares/cloudinary")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const sanitizeHtml = require('sanitize-html');


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
      const imagesPaths = req.files['image'] ? req.files['image'].map(file => file.path) : [];
      const filesPaths = req.files['file'] ? req.files['file'].map(file => file.path) : [];
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
        eventID: req.cookies.eventId
      });
      const contribution = await newContribution.save();
      const marketingCoordinators = await User.find({ role: 'marketing coordinator' });
      const emailAddresses = marketingCoordinators.map(coordinator => coordinator.email).join(',');
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
      let query = { isPublic: true, eventID: req.cookies.eventId };
      const role = req.user.role;
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { eventID: req.cookies.eventId };
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
      const contribution = await Contribution.findById(req.params.id)
        .populate({
          path: 'userID',
          select: 'userName -_id'
        })
        .populate({
          path: 'comments.userID',
          select: 'userName -_id'
        });
        await res.cookie('userId', contribution.userID, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict"
      });
      if (!contribution) {
        return res.status(404).json({ message: "Contribution not found." });
      }
      res.status(200).json(contribution);
    } catch (error) {
      res.status(500).json({ message: error.message, ...error });
    }
  },
  editContribution: async (req, res) => {
    try {
      const contribution = await Contribution.findById(req.params.id);
      if (!contribution) {
        return res.status(404).send('Contribution not found');
      }
      if(req.user.id != contribution.userID && !(req.user.role == 'admin'|| req.user.role == 'marketing manager' || req.user.role == 'marketing coordinator')){
        return res.status(404).json("You do not have permission");
      }
      const imagesPaths = req.files['image'] ? req.files['image'].map(file => file.path) : [];
      const filesPaths = req.files['file'] ? req.files['file'].map(file => file.path) : [];
      if (imagesPaths.length === 0) {
        return res.status(403).json("Image is required");
      }
      if (filesPaths.length === 0) {
        return res.status(403).json("File is required");
      }
      if (req.body.title === "") {
        return res.status(403).json("Title is not null");
      }
      if (req.body.content === "") {
        return res.status(403).json("Content is not null");
      }
      if (imagesPaths && !filesPaths) {
        const newContribution = await Contribution.findByIdAndUpdate(req.params.id,
          {
            title: req.body.title,
            content: req.body.content,
            image: imagesPaths,
          },
          { new: true });
        res.status(201).json(newContribution);
      }
      if (!imagesPaths && filesPaths) {
        const newContribution = await Contribution.findByIdAndUpdate(req.params.id,
          {
            title: req.body.title,
            content: req.body.content,
            file: filesPaths
          },
          { new: true });
        return res.status(201).json(newContribution);
      }
      if (imagesPaths && filesPaths) {
        const newContribution = await Contribution.findByIdAndUpdate(req.params.id,
          {
            title: req.body.title,
            content: req.body.content,
            image: imagesPaths,
            file: filesPaths
          },
          { new: true });
        return res.status(201).json(newContribution);
      }
      if (!imagesPaths && !filesPaths) {
        const newContribution = await Contribution.findByIdAndUpdate(req.params.id,
          {
            title: req.body.title,
            content: req.body.content,
          },
          { new: true });
        return res.status(201).json(newContribution);
      }
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
      if(req.user.id != contribution.userID && !(req.user.role == 'admin'|| req.user.role == 'marketing manager' || req.user.role == 'marketing coordinator')){
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
      let query = { title: new RegExp(keyword, "i"), isPublic: true, eventID: req.cookies.eventId };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { title: new RegExp(keyword, "i"), eventID: req.cookies.eventId };
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
        return res.status(404).json({ message: "You cannot comment because the contribution is expired" });
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
                                uniqueContributors: { $addToSet: '$contributions.userID' } 
                            },
                        },
                    ],
                    as: 'eventsWithStatistics',
                },
            },
            {
              //calculate total all contributions 
                $addFields: {
                    totalContributions: { $sum: '$eventsWithStatistics.totalContributions' },
                    uniqueContributors: { $setUnion: ['$eventsWithStatistics.uniqueContributors'] }
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
                numberOfUniqueContributors: { $size: '$faculties.uniqueContributors' },
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
                }
            }
            }
        ]);
        res.status(200).json(facultyStatistics);
    } catch (error) {
        console.error("Error fetching faculty statistics:", error);
        res.status(500).json({ message: error.message });
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
  }
};

module.exports = contributionController;