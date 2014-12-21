/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Button = require('stb/ui/button'),
	Panel  = require('stb/ui/panel'),
	Modal  = require('stb/ui/modal'),
	panel  = new Panel({
		$node: document.getElementById('pageMainTabModal'),
		visible: false
	});


panel.add(
	new Button({
		value: 'show modal window',
		events: {
			click: function () {
				panel.add(
					panel.modal = new Modal({
						events: {
							click: function () {
								console.log(panel.modal);
								panel.modal.remove();
							}
						}
					})
				);
				panel.modal.focus();
			}
		}
	})
);


// public export
module.exports = panel;
