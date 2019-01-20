const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const Video = require('../../models/video');

const {seedVideoToDatabase, buildVideoObject, getAttributeFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /videos/:id/edit', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {

    it('renders a form for the video', async () => {

      // create video object
      const video = await buildVideoObject();

      // POST to /videos so video enters database
      await request(app)
        .post('/videos')
        .type('form')
        .send(video);

      const createdVideo = await Video.findOne(video);

      // get response from GET /videos/1
      const response = await request(app).get(`/videos/${createdVideo._id}/edit`);

      assert.include(getAttributeFromHTML(response.text, 'iframe', 'src'), video.url);
    });

  });

});

describe('Server path: /videos/:id/updates', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('POST', () => {

    it('updates the record title', async () => {

      // create video object
      const video = await buildVideoObject();

      // POST to /videos so video enters database
      await request(app)
        .post('/videos')
        .type('form')
        .send(video);

      const createdVideo = await Video.findOne(video);

      const newVideoObject = await buildVideoObject({
        title: 'new title',
        description: createdVideo.description,
        url: createdVideo.url
      });


      // get response from GET /videos/1
      const response = await request(app)
        .post(`/videos/${createdVideo._id}/updates`)
        .type('form')
        .send(newVideoObject)

      const updatedVideo = await Video.findOne(newVideoObject);

            console.log(createdVideo, updatedVideo)


      assert.equal(updatedVideo.title, newVideoObject.title);
    });

  });

});
