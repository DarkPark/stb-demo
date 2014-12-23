/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var id           = 'pageMain',
	Modal        = require('stb/ui/modal'),
	ModalBox     = require('stb/ui/modal.box'),
	ModalMessage = require('stb/ui/modal.message'),
	Panel        = require('stb/ui/panel'),
	Button       = require('stb/ui/button'),
	CheckBox     = require('stb/ui/check.box'),
	ProgressBar  = require('stb/ui/progress.bar'),
	List         = require('stb/ui/list'),
	Page         = require('stb/ui/page'),
	router       = require('stb/router'),
	keys         = require('stb/keys'),
	page         = new Page({$node: document.getElementById(id)});


page.addListener('load', function load () {
	var a2 = new Panel({content:'a2'}),
		body = new Panel(),
		m, b1, btnShowHelp, btnShowButton, header, listV, listH, pb,
		menuData;

	menuData = [
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
			size: 8,
			render: function ( $item, data ) {
				$item.textContent = data.value;
			},
			events: {
				click: function ( data ) {
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
				},
				'focus:item': function ( data ) {
					//console.log('focus:item');
					//debug.inspect(data, 1);
					if ( data.$prev ) {
						data.$prev.data.panel.hide();
					}
					data.$curr.data.panel.show();
				},
				'blur:item': function ( data ) {
					//console.log('blur:item');
					//debug.inspect(data, 1);
				}
			}
		})
		//page.body = new Panel({$node: document.getElementById('pageMainBody')})
	);

	page.menu.focusItem(page.menu.$body.firstChild);


	page.focusable = false;
	//page.addListener('click', function ( data ) {
	//	data.event.stop = true;
	//});


	return;

	page.add(body);

	body.add(
		new Panel({$node: document.getElementById('pageMainTitle')}),
		header = new Panel({children: []})
	);

	header.add(
		new Button({
			icon: 'menu',
			value: 'page Button',
			events: {
				click: function () {
					router.navigate('pageButton');
				}
			}
		}),
		new Button({
			icon: 'menu',
			value: 'page Grid',
			events: {
				click: function () {
					router.navigate('pageGrid');
				}
			}
		}),
		new Button({
			icon: 'menu',
			value: 'page Help',
			events: {
				click: function () {
					router.navigate('pageHelp');
				}
			}
		})
	);

	//header.add(btnShowHelp = new Button({icon: 'exit', value: 'Show page Help'}));

	//btnShowHelp.addListener('click', function () {
	//	router.navigate('pageHelp');
	//});

	//header.add(btnShowButton = new Button({icon: 'menu', value: 'Show page Button'}));
	//
	//btnShowButton.addListener('click', function () {
	//	router.navigate('pageButton');
	//});

	//btnShowHelp.focus();

	body.add(a2);

	//page.add(new Panel({content:'a3'}));

	body.add(b1 = new Button({content:'b1', value: 'Show modal'}));
	b1.addListener('click', function () {
		debug.log('click: Show modal');
		body.add(b1 = new Button({icon:'small', value: 'Show modal'}));
	});

	b1.focus();

	a2.addListener('keydown', function ( event ) {
		if ( event.code === 49 ) {
			debug.log('Modal');
			m = new Modal();
			body.add(m);
			m.focus();
		}
		if ( event.code === 50 ) {
			debug.log('ModalBox');
			m = new ModalBox();
			body.add(m);
			m.focus();
		}
		if ( event.code === 51 ) {
			debug.log('ModalMessage');
			m = new ModalMessage();
			body.add(m);
			m.focus();
		}

		if ( event.code === 32 ) {
			//a.$node.innerHTML = event.code;
			debug.log('modal open');

			m = new ModalMessage();
			body.add(m);
			m.focus();
			m.addListener('keydown', function ( event ) {
				if ( event.code === 27 ) {
					debug.log('modal close');
					m.remove();
				}
				if ( event.code === 32 ) {
					debug.log('switch pages');
					router.navigate('pageHelp');
				}
			});
		}
	});

	a2.add(new CheckBox({group: 'main', value: false}));
	a2.add(new CheckBox({group: 'main', value: true}));
	a2.add(new CheckBox({group: 'main', value: false}));
	a2.add(new CheckBox({group: 'main', value: false}));

	body.add(header = new Panel());
	header.add(listV = new List({
		//data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 10000 + value + index; }),
		data: [1,2,3],
		size: 4,
		render: function ( $item, data ) {
			$item.innerHTML = '[' + (data) + ']';
		},
		events: {
			click: function ( data ) {
				console.log('click');
				//data.event.stop = true;
				//debug.inspect(data, 1);
			},
			focus: function ( data ) {
				console.log('focus');
				//debug.inspect(data, 1);
			},
			'click:item': function ( data ) {
				console.log('click:item');
				//debug.inspect(data, 1);
			},
			'focus:item': function ( data ) {
				console.log('focus:item');
				//debug.inspect(data, 1);
			},
			'blur:item': function ( data ) {
				console.log('blur:item');
				//debug.inspect(data, 1);
			}
		}
	}));
	listV.focus();
	window.list = listV;

	body.add(header = new Panel());
	header.add(listH = new List({
		data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 'sequence: ' + index + value; }),
		//visible: false,
		type: List.prototype.TYPE_HORIZONTAL
	}));
	//listH.focus();

	body.add(header = new Panel());
	header.add(pb = new ProgressBar({
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
	}));


	window.test2 = function () {
		var i;

		for ( i = 0; i < listV.size; i++ ) {
			console.log(listV.$body.children[i].index);
		}
	};

	window.test1 = function () {
		var $first = listV.$body.firstChild,
			$last  = listV.$body.lastChild,
			count  = 1000000,
			rows = 6,
			i, j, tmp;

		//console.log(listV.$body.children);
		for ( i = 0; i < count; i++ ) {
			for ( j = 0; j < listV.size; j++) {
				//console.log(listV.$body.children[i]);
				listV.defaultRender(listV.$body.children[j], j);
				//listV.$body.children[i].innerText = i;
			}
		}

		/*for ( i = 0; i < count; i++ ) {
			//listV.$body.insertBefore(listV.$body.lastChild, listV.$body.firstChild);
			tmp = listV.$body.firstChild;
			listV.$body.appendChild(tmp);
			listV.defaultRender(tmp, i);

		}*/

		//console.time('time');
		//for ( i = 0; i < count; i++ ) {
		//	//setTimeout(function () {
		//		//listV.focusItem($last);
		//		//listV.focusNext();
        //
		//	for ( j = 0; j < listV.size; j++ ) {
		//		listV.emit('keydown', {code: keys.down});
		//		//tmp = listV.activeItem.getComputedStyle();
		//		listV.$body.offsetHeight;
		//	}
        //
		//	for ( j = 0; j < listV.size; j++ ) {
		//		listV.emit('keydown', {code: keys.up});
		//		//tmp = listV.activeItem.getComputedStyle();
		//		listV.$body.offsetHeight;
		//	}
        //
		//		//setTimeout(function () {
        //
		//		//});
		//		//listV.focusItem($first);
		//		//listV.focusPrev();
        //
		//	//});
		//}
		//console.timeEnd('time');
	};
});


page.addListener('show', function show () {
	// initial active component
	if ( !page.activeComponent ) {
		page.menu.focus();
	}
});


// public export
module.exports = page;
