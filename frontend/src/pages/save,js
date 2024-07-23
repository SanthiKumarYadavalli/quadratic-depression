const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'public' }); // Set destination for uploaded images

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', req.file.filename); // Full path to saved image

    // Perform additional image processing or validation if needed
    // ...

    res.status(200).send(filePath); // Or an appropriate URL for image access
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image.');
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
