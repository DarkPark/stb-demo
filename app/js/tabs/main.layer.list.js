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
		new LayerItem({id: 'layer-0'}),
		new LayerItem({id: 'layer-1'}),
		new LayerItem({id: 'layer-2'}),
		new LayerItem({id: 'layer-3'}),
		new LayerItem({id: 'layer-4'}),
		new LayerItem({id: 'layer-5'})
	],

	layerAffectedIndex = 2;


function parseLayerOrder () {
	var order = 'Layers order: <ul>',
		i;

	for ( i = tabItem.layerList.map.length - 1; i >= 0; i-- ) {
		order += '<li>' + tabItem.layerList.map[i].$body.innerHTML + ' <div>(zIndex: ' + (tabItem.layerList.map[i].$node.style.zIndex) + ', visible: ' + (tabItem.layerList.map[i].visible ? 'yes' : 'no') + ')</div></li>';
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
		value: String(layerAffectedIndex),
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
		value: 'move top',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].moveTop();

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	new Button({
		value: 'move bottom',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].moveBottom();

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	new Button({
		value: 'move up',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].moveUp();

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	new Button({
		value: 'move down',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].moveDown();

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	new Button({
		value: 'hide',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].hide();

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	new Button({
		value: 'show',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].show();

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	new Button({
		value: 'add',
		events: {
			click: function () {
				var layerItem = new LayerItem({id: 'layer-' + layers.length});

				layers.push(layerItem);
				tabItem.layerList.add(layerItem);

				layerItem.$body.innerHTML = 'layer #' + (layers.length - 1);

				tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
			}
		}
	}),
	new Button({
		value: 'remove',
		events: {
			click: function () {
				if ( layers[layerAffectedIndex] ) {
					layers[layerAffectedIndex].remove();
					layers[layerAffectedIndex] = null;

					tabItem.layerOrder.$body.innerHTML = parseLayerOrder();
				}
			}
		}
	}),
	tabItem.layerOrder = new Panel(),
	tabItem.layerList = new LayerList({
		children: layers
	})
);


tabItem.addListener('show', function () {
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
