/**
 * @module stb/navigator
 * @author Oleksandr Yermak <hasmer.jc@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */


'use strict';

var keys = require('./keys'),
    Emitter = require('./emitter');


/**
 * Base navigator implementation.
 *
 * @constructor
 * @extends Emitter
 *
 * @param {Object} [config={}] init parameters
 * @param {Array.<Component[]>} [config.data] Two dimensional array of components
 *
 * @example
 * var Button    = require('stb/ui/button'),
 *     Panel     = require('stb/ui/panel'),
 *     Navigator = require('stb/navigator'),
 *     btnData   = [
 *         [
 *             new Button({value: 'row 1; button 1'}),
 *             new Button({value: 'row 1; button 2'}),
 *             new Button({value: 'row 1; button 3'})
 *         ],
 *         [
 *             new Button({value: 'row 2; button 1'}),
 *             new Button({value: 'row 2; button 2'}),
 *             new Button({value: 'row 2; button 3'})
 *         ]
 *     ],
 *     panel1    = new Panel({children: btnData[0]}),
 *     panel2    = new Panel({children: btnData[1]}),
 *
 *     navigator = new Navigator({data: btnData})
 *
 * // get component with focus
 * var component = navigator.data[navigator.navX][navigator.navY]
 */
function Navigator ( config ) {
    // current execution context
    var self = this,
        btnKeydown = function btnKeydown ( event ) {
            switch ( event.code ) {
                case keys.up:
                    // move up in cycle
                    self.navX = --self.navX >= 0 ? self.navX : self.data.length - 1;
                    // reset Y index
                    self.navY = 0;
                    break;
                case keys.down:
                    // move down in cycle
                    self.navX = ++self.navX < self.data.length ? self.navX : 0;
                    // reset Y index
                    self.navY = 0;
                    break;
                case keys.left:
                    // move left; stop keydown event unless 'left' was pressed on the first component of a row
                    self.navY = --self.navY < 0 ? 0 : (event.stop = true) && self.navY;
                    break;
                case keys.right:
                    // move right in cycle
                    self.navY = ++self.navY < self.data[self.navX].length ? self.navY : 0;
                    break;
                default:
            }
            self.data[self.navX][self.navY].focus();
        },
        i, j, xLen, yLen;

    // sanitize
    config = config || {};

    if ( DEBUG ) {
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
        // init parameters checks
        if ( config.data && !config.data instanceof Array  && !config.data[0] instanceof Array ) { throw new Error(__filename + ': wrong config.data'); }
    }

    /**
     * X coordinate of a component with focus.
     *
     * @type {number}
     */
    this.navX = 0;

    /**
     * Y coordinate of a component with focus.
     *
     * @type {number}
     */
    this.navY = 0;

    /**
     * Component data.
     *
     * @type {Array.<Component[]>}
     */
    this.data = config.data || [[]];

    // add keydown listener for each component in data
    for ( i = 0, xLen = this.data.length; i < xLen; i++ ) {
        for ( j = 0, yLen = this.data[i].length; j < yLen; j++ ) {
            this.data[i][j].addListener('keydown', btnKeydown);
        }
    }

    // all parent constructor
    Emitter.call(this, config.data);
}


// inheritance
Navigator.prototype = Object.create(Emitter.prototype);
Navigator.prototype.constructor = Navigator;


if ( DEBUG ) {
    // expose to the global scope
    window.ComponentNavigator = Navigator;
}


// public
module.exports = Navigator;
