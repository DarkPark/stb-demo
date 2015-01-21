/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Input = require('stb/ui/input'),
	Panel = require('stb/ui/panel'),
	panel = new Panel({
		$node: document.getElementById('pageMainTabInput'),
		visible: false
	});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabInputSimple'),
		children: [
			new Input({
				value: 'some text',
				events: {
					click: function () {

					}
				}
			})
		]
	})
);


// public export
module.exports = panel;
