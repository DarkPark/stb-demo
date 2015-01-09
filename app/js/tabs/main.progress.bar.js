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
	}),
	pb;


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabProgressBarPanel'),
		children: [
			pb = new ProgressBar({
				min: -50,
				max: 50,
				value: 0,
				events: {
					keydown: function ( event ) {
						if ( event.code === keys.right ) { pb.set(pb.value + 1); }
						if ( event.code === keys.left  ) { pb.set(pb.value - 1); }
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
	})
);


// public export
module.exports = panel;
