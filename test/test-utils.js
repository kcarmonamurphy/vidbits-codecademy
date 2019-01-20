const Video = require('../models/video');

const {jsdom} = require('jsdom');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = ("title" in options) ? options.title : 'My favorite video';
  const description = ("description" in options) ? options.description : 'Just the best video';
  const url = ("url" in options) ? options.url : 'https://www.youtube.com/embed/y6Sxv-sUYtM';
  return {title, description, url};
};

// Add a sample Video object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// extract text from an Element by selector.
const getAttributeFromHTML = (htmlAsString, selector, attribute) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.getAttribute(attribute);
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  parseTextFromHTML,
  getAttributeFromHTML
};
