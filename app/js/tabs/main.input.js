/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Input = require('../stb/ui/input'),
	Panel = require('../stb/ui/panel'),
	TabItem = require('../stb/ui/tab.item'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabInput')
	});


tab.title = 'Input';


tab.add(
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


// public
module.exports = tab;
