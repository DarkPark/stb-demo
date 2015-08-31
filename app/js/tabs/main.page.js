/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button = require('../stb/ui/button'),
	Panel  = require('../stb/ui/panel'),
	router = require('../stb/router'),
	TabItem = require('../stb/ui/tab.item'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabPage')
	});


tab.title = 'Page';


tab.add(
	new Button({
		value: 'switch to page Help',
		events: {
			click: function () {
				router.navigate('pageHelp');
			}
		}
	})
);


// public
module.exports = tab;
