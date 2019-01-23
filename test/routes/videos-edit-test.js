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

		let response;
		let createdVideo;
		let updatedVideo;
		let newVideoObject;

		beforeEach(async () => {
			// create video object
			const video = await buildVideoObject();

			// POST to /videos so video enters database
			await request(app)
				.post('/videos')
				.type('form')
				.send(video);

			createdVideo = await Video.findOne(video);

			newVideoObject = await buildVideoObject({
				title: 'new title',
				description: createdVideo.description,
				url: createdVideo.url
			});

			// get response from GET /videos/1
			response = await request(app)
				.post(`/videos/${createdVideo._id}/updates`)
				.type('form')
				.send(newVideoObject)

			updatedVideo = await Video.findById(createdVideo._id);
		});

		it('updates the record title', async () => {
			assert.equal(updatedVideo.title, newVideoObject.title);
		});

		it('responds with 302 status', async () => {
			assert.equal(response.status, 302);
		});

		it('redirects to the show page', async () => {
			assert.include(response.headers.location, `/videos/${updatedVideo._id}`);
		});

		it('doesn\'t allow the save of an invalid record', async () => {
			 newVideoObject = await buildVideoObject({
				title: 'new title',
				description: '',
				url: ''
			});

			// get response from GET /videos/1
			response = await request(app)
				.post(`/videos/${createdVideo._id}/updates`)
				.type('form')
				.send(newVideoObject)

			assert.equal(response.status, 400);
		});

		it('shows edit form when record is invalid', async () => {
			newVideoObject = await buildVideoObject({
				title: 'new title',
				description: '',
				url: ''
			});

			// get response from GET /videos/1
			response = await request(app)
				.post(`/videos/${createdVideo._id}/updates`)
				.type('form')
				.send(newVideoObject)

			assert.include(response.text, 'edit-page');
		});

	});

});
