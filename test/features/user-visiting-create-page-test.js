const {assert} = require('chai');

const {createVideoPhantom} = require('../test-utils');

describe('user visits the create page', () => {

	describe('filling out a form to submit a video', () => {

		it('should contain title and description fields', () => {

			const {title, description} = createVideoPhantom();

			// Verification
			assert.include(browser.getText('.contents-container'), title);
			assert.include(browser.getText('.contents-container'), description);

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