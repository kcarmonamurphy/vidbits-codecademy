const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Video = require('../../models/video');

const {seedVideoToDatabase, buildVideoObject, parseTextFromHTML, getAttributeFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {

    it('should have video title in the response', async () => {

      // create video object
      const video = await buildVideoObject();

      // POST to /videos so video enters database
      await request(app)
        .post('/videos')
        .type('form')
        .send(video);

      const createdVideo = await Video.findOne(video);

      // get response from GET /videos/1
      const response = await request(app).get(`/videos/${createdVideo._id}`);

      assert.include(response.text, video.title);

    });

    it('should render the video in an iframe', async () => {
       // create video object
      const video = await buildVideoObject();

      // POST to /videos so video enters database
      await request(app)
        .post('/videos')
        .type('form')
        .send(video);

      const createdVideo = await Video.findOne(video);

      // get response from GET /videos/1
      const response = await request(app).get(`/videos/${createdVideo._id}`);

      assert.include(getAttributeFromHTML(response.text, 'iframe', 'src'), video.url);
    });

  });

});
