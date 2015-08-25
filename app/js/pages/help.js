/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Page   = require('../stb/ui/page'),
	Button = require('../stb/ui/button'),
	router = require('../stb/router'),
	page   = new Page({$node: window.pageHelp});


page.addListener('load', function load () {
	page.add(
		page.back = new Button({
			value: 'go back',
			events: {
				click: function () {
					router.navigate('pageMain');
				}
			}
		})
	);
});


page.addListener('show', function show () {
	// initial active component
	page.back.focus();
});


// public
module.exports = page;
