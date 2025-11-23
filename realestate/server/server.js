const express = require('express');
const multer = require('multer'); // Multer for file handling
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the uploads directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  const { name } = req.body; // Get the name from the request body
  const file = req.file; // Get the uploaded file

  if (!file || !name) {
    return res.status(400).json({ error: 'Image and name are required' });
  }

  console.log(`Received file: ${file.filename}`);
  console.log(`Received name: ${name}`);

  res.status(200).json({
    message: 'File uploaded successfully',
    filePath: path.join(__dirname, 'uploads', file.filename),
    name,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});