const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });


// Set up a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    const { path } = req.file;

    // Process the DNG file and generate a preview image
    const outputFile = 'preview.jpg';

    sharp(path)
        .resize(800) // Adjust the desired width and height for the preview image
        .toFile(outputFile, (err, info) => {
            if (err) {
                console.error('Error processing the image:', err);
                res.status(500).json({ error: 'Image processing error' });
            } else {
                console.log('Preview image generated:', info);
                res.json({ success: true, previewUrl: outputFile });
            }

            // Clean up the uploaded file
            fs.unlink(path, () => { });
        });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});