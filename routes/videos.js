const router = require('express').Router();

const Video = require('../models/video');

router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});

router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});

router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.post('/videos', async (req, res, next) => {

  const {title, description} = req.body;

  const video = new Video({title, description});

  video.validateSync();

  if (video.errors) {
    return res.status(400).render('videos/create', {video: video});
  }

  await video.save();
  return res.status(201).render('videos/show', {video: video});
});

module.exports = router;
