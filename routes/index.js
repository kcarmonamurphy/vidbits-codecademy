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

    // Refactor this, since it's the same route as '/',
    // should ideally do a redirect with 201 status code if possible
    const videos = await Video.find({});
    res.status(201).render('index', {videos});
  }
});

module.exports = router;
