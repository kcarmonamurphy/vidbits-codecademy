const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

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
  });
});
