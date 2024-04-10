const admin = require('firebase-admin');
const multer = require('multer');
const os = require('os');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');


admin.initializeApp({
    credential: admin.credential.cert({
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    }),
    storageBucket: "webenr-4be7a.appspot.com"
});

const bucket = admin.storage().bucket();

const multerTempStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir());
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: multerTempStorage });

const uploadToFirebase = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next();
    }

    const files = Object.values(req.files).flat();
    const uploadPromises = files.map(file => {
        return new Promise((resolve, reject) => {
            const blob = bucket.file(`${Date.now()}-${file.originalname}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            const filePath = file.path;
            const readStream = fs.createReadStream(filePath);

            readStream.on('error', reject);
            blobStream.on('error', reject);
            blobStream.on('finish', () => {
                fs.unlink(filePath, (err) => {
                    if (err) console.error('Error deleting temporary file:', err);
                });

                blob.makePublic().then(() => {
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(blob.name)}`;
                    resolve(publicUrl);
                }).catch(reject);
            });

            readStream.pipe(blobStream);
        });
    });

    Promise.all(uploadPromises)
        .then(urls => {
            req.body.firebaseUrls = urls;
            next();
        })
        .catch(error => {
            console.error("Error uploading to Firebase:", error);
            res.status(500).send("Failed to upload files to Firebase.");
        });
};

const multerErrorHandler = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: error });
      }
    }
    next(error);
  };

module.exports = { upload, uploadToFirebase, multerErrorHandler};
