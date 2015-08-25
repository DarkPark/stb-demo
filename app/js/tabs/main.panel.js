/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel = require('../stb/ui/panel'),
	panel = new Panel({
		$node: window.pageMainTabPanel,
		visible: false
	});


panel.add(
	new Panel({
		$node: window.pageMainTabPanelSimple
	}),
	new Panel({
		$node: window.pageMainTabPanelMulti
	}),
	new Panel({
		$node: window.pageMainTabPanelParent,
		children: [
			new Panel({
				$node: window.pageMainTabPanelChild
			})
		]
	})
);


// public
module.exports = panel;
