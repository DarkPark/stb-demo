/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button  = require('../stb/ui/button'),
    router  = require('../stb/router'),
    TabItem = require('../stb/ui/tab.item'),
    tabItem = new TabItem({
        $node: window.pageMainTabPage
    });


tabItem.title = 'Page';


tabItem.add(
    new Button({
        value: 'switch to page Help',
        events: {
            click: function () {
                router.navigate('pageHelp');
            }
        }
    })
);


// public
module.exports = tabItem;
