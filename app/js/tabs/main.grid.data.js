/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

module.exports = {
	'table 1x1 with no merge': {
		raw: [
			[1]
		],
		check: [[1]]
	},

	'table 3x3 with no merge': {
		raw: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		],
		check: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]
	},

	'table 3x3 with merge 2x2 #1': {
		raw: [
			[{value: '1;2;4;5', rowSpan: 2, colSpan: 2}, 3],
			[6],
			[7, 8, 9]
		],
		check: [
			['1;2;4;5', '1;2;4;5', 3],
			['1;2;4;5', '1;2;4;5', 6],
			[7,          8,        9]
		]
	},

	'table 3x3 with merge 2x2 #2': {
		raw: [
			[1, {value: '2;3;5;6', rowSpan: 2, colSpan: 2}],
			[4],
			[7, 8, 9]
		],
		check: [
			[1, '2;3;5;6', '2;3;5;6'],
			[4, '2;3;5;6', '2;3;5;6'],
			[7,  8,         9]
		]
	},

	'table 3x3 with merge 2x2 #3': {
		raw: [
			[1, 2, 3],
			[4, {value: '5;6;8;9', rowSpan: 2, colSpan: 2}],
			[7]
		],
		check: [
			[1,  2,         3],
			[4, '5;6;8;9', '5;6;8;9'],
			[7, '5;6;8;9', '5;6;8;9']
		]
	},

	'table 3x3 with merge 2x2 #4': {
		raw: [
			[1, 2, 3],
			[{value: '4;5;7;8', rowSpan: 2, colSpan: 2}, 6],
			[9]
		],
		check: [
			[1,          2,        3],
			['4;5;7;8', '4;5;7;8', 6],
			['4;5;7;8', '4;5;7;8', 9]
		]
	},

	'table 3x3 with merge 3x1 #1': {
		raw: [
			[{value: '1;2;3', colSpan: 3}],
			[4,       5,      6],
			[7,       8,      9]
		],
		check: [
			['1;2;3', '1;2;3', '1;2;3'],
			[4,        5,       6],
			[7,        8,       9]
		]
	},

	'table 3x3 with merge 3x1 #2': {
		raw: [
			[1, 2, 3],
			[{value: '4;5;6', colSpan: 3}],
			[7, 8, 9]
		],
		check: [
			[1,        2,       3],
			['4;5;6', '4;5;6', '4;5;6'],
			[7,        8,       9]
		]
	},

	'table 3x3 with merge 3x1 #3': {
		raw: [
			[1, 2, 3],
			[4, 5, 6],
			[{value: '7;8;9', colSpan: 3}]
		],
		check: [
			[1,        2,       3],
			[4,        5,       6],
			['7;8;9', '7;8;9', '7;8;9']
		]
	},

	'table 3x3 with merge 1x3 #1': {
		raw: [
			[{value: '1;4;7', rowSpan: 3}, 2, 3],
			[5, 6],
			[8, 9]
		],
		check: [
			['1;4;7', 2, 3],
			['1;4;7', 5, 6],
			['1;4;7', 8, 9]
		]
	},

	'table 3x3 with merge 1x3 #2': {
		raw: [
			[1, {value: '2;5;8', rowSpan: 3}, 3],
			[4, 6],
			[7, 9]
		],
		check: [
			[1, '2;5;8', 3],
			[4, '2;5;8', 6],
			[7, '2;5;8', 9]
		]
	},

	'table 3x3 with merge 1x3 #3': {
		raw: [
			[1, 2, {value: '3;6;9', rowSpan: 3}],
			[4, 5],
			[7, 8]
		],
		check: [
			[1, 2, '3;6;9'],
			[4, 5, '3;6;9'],
			[7, 8, '3;6;9']
		]
	},

	'table 2x2 with all merged cells': {
		raw: [
			[{value: '1-4', rowSpan: 2, colSpan: 2}]
		],
		check: [
			['1-4', '1-4'],
			['1-4', '1-4']
		]
	},

	'table 3x3 with all merged cells': {
		raw: [
			[{value: '1-9', rowSpan: 3, colSpan: 3}]
		],
		check: [
			['1-9', '1-9', '1-9'],
			['1-9', '1-9', '1-9'],
			['1-9', '1-9', '1-9']
		]
	},

	'table 3x3 with horizontal stripes #1': {
		raw: [
			[{value: '1;2', colSpan: 2}, 3],
			[4, {value: '5;6', colSpan: 2}],
			[{value: '7;8', colSpan: 2}, 9]
		],
		check: [
			['1;2', '1;2',  3],
			[4,     '5;6', '5;6'],
			['7;8', '7;8',  9]
		]
	},

	'table 3x3 with horizontal stripes #2': {
		raw: [
			[1, {value: '2;3', colSpan: 2}],
			[{value: '4;5', colSpan: 2}, 6],
			[7, {value: '8;9', colSpan: 2}]
		],
		check: [
			[1,     '2;3', '2;3'],
			['4;5', '4;5',  6],
			[7,     '8;9', '8;9']
		]
	},

	'table 3x3 with vertical stripes #1': {
		raw: [
			[{value: '1;4', rowSpan: 2}, 2, {value: '3;6', rowSpan: 2}],
			[{value: '5;8', rowSpan: 2}],
			[7, 9]
		],
		check: [
			['1;4',  2,    '3;6'],
			['1;4', '5;8', '3;6'],
			[7,     '5;8',  9]
		]
	},

	'table 3x3 with vertical stripes #2': {
		raw: [
			[1, {value: '2;5', rowSpan: 2}, 3],
			[{value: '4;7', rowSpan: 2}, {value: '6;9', rowSpan: 2}],
			[8]
		],
		check: [
			[1,     '2;5',  3],
			['4;7', '2;5', '6;9'],
			['4;7',  8,    '6;9']
		]
	},

	'table 3x3 with spiral merge #1': {
		raw: [
			[{value: '1;2', rowSpan: 1, colSpan: 2}, {value: '3;6', rowSpan: 2, colSpan: 1}],
			[{value: '4;7', rowSpan: 2, colSpan: 1}, 5],
			[{value: '8;9', rowSpan: 1, colSpan: 2}]
		],
		check: [
			['1;2', '1;2', '3;6'],
			['4;7',  5,    '3;6'],
			['4;7', '8;9', '8;9']
		]
	},

	'table 3x3 with spiral merge #2': {
		raw: [
			[{value: '1;4', rowSpan: 2, colSpan: 1}, {value: '2;3', rowSpan: 1, colSpan: 2}],
			[5, {value: '6;9', rowSpan: 2, colSpan: 1}],
			[{value: '7;8', rowSpan: 1, colSpan: 2}]
		],
		check: [
			['1;4', '2;3', '2;3'],
			['1;4',  5,    '6;9'],
			['7;8', '7;8', '6;9']
		]
	},

	'table 5x5 with merge #1': {
		raw: [
			[1, 2, 3, 4, 5],
			[6, {value: '7-9', colSpan: 3}, 10],
			[{value: '11;12;16;17', rowSpan: 2, colSpan: 2}, 13, 14, {value: '15;20', rowSpan: 2}],
			[18, 19],
			[{value: '26-30', colSpan: 5}],
			[{value: '31-40', colSpan: 5, rowSpan: 2}]
		],
		check: [
			[1,              2,            3,       4,       5],
			[6,             '7-9',        '7-9',   '7-9',    10],
			['11;12;16;17', '11;12;16;17', 13,      14,     '15;20'],
			['11;12;16;17', '11;12;16;17', 18,      19,     '15;20'],
			['26-30',       '26-30',      '26-30', '26-30', '26-30'],
			['31-40',       '31-40',      '31-40', '31-40', '31-40'],
			['31-40',       '31-40',      '31-40', '31-40', '31-40']
		]
	},

	'table 5x5 with merge #2': {
		raw: [
			[1, 2, 3, 4, {value: '5;10;15;20', rowSpan: 4}],
			[6, {value: '7-9', colSpan: 3}],
			[{value: '11;12;16;17', rowSpan: 2, colSpan: 2}, 13, 14],
			[18, 19],
			[{value: '21-25', colSpan: 5}],
			[{value: '26-35', colSpan: 5, rowSpan: 2}]
		],
		check: [
			[1,              2,            3,       4,      '5;10;15;20'],
			[6,             '7-9',        '7-9',   '7-9',   '5;10;15;20'],
			['11;12;16;17', '11;12;16;17', 13,      14,     '5;10;15;20'],
			['11;12;16;17', '11;12;16;17', 18,      19,     '5;10;15;20'],
			['21-25',       '21-25',      '21-25', '21-25', '21-25'],
			['26-35',       '26-35',      '26-35', '26-35', '26-35'],
			['26-35',       '26-35',      '26-35', '26-35', '26-35']
		]
	},

	'table 4x2 with tricky long columns #1': {
		raw: [
			[{value: '1;3;5', rowSpan: 3}, 2],
			[{value: '4;6;8', rowSpan: 3}],
			[],  // have to be specified
			[7]
		],
		check: [
			['1;3;5',  2],
			['1;3;5', '4;6;8'],
			['1;3;5', '4;6;8'],
			[7,       '4;6;8']
		]
	},

	'table 4x2 with tricky long columns #2': {
		raw: [
			[1, {value: '2;4;6', rowSpan: 3}],
			[{value: '3;5;7', rowSpan: 3}],
			[],  // have to be specified
			[8]
		],
		check: [
			[1,       '2;4;6'],
			['3;5;7', '2;4;6'],
			['3;5;7', '2;4;6'],
			['3;5;7',  8]
		]
	}
};
