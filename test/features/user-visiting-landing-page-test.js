/* globals
browser: webdriverio
*/

const {assert} = require('chai');

const {
	buildVideoObject,
	createVideoPhantom
} = require('../test-utils');

const generateRandomUrl = (domain) => {
	return `http://${domain}/${Math.random()}`;
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
		createVideoPhantom();

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