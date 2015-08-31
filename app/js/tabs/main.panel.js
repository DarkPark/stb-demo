/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel = require('../stb/ui/panel'),
	TabItem = require('../stb/ui/tab.item'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabPanel')
	});


tab.title = 'Panel';


tab.add(
	new Panel({
		$node: document.getElementById('pageMainTabPanelSimple')
	}),
	new Panel({
		$node: document.getElementById('pageMainTabPanelMulti')
	}),
	new Panel({
		$node: document.getElementById('pageMainTabPanelParent'),
		children: [
			new Panel({
				$node: document.getElementById('pageMainTabPanelChild')
			})
		]
	})
);


// public
module.exports = tab;
