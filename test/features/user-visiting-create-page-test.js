const {assert} = require('chai');

describe('user visits the create page', () => {

	describe('filling out a form to submit a video', () => {

		it('should contain title and description fields', () => {
			// Setup
			browser.url('/videos/create');

			const video = {
				title: 'Sample Title',
				description: 'Great Description!',
				url: 'https://www.youtube.com/embed/y6Sxv-sUYtM'
			}

			//Excercise
			browser.setValue('input#title-input', video.title);
        	browser.setValue('textarea#description-input', video.description);
        	browser.setValue('input#url-input', video.url);

        	browser.click('#submit-button');

			// Verification
      		assert.include(browser.getText('#show-container'), video.title);
      		assert.include(browser.getText('#show-container'), video.description);
		});

		it('should have an action which goes to /videos', () => {
			// Setup
			browser.url('/videos/create');

			// Verification
      		assert.include(browser.getAttribute('#create-input-form', 'action'), '/videos');
      		assert.equal(browser.getAttribute('#create-input-form', 'method'), 'post');
		});

	});
});