/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel    = require('../stb/ui/panel'),
	CheckBox = require('../stb/ui/check.box'),
	TabItem = require('../stb/ui/tab.item'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabCheckBox')
	});


tab.title = 'CheckBox';

tab.add(
	new Panel({
		$node: window.pageMainTabCheckBoxSimple,
		children: [
			new CheckBox()
		]
	}),
	new Panel({
		$node: window.pageMainTabCheckBoxGroup,
		children: [
			new CheckBox({group: 'main', value: false}),
			new CheckBox({group: 'main', value: true}),
			new CheckBox({group: 'main', value: false}),
			new CheckBox({group: 'main', value: false})
		]
	})
);


// public
module.exports = tab;
