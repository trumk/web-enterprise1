const mongoose = require("mongoose");
const Faculty = require("../models/Faculty")
const Profile = require("../models/Profile")
const { User, Otp } = require("../models/User")

async function createFaculty(req, res) {
  try {
    const faculty = new Faculty({
      facultyName: req.body.facultyName,
      enrollKey: req.body.enrollKey,
      descActive: req.body.descActive,
    });
    const newFaculty = await faculty.save();
    const user = await User.findByIdAndUpdate(
      req.body.userID,
      { role: "marketing coordinator" },
      { new: true }
    );
    await Profile.findOneAndUpdate(
      { userID: user._id },
      { facultyID: newFaculty._id }
    );
    res.status(200).json({
      success: true,
      message: 'New Faculty created successfully',
      Faculty: newFaculty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: error.message,
    });
  }
}

async function getAllFaculty(req, res) {
  // try {
  //   const faculties = await Faculty.find().select('facultyName descActive marketingCoordinator').populate('marketingCoordinator');
  //   const facultiesWithCoordinator = await Promise.all(faculties.map(async (faculty) => {
  //     const profile = await Profile.findOne({ facultyID: faculty._id });
  //     if (profile) {
  //       const user = await User.findOne({ _id: profile.userID, role: 'marketing coordinator' });
  //       return {
  //         ...faculty._doc,
  //         marketingCoordinator: user ? { _id: user._id, userName: user.userName } : null,
  //       };
  //     }
  //   }));
  //   res.status(200).json({
  //     success: true,
  //     message: ' all Faculty',
  //     Faculty: facultiesWithCoordinator,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Server error. Please try again',
  //     error: error.message,
  //   });
  // }
  try {
    // Lấy thông tin về tất cả các khoa học viện
    const faculties = await Faculty.find({}, { _id: 1, facultyName: 1, enrollKey: 1, descActive: 1 });
  
    // Lấy danh sách id của tất cả các khoa học viện
    const facultyIds = faculties.map(faculty => faculty._id);
  
    // Lấy thông tin về người phụ trách marketing từ collection User
    const marketingCoordinators = await Profile.find(
      { facultyID: { $in: facultyIds } }, 
      { userID: 1 }
    ).populate({
      path: 'userID',
      select: '_id userName',
      match: { role: 'marketing coordinator' }
    });
  
    // Tạo kết quả cuối cùng với thông tin về người phụ trách marketing
    const result = faculties.map(faculty => {
      const coordinator = marketingCoordinators.find(coordinator => coordinator.facultyID?.toString() === faculty._id.toString());
      return {
        _id: faculty._id,
        facultyName: faculty.facultyName,
        enrollKey: faculty.enrollKey,
        descActive: faculty.descActive,
        marketingCoordinator: coordinator ? { _id: coordinator.userID._id, userName: coordinator.userID.userName } : null
      };
    });
  
    res.status(200).json({
      success: true,
      message: 'All Faculty',
      Faculty: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: error.message,
    });
  }
  
  
}

