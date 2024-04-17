const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storageImage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'webp', 'jfif'],
  params: {
    folder: 'User_Avatar'
  }
});

const storageFile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let params = {
      folder: 'ZIP_Contribution',
      resource_type: 'raw',
    };
    const acceptedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip', 'application/x-zip-compressed',
      'application/vnd.rar'
    ];
    
    if (acceptedMimeTypes.includes(file.mimetype)) {
      return params;
    } else {
      throw new Error("Only Accept file PDF, Word, and ZIP.");
    }
  },
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Logic to handle different file types, e.g., based on file.mimetype or file.fieldname
    if (file.fieldname === "image") {
      return { folder: "User_Avatar" };
    } else if (file.fieldname === "file") {
      return { folder: "ZIP_Contribution", resource_type: 'raw' };
    }
    // Add more conditions as necessary
  },
});


const multerErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(401).json({ error: error });
    }
  }
  next(error);
};


const uploadImage = multer({ storage: storageImage });
const uploadFile = multer({ storage: storageFile });
const upload = multer({ storage: storage }); 

module.exports = { uploadImage, uploadFile, upload, multerErrorHandler };