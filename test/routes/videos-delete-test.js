const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Video = require('../../models/video');

const {seedVideoToDatabase, buildVideoObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id/deletions', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('POST', () => {

    it('should remove the record', async () => {

      const video = await buildVideoObject();

      await request(app)
        .post('/videos')
        .type('form')
        .send(video);

      const createdVideo = await Video.findOne(video);

      // get response from GET /videos/1
      const response = await request(app)
        .post(`/videos/${createdVideo._id}/deletions`)
        .type('form')
        .send()

      const updatedVideo = await Video.findById(createdVideo._id);
 
      assert.isNull(updatedVideo);

    });

  });
});