async function getFacultyManager(req, res) {
  profile = await Profile.findOne({ userID: req.user.id })

  await Faculty.findById(profile.facultyID)
    .select('facultyName descActive') //properties
    .then((allFaculty) => {
      return res.status(200).json({
        success: true,
        message: ' Faculty',
        Faculty: allFaculty,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};


async function searchFaculty(req, res) {
  try {
    const keyword = req.body.keyword;
    const faculties = await Faculty.find({ facultyName: new RegExp(keyword, "i") })
      .select('facultyName descActive');
    const facultiesWithCoordinator = await Promise.all(faculties.map(async (faculty) => {
      const profile = await Profile.findOne({ facultyID: faculty._id });
      if (profile) {
        const user = await User.findOne({ _id: profile.userID, role: 'marketing coordinator' });
        return {
          ...faculty._doc,
          marketingCoordinator: user ? { _id: user._id, userName: user.userName } : null,
        };
      }
    }));
    res.status(200).json({
      success: true,
      message: 'Search results',
      Faculty: facultiesWithCoordinator,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: error.message,
    });
  }
}


async function getOneFaculty(req, res) {
  const id = req.params.id;
  res.cookie("facultyId", id, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });
  const profile = await Profile.findOne({ userID: req.user.id });
  const facultyID = String(profile?.facultyID);
  const role = req.user.role;

  if (!(role === 'admin' || role === 'marketing coordinator' || role === 'marketing manager') && facultyID !== id) {
    return res.status(500).json({ message: "You haven't enrolled in this Faculty yet" });
  }
  Faculty.findById(id)
    .then(async (faculty) => {
      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: 'Faculty not found with ID: ' + id,
        });
      }
      const profile = await Profile.findOne({ facultyID: faculty._id });
      if (!profile) return res.status(200).json({
        success: true,
        message: 'Faculty',
        Faculty: faculty,
      });
      const user = await User.findOne({ _id: profile.userID, role: 'marketing coordinator' });
      res.status(200).json({
        success: true,
        message: 'Faculty',
        Faculty: {
          ...faculty._doc,
          marketingCoordinator: user ? { _id: user._id, userName: user.userName } : null,
        },
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};

async function updateFaculty(req, res) {
  const id = req.params.facultyId;
  const updateObject = req.body; //update data from the request body as json, contain field edit
  const userID = req.body.userID;
  if (!updateObject.facultyName || !updateObject.descActive || !updateObject.enrollKey || !userID) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  const oldProfile = await Profile.findOne({ 'facultyID': id });
  if (oldProfile) {
    const oldUser = await User.findOne({ _id: oldProfile.userID, role: 'marketing coordinator' });
    if (oldUser) {
      await User.updateOne({ _id: oldUser._id }, { $set: { role: 'user' } });
    }
  }
  console.log(oldProfile)
  await User.updateOne({ _id: userID }, { $set: { role: 'marketing coordinator' } })

  const newProfile = await Profile.findOne({ userID: userID });
  if (newProfile) {
    // for (let facultyID of newProfile.facultyID) {
    //   await Profile.updateOne({ _id: newProfile._id, 'facultyID': facultyID }, { $set: { 'facultyID.$': id } })
    // }
    await Profile.updateOne({ _id: newProfile._id }, { $addToSet: { facultyID: id } })
  } else {
    await Profile.create({ userID: userID, facultyID: [id] })
  };
  await Faculty.updateOne({ _id: id }, { $set: { ...updateObject, marketingCoordinator: userID } }) 
    .exec() //execute update query built
    //exec success 
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Faculty is updated',
        updateFaculty: updateObject,
      });
    })
    //exec error
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
};

async function enrollStudent(req, res) {
  try {
    const id = req.params.id;
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found"
      });
    }

    if (faculty.enrollKey === req.body.enrollKey) {
      const result = await Profile.updateOne({ userID: req.user.id }, { $push: { facultyID: id } }).exec();
      if (result.nModified === 0) {
        return res.status(404).json({
          success: false,
          message: "Profile not found or not updated"
        });
      }
      return res.status(200).json({
        success: true,
        message: "Enrolled successfully"
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid enroll key"
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: " + err.message
    });
  }
}


function deleteFaculty(req, res) {
  const id = req.params.facultyId;

  // ID
  Faculty.findOneAndDelete({ _id: id }) //find id
    .exec()
    .then(deletedFaculty => {
      if (!deletedFaculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found with ID: " + id
        });
      }
      // deleted successfully
      return res.status(204).json({
        success: true
      });
    })
    .catch(err => res.status(500).json({
      success: false,
      message: "Error: " + err.message
    }));
};


module.exports = {
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculty,
  getOneFaculty,
  searchFaculty,
  enrollStudent,
  getFacultyManager

};
