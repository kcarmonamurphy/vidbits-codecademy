const {assert} = require('chai');

describe('user visits the create page', () => {
	describe('filling out a form to submit a video', () => {
		it('should contain title and description fields', () => {
			// Setup
			browser.url('/videos/create.html');

			const video = {
				title: 'Sample Title',
				description: 'Great Description!'
			}

			//Excercise
			browser.setValue('input#title-input', video.title);
        	browser.setValue('input#description-input', video.description);

        	browser.click('#submit-button');

			// Verification
      		assert.equal(browser.getText('#videos-container'), video.title);
      		assert.equal(browser.getText('#videos-container'), video.description);
		});

		it('should have an action which goes to /videos', () => {
			// Setup
			browser.url('/videos/create.html');

			// Verification
      		assert.include(browser.getAttribute('#create-input-form', 'action'), '/videos');
      		assert.equal(browser.getAttribute('#create-input-form', 'method'), 'post');
		});
	});
});