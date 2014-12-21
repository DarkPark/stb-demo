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
					[ 1,  2,  3,  4],
					[ 5,  6,  7,  8],
					[ 9, 10, 11, 12],
					[13, 14, 15, 16]
				],
				render: function ( $item, data ) {
					$item.innerHTML = '[' + (data) + ']';
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
					[6, {value: '789', colSpan: 3}, 10],
					[{value: '11<br>21', rowSpan: 2}, 12, 13, 14, {value: '15<br>25', rowSpan: 2}],
					[22, 23, 24],
					[{value: '26-30', colSpan: 5}]
				],
				render: function ( $item, data ) {
					$item.innerHTML = '[' + (data) + ']';
				}
			})
		]
	})
);


// public export
module.exports = panel;
