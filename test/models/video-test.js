const {assert} = require('chai');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

const Video = require('../../models/video');

describe('Model: video', () => {

	beforeEach(connectDatabaseAndDropData);

  	afterEach(disconnectDatabase);

	// Write your tests below:
  	describe('#title', () => {
	  	it('should be a string', () => {
	  		const titleAsNonString = 1;

	  		const video = new Video({title: titleAsNonString});

	  		assert.strictEqual(video.title, titleAsNonString.toString());
	  	});

	  	it('is required', () => {
	  		const video = new Video({title: ''});

	  		video.validateSync();

	  		assert.equal(video.errors.title.message, 'Path `title` is required.');
	  	})
  	})

  	describe('#description', () => {
  		it('should be a string', () => {
  			const descriptionAsNonString = 5;

  			const video = new Video({description: descriptionAsNonString});

  			assert.strictEqual(video.description, descriptionAsNonString.toString());
  		});

  		it('is required', () => {
  			const video = new Video({description: ''});

  			video.validateSync();

  			assert.equal(video.errors.description.message, 'Path `description` is required.');
  		})
  	});
});