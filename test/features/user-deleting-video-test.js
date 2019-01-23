const {assert} = require('chai');

const {createVideoPhantom} = require('../test-utils');

describe('user visits the show page', () => {

	describe('user deletes a video', () => {

		it('should remove video from list', () => {

			const {title, description} = createVideoPhantom();

			// navigate to home page
			browser.url('/');

			// navigate to video show page
			browser.click('.video-title a');
			browser.click('#delete-button');

			// finally, delete the video
			browser.click('#submit-button');

			// should be redirected to index page
  		assert.notInclude(browser.getText('.videos-container'), title, `video with title ${title} still present`);
  		assert.notInclude(browser.getText('.videos-container'), description, `video with description ${description} still present`);
		});
    
	});
});