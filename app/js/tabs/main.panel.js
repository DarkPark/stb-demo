/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel = require('stb/ui/panel'),
	panel = new Panel({
		$node: document.getElementById('pageMainTabPanel'),
		visible: false
	});


panel.add(
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
module.exports = panel;
