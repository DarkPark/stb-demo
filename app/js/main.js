/**
 * Main application entry point.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var app    = require('stb/app'),
	router = require('stb/router'),
	keys   = require('stb/keys');


app.addListeners({
	// all resources are loaded
	load: function load () {
		// set pages
		router.init([
			require('./pages/init'),
			require('./pages/main'),
			require('./pages/grid'),
			require('./pages/help'),
			require('./pages/button')
		]);
	},

	// everything is ready
	done: function done () {
		// go to the main page
		router.navigate('pageMain');
	},

	// event
	keydown: function keydown ( event ) {
		if ( event.code === keys.back ) {
			router.back();
		}
	}
});


// new way of string handling
// all strings are in UTF-16
//gSTB.SetNativeStringMode(true);
