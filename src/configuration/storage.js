const multer = require('multer');


module.exports.storage = multer.diskStorage({
    destination: 'uploads/', // Specify the directory where files will be stored
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name
    }
});