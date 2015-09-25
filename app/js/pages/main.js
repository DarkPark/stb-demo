/**
 * Main page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var List    = require('../stb/ui/list'),
	TabList = require('../stb/ui/tab.list'),
	Page    = require('../stb/ui/page'),
	page    = new Page({$node: window.pageMain});


page.addListener('load', function load () {
	var tabData = [
		require('../tabs/main.panel'),
		require('../tabs/main.button'),
		require('../tabs/main.input'),
		require('../tabs/main.check.box'),
		require('../tabs/main.grid'),
		require('../tabs/main.list'),
		require('../tabs/main.progress.bar'),
		require('../tabs/main.page'),
		require('../tabs/main.modal'),
		require('../tabs/main.widget'),
		require('../tabs/main.layer.list')
	];

	// attach to page
	page.add(
		page.tabList = new TabList({
			$node: window.pageMainTabListContainer,
			children: tabData,
			current: tabData[0]
		})
	);

	page.add(
		page.menu = new List({
			$node: window.pageMainMenu,
			data: tabData,
			focusIndex: 0,
			size: tabData.length,
			cycle: true,
			render: function ( $item, data ) {
				$item.textContent = data.title;
			},
			events: {
				/*click: function ( data ) {
					//console.log('click');
					//data.event.stop = true;
					//debug.inspect(data, 1);
				},
				focus: function ( data ) {
					//console.log('focus');
					//debug.inspect(data, 1);
				},
				'click:item': function ( data ) {
					//console.log('click:item');
					//debug.inspect(data, 1);
				},*/
				'focus:item': function ( event ) {
					tabData[event.$curr.index].show();
				}
				/*'blur:item': function ( data ) {
					//console.log('blur:item');
					//debug.inspect(data, 1);
				}*/
			}
		})
		//page.body = new Panel({$node: document.getElementById('pageMainBody')})
	);

	page.focusable = false;
	//page.addListener('click', function ( data ) {
	//	data.event.stop = true;
	//});
});


page.addListener('show', function show () {
	// initial active component
	if ( !page.activeComponent ) {
		page.menu.focus();
	}

	// time marks examples
	debug.time('test');
	debug.time('test', 1);
	debug.time('test', 2);
	debug.timeEnd('test', 'everything is ready');
});


// public
module.exports = page;
