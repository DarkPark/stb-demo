/**
 * Loading page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var id     = 'pageInit',
	app    = require('stb/app'),
	router = require('stb/router'),
	Page   = require('stb/ui/page'),
	page   = new Page({$node: document.getElementById(id)});


app.addListeners({
	// everything is ready
	done: function done () {
		// go to the main page
		router.navigate('pageMain');
	}
});


// public export
module.exports = page;
