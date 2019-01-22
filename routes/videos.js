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

router.get('/videos/:id', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/show', {video});
});

router.get('/videos/:id/edit', async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.render('videos/edit', {video});
});

router.post('/videos/:id/updates', async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  const {title, description, url} = req.body;

  video.title = title;
  video.description = description
  video.url = url;

  video.validateSync();

  if (video.errors) {
    return res.status(400).render('videos/edit', {video});
  }

  await video.save();
  return res.status(203).redirect(`/videos/${req.params.id}`);
});

router.post('/videos', async (req, res, next) => {

  const {title, description, url} = req.body;

  const video = new Video({title, description, url});

  video.validateSync();

  if (video.errors) {
    return res.status(400).render('videos/create', {video});
  }

  await video.save();
  //return res.status(201).render('videos/show', {video});
  return res.status(203).redirect(`/videos/${video._id}`);
});

module.exports = router;
