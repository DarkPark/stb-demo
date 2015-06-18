/**
 * Main application entry point.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var app    = require('./stb/app'),
	router = require('./stb/router'),
	keys   = require('./stb/keys'),
	format = require('./stb/tools').format;


app.addListeners({
	// all resources are loaded
	load: function load () {
		// localization
		require('./stb/gettext').load({name: 'ru'}, function ( error ) {
			if ( error ) {
				debug.inspect(error, 3);
			}

			/* gettext: comment for a translator */
			debug.info(gettext('qwe'), 'translation');

			debug.info(pgettext('some context', 'some text'), 'translation');

			debug.info(format(ngettext('{0} cat', '{0} cats', 1), 1), 'translation');

			debug.info(format(ngettext('{0} dog', '{0} dogs', 3), 3), 'translation');
		});

		// set pages
		router.init([
			require('./pages/init'),
			require('./pages/main'),
			require('./pages/help')
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
