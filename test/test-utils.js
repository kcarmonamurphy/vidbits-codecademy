const Video = require('../models/video');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const description = options.description || 'Just the best video';
  return {title, description};
};

// Add a sample Video object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

module.exports = {
  buildVideoObject,
  seedVideoToDatabase
};
