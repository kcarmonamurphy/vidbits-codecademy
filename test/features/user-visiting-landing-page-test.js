/* globals
browser: webdriverio
*/

const {assert} = require('chai');

describe('user visits the landing page with NO existing videos', () => {
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

describe('user visits the landing page with ONE existing video', () => {
	describe('#videos-container dawg', () => {

		it('should not be empty', () => {
			// Setup
			browser.url('/videos/create');

			const video = {
				title: 'Sample Title',
				description: 'Great Description!',
				url: 'https://www.youtube.com/embed/y6Sxv-sUYtM'
			}

			browser.setValue('input#title-input', video.title);
        	browser.setValue('textarea#description-input', video.description);
        	browser.setValue('input#url-input', video.url);

        	browser.click('#submit-button');

        	//Excercise
        	browser.url('/');

			// Verification
      		assert.isNotEmpty(browser.getText('#videos-container'));
		});

		it('should contain an iframe with a src attribute that is not empty', () => {
			// Setup
			browser.url('/videos/create');

			const video = {
				title: 'Sample Title',
				description: 'Great Description!',
				url: 'https://www.youtube.com/embed/y6Sxv-sUYtM'
			}

			browser.setValue('input#title-input', video.title);
        	browser.setValue('textarea#description-input', video.description);
        	browser.setValue('input#url-input', video.url);

        	browser.click('#submit-button');

			// Setup
			browser.url('/');

			// Verification
	  		assert.equal(browser.getAttribute('iframe.video-player', 'src'), video.url);
		});
	});

	
});