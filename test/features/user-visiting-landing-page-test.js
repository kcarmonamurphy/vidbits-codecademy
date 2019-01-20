/* globals
browser: webdriverio
*/

const {assert} = require('chai');

const {buildVideoObject} = require('../test-utils');

const generateRandomUrl = (domain) => {
	return `http://${domain}/${Math.random()}`;
}

const createVideoPhantom = (videoObject) => {
	// Setup
	browser.url('/videos/create');

	const {title, description, url} = buildVideoObject(videoObject);

	browser.setValue('input#title-input', title);
	browser.setValue('textarea#description-input', description);
	browser.setValue('input#url-input', url);

	browser.click('#submit-button');
}

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

	it('can navigate to a video', () => {
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

    	browser.click('.video-card a');

    	assert.notEqual(browser.getUrl(), '/')
	});

	describe('#videos-container dawg', () => {

		it('should not be empty', () => {
			createVideoPhantom();

        	//Excercise
        	browser.url('/');

			// Verification
      		assert.isNotEmpty(browser.getText('#videos-container'));
		});

		it('should contain an iframe with a src attribute that is not empty', () => {
			const url = generateRandomUrl('www.google.ca')

			createVideoPhantom({url});

			// Setup
			browser.url('/');

			// Verification
	  		assert.equal(browser.getAttribute('iframe.video-player', 'src'), url);
		});
	});

	
});