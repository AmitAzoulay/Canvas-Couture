// middleware/multerConfig.js
const multer = require('multer');
const path = require('path');

// Configure multer to save the images to the public/img directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img'); // Save images to public/img
    },
    filename: function (req, file, cb) {
        const productName = req.body.name; // Get the product name from the form data
        const fileExtension = path.extname(file.originalname); // Get the file extension (e.g., .png, .jpg)

        // Set the filename to the product's name followed by the file extension
        cb(null, `${productName}${fileExtension}`); // E.g., "T-shirt.png"
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Please upload only images'), false);
    }
};

// Initialize multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
