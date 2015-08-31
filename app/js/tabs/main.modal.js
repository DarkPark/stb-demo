/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button       = require('../stb/ui/button'),
	Panel        = require('../stb/ui/panel'),
	ModalBox     = require('../stb/ui/modal.box'),
	ModalMessage = require('../stb/ui/modal.message'),
	TabItem = require('../stb/ui/tab.item'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabModal')
	});


tab.title = 'Modal';


tab.add(
	new Button({
		value: 'show simple modal window',
		events: {
			click: function () {
				panel.add(
					panel.modal = new ModalBox({
						events: {
							click: function () {
								console.log(panel.modal);
								panel.modal.remove();
							}
						}
					})
				);
				panel.modal.$body.innerText = 'This is a simple modal box.\nClick to close.';
				panel.modal.focus();
			}
		}
	}),
	new Button({
		value: 'show modal window with a lot of text',
		events: {
			click: function () {
				panel.add(
					panel.modal = new ModalBox({
						events: {
							click: function () {
								console.log(panel.modal);
								panel.modal.remove();
							}
						}
					})
				);
				panel.modal.$body.innerText = new Array(300).join('text ');
				panel.modal.focus();
			}
		}
	}),
	new Button({
		value: 'show modal message',
		events: {
			click: function () {
				panel.add(
					panel.modal = new ModalMessage({
						events: {
							click: function () {
								console.log(panel.modal);
								panel.modal.remove();
							}
						}
					})
				);
				//panel.modal.$body.innerText = new Array(300).join('text ');
				panel.modal.focus();
			}
		}
	})
);


// public
module.exports = tab;
