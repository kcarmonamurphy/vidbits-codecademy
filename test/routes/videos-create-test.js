const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Video = require('../../models/video');

const {seedVideoToDatabase, buildVideoObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('POST', () => {

    it('should return 201 status', async () => {

      const video = await buildVideoObject();

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(video);
 
      assert.equal(response.status, 201, 'Response status was not 201');

    });

    it('creates a new video in database', async () => {

      const video = await buildVideoObject();

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(video);
 
      const createdVideo = await Video.findOne(video);
      assert.isNotNull(createdVideo, 'Video was not successfully created in the database');

    });

    it('creates a new video in database with correct title and description', async () => {

      const video = await buildVideoObject();

      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(video);
 
      const createdVideo = await Video.findOne(video);

      // assert that title and description were correctly saved
      assert.equal(createdVideo.title, video.title, 'Video title not correctly saved');
      assert.equal(createdVideo.description, video.description, 'Video description not correctly saved');

    });

    describe('title is missing on submit', () => {

      it('response status should be 400', async () => {
        const video = await buildVideoObject({ title: '' });

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
 
        assert.equal(response.status, 400, 'Response status should be 403');
      });

      it('should show validation error message', async () => {
        const video = await buildVideoObject({ title: '' });

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
 
        assert.include(response.text, 'Path &#x60;title&#x60; is required.');
      });

      it('should keep content entered in description field intact', async () => {
        const descriptionText = "howdy fine";

        const video = await buildVideoObject({ title: '', description: descriptionText });

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
 
        assert.include(response.text, descriptionText);
      });
    });

    describe('url is missing on submit', () => {

      it('response status should be 400', async () => {
        const video = await buildVideoObject({ url: '' });

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
 
        assert.equal(response.status, 400, 'Response status should be 403');
      });

      it('should show validation error message', async () => {
        const video = await buildVideoObject({ url: '' });

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
 
        assert.include(response.text, 'Path &#x60;url&#x60; is required.');
      });

      it('should keep content entered in title field intact', async () => {
        const titleText = "Pharrel Williams - Happy";

        const video = await buildVideoObject({ title: titleText, url: '' });

        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(video);
 
        assert.include(response.text, titleText);
      });
    })
  });
});
