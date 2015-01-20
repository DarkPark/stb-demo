/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var id   = 'pageMain',
	List = require('stb/ui/list'),
	Page = require('stb/ui/page'),
	page = new Page({$node: document.getElementById(id)});


page.addListener('load', function load () {
	var menuData = [
			{
				value: 'Panel',
				panel: require('../tabs/main.panel')
			},
			//{
			//	value: 'InfoPanel',
			//	panel: require('../tabs/main.info.panel')
			//},
			{
				value: 'Button',
				panel: require('../tabs/main.button')
			},
			{
				value: 'CheckBox',
				panel: require('../tabs/main.check.box')
			},
			{
				value: 'Grid',
				panel: require('../tabs/main.grid')
			},
			{
				value: 'List',
				panel: require('../tabs/main.list')
			},
			{
				value: 'ProgressBar',
				panel: require('../tabs/main.progress.bar')
			},
			{
				value: 'Page',
				panel: require('../tabs/main.page')
			},
			{
				value: 'Modal',
				panel: require('../tabs/main.modal')
			},
			{
				value: 'Widget',
				panel: require('../tabs/main.widget')
			}
		];

	// attach to page
	menuData.forEach(function ( item ) {
		page.add(item.panel);
	});

	page.add(
		page.menu = new List({
			$node: document.getElementById('pageMainMenu'),
			data: menuData,
			size: 9,
			cycle: true,
			render: function ( $item, data ) {
				$item.textContent = data.value;
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
				'focus:item': function ( data ) {
					//console.log('focus:item');
					//debug.inspect(data, 1);
					if ( data.$prev ) {
						data.$prev.data.panel.hide();
					}
					data.$curr.data.panel.show();
				}
				/*'blur:item': function ( data ) {
					//console.log('blur:item');
					//debug.inspect(data, 1);
				}*/
			}
		})
		//page.body = new Panel({$node: document.getElementById('pageMainBody')})
	);

	page.menu.focusItem(page.menu.$body.firstChild);


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
});


// public export
module.exports = page;
