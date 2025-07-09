import express from 'express';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure multer to store files in /uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // All files in one folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Database connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Upload endpoint
router.post('/file', upload.single('file'), async (req, res) => {
  const { uploadedBy, patientId = null, type = 'chat' } = req.body;
  const file = req.file;

  if (!file || !uploadedBy || !type) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const fileData = {
    fileName: file.originalname,
    fileUrl: `/uploads/${file.filename}`,
    fileType: file.mimetype,
    size: file.size,
    uploadedBy,
    patientId,
    type,
  };

  try {
    const [result] = await db.execute(
      `INSERT INTO files (fileName, fileUrl, fileType, size, uploadedBy, patientId, type) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fileData.fileName,
        fileData.fileUrl,
        fileData.fileType,
        fileData.size,
        fileData.uploadedBy,
        fileData.patientId,
        fileData.type,
      ]
    );

    return res.status(201).json({ message: 'File uploaded', file: fileData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Database error' });
  }
});

export default router;
