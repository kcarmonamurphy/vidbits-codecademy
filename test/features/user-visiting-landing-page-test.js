const {assert} = require('chai');

describe('user visits the landing page with no existing videos', () => {
	describe('#videos-container', () => {
		it('should be empty', () => {
			// Setup
			browser.url('/');

			// Verification
      		assert.equal(browser.getText('#videos-container'), '');
		});
	});

	describe('user can navigate to videos/create', () => {
		it('should contain text "Save a video"', () => {
			// Setup
			browser.url('/');

			// Excercise
			browser.click('a[href="/videos/create"]');

			// Verification
      		assert.include(browser.getText('body'), 'Save a video');
		});
	});
});