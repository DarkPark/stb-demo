/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel       = require('../stb/ui/panel'),
	ProgressBar = require('../stb/ui/progress.bar'),
	TabItem = require('../stb/ui/tab.item'),
	keys        = require('../stb/keys'),
	tab = new TabItem({
		$node: document.getElementById('pageMainTabProgressBar')
	});


tab.title = 'ProgressBar';


tab.add(
	new Panel({
		$node: window.pageMainTabProgressBarEmpty,
		children: [
			new ProgressBar({
				value: 0
			})
		]
	}),
	new Panel({
		$node: window.pageMainTabProgressBarFull,
		children: [
			new ProgressBar({
				value: 100
			})
		]
	}),
	new Panel({
		$node: window.pageMainTabProgressBarStep1,
		children: [
			new ProgressBar({
				min: -5,
				max: 5,
				value: -2,
				focusable: true,
				events: {
					keydown: function ( event ) {
						if ( event.code === keys.right ) { this.set(this.value + 1); }
						if ( event.code === keys.left  ) { this.set(this.value - 1); }
					},
					done: function () {
						debug.log('ProgressBar: done');
					},
					change: function ( data ) {
						debug.log('ProgressBar: change to ' + data.curr + ' from ' + data.prev);
					}
				}
			})
		]
	}),
	new Panel({
		$node: window.pageMainTabProgressBarStep2,
		children: [
			new ProgressBar({
				min: -200,
				max: 200,
				value: 0,
				focusable: true,
				events: {
					keydown: function ( event ) {
						if ( event.code === keys.right ) { this.set(this.value + 1); }
						if ( event.code === keys.left  ) { this.set(this.value - 1); }
					},
					done: function () {
						debug.log('ProgressBar: done');
					},
					change: function ( data ) {
						debug.log('ProgressBar: change to ' + data.curr + ' from ' + data.prev);
					}
				}
			})
		]
	}),
	new Panel({
		$node: window.pageMainTabProgressBarStyle,
		children: [
			new ProgressBar({
				value: 70
			})
		]
	})
);


// public
module.exports = tab;
