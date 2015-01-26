/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Panel     = require('stb/ui/panel'),
	List      = require('stb/ui/list'),
	ScrollBar = require('stb/ui/scroll.bar'),
	panel     = new Panel({
		$node: document.getElementById('pageMainTabList'),
		visible: false
	}),
	listScroll = new ScrollBar({
		$node: document.getElementById('pageMainTabListCustomScroll'),
		min: 5,
		max: 100
	}),
	list2;

console.log(listScroll);

panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabListSimple'),
		children: [
			new List({
				//data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 10000 + value + index; }),
				data: [1, {value: 2, mark: true}, 3, {value: 44, disable: true}],
				size: 5,
				//render: function ( $item, data ) {
				//	$item.innerHTML = '[' + (data) + ']';
				//},
				cycle: true,
				events: {
					click: function ( data ) {
						//data.event.stop = true;
						debug.log('click');
						debug.inspect(data, 1);
					},
					focus: function ( data ) {
						debug.log('focus');
						debug.inspect(data, 1);
					},
					cycle: function () {
						debug.log('cycle');
					},
					overflow: function () {
						debug.log('overflow');
					},
					'click:item': function ( data ) {
						debug.log('click:item');
						debug.inspect(data, 1);
					},
					'focus:item': function ( data ) {
						debug.log('focus:item');
						debug.inspect(data, 1);
					},
					'blur:item': function ( data ) {
						debug.log('blur:item');
						debug.inspect(data, 1);
					}
				}
			})
		]
	}),
	new Panel({
		$node: document.getElementById('pageMainTabListCustom'),
		children: [
			list2 = new List({
				$node: document.getElementById('pageMainTabListCustomList'),
				scroll: listScroll,
				data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return {value: 10000 + value + index, mark: Math.random() > 0.7}; }),
				//data: [1,2,3],
				size: 5,
				render: function ( $item, data ) {
					$item.innerHTML = '[' + (data.value) + ']';
				},
				cycle: false,
				events: {
					click: function () {
						//data.event.stop = true;
						//debug.log('click');
						//debug.inspect(data, 1);
					},
					focus: function () {
						//debug.log('focus');
						//debug.inspect(data, 1);
					},
					cycle: function () {
						debug.log('cycle');
					},
					overflow: function () {
						debug.log('overflow');
					},
					'click:item': function ( data ) {
						//debug.log('click:item');
						//debug.inspect(data, 1);

						list2.markItem(data.$item, !data.$item.data.mark);
					},
					'focus:item': function () {
						//debug.log('focus:item');
						//debug.inspect(data, 1);
					},
					'blur:item': function () {
						//debug.log('blur:item');
						//debug.inspect(data, 1);
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
				cycle: true,
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
