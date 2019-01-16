const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Video = require('../../models/video');

const {seedVideoToDatabase, buildVideoObject, parseTextFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {

    it('should redirect to GET /videos', async () => {

      // get response from GET /
      const response = await request(app).get('/');

      assert.equal(response.header['location'], '/videos');

    });

    it('should return list of existing videos', async () => {

      // create video object
      const video = await buildVideoObject();

      // POST to /videos so video enters database
      await request(app)
        .post('/videos')
        .type('form')
        .send(video);

      const selector = '#videos-container';

      // get response from GET /
      const response = await request(app).get('/videos');

      // get response text
      const text = parseTextFromHTML(response.text, selector);

      // assertion
      assert.include(text, video.title);

    });

  });

});
