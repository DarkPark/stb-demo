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
		$node: document.getElementById('pageMainTabInputEmpty'),
		children: [
			new Input()
		]
	}),
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
	}),
	new Panel({
		$node: document.getElementById('pageMainTabInputPassword'),
		children: [
			new Input({
				value: 'some text',
				type: Input.prototype.TYPE_PASSWORD,
				events: {
					click: function () {

					}
				}
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabInputPlaceholder'),
		children: [
			new Input({
				//value: 'some text',
				placeholder: 'hint text',
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
