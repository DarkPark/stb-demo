/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var id     = 'pageHelp',
	node   = document.getElementById(id),
	Page   = require('stb/ui/page'),
	Button = require('stb/ui/button'),
	page   = new Page({$node: node}),
	router = require('stb/router');


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


page.addListener('show', function load () {
	// initial active component
	page.back.focus();
});


// public export
module.exports = page;
