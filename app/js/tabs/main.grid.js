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
				},
				cycleX: false,
				cycleY: false
			})
		]
	}),

	new Panel({
		$node: document.getElementById('pageMainTabGridJoin'),
		children: [
			new Grid({
				data: [
					[1, 2, 3, 4, {value: '5;10;15;20', rowSpan: 4}],
					[6, {value: '7-9', colSpan: 3}],
					[{value: '11;12;16;17', rowSpan: 2, colSpan: 2}, 13, 14],
					[18, 19],
					[{value: '21-25', colSpan: 5}],
					[{value: '26-35', colSpan: 5, rowSpan: 2}]
				]
			})
		]
	})
);


// public export
module.exports = panel;
