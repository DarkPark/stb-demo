/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button       = require('../stb/ui/button'),
	ModalBox     = require('../stb/ui/modal.box'),
	ModalMessage = require('../stb/ui/modal.message'),
	TabItem = require('../stb/ui/tab.item'),
	tab = new TabItem({
		$node: window.pageMainTabModal
	});


tab.title = 'Modal';


tab.add(
	new Button({
		value: 'show simple modal window',
		events: {
			click: function () {
				tab.add(
					tab.modal = new ModalBox({
						events: {
							click: function () {
								console.log(tab.modal);
								tab.modal.remove();
							}
						}
					})
				);
				tab.modal.$body.innerText = 'This is a simple modal box.\nClick to close.';
				tab.modal.focus();
			}
		}
	}),
	new Button({
		value: 'show modal window with a lot of text',
		events: {
			click: function () {
				tab.add(
					tab.modal = new ModalBox({
						events: {
							click: function () {
								console.log(tab.modal);
								tab.modal.remove();
							}
						}
					})
				);
				tab.modal.$body.innerText = new Array(300).join('text ');
				tab.modal.focus();
			}
		}
	}),
	new Button({
		value: 'show modal message',
		events: {
			click: function () {
				tab.add(
					tab.modal = new ModalMessage({
						events: {
							click: function () {
								console.log(tab.modal);
								tab.modal.remove();
							}
						}
					})
				);
				tab.modal.focus();
			}
		}
	})
);


// public
module.exports = tab;
