/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button = require('stb/ui/button'),
	Panel  = require('stb/ui/panel'),
	panel  = new Panel({
		$node: document.getElementById('pageMainTabButton'),
		visible: false
	});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabButtonSimple'),
		children: [
			new Button({
				value: 'press me'
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabButtonIcon'),
		children: [
			new Button({
				icon: 'menu'
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabButtonIconText'),
		children: [
			new Button({
				icon: 'menu',
				value: 'press me'
			})
		]
	})
);


// public
module.exports = panel;
