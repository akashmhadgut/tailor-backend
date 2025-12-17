import express from 'express';
import multer from 'multer';
import path from 'path';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'tailor-uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'],
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files', 5), (req, res) => {
    // Cloudinary returns the URL in file.path
    const filePaths = req.files.map(file => file.path);
    res.send(filePaths);
});

export default router;
