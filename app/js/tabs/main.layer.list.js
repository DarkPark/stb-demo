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

	tabItem = new TabItem({
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

	for ( i = 0; i < tabItem.layerList.children.length; ++i ) {
		order += '<li>' + tabItem.layerList.children[i].$body.innerHTML + ' at ' + (tabItem.layerList.children[i].zIndex - tabItem.layerList.zIndex) + '</li>';
	}

	order += '</ul>';

	return order;
}


tabItem.title = 'LayerList';


layers.forEach(function ( layer, index ) {
	layer.$body.innerHTML = 'layer #' + index;
});

tabItem.add(
	tabItem.input = new Input({
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
				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'set layer to bottom',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveBottom();
				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'up layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveUp();
				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'down layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].moveDown();
				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'hide layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].hide();
				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'show layer',
		events: {
			click: function () {
				layers[layerAffectedIndex].show();
				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	tabItem.layerOrder = new Panel(),
	tabItem.layerList = new LayerList({
		zIndex: 20,
		children: layers
	})
);


//function hide ( event ) {
//	if ( event.prev === tabItem ) {
//		tabItem.parent.removeListener('item:change', hide);
//		tabItem.layerList.hide();
//	}
//}

tabItem.addListener('activate', function () {
	tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
	//tabItem.parent.addListener('item:change', hide);
});

tabItem.input.addListener('keydown', function ( event ) {
	if ( event.code === keys.back ) {
		event.stop = true;
	}
});


// public
module.exports = tabItem;
