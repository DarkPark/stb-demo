/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Button = require('stb/ui/button'),
	Panel  = require('stb/ui/panel'),
	Widget = require('stb/ui/widget'),
	panel  = new Panel({
		$node: document.getElementById('pageMainTabWidget'),
		visible: false
	}),
	w1 = new Widget({
		$node: document.getElementById('pageMainTabWidgetW1'),
		events: {
			click: function () { w1.hide(); }
		}
	}),
	w2 = new Widget({
		$node: document.getElementById('pageMainTabWidgetW2'),
		events: {
			click: function () { w2.hide(); }
		}
	}),
	w3 = new Widget({
		$node: document.getElementById('pageMainTabWidgetW3'),
		events: {
			click: function () { w3.hide(); }
		}
	});


panel.add(
	new Button({
		value: 'show local tab widget',
		events: {
			click: function () {
				w1.show();
			}
		}
	}),
	new Button({
		value: 'show local page widget',
		events: {
			click: function () {
				w2.show();
			}
		}
	}),
	new Button({
		value: 'show global app widget',
		events: {
			click: function () {
				w3.show();
			}
		}
	})
);


// public export
module.exports = panel;
