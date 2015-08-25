/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button = require('../stb/ui/button'),
	Panel  = require('../stb/ui/panel'),
	Widget = require('../stb/ui/widget'),
	panel  = new Panel({
		$node: window.pageMainTabWidget,
		visible: false
	}),
	w1 = new Widget({
		$node: window.pageMainTabWidgetW1,
		events: {
			click: function () { w1.hide(); }
		}
	}),
	w2 = new Widget({
		$node: window.pageMainTabWidgetW2,
		events: {
			click: function () { w2.hide(); }
		}
	}),
	w3 = new Widget({
		$node: window.pageMainTabWidgetW3,
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


// public
module.exports = panel;
