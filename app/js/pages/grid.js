/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var id     = 'pageGrid',
	node   = document.getElementById(id),
	Page   = require('stb/ui/page'),
	Button = require('stb/ui/button'),
	Panel  = require('stb/ui/panel'),
	Grid   = require('stb/ui/grid'),
	page   = new Page({$node: node}),
	router = require('stb/router'),
	keys   = require('stb/keys');


page.addListener('load', function load () {
	var header, button, body, grid;

	page.add(header = new Panel());

	header.add(
		button = new Button({
			icon: 'back',
			value: 'page Base',
			events: {
				click: function () {
					router.navigate('pageBase');
				}
			}
		})
	);

	button.focus();

	page.add(body = new Panel());

	body.add(grid = new Grid({
		//height: 2,
		//width: 5,
		data: [
			[1, 2, 3, 4, 5],
			[6, {value: '789', colSpan: 3}, 10],
			[{value: '11<br>21', rowSpan: 2}, 12, 13, 14, {value: '15<br>25', rowSpan: 2}],
			[22, 23, 24],
			[{value: '26-30', colSpan: 5}]
		],
		render: function ( $item, data ) {
			$item.innerHTML = '[' + (data) + ']';
		}
	}));

	grid.focus();
});


page.addListener('show', function show ( event ) {
	debug.info(event.data);
});


page.addListener('keydown', function keydown ( event ) {
//	switch ( event.code ) {
//		case keys.ok:
//			require('./base').show();
//			break;
//		case keys.exit:
//			page.hide();
//			break;
//	}
});


// public export
module.exports = page;
