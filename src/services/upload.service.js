const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('photo');

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Endpoint to handle photo uploads
// app.post('/upload', (req, res) => {
    const uploadSingle = (reqFile) =>{

        upload(reqFile, (err) => {
            if (err) {
                return {
                    success: false,
                    message: err
                };
            }
            if (!req.file) {
                return {
                    success: false,
                    message: 'No file uploaded!'
                };
            }
            return "uploads/${req.file.filename}"
        });
    }
// });

// Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Endpoint to get the photo
// app.get('/photos/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const filepath = path.join(__dirname, '../assets/uploads', filename);
//     res.sendFile(filepath, (err) => {
//         if (err) {
//             res.status(404).json({
//                 success: false,
//                 message: 'File not found!'
//             });
//         }
//     });
// });

module.exports = { uploadSingle };