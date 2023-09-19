const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (use your own Cloudinary credentials)
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
