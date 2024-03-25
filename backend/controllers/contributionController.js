const Contribution = require("../models/Contribution")
const { User, Otp } = require("../models/User")
const { cloudinary, uploadImage } = require("../middlewares/cloudinary")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

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
      const newContribution = new Contribution({
        title: req.body.title,
        content: req.body.content,
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
  getContribution: async (req, res) => {
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
      const imagesPaths = req.files['image'] ? req.files['image'].map(file => file.path) : [];
      const filesPaths = req.files['file'] ? req.files['file'].map(file => file.path) : [];
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
      const conntribution = await Contribution.findById(req.params.id)
      if (!conntribution) {
        return res.status(404).json("conntribution not found");
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
        query = { title: new RegExp(keyword, "i") };
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
      let query = { userID: { $in: userIds }, isPublic: true };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = { userID: { $in: userIds } };
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
      let query = { isPublic: true };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = {};
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
      let query = { isPublic: true };
      if (role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') {
        query = {};
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
  }
};

module.exports = contributionController;