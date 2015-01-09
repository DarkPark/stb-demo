/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Panel = require('stb/ui/panel'),
	List  = require('stb/ui/list'),
	panel = new Panel({
		$node: document.getElementById('pageMainTabList'),
		visible: false
	});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabListSimple'),
		children: [
			new List({
				data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 10000 + value + index; }),
				//data: [1,2,3],
				size: 5,
				//render: function ( $item, data ) {
				//	$item.innerHTML = '[' + (data) + ']';
				//},
				cycle: false,
				events: {
					click: function ( data ) {
						//console.log('click');
						//data.event.stop = true;
						debug.inspect(data, 1);
					},
					focus: function ( data ) {
						//console.log('focus');
						debug.inspect(data, 1);
					},
					cycle: function () {
						debug.log('cycle');
					},
					overflow: function () {
						debug.log('overflow');
					},
					'click:item': function ( data ) {
						//console.log('click:item');
						debug.inspect(data, 1);
					},
					'focus:item': function ( data ) {
						//console.log('focus:item');
						debug.inspect(data, 1);
					},
					'blur:item': function ( data ) {
						//console.log('blur:item');
						debug.inspect(data, 1);
					}
				}
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabListCustom'),
		children: [
			new List({
				data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 10000 + value + index; }),
				//data: [1,2,3],
				size: 5,
				render: function ( $item, data ) {
					$item.innerHTML = '[' + (data) + ']';
				},
				cycle: true,
				events: {
					click: function ( data ) {
						//console.log('click');
						//data.event.stop = true;
						debug.inspect(data, 1);
					},
					focus: function ( data ) {
						//console.log('focus');
						debug.inspect(data, 1);
					},
					overflow: function () {
						debug.log('overflow');
					},
					'click:item': function ( data ) {
						//console.log('click:item');
						debug.inspect(data, 1);
					},
					'focus:item': function ( data ) {
						//console.log('focus:item');
						debug.inspect(data, 1);
					},
					'blur:item': function ( data ) {
						//console.log('blur:item');
						debug.inspect(data, 1);
					}
				}
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabListHoriz'),
		children: [
			new List({
				data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 'sequence: ' + index + value; }),
				//visible: false,
				type: List.prototype.TYPE_HORIZONTAL,
				events: {
					overflow: function () {
						debug.log('overflow');
					}
				}
			})
		]
	})


);


// public export
module.exports = panel;
