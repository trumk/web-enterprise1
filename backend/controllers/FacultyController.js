const mongoose = require("mongoose");
const Faculty = require("../models/Faculty")
const Profile = require("../models/Profile")
const { User, Otp } = require("../models/User")
const bcrypt = require("bcrypt")

function getRandomAvatar(avatarArray) {
  const randomIndex = Math.floor(Math.random() * avatarArray.length);
  return avatarArray[randomIndex];
}
async function createFaculty(req, res) {
  try {
    const avatarGuest = [
      "https://i.pinimg.com/originals/ed/f7/e0/edf7e0f65e3b10b60fe4912156457978.jpg",
      "https://bizweb.dktcdn.net/100/438/408/files/gigachad-meme-yodyvn.jpg?v=1696388231581",
      "https://bizweb.dktcdn.net/100/438/408/files/gigachad-meme-yodyvn4.jpg?v=1696388368875",
      "https://vn.portal-pokemon.com/play/resources/pokedex/img/pm/0783062d0d860b8ae7d8e859241a700359c4d981.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuirOtqmZfYnkM0kAy9XC1ua-Y5sPsrXnlaMsJ5BL8cg&s",
    ];
    const faculty = new Faculty({
      facultyName: req.body.facultyName,
      enrollKey: req.body.enrollKey,
      descActive: req.body.descActive,
    });
    const [newFaculty, updatedUser] = await Promise.all([
      faculty.save(),
      User.findByIdAndUpdate(
        req.body.userID,
        { role: "marketing coordinator" },
        { new: true }
      ),
        Profile.findOneAndUpdate(
        {userID : req.body.userID},
        {facultyID : faculty._id}
      )
    ]);
    const salt = await bcrypt.genSalt(10);
    const passString = newFaculty._id.toString()
    const hashedPassword = await bcrypt.hash(passString, salt);
    const user = new User({
      userName: `${newFaculty._id}`,
      email: `${newFaculty._id}@gmail.com`,
      password: hashedPassword,
      isVerified: true,
      role: "guest",
    });
    await Promise.all([
      user.save(),
      new Profile({
        firstName: `${newFaculty.facultyName}`,
        lastName: "Guest",
        birthDay: "2020-01-01",
        avatar: getRandomAvatar(avatarGuest),
        description: `I am a guest in ${newFaculty.facultyName}`,
        userID: user._id,
        facultyID: newFaculty._id,
      }).save(),
    ]);
    res.status(200).json({
      success: true,
      message: "New Faculty created successfully",
      Faculty: newFaculty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again",
      error: error.message,
    });
  }
}

async function getAllFaculty(req, res) {
  try {
    const allFaculties = await Faculty.find();
    
    const facultiesWithCoordinator = await Promise.all(
      allFaculties.map(async (faculty) => {
        const profiles = await Profile.find({ facultyID: faculty._id });
        const marketingCoordinators = await Promise.all(
          profiles.map(async (profile) => {
            const user = await User.findOne({
              _id: profile.userID,
              role: 'marketing coordinator',
            });
            return user ? { _id: user._id, userName: user.userName } : null;
          })
        );
        const validCoordinators = marketingCoordinators.filter(
          (coordinator) => coordinator !== null
        );

        return {
          ...faculty._doc,
          marketingCoordinators: validCoordinators,
        };
      })
    );
    res.status(200).json({
      success: true,
      message: 'All Faculties',
      Faculty: facultiesWithCoordinator,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
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
      const profile = await Profile.find({ facultyID: faculty._id });
      if (profile) {
        const user = await User.find({ _id: profile.userID, role: 'marketing coordinator' });
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
  try {
    const id = req.params.facultyId;
    const updateObject = req.body;
    const userID = req.body.userID;

    // Check for required fields
    if (!updateObject.facultyName || !updateObject.descActive || !updateObject.enrollKey || !userID) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Find the new marketing coordinator's profile
    const newCoordinatorProfile = await Profile.findOne({ userID });
    const faculty = await Faculty.findById(id);

    // If faculty or profile not found, return error
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    if (!newCoordinatorProfile) {
      await Profile.create({
        userID,
        facultyID: [id],
      });
    }

    // Find all profiles with the same facultyID and change marketing coordinators to users
    const existingCoordinators = await Profile.find({ facultyID: id }).populate('userID', 'role');
    
    const promises = [];
    for (const profile of existingCoordinators) {
      if (profile.userID.role === 'marketing coordinator') {
        promises.push(
          User.findByIdAndUpdate(profile.userID._id, { role: 'user' })  // Change role to user
        );
      }
    }

    // Assign the new marketing coordinator
    promises.push(
      User.findByIdAndUpdate(userID, { role: 'marketing coordinator' }),
      Profile.findOneAndUpdate({userID: userID }, {facultyID: id})
    );

    await Promise.all(promises);

    await Faculty.updateOne(
      { _id: id },
      { $set: { ...updateObject, marketingCoordinator: userID } }
    );

    res.status(200).json({
      success: true,
      message: 'Faculty updated successfully',
      updatedFaculty: updateObject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  }
}


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
