/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Input = require('../stb/ui/input'),
	Panel = require('../stb/ui/panel'),
	panel = new Panel({
		$node: window.pageMainTabInput,
		visible: false
	});


panel.add(
	new Panel({
		$node: window.pageMainTabInputEmpty,
		children: [
			new Input()
		]
	}),
	new Panel({
		$node: window.pageMainTabInputSimple,
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
		$node: window.pageMainTabInputPassword,
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
		$node: window.pageMainTabInputPlaceholder,
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


// public
module.exports = panel;
