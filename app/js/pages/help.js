/**
 * Page implementation.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var id     = 'pageHelp',
	node   = document.getElementById(id),
	Page   = require('stb/ui/page'),
	Button = require('stb/ui/button'),
	Panel  = require('stb/ui/panel'),
	page   = new Page({$node: node}),
	router = require('stb/router'),
	keys   = require('stb/keys');


page.addListener('show', function load () {
	// initial active component
	//page.back.focus();
});


page.addListener('load', function load () {
	var body = new Panel(),
		header, button;

	page.add(
		page.back = new Button({
			value: 'go back',
			events: {
				click: function () {
					router.navigate('pageMain');
				}
			}
		})
	);

	return;

	page.add(body);

	body.add(new Panel({$node: document.getElementById('pageHelpTitle')}));

	body.add(header = new Panel());



	button.focus();
});


//page.addListener('show', function show ( event ) {
//	debug.info(event.data);
//});


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
