/**
 * Tab content.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var Button       = require('../stb/ui/button'),
    ModalBox     = require('../stb/ui/modal.box'),
    ModalMessage = require('../stb/ui/modal.message'),
    TabItem      = require('../stb/ui/tab.item'),
    tabItem      = new TabItem({
        $node: window.pageMainTabModal
    });


tabItem.title = 'Modal';


tabItem.add(
    new Button({
        value: 'show simple modal window',
        events: {
            click: function () {
                tabItem.add(
                    tabItem.modal = new ModalBox({
                        events: {
                            click: function () {
                                console.log(tabItem.modal);
                                tabItem.modal.remove();
                            }
                        }
                    })
                );
                tabItem.modal.$body.innerText = 'This is a simple modal box.\nClick to close.';
                tabItem.modal.focus();
            }
        }
    }),
    new Button({
        value: 'show modal window with a lot of text',
        events: {
            click: function () {
                tabItem.add(
                    tabItem.modal = new ModalBox({
                        events: {
                            click: function () {
                                console.log(tabItem.modal);
                                tabItem.modal.remove();
                            }
                        }
                    })
                );
                tabItem.modal.$body.innerText = new Array(300).join('text ');
                tabItem.modal.focus();
            }
        }
    }),
    new Button({
        value: 'show modal message',
        events: {
            click: function () {
                tabItem.add(
                    tabItem.modal = new ModalMessage({
                        events: {
                            click: function () {
                                console.log(tabItem.modal);
                                tabItem.modal.remove();
                            }
                        }
                    })
                );
                tabItem.modal.focus();
            }
        }
    })
);


// public
module.exports = tabItem;
