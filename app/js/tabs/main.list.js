/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel     = require('../stb/ui/panel'),
    List      = require('../stb/ui/list'),
    ScrollBar = require('../stb/ui/scroll.bar'),
    TabItem   = require('../stb/ui/tab.item'),
    tabItem   = new TabItem({
        $node: window.pageMainTabList
    }),
    listScrollN = new ScrollBar({
        $node: window.pageMainTabListCustomScrollN,
        viewSize: 5,
        realSize: 4
    }),
    listScrollV = new ScrollBar({
        $node: window.pageMainTabListCustomScrollV,
        viewSize: 5,
        realSize: 25
    }),
    listScrollH = new ScrollBar({
        $node: window.pageMainTabListCustomScrollH,
        type: ScrollBar.prototype.TYPE_HORIZONTAL,
        viewSize: 5,
        realSize: 100
    }),
    list2;


tabItem.title = 'List';


tabItem.add(
    new Panel({
        $node: window.pageMainTabListSimple,
        children: [
            new List({
                $node: window.pageMainTabListSimpleList,
                scroll: listScrollN,
                //data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0)
				// .map(function ( value, index ) { return 10000 + value + index; }),
                data: [1, {value: 2, mark: true}, 3, {value: 44, disable: true}],
                size: 5,
                //render: function ( $item, data ) {
                //    $item.innerHTML = '[' + (data) + ']';
                //},
                cycle: true,
                events: {
                    click: function ( data ) {
                        //data.event.stop = true;
                        debug.log('click');
                        debug.inspect(data, 1);
                    },
                    focus: function ( data ) {
                        debug.log('focus');
                        debug.inspect(data, 1);
                    },
                    cycle: function () {
                        debug.log('cycle');
                    },
                    overflow: function () {
                        debug.log('overflow');
                    },
                    'click:item': function ( data ) {
                        debug.log('click:item');
                        debug.inspect(data, 1);
                    },
                    'focus:item': function ( data ) {
                        debug.log('focus:item');
                        debug.inspect(data, 1);
                    },
                    'blur:item': function ( data ) {
                        debug.log('blur:item');
                        debug.inspect(data, 1);
                    }
                }
            })
        ]
    }),
    new Panel({
        $node: window.pageMainTabListCustom,
        children: [
            list2 = new List({
                $node: window.pageMainTabListCustomList,
                scroll: listScrollV,
                data: Array.apply(null, new Array(25)).map(Number.prototype.valueOf, 0)
					.map(function ( value, index ) { return {value: 10000 + value + index, mark: Math.random() > 0.7}; }),
                //data: [1,2,3],
                viewIndex: 8,
                size: 5,
                render: function ( $item, data ) {
                    $item.innerHTML = '[' + (data.value) + ']';
                },
                cycle: false,
                events: {
                    click: function () {
                        //data.event.stop = true;
                        //debug.log('click');
                        //debug.inspect(data, 1);
                    },
                    focus: function () {
                        //debug.log('focus');
                        //debug.inspect(data, 1);
                    },
                    cycle: function () {
                        debug.log('cycle');
                    },
                    overflow: function () {
                        debug.log('overflow');
                    },
                    'click:item': function ( data ) {
                        //debug.log('click:item');
                        //debug.inspect(data, 1);

                        list2.markItem(data.$item, !data.$item.data.mark);
                    },
                    'focus:item': function () {
                        //debug.log('focus:item');
                        //debug.inspect(data, 1);
                    },
                    'blur:item': function () {
                        //debug.log('blur:item');
                        //debug.inspect(data, 1);
                    }
                }
            })
        ]
    }),
    new Panel({
        $node: window.pageMainTabListHoriz,
        children: [
            new List({
                $node: window.pageMainTabListHList,
                data: Array.apply(null, new Array(100)).map(Number.prototype.valueOf, 0)
					.map(function ( value, index ) { return 'sequence: ' + index + value; }),
                scroll: listScrollH,
                type: List.prototype.TYPE_HORIZONTAL,
                cycle: true,
                events: {
                    overflow: function () {
                        debug.log('overflow');
                    }
                }
            })
        ]
    })


);


tabItem.once('show', function () {
    // TODO: try to fix this hack, we called 'init' because scroll at start has null geometry
    listScrollV.value = 0;
    listScrollV.init({
        value: 8
    });
});


// public
module.exports = tabItem;
