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
 
      assert.equal(response.status, 201);

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
      assert.equal(createdVideo.title, video.title);
      assert.equal(createdVideo.description, video.description);

    });
  });
});
