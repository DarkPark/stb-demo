/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var TabItem = require('../stb/ui/tab.item'),
	Button = require('../stb/ui/button'),
	LayerList = require('../stb/ui/layer.list.js'),
	LayerItem = require('../stb/ui/layer.item.js'),

	tab = new TabItem({
		$node: window.pageMainTabLayerList
	}),
	layers = [
		new LayerItem(),
		new LayerItem(),
		new LayerItem(),
		new LayerItem(),
		new LayerItem()
	],
	layerAffectedIndex = 0;


tab.title = 'LayerList';


layers.forEach(function ( layer, index ) {
	layer.$body.innerText = 'layer #' + index;
});


tab.add(
	new Button({
		value: 'increment next affected layer index, current: ' + layerAffectedIndex,
		events: {
			click: function () {
				debug.log('click');
				++layerAffectedIndex;
				if ( layerAffectedIndex === layers.length ) {
					layerAffectedIndex = 0;
				}
				this.$text.innerText = 'increment next affected layer index, current: ' + layerAffectedIndex;
			}
		}
	}),
	new Button({
		value: 'set layer to top',
		events: {
			click: function () {
				debug.log('click');

				layers[layerAffectedIndex].moveTop();
			}
		}
	}),
	new Button({
		value: 'set layer to down',
		events: {
			click: function () {
				debug.log('click');

				layers[layerAffectedIndex].moveDown();
			}
		}
	}),
	new Button({
		value: 'up layer',
		events: {
			click: function () {
				debug.log('click');

				layers[layerAffectedIndex].moveUp();
			}
		}
	}),
	new Button({
		value: 'down layer',
		events: {
			click: function () {
				debug.log('click');

				layers[layerAffectedIndex].moveDown();
			}
		}
	}),
	tab.list = new LayerList({
		children: layers
	})
);

(function () {
	var size = 1000;
	var el = document.createElement('div');
	var i = size;
	while ( i > 0 ) {
		el.appendChild(document.createElement('div'));
		el.lastChild.className = 'testBlock t' + ( i % 4);
		el.lastChild.innerHTML = i;
		--i;
	}
	layers[0].$body.innerHTML = '#0<br>' + el.innerHTML;

	el = document.createElement('div');
	i = size;
	while ( i > 0 ) {
		el.appendChild(document.createElement('div'));
		el.lastChild.className = 'testBlock t' + ( (i + 1) % 4);
		el.lastChild.innerHTML = i;
		--i;
	}
	layers[1].$body.innerHTML = '#1<br>' + el.innerHTML;

	el = document.createElement('div');
	i = size;
	while ( i > 0 ) {
		el.appendChild(document.createElement('div'));
		el.lastChild.className = 'testBlock t' + ( (i + 2) % 4);
		el.lastChild.innerHTML = i;
		--i;
	}
	layers[2].$body.innerHTML = '#2<br>' + el.innerHTML;

	el = document.createElement('testBlock');
	i = size;
	while ( i > 0 ) {
		el.appendChild(document.createElement('div'));
		el.lastChild.className = 'testBlock t' + ( (i + 3) % 4);
		el.lastChild.innerHTML = i;
		--i;
	}
	layers[3].$body.innerHTML = '#3<br>' + el.innerHTML;

	el = document.createElement('div');
	i = size;
	while ( i > 0 ) {
		el.appendChild(document.createElement('div'));
		el.lastChild.className = 'testBlock t' + ( (i + 4) % 4);
		el.lastChild.innerHTML = i;
		--i;
	}
	layers[4].$body.innerHTML = '#4<br>' + el.innerHTML;
})();


function hide ( event ) {
	if ( event.prev === tab ) {
		tab.parent.removeListener('item:change', hide);
		tab.list.hide();
	}
}

var time = 1000, current = 0, animations = [
	function () {
		layers[0].show();
		layers[0].moveTop();
		layers[1].moveUp();
		layers[0].hide();
		layers[1].show();

		++current;
		setTimeout(animations[current], time);
	}, function () {
		layers[0].moveUp();
		layers[1].hide();
		layers[0].show();

		++current;
		setTimeout(animations[current], time);
	}, function () {
		layers[2].moveTop();
		layers[0].hide();
		layers[2].show();

		++current;
		setTimeout(animations[current], time);
	}, function () {
		layers[2].$node.style.opacity = '0.5';
		layers[0].show();

		++current;
		setTimeout(animations[current], time);
	}, function () {
		layers[0].$node.style.opacity = '0.5';
		layers[1].show();

		++current;
		setTimeout(animations[current], time);
	}, function () {
		layers[2].$node.style.opacity = '1';
		layers[0].$node.style.opacity = '1';
		layers[2].hide();
		layers[0].hide();

		++current;
		setTimeout(animations[current], time);
	}, function () {
		layers[3].moveUp();
		layers[1].hide();
		layers[3].show();

		++current;
		setTimeout(animations[current], 0);
	}, function () {
		debug.timeEnd('ANIMATION');
	}
];

tab.addListener('activate', function () {
	tab.list.show();
	layers[0].moveTop();

	tab.parent.addListener('item:change', hide);

	debug.time('ANIMATION');
	window.setTimeout(animations[0], 1000);
});


// public
module.exports = tab;
