/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var keys = require('../stb/keys'),

	TabItem   = require('../stb/ui/tab.item'),
	Button    = require('../stb/ui/button'),
	Input     = require('../stb/ui/input'),
	Panel     = require('../stb/ui/panel'),
	LayerList = require('../stb/ui/layer.list.js'),
	LayerItem = require('../stb/ui/layer.item.js'),

	tab = new TabItem({
		$node: window.pageMainTabLayerList
	}),

	layers = [
		new LayerItem(),
		new LayerItem(),
		new LayerItem()
	],

	layerAffectedIndex = 0;


function parseLayerOrder () {
	var order = 'Layers order: <ul>',
		i;

	for ( i = 0; i < tab.layerList.children.length; ++i ) {
		order += '<li>' + tab.layerList.children[i].$body.innerHTML + ' at ' + (tab.layerList.children[i].zIndex - tab.layerList.zIndex) + '</li>';
	}

	order += '</ul>';

	return order;
}


tab.title = 'LayerList';

layers.forEach(function ( layer, index ) {
	layer.$body.innerHTML = 'layer #' + index;
});

tab.add(
	tab.input = new Input({
		events: {
			input: function ( event ) {
				var value;

				if ( event.value.length === 0 ) {
					value = layerAffectedIndex;
				} else if ( isNaN(Number(event.value)) ) {
					value = parseInt(event.value.substr(3, 1), 10);
				} else if ( event.value.length > 1 ) {
					value = parseInt(event.value.substr(1, 1), 10);
				} else {
					value = parseInt(event.value, 10);
				}

				if ( value < 0 ) {
					this.setValue(layerAffectedIndex + '');
				} else if ( value > layers.length - 1 ) {
					layerAffectedIndex = layers.length - 1;
					this.setValue((layers.length - 1) + '');
				} else {
					layerAffectedIndex = value;
					this.setValue(value + '');
				}
			}
		}
	}),
	new Button({
		value: 'set layer to top',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveTop();
				tab.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'set layer to bottom',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveBottom();
				tab.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'up layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveUp();
				tab.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'down layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveDown();
				tab.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'hide layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].hide();
				tab.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'show layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].show();
				tab.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	tab.layerOrder = new Panel(),
	tab.layerList = new LayerList({
		zIndex: 20,
		children: layers
	})
);


//function hide ( event ) {
//	if ( event.prev === tab ) {
//		tab.parent.removeListener('item:change', hide);
//		tab.layerList.hide();
//	}
//}

tab.addListener('activate', function () {
	tab.layerOrder.$body.innerHTML = parseLayerOrder();
	//tab.parent.addListener('item:change', hide);
});

tab.input.addListener('keydown', function ( event ) {
	if ( event.code === keys.back ) {
		event.stop = true;
	}
});


// public
module.exports = tab;
