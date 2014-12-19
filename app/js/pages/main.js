/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var id    = 'pageMain',
	node  = document.getElementById(id),
	Modal = require('stb/ui/modal'),
	ModalBox     = require('stb/ui/modal.box'),
	ModalMessage = require('stb/ui/modal.message'),
	Panel  = require('stb/ui/panel'),
	Button = require('stb/ui/button'),
	CheckBox = require('stb/ui/check.box'),
	ProgressBar = require('stb/ui/progress.bar'),
	List   = require('stb/ui/list'),
	Page   = require('stb/ui/page'),
	page   = new Page({$node: node}),
	router = require('stb/router'),
	keys   = require('stb/keys');


page.addListener('load', function load () {
	var a2 = new Panel({content:'a2'}),
		body = new Panel(),
		m, b1, btnShowHelp, btnShowButton, header, list, pb;

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

	a2.add(new CheckBox());
	a2.add(new CheckBox({value:true}));

	body.add(header = new Panel());
	header.add(list = new List({
		data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 10000 + value + index; }),
		render: function ( $item, data ) {
			$item.innerHTML = '[' + (data) + ']';
		}
	}));
	list.focus();

	body.add(header = new Panel());
	header.add(list = new List({
		data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 'sequence: ' + index + value; }),
		//visible: false,
		type: List.prototype.TYPE_HORIZONTAL
	}));
	//list.focus();

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
});


page.addListener('keydown', function keydown ( event ) {
//	switch ( event.code ) {
//		case keys.ok:
//			router.navigate('pageHelp')
//			break;
//		case 32:
//			//
//			break;
//	}
});


// public export
module.exports = page;
