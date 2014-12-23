/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var Panel = require('stb/ui/panel'),
	Grid  = require('stb/ui/grid'),
	panel = new Panel({
		$node: document.getElementById('pageMainTabGrid'),
		visible: false
	});


panel.add(
	new Panel({
		$node: document.getElementById('pageMainTabGridSimple'),
		children: [
			new Grid({
				data: [
					[1,   2,  3,  4],
					[5,   6,  7,  8],
					[9,  10, 11, 12],
					[13, 14, 15, {value: 16, focus: true}]
				],
				render: function ( $cell, data ) {
					$cell.innerHTML = '<div>' + (data.value) + '</div>';
				}
			})
		]
	}),

	new Panel({
		$node: document.getElementById('pageMainTabGridJoin'),
		children: [
			new Grid({
				data: [
					[1, 2, 3, 4, 5],
					[6, {value: '7 ... 9', colSpan: 3}, 10],
					[{value: '11\n21', rowSpan: 2}, 12, 13, 14, {value: '15\n25', rowSpan: 2}],
					[22, 23, 24],
					[{value: '26 ... 30', colSpan: 5}]
				]
			})
		]
	})
);


// public export
module.exports = panel;
