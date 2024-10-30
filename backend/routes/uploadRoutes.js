import path from "path";
import express from 'express';
import multer from "multer";
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDir);
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Image only!'));
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

router.post('/', upload.single('image'), (req, res) => {
    if (req.file) {
        res.status(200).send({
            message: 'Image Uploaded!',
            image: `/uploads/${req.file.filename}` // Adjusted to return the correct image path
        });
    } else {
        res.status(400).send({
            message: 'Image not uploaded. Please try again.',
        });
    }
});

export default router;
