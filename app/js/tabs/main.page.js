/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Button = require('stb/ui/button'),
	Panel  = require('stb/ui/panel'),
	router = require('stb/router'),
	panel  = new Panel({
		$node: document.getElementById('pageMainTabPage'),
		visible: false
	});


panel.add(
	new Button({
		value: 'switch to page Help',
		events: {
			click: function () {
				router.navigate('pageHelp');
			}
		}
	})
);


// public export
module.exports = panel;
