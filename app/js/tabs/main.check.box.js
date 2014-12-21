/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Panel    = require('stb/ui/panel'),
	CheckBox = require('stb/ui/check.box'),
	panel    = new Panel({
		$node: document.getElementById('pageMainTabCheckBox'),
		visible: false
	});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabCheckBoxSimple'),
		children: [
			new CheckBox()
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabCheckBoxGroup'),
		children: [
			new CheckBox({group: 'main', value: false}),
			new CheckBox({group: 'main', value: true}),
			new CheckBox({group: 'main', value: false}),
			new CheckBox({group: 'main', value: false})
		]
	})
);


// public export
module.exports = panel;
