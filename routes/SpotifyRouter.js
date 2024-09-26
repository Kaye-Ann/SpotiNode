const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const songsController = require('../controllers/songsController');
const uploadController = require('../controllers/uploadController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route for root path
router.get('/', (req, res) => {
    res.redirect('/songs');  // Redirect to songs list or use res.render('index') if you have a homepage
});

// POST route to create a new playlist
router.post('/playlists', async (req, res) => {
    const { title, description } = req.body;

    try {
        await db.query('INSERT INTO playlists (title, description) VALUES (?, ?)', [title, description]);
        res.redirect('/playlists'); // Redirect to the playlists page after creation
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating playlist');
    }
});
router.post('/delete/:id', songsController.deleteSong);

// Songs and other routes
router.get('/songs', songsController.getAllSongs);
router.get('/search', songsController.searchSong);
router.get('/play/:id', songsController.playSong);

// Upload routes
router.get('/upload', uploadController.showUploadForm);
router.post('/upload', upload.single('song'), uploadController.uploadSong);

module.exports = router;
