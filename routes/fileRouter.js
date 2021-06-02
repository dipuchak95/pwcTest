const express = require('express');
const fileControllers = require('../controllers/fileController');

const router = express.Router();

router.get('/test', (req,res) => {
    res.status(200).json({message: "Hello"});
});

router.post('/image', fileControllers.imagePost);

module.exports = router;