/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Panel   = require('../stb/ui/panel'),
    TabItem = require('../stb/ui/tab.item'),
    tabItem = new TabItem({
        $node: window.pageMainTabPanel
    });


tabItem.title = 'Panel';


tabItem.add(
    new Panel({
        $node: window.pageMainTabPanelSimple
    }),
    new Panel({
        $node: window.pageMainTabPanelMulti
    }),
    new Panel({
        $node: window.pageMainTabPanelParent,
        children: [
            new Panel({
                $node: window.pageMainTabPanelChild
            })
        ]
    })
);


// public
module.exports = tabItem;
