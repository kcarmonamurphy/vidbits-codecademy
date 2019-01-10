const router = require('express').Router();

const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('index', {videos});
});

router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res, next) => {

  const {title, description} = req.body;
  const video = new Video({title, description});

  video.validateSync();

  if (video.errors) {
    res.status(400).render('videos/create', {video: video});
  } else {
    await video.save();
    res.status(201).send(); //.redirect('/');
  }
});

module.exports = router;
