/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button    = require('../stb/ui/button'),
	Panel     = require('../stb/ui/panel'),
	TabItem = require('../stb/ui/tab.item'),
	preloader = require('../stb/preloader'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabButton')
	});


tab.title = 'Button';


preloader.addListener('done', function () {
	debug.log('ready');
});


Button.prototype.clickDuration = 1000;


panel.add(
	new Panel({
		$node: window.pageMainTabButtonSimple,
		children: [
			new Button({
				value: 'preload images',
				className: 'wide',
				events: {
					click: function () {
						debug.log('click');

						preloader.add([
							'http://pic.uuhy.com/uploads/2011/09/01/Painting-Of-Nature.png',
							'https://perishablepress.com/wp/wp-content/themes/wire/img/jeff-starr.jpg',
							{url: 'http://www.phpied.com/files/reflow/dyna1.png', group:'qwe'},
							{url: 'http://www.phpied.com/files/reflow/dyna3.png', group:'qwe'},
							'http://www.phpied.com/files/reflow/render.pn'
						]);
					}
				}
			}),
			new Button({
				value: 'show heavy image',
				events: {
					click: function () {
						debug.log('click');

						panel.$node.style.background = 'url("http://pic.uuhy.com/uploads/2011/09/01/Painting-Of-Nature.png") center center';
					}
				}
			}),
			new Button({
				value: 'a button with a lot of text a button with a lot of text a button with a lot of text',
				className: 'wide'
			})
		]
	}),
	new Panel({
		$node: window.pageMainTabButtonIcon,
		children: [
			new Button({
				icon: 'menu',
				events: {
					click: function () {
						debug.log('click');
						this.defaultEvents.click.call(this);
					},
					keydown: function ( event ) {
						debug.log('keydown');
						this.defaultEvents.keydown.call(this, event);
					}
				}
			})
		]
	}),
	new Panel({
		$node: window.pageMainTabButtonIconText,
		children: [
			new Button({
				icon: 'menu',
				value: 'press me'
			}),
			new Button({
				icon: 'menu',
				value: 'press me',
				className: 'iconTop'
			}),
			new Button({
				icon: 'menu',
				value: 'press me',
				className: 'iconBottom'
			}),
			new Button({
				icon: 'menu',
				value: 'press me',
				className: 'wide'
			})
		]
	})
);


// public
module.exports = tab;
