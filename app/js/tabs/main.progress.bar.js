/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Panel       = require('stb/ui/panel'),
	ProgressBar = require('stb/ui/progress.bar'),
	keys        = require('stb/keys'),
	panel       = new Panel({
		$node: document.getElementById('pageMainTabProgressBar'),
		visible: false
	});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabProgressBarEmpty'),
		children: [
			new ProgressBar({
				value: 0
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabProgressBarFull'),
		children: [
			new ProgressBar({
				value: 100
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabProgressBarStep1'),
		children: [
			new ProgressBar({
				min: -5,
				max: 5,
				value: -2,
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
		$node: document.getElementById('pageMainTabProgressBarStep2'),
		children: [
			new ProgressBar({
				min: -200,
				max: 200,
				value: 0,
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
		$node: document.getElementById('pageMainTabProgressBarStyle'),
		children: [
			new ProgressBar({
				value: 70
			})
		]
	})
);


// public export
module.exports = panel;
