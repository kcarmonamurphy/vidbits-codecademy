const {assert} = require('chai');

const {createVideoPhantom} = require('../test-utils');

describe('user updates video', () => {

	describe('user changes the title and clicks save', () => {

		it('should update the title', () => {

			const {title, description, url} = createVideoPhantom();

			browser.click('#edit-button');

			const newTitle = 'Madonna - Like a Virgin';
			const newDescription = 'Great Song by Madonna, the Queen of Pop';
			const newUrl = 'https://www.youtube.com/embed/s__rX_WL100';

			browser.setValue('input#title-input', newTitle);

			browser.click('#submit-button');

			// Verification
  		assert.include(browser.getText('.video-title'), newTitle, 'title was not updated');
		});

		it('does not create an additional video', () => {
      
			const {title, description, url} = createVideoPhantom();

			browser.click('#edit-button');

			const newTitle = 'Madonna - Like a Virgin';
			const newDescription = 'Great Song by Madonna, the Queen of Pop';
			const newUrl = 'https://www.youtube.com/embed/s__rX_WL100';

			browser.setValue('input#title-input', newTitle);

			browser.click('#submit-button');

			// Verification
  		assert.notInclude(browser.getText('.video-title'), title, 'new video created by mistake');
		});

	});

});