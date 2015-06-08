/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************************!*\
  !*** ./app/js/stb/develop/main.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Main module to setup development environment.
			 *
			 * @module stb/develop/main
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var app     = __webpack_require__(/*! ../app */ 4),
				storage = __webpack_require__(/*! ./storage */ 7),
				metrics = __webpack_require__(/*! ../../../../config/metrics */ 12);
			
			
			// export to globals for easy debugging
			window.app    = app;
			window.router = __webpack_require__(/*! ../router */ 5);
			
			// set global mode
			app.data.debug = true;
			
			// STB device or emulation?
			app.data.host = (window.gSTB !== undefined);
			
			// platform?
			if ( app.data.host ) {
				// web inspector
				__webpack_require__(/*! ./weinre */ 25);
			}
			
			// apply screen size, position, margins and styles
			app.setScreen(
				metrics[storage.get('screen.height')] ||
				metrics[screen.height] ||
				metrics[720]
			);
			
			
			// additional dev modules
			__webpack_require__(/*! ./shims */ 23);
			__webpack_require__(/*! ./static */ 24);
			__webpack_require__(/*! ./proxy */ 22);
			__webpack_require__(/*! ./events */ 20);
			__webpack_require__(/*! ./debug */ 19);
			
			// the application itself
			__webpack_require__(/*! ../../main */ 15);


/***/ },
/* 1 */
/*!*********************************!*\
  !*** ./app/js/stb/component.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/component
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Emitter = __webpack_require__(/*! ./emitter */ 10),
				router  = __webpack_require__(/*! ./router */ 5),
				counter = 0;
			
			
			/**
			 * Base component implementation.
			 *
			 * Visual element that can handle sub-components.
			 * Each component has a DOM element container $node with a set of classes:
			 * "component" and some specific component class names depending on the hierarchy, for example "page".
			 * Each component has a unique ID given either from $node.id or from data.id. If not given will generate automatically.
			 *
			 * @constructor
			 * @extends Emitter
			 *
			 * @param {Object} [config={}] init parameters
			 * @param {Element} [config.id] component unique identifier (generated if not set)
			 * @param {Element} [config.$node] DOM element/fragment to be a component outer container
			 * @param {Element} [config.$body] DOM element/fragment to be a component inner container (by default is the same as $node)
			 * @param {Element} [config.$content] DOM element/fragment to be appended to the $body
			 * @param {Component} [config.parent] link to the parent component which has this component as a child
			 * @param {Array.<Component>} [config.children=[]] list of components in this component
			 * @param {Object.<string, function>} [config.events={}] list of event callbacks
			 * @param {boolean} [config.visible=true] component initial visibility state flag
			 * @param {boolean} [config.focusable=true] component can accept focus or not
			 *
			 * @fires module:stb/component~Component#click
			 *
			 * @example
			 * var component = new Component({
			 *     $node: document.getElementById(id),
			 *     events: {
			 *         click: function () { ... }
			 *     }
			 * });
			 * component.add( ... );
			 * component.focus();
			 */
			function Component ( config ) {
				// current execution context
				var self = this;
			
				/**
				 * Component visibility state flag.
				 *
				 * @readonly
				 * @type {boolean}
				 */
				this.visible = true;
			
				/**
				 * Component can accept focus or not.
				 *
				 * @type {boolean}
				 */
				this.focusable = true;
			
				/**
				 * DOM outer handle.
				 *
				 * @type {Element}
				 */
				this.$node = null;
			
				/**
				 * DOM inner handle.
				 * In simple cases is the same as $node.
				 *
				 * @type {Element}
				 */
				this.$body = null;
			
				if ( true ) {
					/**
					 * Link to the page owner component.
					 * It can differ from the direct parent.
					 * Should be used only in debug.
					 *
					 * @type {Page}
					 */
					//this.page = null;
				}
			
				/**
				 * Link to the parent component which has this component as a child.
				 *
				 * @type {Component}
				 */
				this.parent = null;
			
				/**
				 * List of all children components.
				 *
				 * @type {Component[]}
				 */
				this.children = [];
			
			
				// sanitize
				config = config || {};
			
				if ( true ) {
					if ( typeof config !== 'object' ) { throw 'wrong config type'; }
				}
			
				// parent init
				Emitter.call(this, config.data);
			
				// outer handle
				if ( config.$node !== undefined ) {
					if ( true ) {
						if ( !(config.$node instanceof Element) ) { throw 'wrong config.$node type'; }
					}
					// apply
					this.$node = config.$node;
				} else {
					// empty div in case nothing is given
					this.$node = document.createElement('div');
				}
			
				// inner handle
				if ( config.$body !== undefined ) {
					if ( true ) {
						if ( !(config.$body instanceof Element) ) { throw 'wrong config.$body type'; }
					}
					// apply
					this.$body = config.$body;
				} else {
					// inner and outer handlers are identical
					this.$body = this.$node;
				}
			
				// inject given content into inner component part
				if ( config.$content !== undefined ) {
					if ( true ) {
						if ( !(config.$content instanceof Element) ) { throw 'wrong config.$content type'; }
					}
					// apply
					this.$body.appendChild(config.$content);
				}
			
				// correct CSS class names
				this.$node.classList.add('component');
			
				// apply hierarchy
				if ( config.parent !== undefined ) {
					if ( true ) {
						if ( !(config.parent instanceof Component) ) { throw 'wrong config.parent type'; }
					}
					// apply
					config.parent.add(this);
				}
			
				// set link to the page owner component
				//if ( config.page !== undefined ) {
				//	if ( DEBUG ) {
				//		if ( !(config.page instanceof Component) ) { throw 'wrong config.page type'; }
				//	}
			    //	// apply
				//	this.page = config.page;
				//}
			
				// apply given visibility
				if ( config.visible === false ) {
					// default state is visible
					this.hide();
				}
			
				// can't accept focus
				if ( config.focusable === false ) {
					this.focusable = false;
				}
			
				// apply given events
				if ( config.events !== undefined ) {
					// no need in assert here (it is done inside the addListeners)
					this.addListeners(config.events);
				}
			
				// apply component id if given, generate otherwise
				this.id = config.id || this.$node.id || 'id' + counter++;
			
				// apply the given children components
				if ( config.children ) {
					if ( true ) {
						if ( !Array.isArray(config.children) ) { throw 'wrong config.children type'; }
					}
					// apply
					this.add.apply(this, config.children);
				}
			
				// component activation by mouse
				this.$node.addEventListener('click', function ( event ) {
					// left mouse button
					if ( event.button === 0 ) {
						// activate if possible
						self.focus();
			
						// there are some listeners
						if ( self.events['click'] !== undefined ) {
							/**
							 * Mouse click event.
							 *
							 * @event module:stb/component~Component#click
							 *
							 * @type {Object}
							 * @property {Event} event click event data
							 */
							self.emit('click', {event: event});
						}
			
						// not prevented
						//if ( !event.stop ) {
						//	// activate if possible
						//	self.focus();
						//}
					}
			
					if ( true ) {
						// middle mouse button
						if ( event.button === 1 ) {
							debug.inspect(self);
							debug.log('this component is now available by window.link');
							window.link = self;
						}
					}
			
					event.stopPropagation();
				});
			
				if ( true ) {
					// expose a link
					this.$node.component = this.$body.component = this;
					this.$node.title = 'component ' + this.constructor.name + '.' + this.id + ' (outer)';
					this.$body.title = 'component ' + this.constructor.name + '.' + this.id + ' (inner)';
				}
			
				// @todo remove or implement
				// navigation by keyboard
				//this.addListener('keydown', this.navigateDefault);
			}
			
			
			// inheritance
			Component.prototype = Object.create(Emitter.prototype);
			Component.prototype.constructor = Component;
			
			
			/**
			 * Default method to move focus according to pressed keys.
			 *
			 * @todo remove or implement
			 *
			 * @param {Event} event generated event source of movement
			 */
			/*Component.prototype.navigateDefault = function ( event ) {
				switch ( event.code ) {
					case keys.up:
					case keys.down:
					case keys.right:
					case keys.left:
						// notify listeners
						this.emit('overflow');
						break;
				}
			};*/
			
			
			/**
			 * Current active method to move focus according to pressed keys.
			 * Can be redefined to provide custom navigation.
			 *
			 * @todo remove or implement
			 *
			 * @type {function}
			 */
			/*Component.prototype.navigate = Component.prototype.navigateDefault;*/
			
			
			/**
			 * Add a new component as a child.
			 *
			 * @param {...Component} [child] variable number of elements to append
			 *
			 * @files Component#add
			 *
			 * @example
			 * panel.add(
			 *     new Button( ... ),
			 *     new Button( ... )
			 * );
			 */
			Component.prototype.add = function ( child ) {
				var i;
			
				// walk through all the given elements
				for ( i = 0; i < arguments.length; i++ ) {
					child = arguments[i];
			
					if ( true ) {
						if ( !(child instanceof Component) ) { throw 'wrong child type'; }
					}
			
					// apply
					this.children.push(child);
					child.parent = this;
			
					//if ( DEBUG ) {
					//	// apply page for this and all children recursively
					//	child.setPage(this.page);
					//}
			
					// correct DOM parent/child connection if necessary
					if ( child.$node !== undefined && child.$node.parentNode === null ) {
						this.$body.appendChild(child.$node);
					}
			
					// there are some listeners
					if ( this.events['add'] !== undefined ) {
						/**
						 * A child component is added.
						 *
						 * @event module:stb/component~Component#add
						 *
						 * @type {Object}
						 * @property {Component} child new component added
						 */
						this.emit('add', {item: child});
					}
			
					debug.log('component ' + this.constructor.name + '.' + this.id + ' new child: ' + child.constructor.name + '.' + child.id);
				}
			};
			
			
			//if ( DEBUG ) {
			//	Component.prototype.setPage = function ( page ) {
			//		this.page = page;
			//
			//		this.children.forEach(function ( child ) {
			//			child.setPage(page);
			//		});
			//	};
			//}
			
			
			/**
			 * Delete this component and clear all associated events.
			 *
			 * @fires module:stb/component~Component#remove
			 */
			Component.prototype.remove = function () {
				var page = router.current;
			
				// really inserted somewhere
				if ( this.parent ) {
					if ( true ) {
						if ( !(this.parent instanceof Component) ) { throw 'wrong this.parent type'; }
					}
			
					// active at the moment
					if ( page.activeComponent === this ) {
						this.blur();
						this.parent.focus();
					}
					this.parent.children.splice(this.parent.children.indexOf(this), 1);
				}
			
				// remove all children
				this.children.forEach(function ( child ) {
					if ( true ) {
						if ( !(child instanceof Component) ) { throw 'wrong child type'; }
					}
			
					child.remove();
				});
			
				this.removeAllListeners();
				this.$node.parentNode.removeChild(this.$node);
			
				// there are some listeners
				if ( this.events['remove'] !== undefined ) {
					/**
					 * Delete this component.
					 *
					 * @event module:stb/component~Component#remove
					 */
					this.emit('remove');
				}
			
				debug.log('component ' + this.constructor.name + '.' + this.id + ' remove', 'red');
			};
			
			
			/**
			 * Activate the component.
			 * Notify the owner-page and apply CSS class.
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/component~Component#focus
			 */
			Component.prototype.focus = function () {
				var activePage = router.current,
					activeItem = activePage.activeComponent;
			
				//if ( DEBUG ) {
				//	if ( this.page !== activePage ) {
				//		console.log(this, this.page, activePage);
				//		throw 'attempt to focus an invisible component';
				//	}
				//}
			
				// this is a visual component on a page
				// not already focused and can accept focus
				if ( this.focusable && this !== activeItem ) {
					// notify the current active component
					if ( activeItem ) { activeItem.blur(); }
			
					/* eslint consistent-this: 0 */
			
					// apply
					activePage.activeComponent = activeItem = this;
					activeItem.$node.classList.add('focus');
			
					// there are some listeners
					if ( activeItem.events['focus'] !== undefined ) {
						/**
						 * Make this component focused.
						 *
						 * @event module:stb/component~Component#focus
						 */
						activeItem.emit('focus');
					}
			
					debug.log('component ' + this.constructor.name + '.' + this.id + ' focus');
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Remove focus.
			 * Change page.activeComponent and notify subscribers.
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/component~Component#blur
			 */
			Component.prototype.blur = function () {
				var activePage = router.current,
					activeItem = activePage.activeComponent;
			
				// this is the active component
				if ( this === activeItem ) {
					this.$node.classList.remove('focus');
					activePage.activeComponent = null;
			
					// there are some listeners
					if ( this.events['blur'] !== undefined ) {
						/**
						 * Remove focus from this component.
						 *
						 * @event module:stb/component~Component#blur
						 */
						this.emit('blur');
					}
			
					debug.log('component ' + this.constructor.name + '.' + this.id + ' blur', 'grey');
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Make the component visible and notify subscribers.
			 *
			 * @param {Object} data custom data which passed into handlers
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/component~Component#show
			 */
			Component.prototype.show = function ( data ) {
				// is it hidden
				if ( !this.visible ) {
					// correct style
					this.$node.classList.remove('hidden');
					// flag
					this.visible = true;
			
					// there are some listeners
					if ( this.events['show'] !== undefined ) {
						/**
						 * Make the component visible.
						 *
						 * @event module:stb/component~Component#show
						 */
						this.emit('show', data);
					}
			
					return true;
				}
			
				// nothing was done
				return true;
			};
			
			
			/**
			 * Make the component hidden and notify subscribers.
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/component~Component#hide
			 */
			Component.prototype.hide = function () {
				// is it visible
				if ( this.visible ) {
					// correct style
					this.$node.classList.add('hidden');
					// flag
					this.visible = false;
			
					// there are some listeners
					if ( this.events['hide'] !== undefined ) {
						/**
						 * Make the component hidden.
						 *
						 * @event module:stb/component~Component#hide
						 */
						this.emit('hide');
					}
			
					return true;
				}
			
				// nothing was done
				return true;
			};
			
			
			// public
			module.exports = Component;


/***/ },
/* 2 */
/*!********************************!*\
  !*** ./app/js/stb/ui/panel.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/panel
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base panel implementation.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 *
			 * @example
			 * var Panel = require('stb/ui/panel'),
			 *     panel = new Panel({
			 *         $node: document.getElementById('someId'),
			 *         children: [
			 *             new Panel({
			 *                 $node: document.getElementById('anotherId')
			 *             })
			 *         ]
			 *     });
			 *
			 * panel.add(
			 *     new Button(),
			 *     new Button(),
			 *     new Button()
			 * );
			 *
			 * page.add(panel);
			 */
			function Panel ( config ) {
				// sanitize
				config = config || {};
			
				// can't accept focus
				config.focusable = config.focusable || false;
			
				// parent init
				Component.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('panel');
			}
			
			
			// inheritance
			Panel.prototype = Object.create(Component.prototype);
			Panel.prototype.constructor = Panel;
			
			
			// public
			module.exports = Panel;


/***/ },
/* 3 */
/*!****************************!*\
  !*** ./app/js/stb/keys.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Global list of non-printable control key codes.
			 *
			 * WARNING!!! All codes in this file (exclude 'volumeUp', 'volumeDown')
			 * uses in window 'keydown' handler to prevent wrong 'keypress' firings.
			 * If u add code into this file, 'keypress' event with this code will never fires.
			 *
			 *  Value | Description
			 * -------|-------------
			 *  +1000 | shift key pressed
			 *  +2000 | alt key pressed
			 *
			 * @module stb/keys
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			
			// public
			module.exports = {
				back         : 8,    // Backspace
				'delete'     : 46,
				channelPrev  : 1009, // Shift+Tab
				channelNext  : 9,    // Tab
				ok           : 13,   // Enter
				exit         : 27,   // Esc
				up           : 38,   // UP ARROW
				down         : 40,   // DOWN ARROW
				left         : 37,   // LEFT ARROW
				right        : 39,   // RIGHT ARROW
				pageUp       : 33,   // Page Up
				pageDown     : 34,   // Page Down
				end          : 35,
				home         : 36,
				volumeUp     : 107,  // NUMPAD +
				volumeDown   : 109,  // NUMPAD -
				f1           : 112,  // F1
				f2           : 113,  // F2
				f3           : 114,  // F3
				f4           : 115,  // F4
				refresh      : 116,  // F5
				frame        : 117,  // F6
				phone        : 119,  // F8
				set          : 120,  // F9
				tv           : 121,  // F10
				menu         : 122,  // F11
				web          : 123,  // F12
				mic          : 2032,
				rewind       : 2066, // Alt+B
				forward      : 2070, // Alt+F
				app          : 2076, // Alt+L
				usbMounted   : 2080, // Alt+P
				usbUnmounted : 2081, // Alt+Q
				playPause    : 2082, // Alt+R
				stop         : 2083, // Alt+S
				power        : 2085, // Alt+U
				record       : 2087, // Alt+W
				info         : 2089, // Alt+Y
				mute         : 2192,
				clock        : 2032,
				audio        : 2071, // Alt+G
				keyboard     : 2076  // Alt+L
			};


/***/ },
/* 4 */
/*!***************************!*\
  !*** ./app/js/stb/app.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/app
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Model    = __webpack_require__(/*! ./model */ 26),
				router   = __webpack_require__(/*! ./router */ 5),
				keys     = __webpack_require__(/*! ./keys */ 3),
				keyCodes = {},
				app, key;
			
			
			__webpack_require__(/*! ./shims */ 28);
			
			
			/**
			 * @instance
			 * @type {Model}
			 */
			app = new Model({
				/**
				 * Enable logging and debugging flag set by debug module at runtime.
				 *
				 * @type {boolean}
				 */
				debug: false,
			
				/**
				 * True if executed on the STB device, set by debug module at runtime.
				 *
				 * @type {boolean}
				 */
				host: true,
			
				/**
				 * Screen geometry and margins.
				 *
				 * @type {Object}
				 * @property {number} height Total screen height
				 * @property {number} width Total screen width
				 * @property {number} availTop top safe zone margin
				 * @property {number} availRight right safe zone margin
				 * @property {number} availBottom bottom safe zone margin
				 * @property {number} availLeft left safe zone margin
				 * @property {number} availHeight safe zone height
				 * @property {number} availWidth safe zone width
				 */
				screen: null,
			
				/**
				 * Timestamps data.
				 *
				 * @type {Object}
				 * @property {number} init application initialization time (right now)
				 * @property {number} load document onload event
				 * @property {number} done onload event sent and processed
				 */
				time: {
					init: +new Date(),
					load: 0,
					done: 0
				}
			});
			
			
			/**
			 * Set crops, total, content size and link the corresponding CSS file.
			 *
			 * @param {Object} metrics screen params specific to resolution
			 *
			 * @return {boolean} operation status
			 */
			app.setScreen = function ( metrics ) {
				var linkCSS;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
				}
			
				if ( metrics ) {
					if ( true ) {
						if ( typeof metrics !== 'object' ) { throw 'wrong metrics type'; }
					}
			
					// calculate and extend
					metrics.availHeight = metrics.height - (metrics.availTop + metrics.availBottom);
					metrics.availWidth  = metrics.width - (metrics.availLeft + metrics.availRight);
			
					// set max browser window size
					window.moveTo(0, 0);
					window.resizeTo(metrics.width, metrics.height);
			
					// get the link tag
					linkCSS = document.querySelector('link[rel=stylesheet]');
			
					// already was initialized
					if ( linkCSS && linkCSS instanceof HTMLLinkElement ) {
						// remove all current CSS styles
						document.head.removeChild(linkCSS);
					}
			
					// load CSS file base on resolution
					linkCSS = document.createElement('link');
					linkCSS.rel  = 'stylesheet';
					linkCSS.href = 'css/' + (true ? 'develop.' : 'release.') + metrics.height + '.css';
					document.head.appendChild(linkCSS);
			
					// provide global access
					this.data.screen = metrics;
			
					return true;
				}
			
				// nothing has applied
				return false;
			};
			
			// define events constants
			
			/**
			 * The player reached the end of the media content or detected a discontinuity of the stream
			 *
			 * @const {number} EVENT_END_OF_FILE
			 * @default 1
			 */
			app.EVENT_END_OF_FILE = 1;
			
			/**
			 * Information on audio and video tracks of the media content is received. It's now possible to call gSTB.GetAudioPIDs etc.
			 *
			 * @const {number} EVENT_GET_MEDIA_INFO
			 * @default 2
			 */
			app.EVENT_GET_MEDIA_INFO = 2;
			
			/**
			 * Video and/or audio playback has begun
			 *
			 * @const {number} EVENT_PLAYBACK_BEGIN
			 * @default 4
			 */
			app.EVENT_PLAYBACK_BEGIN = 4;
			
			/**
			 * Error when opening the content: content not found on the server or connection with the server was rejected
			 *
			 * @const {number} EVENT_CONTENT_ERROR
			 * @default 5
			 */
			app.EVENT_CONTENT_ERROR = 5;
			
			/**
			 * Detected DualMono AC-3 sound
			 *
			 * @const {number} EVENT_DUAL_MONO_DETECT
			 * @default 6
			 */
			app.EVENT_DUAL_MONO_DETECT = 6;
			
			/**
			 * The decoder has received info about the content and started to play. It's now possible to call gSTB.GetVideoInfo
			 *
			 * @const {number} EVENT_INFO_GET
			 * @default 7
			 */
			app.EVENT_INFO_GET = 7;
			
			/**
			 * Error occurred while loading external subtitles
			 *
			 * @const {number} EVENT_SUBTITLE_LOAD_ERROR
			 * @default 8
			 */
			app.EVENT_SUBTITLE_LOAD_ERROR = 8;
			
			/**
			 * Found new teletext subtitles in stream
			 *
			 * @const {number} EVENT_SUBTITLE_FIND
			 * @default 9
			 */
			app.EVENT_SUBTITLE_FIND = 9;
			
			/**
			 * HDMI device has been connected
			 *
			 * @const {number} EVENT_HDMI_CONNECT
			 * @default 32
			 */
			app.EVENT_HDMI_CONNECT = 32;
			
			/**
			 * HDMI device has been disconnected
			 *
			 * @const {number} EVENT_HDMI_DISCONNECT
			 * @default 33
			 */
			app.EVENT_HDMI_DISCONNECT = 33;
			
			/**
			 * Recording task has been finished successfully. See Appendix 13. JavaScript API for PVR subsystem
			 *
			 * @const {number} EVENT_RECORD_FINISH_SUCCESSFULL
			 * @default 34
			 */
			app.EVENT_RECORD_FINISH_SUCCESSFULL = 34;
			
			/**
			 * Recording task has been finished with error. See Appendix 13. JavaScript API for PVR subsystem
			 *
			 * @const {number} EVENT_RECORD_FINISH_ERROR
			 * @default 35
			 */
			app.EVENT_RECORD_FINISH_ERROR = 35;
			
			/**
			 * Scanning DVB Channel in progress
			 *
			 * @const {number} EVENT_DVB_SCANING
			 * @default 40
			 */
			app.EVENT_DVB_SCANING = 40;
			
			/**
			 * Scanning DVB Channel found
			 *
			 * @const {number} EVENT_DVB_FOUND
			 * @default 41
			 */
			app.EVENT_DVB_FOUND = 41;
			
			/**
			 * DVB Channel EPG update
			 *
			 * @const {number} EVENT_DVB_CHANELL_EPG_UPDATE
			 * @default 42
			 */
			app.EVENT_DVB_CHANELL_EPG_UPDATE = 42;
			
			/**
			 * DVB antenna power off
			 *
			 * @const {number} EVENT_DVB_ANTENNA_OFF
			 * @default 43
			 */
			app.EVENT_DVB_ANTENNA_OFF = 43;
			
			
			// apply screen size, position and margins
			app.setScreen(__webpack_require__(/*! ../../../config/metrics */ 12)[screen.height]);
			
			// extract key codes
			for ( key in keys ) {
				if ( key === 'volumeUp' || key === 'volumeDown' ) {
					continue;
				}
				// no need to save key names
				keyCodes[keys[key]] = true;
			}
			
			/**
			 * The load event is fired when a resource and its dependent resources have finished loading.
			 *
			 * Control flow:
			 *   1. Global handler.
			 *   2. Each page handler.
			 *   3. Application DONE event.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/load
			 *
			 * @param {Event} event generated object with event data
			 */
			window.addEventListener('load', function globalEventListenerLoad ( event ) {
				var path;
			
				debug.event(event);
			
				// time mark
				app.data.time.load = event.timeStamp;
			
				// global handler
				// there are some listeners
				if ( app.events[event.type] !== undefined ) {
					// notify listeners
					app.emit(event.type, event);
				}
			
				// local handler on each page
				router.pages.forEach(function forEachPages ( page ) {
					debug.log('component ' + page.constructor.name + '.' + page.id + ' load', 'green');
			
					// there are some listeners
					if ( page.events[event.type] !== undefined ) {
						// notify listeners
						page.emit(event.type, event);
					}
				});
			
				// go to the given page if set
				if ( location.hash ) {
					path = router.parse(location.hash);
					router.navigate(path.name, path.data);
				}
			
				// time mark
				app.data.time.done = +new Date();
			
				// everything is ready
				// and there are some listeners
				if ( app.events['done'] !== undefined ) {
					// notify listeners
					app.emit('done', event);
				}
			});
			
			
			/**
			 * The unload event is fired when the document or a child resource is being unloaded.
			 *
			 * Control flow:
			 *   1. Each page handler.
			 *   2. Global handler.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/unload
			 *
			 * @param {Event} event generated object with event data
			 */
			window.addEventListener('unload', function globalEventListenerUnload ( event ) {
				debug.event(event);
			
				// global handler
				// there are some listeners
				if ( app.events[event.type] !== undefined ) {
					// notify listeners
					app.emit(event.type, event);
				}
			
				// local handler on each page
				router.pages.forEach(function forEachPages ( page ) {
					// there are some listeners
					if ( page.events[event.type] !== undefined ) {
						// notify listeners
						page.emit(event.type, event);
					}
				});
			});
			
			
			///**
			// * The hashchange event is fired when the fragment identifier of the URL has changed (the part of the URL that follows the # symbol, including the # symbol).
			// * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/hashchange
			// */
			//window.addEventListener('hashchange', function globalEventListenerHashChange ( event ) {
			//	//var page, data;
			//
			//	console.log(event);
			//	router.emit('change');
			//
			//	//debug.event(event);
			//	//debug.inspect(event);
			//    //
			//	//app.emit(event.type, event);
			//
			//	//app.parseHash();
			//
			////	data = document.location.hash.split('/');
			////
			////	// the page is given
			////	if ( data.length > 0 && (page = decodeURIComponent(data.shift().slice(1))) ) {
			////		// the page params are given
			////		if ( data.length > 0 ) {
			////			data = data.map(decodeURIComponent);
			////		}
			////
			////		app.emit(event.type, {page: page, data: data});
			////	}
			//});
			
			
			/**
			 * The error event is fired when a resource failed to load.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/error
			 *
			 * @param {Event} event generated object with event data
			 */
			window.addEventListener('error', function globalEventListenerError ( event ) {
				debug.event(event);
			});
			
			
			/**
			 * The keydown event is fired when a key is pressed down.
			 * Set event.stop to true in order to prevent bubbling.
			 *
			 * Control flow:
			 *   1. Current active component on the active page.
			 *   2. Current active page itself.
			 *   3. Application.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keydown
			 *
			 * @param {Event} event generated object with event data
			 */
			window.addEventListener('keydown', function globalEventListenerKeydown ( event ) {
				var page = router.current;
			
				if ( true ) {
					if ( page === null || page === undefined ) { throw 'app should have at least one page'; }
				}
			
				// filter phantoms
				if ( event.keyCode === 0 ) { return; }
			
				// combined key code
				event.code = event.keyCode;
			
				// apply key modifiers
				if ( event.shiftKey ) { event.code += 1000; }
				if ( event.altKey )   { event.code += 2000; }
			
				debug.event(event);
			
				// current component handler
				if ( page.activeComponent && page.activeComponent !== page ) {
					// component is available and not page itself
					if ( page.activeComponent.events[event.type] !== undefined ) {
						// there are some listeners
						page.activeComponent.emit(event.type, event);
					}
				}
			
				// page handler
				if ( !event.stop ) {
					// not prevented
					if ( page.events[event.type] !== undefined ) {
						// there are some listeners
						page.emit(event.type, event);
					}
				}
			
				// global app handler
				if ( !event.stop ) {
					// not prevented
					if ( app.events[event.type] !== undefined ) {
						// there are some listeners
						app.emit(event.type, event);
					}
				}
			
				// suppress non-printable keys in stb device (not in your browser)
				if ( app.data.host && keyCodes[event.code] ) {
					event.preventDefault();
				}
			});
			
			
			/**
			 * The keypress event is fired when press a printable character.
			 * Delivers the event only to activeComponent at active page.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keypress
			 *
			 * @param {Event} event generated object with event data
			 * @param {string} event.char entered character
			 */
			window.addEventListener('keypress', function globalEventListenerKeypress ( event ) {
				var page = router.current;
			
				if ( true ) {
					if ( page === null || page === undefined ) { throw 'app should have at least one page'; }
				}
			
				//debug.event(event);
			
				// current component handler
				if ( page.activeComponent && page.activeComponent !== page ) {
					// component is available and not page itself
					if ( page.activeComponent.events[event.type] !== undefined ) {
						// there are some listeners
						page.activeComponent.emit(event.type, event);
					}
				}
			});
			
			
			/**
			 * The click event is fired when a pointing device button (usually a mouse button) is pressed and released on a single element.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
			 *
			 * @param {Event} event generated object with event data
			 */
			window.addEventListener('click', function globalEventListenerClick ( event ) {
				debug.event(event);
			});
			
			
			/**
			 * The contextmenu event is fired when the right button of the mouse is clicked (before the context menu is displayed),
			 * or when the context menu key is pressed (in which case the context menu is displayed at the bottom left of the focused
			 * element, unless the element is a tree, in which case the context menu is displayed at the bottom left of the current row).
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/contextmenu
			 *
			 * @param {Event} event generated object with event data
			 */
			window.addEventListener('contextmenu', function globalEventListenerContextmenu ( event ) {
				//var kbEvent = {}; //Object.create(document.createEvent('KeyboardEvent'));
			
				debug.event(event);
			
				//kbEvent.type    = 'keydown';
				//kbEvent.keyCode = 8;
			
				//debug.log(kbEvent.type);
			
				//globalEventListenerKeydown(kbEvent);
				//var event = document.createEvent('KeyboardEvent');
				//event.initEvent('keydown', true, true);
			
				//document.dispatchEvent(kbEvent);
			
				if ( false ) {
					// disable right click in release mode
					event.preventDefault();
				}
			});
			
			
			///**
			// * The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated.
			// * @see https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel
			// */
			//window.addEventListener('wheel', function globalEventListenerWheel ( event ) {
			//	var page = router.current;
			//
			//	debug.event(event);
			//
			//	event.preventDefault();
			//	event.stopPropagation();
			//
			//	// local handler
			//	if ( page ) {
			//		if ( page.activeComponent && page.activeComponent !== page ) {
			//			page.activeComponent.emit(event.type, event);
			//		}
			//
			//		if ( !event.stop ) {
			//			// not prevented
			//			page.emit(event.type, event);
			//		}
			//	}
			//});
			
			
			// Creating stbEvent instance
			window.stbEvent = {};
			
			
			/**
			 * Device media events.
			 *
			 * @event module:stb/app#media
			 * @type object
			 * @property {number} code of event
			 */
			
			
			/**
			 * Event on messages from a window.
			 *
			 * @event module:stb/app#message
			 * @type object
			 * @property {boolean} broadcast message flag
			 * @property {string} message received from window
			 * @property {object} data received from window
			 */
			
			
			/**
			 * Fires stb device media events.
			 *
			 * @param {number} event code
			 */
			window.stbEvent.onEvent = function ( event ) {
				app.emit('media', {code: parseInt(event, 10)});
			};
			
			
			/**
			 * Fires event on broadcast messages from a window.
			 *
			 * @param {number} windowId that sent message
			 * @param {string} message text
			 * @param {object} data in sent message
			 * @fires module:/stb/app#message
			 */
			window.stbEvent.onBroadcastMessage = function ( windowId, message, data ) {
				app.emit('message', {
					broadcast: true,
					windowId: windowId,
					message: message,
					data: data
				});
			};
			
			
			/**
			 * Fires event on messages from a window.
			 *
			 * @param {number} windowId that sent message
			 * @param {string} message text
			 * @param {object} data in sent message
			 * @fires module:/stb/app#message
			 */
			window.stbEvent.onMessage = function ( windowId, message, data ) {
				app.emit('message', {
					broadcast: false,
					windowId: windowId,
					message: message,
					data: data
				});
			};
			
			
			/**
			 * Event on device mount state.
			 *
			 * @event module:stb/app#mount
			 * @type object
			 * @property {boolean} state of mount device
			 */
			
			
			/**
			 * Fires device mount state event.
			 *
			 * @param {boolean} state of mount device
			 * @fires module:/stb/app#mount
			 */
			window.stbEvent.onMount = function ( state ) {
				app.emit('device:mount', {state: state});
			};
			
			
			/**
			 * Event on callback on internet browser link clicked.
			 *
			 * @event module:stb/app#media:available
			 */
			
			
			/**
			 * Fires event of callback on internet browser link clicked to ask user what to do with link: play or download.
			 *
			 * @fires module:/stb/app#media:available
			 */
			window.stbEvent.onMediaAvailable = function () {
				app.emit('media:available');
			};
			
			
			/**
			 * Event on internet connection state.
			 *
			 * @event module:stb/app#internet:state
			 * @type object
			 * @property {boolean} state of internet connection
			 */
			
			
			/**
			 * Fires new internet connection state event.
			 *
			 * @param {boolean} state of internet connection
			 * @fires module:/stb/app#internet:state
			 */
			window.stbEvent.onNetworkStateChange = function ( state ) {
				app.emit('internet:state', {state: state});
			};
			
			
			/**
			 * Event on document loading progress changes.
			 *
			 * @event module:stb/app#browser:progress
			 * @type object
			 * @property {number} progress of document loading
			 */
			
			
			/**
			 * Fires document loading progress changes event.
			 *
			 * @param {number} progress of document loading
			 * fires module:/stb/app#browser:progress
			 */
			window.stbEvent.onWebBrowserProgress = function ( progress ) {
				app.emit('browser:progress', {progress: progress});
			};
			
			
			/**
			 * Event on browser web window activation event.
			 *
			 * @event module:stb/app#window:focus
			 */
			
			
			/**
			 * Fires browser web window activation event.
			 *
			 * fires module:/stb/app#window:focus
			 */
			window.stbEvent.onWindowActivated = function () {
				app.emit('window:focus');
			};
			
			
			// new way of string handling
			// all strings are in UTF-16
			// since stbapp 2.18
			if ( window.gSTB && gSTB.SetNativeStringMode ) {
				/* eslint new-cap: 0 */
			
				gSTB.SetNativeStringMode(true);
			}
			
			
			// public
			module.exports = app;


/***/ },
/* 5 */
/*!******************************!*\
  !*** ./app/js/stb/router.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Singleton for page navigation with history.
			 *
			 * All page modules should be in the directory `app/js/pages`.
			 * Page module name and the corresponding file name should be the same.
			 *
			 * Include module to start working:
			 *
			 * ```js
			 * var router = require('stb/router');
			 * ```
			 *
			 * Init with page modules:
			 *
			 * ```js
			 * router.data([
			 *     require('./pages/init'),
			 *     require('./pages/main'),
			 *     require('./pages/help')
			 * ]);
			 * ```
			 *
			 * Each page has its ID. The same ID should be used in HTML.
			 *
			 * Make some page active/visible by its ID:
			 *
			 * ```js
			 * router.navigate('pageMain');
			 * ```
			 *
			 * This will hide the current page, activate the `pageMain` page and put it in the tail of the history list.
			 *
			 * All subscribers of the current and `pageMain` page will be notified with `show/hide` events.
			 *
			 * Also the router emits `navigate` event to all subscribers.
			 *
			 *
			 * To get to the previous active page use:
			 *
			 * ```js
			 * router.back();
			 * ```
			 *
			 * The module also has methods to parse location hash address and serialize it back:
			 *
			 * ```js
			 * router.parse('#pageMain/some/additional/data');
			 * router.stringify('pageMain', ['some', 'additional', 'data']);
			 * ```
			 *
			 * Direct modification of the URL address should be avoided.
			 * The methods `router.navigate` and `router.back` should be used instead.
			 *
			 * @module stb/router
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Emitter = __webpack_require__(/*! ./emitter */ 10),
				router;
			
			
			/**
			 * @instance
			 * @type {Emitter}
			 */
			router = new Emitter();
			
			
			/**
			 * Current active/visible page.
			 *
			 * @readonly
			 * @type {Page}
			 */
			router.current = null;
			
			
			/**
			 * List of all visited pages.
			 *
			 * @readonly
			 * @type {Page[]}
			 */
			router.history = [];
			
			
			/**
			 * List of all stored pages.
			 *
			 * @readonly
			 * @type {Page[]}
			 */
			router.pages = [];
			
			
			/**
			 * Hash table of all pages ids with links to pages.
			 *
			 * @readonly
			 * @type {Object.<string, Page>}
			 */
			router.ids = {};
			
			
			/**
			 * Set router data event.
			 *
			 * @event module:stb/router#init
			 *
			 * @type {Object}
			 * @property {Page[]} pages new page list
			 */
			
			/**
			 * Clear and fill the router with the given list of pages.
			 *
			 * @param {Page[]} pages list of pages to add
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/router#init
			 */
			router.init = function ( pages ) {
				var i, l, item;
			
				if ( pages !== undefined ) {
					if ( true ) {
						if ( !Array.isArray(pages) ) { throw 'wrong pages type'; }
					}
			
					// reset page list
					this.pages = [];
			
					// apply list
					this.pages = pages;
			
					// extract ids
					for ( i = 0, l = pages.length; i < l; i++ ) {
						item = pages[i];
						this.ids[item.id] = item;
			
						// find the currently active page
						if ( item.active ) {
							this.current = item;
						}
					}
			
					// there are some listeners
					if ( this.events['init'] !== undefined ) {
						// notify listeners
						this.emit('init', {pages: pages});
					}
			
					return true;
				}
			
				return false;
			};
			
			
			/**
			 * Extract the page name and data from url hash.
			 *
			 * @param {string} hash address hash part to parse
			 *
			 * @return {{name: string, data: string[]}} parsed data
			 *
			 * @example
			 * router.parse('#main/some/additional/data');
			 * // execution result
			 * {name: 'main', data: ['some', 'additional', 'data']}
			 */
			router.parse = function ( hash ) {
				var page = {
						name : '',
						data : []
					};
			
				// get and decode all parts
				page.data = hash.split('/').map(decodeURIComponent);
				// the first part is a page id
				// everything else is optional path
				page.name = page.data.shift().slice(1);
			
				return page;
			};
			
			
			/**
			 * Convert the given page name and its data to url hash.
			 *
			 * @param {string} name page name
			 * @param {string[]} [data=[]] page additional parameters
			 *
			 * @return {string} url hash
			 *
			 * @example
			 * router.stringify('main', ['some', 'additional', 'data']);
			 * // execution result
			 * '#main/some/additional/data'
			 */
			router.stringify = function ( name, data ) {
				// validation
				data = Array.isArray(data) ? data : [];
			
				// encode all parts
				name = encodeURIComponent(name);
				data = data.map(encodeURIComponent);
				// add encoded name to the beginning
				data.unshift(name);
			
				// build an uri
				return data.join('/');
			};
			
			
			/**
			 * Make the given inactive/hidden page active/visible.
			 * Pass some data to the page and trigger the corresponding event.
			 *
			 * @param {Page} page item to show
			 * @param {*} [data] data to send to page
			 *
			 * @return {boolean} operation status
			 */
			router.show = function ( page, data ) {
				// page available and can be hidden
				if ( page && !page.active ) {
					// apply visibility
					page.$node.classList.add('active');
					page.active  = true;
					this.current = page;
			
					// there are some listeners
					if ( page.events['show'] !== undefined ) {
						// notify listeners
						page.emit('show', {page: page, data: data});
					}
			
					debug.log('component ' + page.constructor.name + '.' + page.id + ' show', 'green');
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Make the given active/visible page inactive/hidden and trigger the corresponding event.
			 *
			 * @param {Page} page item to hide
			 *
			 * @return {boolean} operation status
			 */
			router.hide = function ( page ) {
				// page available and can be hidden
				if ( page && page.active ) {
					// apply visibility
					page.$node.classList.remove('active');
					page.active  = false;
					this.current = null;
			
					// there are some listeners
					if ( page.events['hide'] !== undefined ) {
						// notify listeners
						page.emit('hide', {page: page});
					}
			
					debug.log('component ' + page.constructor.name + '.' + page.id + ' hide', 'grey');
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Browse to a page with the given name.
			 * Do nothing if the name is invalid. Otherwise hide the current, show new and update history.
			 *
			 * @param {string} name page id
			 * @param {Array} [data] options to pass to the page on show
			 *
			 * @return {boolean} operation status
			 */
			router.navigate = function ( name, data ) {
				var pageFrom = this.current,
					pageTo   = this.ids[name];
			
				if ( true ) {
					if ( router.pages.length > 0 ) {
						if ( !pageTo || typeof pageTo !== 'object' ) { throw 'wrong pageTo type'; }
						if ( !('active' in pageTo) ) { throw 'missing field "active" in pageTo'; }
					}
				}
			
				// valid not already active page
				if ( pageTo && !pageTo.active ) {
					debug.log('router.navigate: ' + name, pageTo === pageFrom ? 'grey' : 'green');
			
					// update url
					location.hash = this.stringify(name, data);
			
					// apply visibility
					this.hide(this.current);
					this.show(pageTo, data);
			
					// there are some listeners
					if ( this.events['navigate'] !== undefined ) {
						// notify listeners
						this.emit('navigate', {from: pageFrom, to: pageTo});
					}
			
					// store
					this.history.push(pageTo);
			
					return true;
				}
			
				debug.log('router.navigate: ' + name, 'red');
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Go back one step in the history.
			 * If there is no previous page, does nothing.
			 *
			 * @return {boolean} operation status
			 */
			router.back = function () {
				var pageFrom, pageTo;
			
				debug.log('router.back', this.history.length > 1 ? 'green' : 'red');
			
				// there are some pages in the history
				if ( this.history.length > 1 ) {
					// remove the current
					pageFrom = this.history.pop();
			
					// new tail
					pageTo = this.history[this.history.length - 1];
			
					// valid not already active page
					if ( pageTo && !pageTo.active ) {
						// update url
						location.hash = pageTo.id;
			
						// apply visibility
						this.hide(this.current);
						this.show(pageTo);
			
						// there are some listeners
						if ( this.events['navigate'] !== undefined ) {
							// notify listeners
							this.emit('navigate', {from: pageFrom, to: pageTo});
						}
			
						return true;
					}
				}
			
				// nothing was done
				return false;
			};
			
			
			// public
			module.exports = router;


/***/ },
/* 6 */
/*!*********************************!*\
  !*** ./app/js/stb/ui/button.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/button
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base button implementation.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 * @param {string} [config.value] button caption text (generated if not set)
			 * @param {string} [config.icon=false] button icon name
			 *
			 * @example
			 * var Button = require('stb/ui/button'),
			 *     button = new Button({
			 *         $node: document.getElementById(id),
			 *         icon: 'menu'
			 *         value: 'Apply changes'
			 *     });
			 */
			function Button ( config ) {
				// current execution context
				var self = this;
			
				// sanitize
				config = config || {};
			
				// parent init
				Component.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('button');
			
				// not a custom content
				if ( this.$node === this.$body ) {
					// so everything should be prepared here
			
					if ( config.icon ) {
						if ( true ) {
							if ( typeof config.icon !== 'string' || config.icon.length === 0 ) { throw 'wrong or empty config.icon'; }
						}
			
						// insert icon
						this.$icon = this.$node.appendChild(document.createElement('div'));
						this.$icon.className = 'icon ' + config.icon;
					}
			
					if ( config.value !== undefined ) {
						if ( true ) {
							if ( typeof config.value !== 'string' || config.value.length === 0 ) { throw 'wrong or empty config.value'; }
						}
			
						// insert caption placeholder
						this.$body = this.$node.appendChild(document.createElement('div'));
						this.$body.classList.add('text');
						// fill it
						this.$body.innerText = config.value;
					}
				}
			
				this.addListener('keydown', function ( event ) {
					if ( event.code === 13 ) {
						// there are some listeners
						if ( self.events['click'] !== undefined ) {
							/**
							 * Mouse click event emulation.
							 *
							 * @event module:stb/ui/button~Button#click
							 *
							 * @type {Object}
							 * @property {Event} event click event data
							 */
							self.emit('click', {event: event});
						}
					}
				});
			
				this.addListener('click', function () {
					//console.log(this);
					self.$node.classList.add('click');
					setTimeout(function () {
						self.$node.classList.remove('click');
					}, 200);
				});
			}
			
			
			// inheritance
			Button.prototype = Object.create(Component.prototype);
			Button.prototype.constructor = Button;
			
			
			// public
			module.exports = Button;


/***/ },
/* 7 */
/*!***************************************!*\
  !*** ./app/js/stb/develop/storage.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Save/restore data depending on the execution device.
			 *
			 * @module stb/develop/storage
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var data = __webpack_require__(/*! ../app */ 4).data;
			
			
			// public
			module.exports = {
				get: function ( name ) {
					var value;
			
					if ( data.host ) {
						value = stbStorage.getItem(name);
					} else {
						value = localStorage.getItem(name);
					}
			
					return value ? JSON.parse(value) : null;
				},
			
				set: function ( name, value ) {
					value = JSON.stringify(value);
			
					if ( data.host ) {
						stbStorage.setItem(name, value);
					} else {
						localStorage.setItem(name, value);
					}
				}
			};


/***/ },
/* 8 */
/*!***********************************************************!*\
  !*** ./~/gulp-webpack/~/node-libs-browser/~/util/util.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
			//
			// Permission is hereby granted, free of charge, to any person obtaining a
			// copy of this software and associated documentation files (the
			// "Software"), to deal in the Software without restriction, including
			// without limitation the rights to use, copy, modify, merge, publish,
			// distribute, sublicense, and/or sell copies of the Software, and to permit
			// persons to whom the Software is furnished to do so, subject to the
			// following conditions:
			//
			// The above copyright notice and this permission notice shall be included
			// in all copies or substantial portions of the Software.
			//
			// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
			// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
			// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
			// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
			// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
			// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
			// USE OR OTHER DEALINGS IN THE SOFTWARE.
			
			var formatRegExp = /%[sdj%]/g;
			exports.format = function(f) {
			  if (!isString(f)) {
			    var objects = [];
			    for (var i = 0; i < arguments.length; i++) {
			      objects.push(inspect(arguments[i]));
			    }
			    return objects.join(' ');
			  }
			
			  var i = 1;
			  var args = arguments;
			  var len = args.length;
			  var str = String(f).replace(formatRegExp, function(x) {
			    if (x === '%%') return '%';
			    if (i >= len) return x;
			    switch (x) {
			      case '%s': return String(args[i++]);
			      case '%d': return Number(args[i++]);
			      case '%j':
			        try {
			          return JSON.stringify(args[i++]);
			        } catch (_) {
			          return '[Circular]';
			        }
			      default:
			        return x;
			    }
			  });
			  for (var x = args[i]; i < len; x = args[++i]) {
			    if (isNull(x) || !isObject(x)) {
			      str += ' ' + x;
			    } else {
			      str += ' ' + inspect(x);
			    }
			  }
			  return str;
			};
			
			
			// Mark that a method should not be used.
			// Returns a modified function which warns once by default.
			// If --no-deprecation is set, then it is a no-op.
			exports.deprecate = function(fn, msg) {
			  // Allow for deprecating things in the process of starting up.
			  if (isUndefined(global.process)) {
			    return function() {
			      return exports.deprecate(fn, msg).apply(this, arguments);
			    };
			  }
			
			  if (process.noDeprecation === true) {
			    return fn;
			  }
			
			  var warned = false;
			  function deprecated() {
			    if (!warned) {
			      if (process.throwDeprecation) {
			        throw new Error(msg);
			      } else if (process.traceDeprecation) {
			        console.trace(msg);
			      } else {
			        console.error(msg);
			      }
			      warned = true;
			    }
			    return fn.apply(this, arguments);
			  }
			
			  return deprecated;
			};
			
			
			var debugs = {};
			var debugEnviron;
			exports.debuglog = function(set) {
			  if (isUndefined(debugEnviron))
			    debugEnviron = process.env.NODE_DEBUG || '';
			  set = set.toUpperCase();
			  if (!debugs[set]) {
			    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
			      var pid = process.pid;
			      debugs[set] = function() {
			        var msg = exports.format.apply(exports, arguments);
			        console.error('%s %d: %s', set, pid, msg);
			      };
			    } else {
			      debugs[set] = function() {};
			    }
			  }
			  return debugs[set];
			};
			
			
			/**
			 * Echos the value of a value. Trys to print the value out
			 * in the best way possible given the different types.
			 *
			 * @param {Object} obj The object to print out.
			 * @param {Object} opts Optional options object that alters the output.
			 */
			/* legacy: obj, showHidden, depth, colors*/
			function inspect(obj, opts) {
			  // default options
			  var ctx = {
			    seen: [],
			    stylize: stylizeNoColor
			  };
			  // legacy...
			  if (arguments.length >= 3) ctx.depth = arguments[2];
			  if (arguments.length >= 4) ctx.colors = arguments[3];
			  if (isBoolean(opts)) {
			    // legacy...
			    ctx.showHidden = opts;
			  } else if (opts) {
			    // got an "options" object
			    exports._extend(ctx, opts);
			  }
			  // set default options
			  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
			  if (isUndefined(ctx.depth)) ctx.depth = 2;
			  if (isUndefined(ctx.colors)) ctx.colors = false;
			  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
			  if (ctx.colors) ctx.stylize = stylizeWithColor;
			  return formatValue(ctx, obj, ctx.depth);
			}
			exports.inspect = inspect;
			
			
			// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
			inspect.colors = {
			  'bold' : [1, 22],
			  'italic' : [3, 23],
			  'underline' : [4, 24],
			  'inverse' : [7, 27],
			  'white' : [37, 39],
			  'grey' : [90, 39],
			  'black' : [30, 39],
			  'blue' : [34, 39],
			  'cyan' : [36, 39],
			  'green' : [32, 39],
			  'magenta' : [35, 39],
			  'red' : [31, 39],
			  'yellow' : [33, 39]
			};
			
			// Don't use 'blue' not visible on cmd.exe
			inspect.styles = {
			  'special': 'cyan',
			  'number': 'yellow',
			  'boolean': 'yellow',
			  'undefined': 'grey',
			  'null': 'bold',
			  'string': 'green',
			  'date': 'magenta',
			  // "name": intentionally not styling
			  'regexp': 'red'
			};
			
			
			function stylizeWithColor(str, styleType) {
			  var style = inspect.styles[styleType];
			
			  if (style) {
			    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
			           '\u001b[' + inspect.colors[style][1] + 'm';
			  } else {
			    return str;
			  }
			}
			
			
			function stylizeNoColor(str, styleType) {
			  return str;
			}
			
			
			function arrayToHash(array) {
			  var hash = {};
			
			  array.forEach(function(val, idx) {
			    hash[val] = true;
			  });
			
			  return hash;
			}
			
			
			function formatValue(ctx, value, recurseTimes) {
			  // Provide a hook for user-specified inspect functions.
			  // Check that value is an object with an inspect function on it
			  if (ctx.customInspect &&
			      value &&
			      isFunction(value.inspect) &&
			      // Filter out the util module, it's inspect function is special
			      value.inspect !== exports.inspect &&
			      // Also filter out any prototype objects using the circular check.
			      !(value.constructor && value.constructor.prototype === value)) {
			    var ret = value.inspect(recurseTimes, ctx);
			    if (!isString(ret)) {
			      ret = formatValue(ctx, ret, recurseTimes);
			    }
			    return ret;
			  }
			
			  // Primitive types cannot have properties
			  var primitive = formatPrimitive(ctx, value);
			  if (primitive) {
			    return primitive;
			  }
			
			  // Look up the keys of the object.
			  var keys = Object.keys(value);
			  var visibleKeys = arrayToHash(keys);
			
			  if (ctx.showHidden) {
			    keys = Object.getOwnPropertyNames(value);
			  }
			
			  // IE doesn't make error fields non-enumerable
			  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
			  if (isError(value)
			      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
			    return formatError(value);
			  }
			
			  // Some type of object without properties can be shortcutted.
			  if (keys.length === 0) {
			    if (isFunction(value)) {
			      var name = value.name ? ': ' + value.name : '';
			      return ctx.stylize('[Function' + name + ']', 'special');
			    }
			    if (isRegExp(value)) {
			      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
			    }
			    if (isDate(value)) {
			      return ctx.stylize(Date.prototype.toString.call(value), 'date');
			    }
			    if (isError(value)) {
			      return formatError(value);
			    }
			  }
			
			  var base = '', array = false, braces = ['{', '}'];
			
			  // Make Array say that they are Array
			  if (isArray(value)) {
			    array = true;
			    braces = ['[', ']'];
			  }
			
			  // Make functions say that they are functions
			  if (isFunction(value)) {
			    var n = value.name ? ': ' + value.name : '';
			    base = ' [Function' + n + ']';
			  }
			
			  // Make RegExps say that they are RegExps
			  if (isRegExp(value)) {
			    base = ' ' + RegExp.prototype.toString.call(value);
			  }
			
			  // Make dates with properties first say the date
			  if (isDate(value)) {
			    base = ' ' + Date.prototype.toUTCString.call(value);
			  }
			
			  // Make error with message first say the error
			  if (isError(value)) {
			    base = ' ' + formatError(value);
			  }
			
			  if (keys.length === 0 && (!array || value.length == 0)) {
			    return braces[0] + base + braces[1];
			  }
			
			  if (recurseTimes < 0) {
			    if (isRegExp(value)) {
			      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
			    } else {
			      return ctx.stylize('[Object]', 'special');
			    }
			  }
			
			  ctx.seen.push(value);
			
			  var output;
			  if (array) {
			    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
			  } else {
			    output = keys.map(function(key) {
			      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
			    });
			  }
			
			  ctx.seen.pop();
			
			  return reduceToSingleString(output, base, braces);
			}
			
			
			function formatPrimitive(ctx, value) {
			  if (isUndefined(value))
			    return ctx.stylize('undefined', 'undefined');
			  if (isString(value)) {
			    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
			                                             .replace(/'/g, "\\'")
			                                             .replace(/\\"/g, '"') + '\'';
			    return ctx.stylize(simple, 'string');
			  }
			  if (isNumber(value))
			    return ctx.stylize('' + value, 'number');
			  if (isBoolean(value))
			    return ctx.stylize('' + value, 'boolean');
			  // For some reason typeof null is "object", so special case here.
			  if (isNull(value))
			    return ctx.stylize('null', 'null');
			}
			
			
			function formatError(value) {
			  return '[' + Error.prototype.toString.call(value) + ']';
			}
			
			
			function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
			  var output = [];
			  for (var i = 0, l = value.length; i < l; ++i) {
			    if (hasOwnProperty(value, String(i))) {
			      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
			          String(i), true));
			    } else {
			      output.push('');
			    }
			  }
			  keys.forEach(function(key) {
			    if (!key.match(/^\d+$/)) {
			      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
			          key, true));
			    }
			  });
			  return output;
			}
			
			
			function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
			  var name, str, desc;
			  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
			  if (desc.get) {
			    if (desc.set) {
			      str = ctx.stylize('[Getter/Setter]', 'special');
			    } else {
			      str = ctx.stylize('[Getter]', 'special');
			    }
			  } else {
			    if (desc.set) {
			      str = ctx.stylize('[Setter]', 'special');
			    }
			  }
			  if (!hasOwnProperty(visibleKeys, key)) {
			    name = '[' + key + ']';
			  }
			  if (!str) {
			    if (ctx.seen.indexOf(desc.value) < 0) {
			      if (isNull(recurseTimes)) {
			        str = formatValue(ctx, desc.value, null);
			      } else {
			        str = formatValue(ctx, desc.value, recurseTimes - 1);
			      }
			      if (str.indexOf('\n') > -1) {
			        if (array) {
			          str = str.split('\n').map(function(line) {
			            return '  ' + line;
			          }).join('\n').substr(2);
			        } else {
			          str = '\n' + str.split('\n').map(function(line) {
			            return '   ' + line;
			          }).join('\n');
			        }
			      }
			    } else {
			      str = ctx.stylize('[Circular]', 'special');
			    }
			  }
			  if (isUndefined(name)) {
			    if (array && key.match(/^\d+$/)) {
			      return str;
			    }
			    name = JSON.stringify('' + key);
			    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
			      name = name.substr(1, name.length - 2);
			      name = ctx.stylize(name, 'name');
			    } else {
			      name = name.replace(/'/g, "\\'")
			                 .replace(/\\"/g, '"')
			                 .replace(/(^"|"$)/g, "'");
			      name = ctx.stylize(name, 'string');
			    }
			  }
			
			  return name + ': ' + str;
			}
			
			
			function reduceToSingleString(output, base, braces) {
			  var numLinesEst = 0;
			  var length = output.reduce(function(prev, cur) {
			    numLinesEst++;
			    if (cur.indexOf('\n') >= 0) numLinesEst++;
			    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
			  }, 0);
			
			  if (length > 60) {
			    return braces[0] +
			           (base === '' ? '' : base + '\n ') +
			           ' ' +
			           output.join(',\n  ') +
			           ' ' +
			           braces[1];
			  }
			
			  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
			}
			
			
			// NOTE: These type checking functions intentionally don't use `instanceof`
			// because it is fragile and can be easily faked with `Object.create()`.
			function isArray(ar) {
			  return Array.isArray(ar);
			}
			exports.isArray = isArray;
			
			function isBoolean(arg) {
			  return typeof arg === 'boolean';
			}
			exports.isBoolean = isBoolean;
			
			function isNull(arg) {
			  return arg === null;
			}
			exports.isNull = isNull;
			
			function isNullOrUndefined(arg) {
			  return arg == null;
			}
			exports.isNullOrUndefined = isNullOrUndefined;
			
			function isNumber(arg) {
			  return typeof arg === 'number';
			}
			exports.isNumber = isNumber;
			
			function isString(arg) {
			  return typeof arg === 'string';
			}
			exports.isString = isString;
			
			function isSymbol(arg) {
			  return typeof arg === 'symbol';
			}
			exports.isSymbol = isSymbol;
			
			function isUndefined(arg) {
			  return arg === void 0;
			}
			exports.isUndefined = isUndefined;
			
			function isRegExp(re) {
			  return isObject(re) && objectToString(re) === '[object RegExp]';
			}
			exports.isRegExp = isRegExp;
			
			function isObject(arg) {
			  return typeof arg === 'object' && arg !== null;
			}
			exports.isObject = isObject;
			
			function isDate(d) {
			  return isObject(d) && objectToString(d) === '[object Date]';
			}
			exports.isDate = isDate;
			
			function isError(e) {
			  return isObject(e) &&
			      (objectToString(e) === '[object Error]' || e instanceof Error);
			}
			exports.isError = isError;
			
			function isFunction(arg) {
			  return typeof arg === 'function';
			}
			exports.isFunction = isFunction;
			
			function isPrimitive(arg) {
			  return arg === null ||
			         typeof arg === 'boolean' ||
			         typeof arg === 'number' ||
			         typeof arg === 'string' ||
			         typeof arg === 'symbol' ||  // ES6 symbol
			         typeof arg === 'undefined';
			}
			exports.isPrimitive = isPrimitive;
			
			exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ 56);
			
			function objectToString(o) {
			  return Object.prototype.toString.call(o);
			}
			
			
			function pad(n) {
			  return n < 10 ? '0' + n.toString(10) : n.toString(10);
			}
			
			
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
			              'Oct', 'Nov', 'Dec'];
			
			// 26 Feb 16:19:34
			function timestamp() {
			  var d = new Date();
			  var time = [pad(d.getHours()),
			              pad(d.getMinutes()),
			              pad(d.getSeconds())].join(':');
			  return [d.getDate(), months[d.getMonth()], time].join(' ');
			}
			
			
			// log is just a thin wrapper to console.log that prepends a timestamp
			exports.log = function() {
			  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
			};
			
			
			/**
			 * Inherit the prototype methods from one constructor into another.
			 *
			 * The Function.prototype.inherits from lang.js rewritten as a standalone
			 * function (not on Function.prototype). NOTE: If this file is to be loaded
			 * during bootstrapping this function needs to be rewritten using some native
			 * functions as prototype setup using normal JavaScript does not work as
			 * expected during bootstrapping (see mirror.js in r114903).
			 *
			 * @param {function} ctor Constructor function which needs to inherit the
			 *     prototype.
			 * @param {function} superCtor Constructor function to inherit prototype from.
			 */
			exports.inherits = __webpack_require__(/*! inherits */ 55);
			
			exports._extend = function(origin, add) {
			  // Don't do anything if add isn't an object
			  if (!add || !isObject(add)) return origin;
			
			  var keys = Object.keys(add);
			  var i = keys.length;
			  while (i--) {
			    origin[keys[i]] = add[keys[i]];
			  }
			  return origin;
			};
			
			function hasOwnProperty(obj, prop) {
			  return Object.prototype.hasOwnProperty.call(obj, prop);
			}
			
			/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/gulp-webpack/~/node-libs-browser/~/process/browser.js */ 54)))

/***/ },
/* 9 */
/*!***************************!*\
  !*** ./app/js/stb/dom.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * HTML elements low-level handling.
			 *
			 * @module stb/dom
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/* eslint no-unused-vars: 0 */
			
			/**
			 * DOM manipulation module
			 */
			var dom = {};
			
			
			/**
			 * Create a new HTML element.
			 *
			 * @param {string} tagName mandatory tag name
			 * @param {Object|null} [attrList] element attributes
			 * @param {...*} [content] element content (primitive value/values or other nodes)
			 * @return {Node|null} HTML element or null on failure
			 *
			 * @example
			 * dom.tag('table');
			 * dom.tag('div', {}, 'some text');
			 * dom.tag('div', {className:'top'}, dom.tag('span'), dom.tag('br'));
			 * dom.tag('link', {rel:'stylesheet', type:'text/css', href:'http://some.url/'});
			 */
			dom.tag = function ( tagName, attrList, content ) {
				var node = null,
					i, name;
			
				// minimal param is given
				if ( tagName ) {
					// empty element
					node = document.createElement(tagName);
			
					// optional attribute list is given
					if ( attrList && typeof attrList === 'object' ) {
						for ( name in attrList ) {
							// extend a new node with the given attributes
							node[name] = attrList[name];
						}
					}
			
					// content (arguments except the first two)
					for ( i = 2; i < arguments.length; i++ ) {
						// some data is given
						if ( arguments[i] ) {
							// regular HTML tag or plain data
							node.appendChild(
								typeof arguments[i] === 'object' ?
								arguments[i] :
								document.createTextNode(arguments[i])
							);
						}
					}
			
				}
			
				return node;
			};
			
			
			/**
			 * Create a new DocumentFragment filled with the given non-empty elements if any.
			 *
			 * @param {...*} [node] fragment content (primitive value/values or other nodes)
			 * @return {DocumentFragment} new placeholder
			 *
			 * @example
			 * // gives an empty fragment element
			 * dom.fragment();
			 * // gives a fragment element with 3 div element inside
			 * dom.fragment(dom.tag('div'), div2, div3);
			 * // mixed case
			 * dom.fragment('some text', 123, div3);
			 */
			dom.fragment = function ( node ) {
				// prepare placeholder
				var i, fragment = document.createDocumentFragment();
			
				// walk through all the given elements
				for ( i = 0; i < arguments.length; i++ ) {
					node = arguments[i];
					// some data is given
					if ( node ) {
						// regular HTML tag or plain data
						fragment.appendChild(typeof node === 'object' ? node : document.createTextNode(node));
					}
				}
			
				return fragment;
			};
			
			
			/**
			 * Add the given non-empty data (HTML element/text or list) to the destination element.
			 *
			 * @param {Node} tagDst element to receive children
			 * @param {...*} [content] element content (primitive value/values or other nodes)
			 * @return {Node|null} the destination element - owner of all added data
			 *
			 * @example
			 * // simple text value
			 * add(some_div, 'Hello world');
			 * // single DOM Element
			 * add(some_div, some_other_div);
			 * // DOM Element list
			 * add(some_div, div1, div2, div3);
			 * // mixed case
			 * add(some_div, div1, 'hello', 'world');
			 */
			dom.add = function ( tagDst, content ) {
				var i;
			
				// valid HTML tag as the destination
				if ( tagDst instanceof Node ) {
					// append all except the first one
					for ( i = 1; i < arguments.length; i++ ) {
						// some data is given
						if ( arguments[i] ) {
							// regular HTML tag or plain data
							tagDst.appendChild(
								typeof arguments[i] === 'object' ?
								arguments[i] :
								document.createTextNode(arguments[i])
							);
						}
					}
					return tagDst;
				}
			
				return null;
			};
			
			
			/**
			 * Remove the given elements from the DOM.
			 *
			 * @param {...Node} [nodes] element to be removed
			 * @return {boolean} operation status (true - all given elements removed)
			 *
			 * @example
			 * dom.remove(document.querySelector('div.test'));
			 * dom.remove(div1, div2, div3);
			 */
			dom.remove = function ( nodes ) {
				var count = 0,  // amount of successfully removed nodes
					i;
			
				// walk through all the given elements
				for ( i = 0; i < arguments.length; i++ ) {
					// valid non-empty tag
					if ( arguments[i] && arguments[i].parentNode ) {
						if ( arguments[i].parentNode.removeChild(arguments[i]) === arguments[i] ) {
							count++;
						}
					}
				}
			
				return arguments.length > 0 && count === arguments.length;
			};
			
			
			// public
			module.exports = dom;


/***/ },
/* 10 */
/*!*******************************!*\
  !*** ./app/js/stb/emitter.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/emitter
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			
			/**
			 * Base Events Emitter implementation.
			 *
			 * @see http://nodejs.org/api/events.html
			 * @constructor
			 */
			function Emitter () {
				/**
				 * Inner hash table for event names and linked callbacks.
				 * Manual editing should be avoided.
				 *
				 * @member {Object.<string, function[]>}
				 *
				 * @example
				 * {
				 *     click: [
				 *         function click1 () { ... },
				 *         function click2 () { ... }
				 *     ],
				 *     keydown: [
				 *         function () { ... }
				 *     ]
				 * }
				 **/
				this.events = {};
			}
			
			
			Emitter.prototype = {
				/**
				 * Bind an event to the given callback function.
				 * The same callback function can be added multiple times for the same event name.
				 *
				 * @param {string} name event identifier
				 * @param {function} callback function to call on this event
				 *
				 * @example
				 * var obj = new Emitter();
				 * obj.addListener('click', function ( data ) { ... });
				 * // one more click handler
				 * obj.addListener('click', function ( data ) { ... });
				 */
				addListener: function ( name, callback ) {
					if ( true ) {
						if ( arguments.length !== 2 ) { throw 'wrong arguments number'; }
						if ( typeof name !== 'string' || name.length === 0 ) { throw 'wrong or empty name'; }
						if ( typeof callback !== 'function' ) { throw 'wrong callback type'; }
					}
			
					// initialization may be required
					this.events[name] = this.events[name] || [];
					// append this new event to the list
					this.events[name].push(callback);
				},
			
			
				/**
				 * Add a one time listener for the event.
				 * This listener is invoked only the next time the event is fired, after which it is removed.
				 *
				 * @param {string} name event identifier
				 * @param {function} callback function to call on this event
				 */
				once: function ( name, callback ) {
					// current execution context
					var self = this;
			
					if ( true ) {
						if ( arguments.length !== 2 ) { throw 'wrong arguments number'; }
						if ( typeof name !== 'string' || name.length === 0 ) { throw 'wrong or empty name'; }
						if ( typeof callback !== 'function' ) { throw 'wrong callback type'; }
					}
			
					// initialization may be required
					this.events[name] = this.events[name] || [];
					// append this new event to the list
					this.events[name].push(function onceWrapper ( data ) {
						callback(data);
						self.removeListener(name, onceWrapper);
					});
				},
			
			
				/**
				 * Apply multiple listeners at once.
				 *
				 * @param {Object} callbacks event names with callbacks
				 *
				 * @example
				 * var obj = new Emitter();
				 * obj.addListeners({click: function ( data ) {}, close: function ( data ) {}});
				 */
				addListeners: function ( callbacks ) {
					var name;
			
					if ( true ) {
						if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
						if ( typeof callbacks !== 'object' ) { throw 'wrong callbacks type'; }
						if ( Object.keys(callbacks).length === 0 ) { throw 'no callbacks given'; }
					}
			
					// valid input
					if ( typeof callbacks === 'object' ) {
						for ( name in callbacks ) {
							if ( callbacks.hasOwnProperty(name) ) {
								this.addListener(name, callbacks[name]);
							}
						}
					}
				},
			
			
				/**
				 * Remove all instances of the given callback.
				 *
				 * @param {string} name event identifier
				 * @param {function} callback function to remove
				 *
				 * @example
				 * obj.removeListener('click', func1);
				 */
				removeListener: function ( name, callback ) {
					if ( true ) {
						if ( arguments.length !== 2 ) { throw 'wrong arguments number'; }
						if ( typeof name !== 'string' || name.length === 0 ) { throw 'wrong or empty name'; }
						if ( typeof callback !== 'function' ) { throw 'wrong callback type'; }
						if ( this.events[name] && !Array.isArray(this.events[name]) ) { throw 'corrupted inner data'; }
					}
			
					// the event exists and should have some callbacks
					if ( this.events[name] !== undefined ) {
						// rework the callback list to exclude the given one
						this.events[name] = this.events[name].filter(function callbacksFilter ( fn ) { return fn !== callback; });
						// event has no more callbacks so clean it
						if ( this.events[name].length === 0 ) {
							// as if there were no listeners at all
							this.events[name] = undefined;
						}
					}
				},
			
			
				/**
				 * Remove all callbacks for the given event name.
				 * Without event name clears all events.
				 *
				 * @param {string} [name] event identifier
				 *
				 * @example
				 * obj.removeAllListeners('click');
				 * obj.removeAllListeners();
				 */
				removeAllListeners: function ( name ) {
					if ( true ) {
						if ( arguments.length !== 0 && (typeof name !== 'string' || name.length === 0) ) { throw 'wrong or empty name'; }
					}
			
					// check input
					if ( arguments.length === 0 ) {
						// no arguments so remove everything
						this.events = {};
					} else if ( name ) {
						if ( true ) {
							if ( this.events[name] !== undefined ) { throw 'event is not removed'; }
						}
			
						// only name is given so remove all callbacks for the given event
						// but object structure modification should be avoided
						this.events[name] = undefined;
					}
				},
			
			
				/**
				 * Execute each of the listeners in the given order with the supplied arguments.
				 *
				 * @param {string} name event identifier
				 * @param {Object} [data] options to send
				 *
				 * @todo consider use context
				 *
				 * @example
				 * obj.emit('init');
				 * obj.emit('click', {src:panel1, dst:panel2});
				 *
				 * // it's a good idea to emit event only when there are some listeners
				 * if ( this.events['click'] !== undefined ) {
				 *     this.emit('click', {event: event});
				 * }
				 */
				emit: function ( name, data ) {
					var event = this.events[name],
						i;
			
					if ( true ) {
						if ( arguments.length < 1 ) { throw 'wrong arguments number'; }
						if ( typeof name !== 'string' || name.length === 0 ) { throw 'wrong or empty name'; }
					}
			
					// the event exists and should have some callbacks
					if ( event !== undefined ) {
						if ( true ) {
							if ( !Array.isArray(event) ) { throw 'wrong event type'; }
						}
			
						for ( i = 0; i < event.length; i++ ) {
							if ( true ) {
								if ( typeof event[i] !== 'function' ) { throw 'wrong event callback type'; }
							}
			
							// invoke the callback with parameters
							// http://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/6
							event[i].call(this, data);
						}
					}
				}
			};
			
			
			// public
			module.exports = Emitter;


/***/ },
/* 11 */
/*!*******************************!*\
  !*** ./app/js/stb/ui/page.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Page is the main component to build user interface.
			 * Page is an area filling the whole screen.
			 * There can be only one active page visible at the same time.
			 *
			 * Active/visible state of a page is managed by the `router` module.
			 *
			 * A page can contain other components.
			 *
			 * @module stb/ui/page
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base page implementation.
			 *
			 * A full-screen top-level layer that can operate as an independent separate entity.
			 * It is added to the document body on creation if not already linked.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 *
			 * @example
			 * var Page = require('stb/ui/page'),
			 *     page = new Page({
			 *         $node: document.getElementById(id)
			 *     });
			 *
			 * page.addListener('show', function show () {
			 *     // page is visible now
			 * });
			 */
			function Page ( config ) {
				/**
				 * Page visibility/active state flag.
				 *
				 * @readonly
				 * @type {boolean}
				 */
				this.active = false;
			
				/**
				 * Link to the currently active component with focus.
				 *
				 * @readonly
				 * @type {Component}
				 */
				this.activeComponent = null;
			
				// sanitize
				config = config || {};
			
				// parent init
				Component.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('page');
			
				// state flag
				this.active = this.$node.classList.contains('active');
			
				// correct DOM parent/child connection if necessary
				if ( this.$node.parentNode === null ) {
					document.body.appendChild(this.$node);
				}
			
				// always itself
				this.page = this;
			}
			
			
			// inheritance
			Page.prototype = Object.create(Component.prototype);
			Page.prototype.constructor = Page;
			
			
			// public
			module.exports = Page;


/***/ },
/* 12 */
/*!***************************!*\
  !*** ./config/metrics.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Application geometry options for js/less.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			// public
			module.exports = {
				480 : {
					// screen base dimension
					height: 480,
					width : 720,
					// safe zone margins
					availTop   : 24,
					availBottom: 24,
					availRight : 32,
					availLeft  : 48
				},
			
				576 : {
					// screen base dimension
					height: 576,
					width : 720,
					// safe zone margins
					availTop   : 24,
					availBottom: 24,
					availRight : 28,
					availLeft  : 54
				},
			
				720 : {
					// screen base dimension
					height: 720,
					width : 1280,
					// safe zone margins
					availTop   : 10,
					availBottom: 10,
					availRight : 10,
					availLeft  : 10
				},
			
				1080: {
					// screen base dimension
					height: 1080,
					width : 1920,
					// safe zone margins
					availTop   : 15,
					availBottom: 15,
					availRight : 15,
					availLeft  : 15
				}
			};


/***/ },
/* 13 */
/*!*******************************!*\
  !*** ./app/js/stb/ui/list.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/list
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1),
				keys      = __webpack_require__(/*! ../keys */ 3);
			
			
			/**
			 * Mouse click event.
			 *
			 * @event module:stb/ui/list~List#click:item
			 *
			 * @type {Object}
			 * @property {Element} $item clicked HTML item
			 * @property {Event} event click event data
			 */
			
			
			/**
			 * Base list implementation.
			 *
			 * Each data item can be either a primitive value or an object with these fields:
			 *
			 *  Name    | Description
			 * ---------|-------------
			 *  value   | actual cell value to render
			 *  mark    | is it necessary or not to render this cell as marked
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object}   [config={}]          init parameters (all inherited from the parent)
			 * @param {Array}    [config.data=[]]     component data to visualize
			 * @param {function} [config.render]      method to build each grid cell content
			 * @param {function} [config.navigate]    method to move focus according to pressed keys
			 * @param {number}   [config.size=5]      amount of visible items on a page
			 * @param {number}   [config.viewIndex=0] move view window to this position on init
			 * @param {number}   [config.focusIndex]  list item index to make item focused (move view window to this position)
			 * @param {boolean}  [config.cycle=true]  allow or not to jump to the opposite side of a list when there is nowhere to go next
			 * @param {boolean}  [config.scroll=null] associated ScrollBar component link
			 *
			 * @fires module:stb/ui/list~List#click:item
			 */
			function List ( config ) {
				// current execution context
				var self = this;
			
				/**
				 * Link to the currently focused DOM element.
				 *
				 * @type {Element}
				 */
				this.$focusItem = null;
			
				/**
				 * Position of the visible window to render.
				 *
				 * @type {number}
				 */
				this.viewIndex = null;
			
				/**
				 * Component data to visualize.
				 *
				 * @type {Array}
				 */
				this.data = [];
			
				/**
				 * Component orientation.
				 *
				 * @type {number}
				 */
				this.type = this.TYPE_VERTICAL;
			
				/**
				 * Amount of visible items on a page.
				 *
				 * @type {number}
				 */
				this.size = 5;
			
				/**
				 * Allow or not to jump to the opposite side of a list when there is nowhere to go next.
				 *
				 * @type {boolean}
				 */
				this.cycle = false;
			
				/**
				 * Associated ScrollBar component link.
				 *
				 * @type {ScrollBar}
				 */
				this.scroll = null;
			
				// sanitize
				config = config || {};
			
				// parent init
				Component.call(this, config);
			
				// horizontal or vertical
				if ( config.type !== undefined ) {
					if ( true ) {
						if ( Number(config.type) !== config.type ) { throw 'config.type must be a number'; }
					}
					// apply
					this.type = config.type;
				}
			
				// correct CSS class names
				this.$node.classList.add('list');
			
				if ( this.type === this.TYPE_HORIZONTAL ) {
					this.$node.classList.add('horizontal');
				}
			
				// component setup
				this.init(config);
			
				// custom navigation method
				if ( config.navigate !== undefined ) {
					if ( true ) {
						if ( typeof config.navigate !== 'function' ) { throw 'wrong config.navigate type'; }
					}
					// apply
					this.navigate = config.navigate;
				}
			
				// navigation by keyboard
				this.addListener('keydown', this.navigate);
			
				// navigation by mouse
				this.$body.addEventListener('mousewheel', function ( event ) {
					// scrolling by Y axis
					if ( self.type === self.TYPE_VERTICAL && event.wheelDeltaY ) {
						self.move(event.wheelDeltaY > 0 ? keys.up : keys.down);
					}
			
					// scrolling by X axis
					if ( self.type === self.TYPE_HORIZONTAL && event.wheelDeltaX ) {
						self.move(event.wheelDeltaX > 0 ? keys.left : keys.right);
					}
				});
			}
			
			
			// inheritance
			List.prototype = Object.create(Component.prototype);
			List.prototype.constructor = List;
			
			
			List.prototype.TYPE_VERTICAL   = 1;
			List.prototype.TYPE_HORIZONTAL = 2;
			
			
			/**
			 * Fill the given item with data.
			 *
			 * @param {Element} $item item DOM link
			 * @param {*} data associated with this item data
			 */
			List.prototype.renderItemDefault = function ( $item, data ) {
				$item.innerText = data.value;
			};
			
			
			/**
			 * Method to build each list item content.
			 * Can be redefined to provide custom rendering.
			 *
			 * @type {function}
			 */
			List.prototype.renderItem = List.prototype.renderItemDefault;
			
			
			/**
			 * Default method to move focus according to pressed keys.
			 *
			 * @param {Event} event generated event source of movement
			 */
			List.prototype.navigateDefault = function ( event ) {
				switch ( event.code ) {
					case keys.up:
					case keys.down:
					case keys.right:
					case keys.left:
					case keys.pageUp:
					case keys.pageDown:
					case keys.home:
					case keys.end:
						// cursor move only on arrow keys
						this.move(event.code);
						break;
					case keys.ok:
						// there are some listeners
						if ( this.events['click:item'] !== undefined ) {
							// notify listeners
							this.emit('click:item', {$item: this.$focusItem, event: event});
						}
						break;
				}
			};
			
			
			/**
			 * Current active method to move focus according to pressed keys.
			 * Can be redefined to provide custom navigation.
			 *
			 * @type {function}
			 */
			List.prototype.navigate = List.prototype.navigateDefault;
			
			
			/**
			 * Make all the data items identical.
			 * Wrap to objects if necessary.
			 *
			 * @param {Array} data incoming array
			 * @return {Array} reworked incoming data
			 */
			function normalize ( data ) {
				var i, item;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( !Array.isArray(data) ) { throw 'wrong data type'; }
				}
			
				// rows
				for ( i = 0; i < data.length; i++ ) {
					// cell value
					item = data[i];
					// primitive value
					if ( typeof item !== 'object' ) {
						// wrap with defaults
						item = data[i] = {
							value: data[i]
						};
					}
			
					if ( true ) {
						//if ( !('value' in item) ) { throw 'field "value" is missing'; }
						if ( ('mark' in item) && Boolean(item.mark) !== item.mark ) { throw 'item.mark must be boolean'; }
					}
				}
			
				return data;
			}
			
			
			/**
			 * Init or re-init of the component inner structures and HTML.
			 *
			 * @param {Object} config init parameters (subset of constructor config params)
			 */
			List.prototype.init = function ( config ) {
				var self     = this,
					currSize = this.$body.children.length,
					/**
					 * Item mouse click handler.
					 *
					 * @param {Event} event click event data
					 *
					 * @this Element
					 *
					 * @fires module:stb/ui/list~List#click:item
					 */
					onClick = function ( event ) {
						if ( this.data !== undefined ) {
							self.focusItem(this);
			
							// there are some listeners
							if ( self.events['click:item'] !== undefined ) {
								// notify listeners
								self.emit('click:item', {$item: this, event: event});
							}
						}
					},
					item, i;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( typeof config !== 'object' ) { throw 'wrong config type'; }
				}
			
				// apply cycle behaviour
				if ( config.cycle !== undefined ) { this.cycle = config.cycle; }
			
				// apply ScrollBar link
				if ( config.scroll !== undefined ) { this.scroll = config.scroll; }
			
				// apply list of items
				if ( config.data !== undefined ) {
					if ( true ) {
						if ( !Array.isArray(config.data) ) { throw 'wrong config.data type'; }
					}
					// prepare user data
					this.data = normalize(config.data);
				}
			
				// custom render method
				if ( config.render !== undefined ) {
					if ( true ) {
						if ( typeof config.render !== 'function' ) { throw 'wrong config.render type'; }
					}
					// apply
					this.renderItem = config.render;
				}
			
				// list items amount on page
				if ( config.size !== undefined ) {
					if ( true ) {
						if ( Number(config.size) !== config.size ) { throw 'config.size must be a number'; }
						if ( config.size <= 0 ) { throw 'config.size should be positive'; }
					}
					// apply
					this.size = config.size;
				}
			
				// geometry has changed or initial draw
				if ( this.size !== currSize ) {
					// non-empty list
					if ( currSize > 0 ) {
						// clear old items
						this.$body.innerText = null;
					}
			
					// create new items
					for ( i = 0; i < this.size; i++ ) {
						item = document.createElement('div');
						item.index = i;
						item.className = 'item';
			
						item.addEventListener('click', onClick);
						this.$body.appendChild(item);
					}
				}
			
				// view window position
				if ( config.viewIndex !== undefined ) {
					if ( true ) {
						if ( Number(config.viewIndex) !== config.viewIndex ) { throw 'config.viewIndex must be a number'; }
						if ( config.viewIndex < 0 ) { throw 'config.viewIndex should be positive'; }
					}
				}
			
				// set focus item
				if ( config.focusIndex !== undefined ) {
					if ( true ) {
						if ( Number(config.focusIndex) !== config.focusIndex ) { throw 'config.focusIndex must be a number'; }
						if ( config.focusIndex < 0 ) { throw 'config.focusIndex should be positive'; }
						if ( config.focusIndex > this.data.length - 1 ) { throw 'config.focusIndex should be less than data size'; }
					}
			
					// jump to the necessary item
					this.focusIndex(config.focusIndex);
				} else {
					// go to the first page
					this.renderView(config.viewIndex || 0);
				}
			};
			
			
			/**
			 * Shift the visible view window event.
			 *
			 * @event module:stb/ui/list~List#move:view
			 *
			 * @type {Object}
			 * @property {number} prevIndex previous view window position
			 * @property {number} currIndex current view window position
			 */
			
			
			/**
			 * Draw the visible window.
			 *
			 * @param {number} index start position to render
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/ui/list~List#move:view
			 */
			List.prototype.renderView = function ( index ) {
				var $item, i, itemData, prevIndex, currIndex;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( Number(index) !== index ) { throw 'index must be a number'; }
					if ( index < 0 ) { throw 'index should be more than zero'; }
					if ( index >= this.data.length ) { throw 'index should be less than data size'; }
				}
			
				// has the view window position changed
				if ( this.viewIndex !== index ) {
					// save for emit
					prevIndex = this.viewIndex;
					// sync global pointer
					this.viewIndex = currIndex = index;
			
					// rebuild all visible items
					for ( i = 0; i < this.size; i++ ) {
						// shortcuts
						$item    = this.$body.children[i];
						itemData = this.data[index];
			
						// real item or stub
						if ( itemData !== undefined ) {
							// correct inner data/index and render
							$item.data  = itemData;
							$item.index = index;
							this.renderItem($item, itemData);
			
							// apply CSS
							if ( itemData.mark ) {
								$item.classList.add('mark');
							} else {
								$item.classList.remove('mark');
							}
						} else {
							// nothing to render
							$item.data = $item.index = undefined;
							$item.innerHTML = '&nbsp;';
						}
						index++;
					}
			
					// there are some listeners
					if ( this.events['move:view'] !== undefined ) {
						// notify listeners
						this.emit('move:view', {prevIndex: prevIndex, currIndex: currIndex});
					}
			
					// there are some listeners
					if ( this.events['select:item'] !== undefined ) {
						this.emit('select:item', {$item: $item});
					}
			
					// update a linked scroll component
					if ( this.scroll ) {
						this.scroll.scrollTo(this.viewIndex);
					}
			
					// full rebuild
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Jump to the opposite side.
			 *
			 * @event module:stb/ui/list~List#cycle
			 *
			 * @type {Object}
			 * @property {number} direction key code initiator of movement
			 */
			
			
			/**
			 * Attempt to go beyond the edge of the list.
			 *
			 * @event module:stb/ui/list~List#overflow
			 *
			 * @type {Object}
			 * @property {number} direction key code initiator of movement
			 */
			
			
			/**
			 * Move focus to the given direction.
			 *
			 * @param {number} direction arrow key code
			 *
			 * @fires module:stb/ui/list~List#cycle
			 * @fires module:stb/ui/list~List#overflow
			 */
			List.prototype.move = function ( direction ) {
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( Number(direction) !== direction ) { throw 'direction must be a number'; }
				}
			
				if ( (direction === keys.up && this.type === this.TYPE_VERTICAL) || (direction === keys.left && this.type === this.TYPE_HORIZONTAL) ) {
					// still can go backward
					if ( this.$focusItem && this.$focusItem.index > 0 ) {
						if ( this.$focusItem === this.$body.firstChild ) {
							this.renderView(this.viewIndex - 1);
						} else {
							this.focusItem(this.$focusItem.previousSibling);
						}
					} else {
						// already at the beginning
						if ( this.cycle ) {
							// jump to the end of the list
							this.move(keys.end);
			
							// there are some listeners
							if ( this.events['cycle'] !== undefined ) {
								// notify listeners
								this.emit('cycle', {direction: direction});
							}
						} else {
							// there are some listeners
							if ( this.events['overflow'] !== undefined ) {
								// notify listeners
								this.emit('overflow', {direction: direction});
							}
						}
					}
				}
				if ( (direction === keys.down && this.type === this.TYPE_VERTICAL) || (direction === keys.right && this.type === this.TYPE_HORIZONTAL) ) {
					// still can go forward
					if ( this.$focusItem && this.$focusItem.index < this.data.length - 1 ) {
						if ( this.$focusItem === this.$body.lastChild ) {
							this.renderView(this.viewIndex + 1);
						} else {
							this.focusItem(this.$focusItem.nextSibling);
						}
					} else {
						// already at the beginning
						if ( this.cycle ) {
							// jump to the beginning of the list
							this.move(keys.home);
			
							// there are some listeners
							if ( this.events['cycle'] !== undefined ) {
								// notify listeners
								this.emit('cycle', {direction: direction});
							}
						} else {
							// there are some listeners
							if ( this.events['overflow'] !== undefined ) {
								// notify listeners
								this.emit('overflow', {direction: direction});
							}
						}
					}
				}
			
				if ( direction === keys.pageUp ) {
					// determine jump size
					if ( this.viewIndex < this.size ) {
						// first page
						this.renderView(0);
					} else {
						// second page and further
						this.renderView(this.viewIndex - this.size + 1);
					}
			
					this.focusItem(this.$body.firstChild);
				}
			
				if ( direction === keys.pageDown ) {
					// data is bigger then one page
					if ( this.data.length > this.size ) {
						// determine jump size
						if ( this.viewIndex > this.data.length - this.size * 2 ) {
							// last page
							this.renderView(this.data.length - this.size);
						} else {
							// before the last page
							this.renderView(this.viewIndex + this.size - 1);
						}
						this.focusItem(this.$body.lastChild);
					} else {
						// not the last item on the page
						this.focusItem(this.$body.children[this.data.length - 1]);
					}
				}
			
				if ( direction === keys.home ) {
					this.renderView(0);
					this.focusItem(this.$body.firstChild);
				}
			
				if ( direction === keys.end ) {
					// data is bigger then one page
					if ( this.data.length > this.size ) {
						this.renderView(this.data.length - this.size);
						this.focusItem(this.$body.lastChild);
					} else {
						// not the last item on the page
						this.focusItem(this.$body.children[this.data.length - 1]);
					}
				}
			};
			
			
			/**
			 * Highlight the given DOM element as focused.
			 * Remove focus from the previously focused item and generate associated event.
			 *
			 * @param {Node|Element} $item element to focus
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/ui/list~List#focus:item
			 * @fires module:stb/ui/list~List#blur:item
			 */
			List.prototype.focusItem = function ( $item ) {
				var $prev = this.$focusItem;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
				}
			
				// different element
				if ( $item !== undefined && $prev !== $item ) {
					if ( true ) {
						if ( !($item instanceof Element) ) { throw 'wrong $item type'; }
						if ( $item.parentNode !== this.$body ) { throw 'wrong $item parent element'; }
					}
			
					// some item is focused already
					if ( $prev !== null ) {
						if ( true ) {
							if ( !($prev instanceof Element) ) { throw 'wrong $prev type'; }
						}
			
						// style
						$prev.classList.remove('focus');
			
						// there are some listeners
						if ( this.events['blur:item'] !== undefined ) {
							/**
							 * Remove focus from an element.
							 *
							 * @event module:stb/ui/list~List#blur:item
							 *
							 * @type {Object}
							 * @property {Element} $item previously focused HTML element
							 */
							this.emit('blur:item', {$item: $prev});
						}
					}
					// reassign
					this.$focusItem = $item;
			
					this.$focusItem.data = this.data[this.$focusItem.index];
			
					// correct CSS
					$item.classList.add('focus');
			
					// there are some listeners
					if ( this.events['focus:item'] !== undefined ) {
						/**
						 * Set focus to a DOM element.
						 *
						 * @event module:stb/ui/list~List#focus:item
						 *
						 * @type {Object}
						 * @property {Element} $prev old/previous focused HTML element
						 * @property {Element} $curr new/current focused HTML element
						 */
						this.emit('focus:item', {$prev: $prev, $curr: $item});
					}
			
					// there are some listeners
					if ( this.events['select:item'] !== undefined ) {
						/**
						 * Set focus to a list item.
						 *
						 * @event module:stb/ui/list~List#select:item
						 *
						 * @type {Object}
						 * @property {Element} $item new/current focused item
						 */
						this.emit('select:item', {$item: $item});
					}
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Set the given item focused by item index.
			 *
			 * @param {number} index item data index
			 */
			List.prototype.focusIndex = function ( index ) {
				var viewIndex = this.viewIndex || 0;
			
				if ( true ) {
					if ( Number(index) !== index ) { throw 'index must be a number'; }
					if ( index < 0 ) { throw 'index should be positive'; }
					if ( index > this.data.length - 1 ) { throw 'index should be less than data size'; }
				}
			
				// determine direction
				if ( index >= viewIndex + this.size ) {
					// check range
					index = index < this.data.length - 1 ? index : this.data.length - 1;
					// move down
					this.renderView(index - this.size + 1);
					this.focusItem(this.$body.lastChild);
				} else if ( index < viewIndex ) {
					// check range
					index = index > 0 ? index : 0;
					// move up
					this.renderView(index);
					this.focusItem(this.$body.firstChild);
				} else {
					// no move
					if ( this.viewIndex === null ) {
						// first attempt
						this.renderView(0);
					}
					this.focusItem(this.$body.children[index - viewIndex]);
				}
			};
			
			
			/**
			 * Set item state and appearance as marked.
			 *
			 * @param {Node|Element} $item element to focus
			 * @param {boolean} state true - marked, false - not marked
			 */
			List.prototype.markItem = function ( $item, state ) {
				if ( true ) {
					if ( arguments.length !== 2 ) { throw 'wrong arguments number'; }
					if ( !($item instanceof Element) ) { throw 'wrong $item type'; }
					if ( $item.parentNode !== this.$body ) { throw 'wrong $item parent element'; }
					if ( Boolean(state) !== state ) { throw 'state must be boolean'; }
				}
			
				// correct CSS
				if ( state ) {
					$item.classList.add('mark');
				} else {
					$item.classList.remove('mark');
				}
			
				// apply flag
				$item.data.mark = state;
			};
			
			
			// public
			module.exports = List;


/***/ },
/* 14 */
/*!************************************!*\
  !*** ./app/js/stb/ui/modal.box.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/modal.box
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base modal window implementation.
			 *
			 * @constructor
			 * @extends Modal
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 */
			function ModalBox ( config ) {
				// sanitize
				config = config || {};
			
				// parent init
				Component.call(this, config);
			
				// create $body if not provided
				if ( this.$node === this.$body ) {
					// create centered div
					this.$body = document.createElement('div');
					this.$body.className = 'body';
					// add table-cell wrapper
					this.$node.appendChild(document.createElement('div').appendChild(this.$body).parentNode);
				}
			
				// correct CSS class names
				this.$node.classList.add('modalBox');
			}
			
			
			// inheritance
			ModalBox.prototype = Object.create(Component.prototype);
			ModalBox.prototype.constructor = ModalBox;
			
			
			// public
			module.exports = ModalBox;


/***/ },
/* 15 */
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Main application entry point.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var app    = __webpack_require__(/*! ./stb/app */ 4),
				router = __webpack_require__(/*! ./stb/router */ 5),
				keys   = __webpack_require__(/*! ./stb/keys */ 3);
			
			
			app.addListeners({
				// all resources are loaded
				load: function load () {
					// set pages
					router.init([
						__webpack_require__(/*! ./pages/init */ 17),
						__webpack_require__(/*! ./pages/main */ 18),
						__webpack_require__(/*! ./pages/help */ 16)
					]);
				},
			
				// everything is ready
				done: function done () {
					// go to the main page
					router.navigate('pageMain');
				},
			
				// event
				keydown: function keydown ( event ) {
					if ( event.code === keys.back ) {
						router.back();
					}
				}
			});


/***/ },
/* 16 */
/*!******************************!*\
  !*** ./app/js/pages/help.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Page implementation.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var id     = 'pageHelp',
				Page   = __webpack_require__(/*! ../stb/ui/page */ 11),
				Button = __webpack_require__(/*! ../stb/ui/button */ 6),
				router = __webpack_require__(/*! ../stb/router */ 5),
				page   = new Page({$node: document.getElementById(id)});
			
			
			page.addListener('load', function load () {
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
			});
			
			
			page.addListener('show', function show () {
				// initial active component
				page.back.focus();
			});
			
			
			// public
			module.exports = page;


/***/ },
/* 17 */
/*!******************************!*\
  !*** ./app/js/pages/init.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Loading page implementation.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var id   = 'pageInit',
				Page = __webpack_require__(/*! ../stb/ui/page */ 11),
				page = new Page({$node: document.getElementById(id)});
			
			
			// public
			module.exports = page;


/***/ },
/* 18 */
/*!******************************!*\
  !*** ./app/js/pages/main.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Main page implementation.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var id   = 'pageMain',
				List = __webpack_require__(/*! ../stb/ui/list */ 13),
				Page = __webpack_require__(/*! ../stb/ui/page */ 11),
				page = new Page({$node: document.getElementById(id)});
			
			
			page.addListener('load', function load () {
				var menuData = [
						{
							value: 'Panel',
							panel: __webpack_require__(/*! ../tabs/main.panel */ 44)
						},
						{
							value: 'Button',
							panel: __webpack_require__(/*! ../tabs/main.button */ 36)
						},
						{
							value: 'Input',
							panel: __webpack_require__(/*! ../tabs/main.input */ 40)
						},
						{
							value: 'CheckBox',
							panel: __webpack_require__(/*! ../tabs/main.check.box */ 37)
						},
						{
							value: 'Grid',
							panel: __webpack_require__(/*! ../tabs/main.grid */ 39)
						},
						{
							value: 'List',
							panel: __webpack_require__(/*! ../tabs/main.list */ 41)
						},
						{
							value: 'ProgressBar',
							panel: __webpack_require__(/*! ../tabs/main.progress.bar */ 45)
						},
						{
							value: 'Page',
							panel: __webpack_require__(/*! ../tabs/main.page */ 43)
						},
						{
							value: 'Modal',
							panel: __webpack_require__(/*! ../tabs/main.modal */ 42)
						},
						{
							value: 'Widget',
							panel: __webpack_require__(/*! ../tabs/main.widget */ 46)
						}
					];
			
				// attach to page
				menuData.forEach(function ( item ) {
					page.add(item.panel);
				});
			
				page.add(
					page.menu = new List({
						$node: document.getElementById('pageMainMenu'),
						data: menuData,
						focusIndex: 0,
						size: 10,
						cycle: true,
						render: function ( $item, data ) {
							$item.textContent = data.value;
						},
						events: {
							/*click: function ( data ) {
								//console.log('click');
								//data.event.stop = true;
								//debug.inspect(data, 1);
							},
							focus: function ( data ) {
								//console.log('focus');
								//debug.inspect(data, 1);
							},
							'click:item': function ( data ) {
								//console.log('click:item');
								//debug.inspect(data, 1);
							},*/
							'focus:item': function ( data ) {
								//console.log('focus:item');
								//debug.inspect(data, 1);
								if ( data.$prev ) {
									data.$prev.data.panel.hide();
								}
								data.$curr.data.panel.show();
							}
							/*'blur:item': function ( data ) {
								//console.log('blur:item');
								//debug.inspect(data, 1);
							}*/
						}
					})
					//page.body = new Panel({$node: document.getElementById('pageMainBody')})
				);
			
				page.focusable = false;
				//page.addListener('click', function ( data ) {
				//	data.event.stop = true;
				//});
			});
			
			
			page.addListener('show', function show () {
				// initial active component
				if ( !page.activeComponent ) {
					page.menu.focus();
				}
			});
			
			
			// public
			module.exports = page;


/***/ },
/* 19 */
/*!*************************************!*\
  !*** ./app/js/stb/develop/debug.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Logger.
			 *
			 * @module stb/develop/debug
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/* eslint new-cap: 0 */
			
			var host   = __webpack_require__(/*! ../app */ 4).data.host,
				config = __webpack_require__(/*! ../../../../config/logger */ 47),
				util   = __webpack_require__(/*! util */ 8),
				buffer = [],
				/**
				 * Storage for timers (time, timeEnd).
				 */
				timeCounters = {},
				socket;
			
			
			// enable colors in console
			__webpack_require__(/*! tty-colors */ 57);
			
			
			(function connect () {
				if ( !config.active || !host ) {
					return;
				}
			
				socket = new WebSocket('ws://' + location.hostname + ':' + config.port);
			
				socket.onclose = function () {
					setTimeout(function () {
						connect();
					}, 5000);
				};
			})();
			
			
			/**
			 * Wrapper to dump message locally and remotely.
			 *
			 * @param {string} message data to output and send
			 */
			function log ( message ) {
				gSTB.Debug(message);
				buffer.push(message);
				if ( socket && socket.readyState === socket.OPEN ) {
					socket.send(JSON.stringify(buffer));
					buffer = [];
				}
			}
			
			
			/**
			 * Global object to output logs
			 * @namespace
			 * @global
			 */
			module.exports = window.debug = {
			
				/**
				 * Check condition and warn if not match.
				 *
				 * @param {boolean} condition should be true if okay
				 * @param {string} title description of the problem
				 */
				assert: function ( condition, title ) {
					if ( !condition ) {
						if ( host ) {
							log(('Assertion failed: ' + title).red);
						} else {
							console.assert(condition, title);
						}
					}
				},
			
			
				/**
				 * Print a plain colored string.
				 *
				 * @param {*} message data to output
				 * @param {string} [color='black'] colour to set
				 */
				log: function ( message, color ) {
					message = (message + '') || '(empty message)';
					if ( host ) {
						log(message[color || 'white']);
					} else {
						console.log('%c%s', 'color:' + (color || 'black'), message);
					}
				},
			
			
				/**
				 * Print the given var with caption.
				 *
				 * @param {*} data data to output
				 * @param {string} [title] optional caption
				 */
				info: function ( data, title ) {
					var type = Object.prototype.toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase(),
						args;
			
					if ( host ) {
						// prepare
						if ( data instanceof Object || Array.isArray(data) ) {
							// complex object
							data = data.nodeName ? data.outerHTML : JSON.stringify(data, null, 4);
						}
						// combine all together and print result
						log((type === 'error' ? type.red : type.green) + '\t' + (title ? title.bold + ':\t'.green : '') + data);
					} else {
						args = ['color:' + (type === 'error' ? 'red' : 'green'), type];
						if ( title ) {
							args.unshift('%c%s\t%c%s\t');
							args.push('color:grey');
							args.push(title);
						} else {
							args.unshift('%c%s\t');
						}
						args.push(data);
						// output
						console.log.apply(console, args);
					}
				},
			
			
				/**
				 * Print the given complex var with level restriction.
				 *
				 * @param {*} data data to output
				 * @param {number} [depth=0] amount of sub-levels to print
				 */
				inspect: function ( data, depth ) {
					if ( host ) {
						log('inspect:\n' + util.inspect(data, {depth: depth || 0, colors: true}));
					} else {
						console.log(data);
					}
				},
			
			
				/**
				 * Print the given event object in some special way.
				 *
				 * @param {Event} data event object
				 */
				event: function ( data ) {
					var type  = data.type.toUpperCase(),
						color = type === 'ERROR' ? 'red' : 'green',
						text  = ('Event ' + type[color]).bold;
			
					if ( host ) {
						switch ( type ) {
							case 'KEYDOWN':
								text = text +
								'\tctrl' [data.ctrlKey  ? 'green' : 'grey'] +
								' alt'  [data.altKey   ? 'green' : 'grey'] +
								' shift'[data.shiftKey ? 'green' : 'grey'] +
								'\t' + data.keyCode + '\t' + data.code + '\t' + (data.keyIdentifier || '').green;
								break;
							case 'KEYPRESS':
								text = text +
								'\tctrl' [data.ctrlKey  ? 'green' : 'grey'] +
								' alt'  [data.altKey   ? 'green' : 'grey'] +
								' shift'[data.shiftKey ? 'green' : 'grey'] +
								'\t' + data.keyCode + '\t' + (data.keyIdentifier || '').green + '\t' + String.fromCharCode(data.keyCode);
								break;
							case 'MOUSEMOVE':
								text = text +
								'\tctrl' [data.ctrlKey  ? 'green' : 'grey'] +
								' alt'  [data.altKey   ? 'green' : 'grey'] +
								' shift'[data.shiftKey ? 'green' : 'grey'] +
								'\t' + data.x + ':' + data.y;
								break;
							case 'CLICK':
								text = text +
								'\tctrl' [data.ctrlKey  ? 'green' : 'grey'] +
								' alt'  [data.altKey   ? 'green' : 'grey'] +
								' shift'[data.shiftKey ? 'green' : 'grey'] +
								'\t' + data.x + ':' + data.y;
								break;
							case 'ERROR':
								text = text +
									'\t' + data.filename +
									' (' + data.lineno + ':' + data.colno + ')' +
									' ' + data.message;
								break;
						}
						log(text);
					} else {
						switch ( type ) {
							case 'KEYDOWN':
							case 'KEYPRESS':
								console.log('%o\t%c%s %c%s %c%s %c%s %c%s\t%s\t%c%s', data, 'color:' + color + ';font-weight:bold', type,
									'color:' + (data.ctrlKey  ? 'green' : 'lightgrey'), 'ctrl',
									'color:' + (data.altKey   ? 'green' : 'lightgrey'), 'alt',
									'color:' + (data.shiftKey ? 'green' : 'lightgrey'), 'shift',
									'color:black', data.keyCode, data.code || '', 'color:green', data.keyIdentifier
								);
								break;
							default:
								console.log('%o\t%c%s', data, 'color:' + color + ';font-weight:bold', type);
						}
					}
				},
			
			
				/**
				 * Use to do some development-specific actions which are removed in release mode.
				 *
				 * @param {function} cb callback to execute
				 *
				 * @example
				 * debug.stub(function () {
				 *     alert('This is visible only in debug mode!');
				 * });
				 * // it's also possible to use simple expression:
				 * // link the current scope var with global
				 * // useful for dev only
				 * debug.stub(window.app = this);
				 */
				stub: function ( cb ) {
					if ( typeof cb === 'function' ) {
						cb();
					}
				},
			
			
				/**
				 * Start specific timer.
				 * Use to calculate time of some actions.
				 *
				 * @param {string} name timer name
				 *
				 * @example
				 * debug.time('function1');
				 * // some processing...
				 * debug.timeEnd('function1');
				 * // print time execution, like 'function1: 934ms'
				 */
				time: function ( name ) {
					var time, key;
			
					if ( host ) {
						if ( !name ) {
							return;
						}
			
						time = new Date().getTime();
			
						key = 'KEY:' + name;
			
						timeCounters[key] = time;
					} else {
						console.time(name);
					}
				},
			
			
				/**
				 * End specific timer.
				 * Use to calculate time of some actions.
				 *
				 * @param {string} name timer name
				 *
				 * @example
				 * debug.time('function1');
				 * // some processing...
				 * debug.timeEnd('function1');
				 * // print time execution, like 'function1: 934ms'
				 */
				timeEnd: function ( name ) {
					var key, diff, timeCounter;
			
					if ( host ) {
						if ( !name ) {
							return;
						}
			
						key = 'KEY:' + name;
						timeCounter = timeCounters[key];
			
						if ( timeCounter ) {
							diff = +new Date() - timeCounter;
							timeCounters[key] = null;
							diff += 'ms';
							log(name + ':\t' + diff.bgBlue);
						} else {
							throw 'no started timer for "' + name + '"';
						}
					} else {
						console.timeEnd(name);
					}
				}
			
			};


/***/ },
/* 20 */
/*!**************************************!*\
  !*** ./app/js/stb/develop/events.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Additional dev events.
			 *
			 * @module stb/develop/events
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/* eslint new-cap: 0 */
			
			var util    = __webpack_require__(/*! util */ 8),
				app     = __webpack_require__(/*! ../app */ 4),
				request = __webpack_require__(/*! ../request */ 27),
				dom     = __webpack_require__(/*! ../dom */ 9),
				grid    = __webpack_require__(/*! ./grid */ 21),
				storage = __webpack_require__(/*! ./storage */ 7);
			
			
			// additional top-level key handler
			window.addEventListener('load', function developEventListenerLoad () {
				// export to globals div for develop HTML elements
				window.$develop = document.body.appendChild(document.createElement('div'));
				window.$develop.className = 'develop';
			
				grid.init();
			
				if ( storage.get('grid.active') ) {
					grid.show();
				}
			
				// stress-testing
				window.gremlins = __webpack_require__(/*! gremlins.js/gremlins.min.js */ 53);
				window.horde    = window.gremlins.createHorde();
			});
			
			
			// additional top-level key handler
			window.addEventListener('keydown', function developEventListenerKeydown ( event ) {
				switch ( event.keyCode ) {
					// numpad 0
					case 96:
						debug.log('full document reload', 'red');
						location.hash = '';
						location.reload();
						break;
			
					// numpad 1
					case 97:
						// NTSC
						changeScreenDimension(720, 480);
						break;
			
					// numpad 2
					case 98:
						// PAL
						changeScreenDimension(720, 576);
						break;
			
					// numpad 3
					case 99:
						// 720p
						changeScreenDimension(1280, 720);
						break;
			
					// numpad 4
					case 100:
						// 1080p
						changeScreenDimension(1920, 1080);
						break;
			
					// numpad 5
					case 101:
						// debug grid
						if ( grid.active ) {
							grid.hide();
						} else {
							grid.show();
						}
						debug.log('show grid: ' + grid.active, 'red');
						storage.set('grid.active', grid.active);
						break;
			
					// numpad 6
					case 102:
						// stress-testing for emulation
						window.horde.unleash({nb: 500});
						break;
			
					// numpad 7
					case 103:
						if ( !app.data.host ) {
							debug.log('SpyJS in this mode is available only on STB devices.', 'red');
						} else {
							// SpyJS enable/disable
							if ( !storage.get('spyjs.active') ) {
								// try to "ping" proxy server
								request.ajax(document.location.protocol + '//' + location.hostname + ':3546', {
									method: 'get',
									onload: function () {
										// proxy seems ready
										//isSpyJs = true;
										storage.set('spyjs.active', true);
										debug.log('SpyJS: enable', 'red');
										debug.log('SpyJS: set proxy to ' + location.hostname + ':' + 3546);
			
										gSTB.SetWebProxy(location.hostname, 3546, '', '', '');
										location.reload();
									},
									onerror: function () {
										debug.log('SpyJS: no connection (check SpyJS is started on the server)', 'red');
									}
								});
							} else {
								//isSpyJs = false;
								storage.set('spyjs.active', false);
								gSTB.ResetWebProxy();
								debug.log('SpyJS: disable', 'red');
								location.reload();
							}
						}
						break;
			
					// numpad 8
					case 104:
						// FireBug Lite
						debug.log('firebug-lite activation', 'red');
						document.head.appendChild(dom.tag('script', {
							type: 'text/javascript',
							src: 'http://getfirebug.com/firebug-lite.js#startOpened',
							onload: function () {
								debug.log('firebug-lite ready ...', 'green');
							},
							onerror: function ( error ) {
								debug.inspect(error);
							}
						}));
						break;
			
					// numpad .
					case 110:
						// CSS reload
						debug.log('CSS reload', 'red');
						// get through all css links
						Array.prototype.slice.call(document.head.getElementsByTagName('link')).forEach(function forEachLink ( tag ) {
							// get base name, modify and apply
							tag.href = tag.href.split('?')[0] + '?' + (+new Date());
						});
						break;
				}
			});
			
			
			/**
			 * Apply the given screen geometry and reload the page.
			 *
			 * @param {number} width screen param
			 * @param {number} height screen param
			 */
			function changeScreenDimension ( width, height ) {
				// check if it's necessary
				if ( Number(storage.get('screen.height')) !== height ) {
					// yes
					debug.log(util.format('switch to %sx%s', width, height), 'red');
			
					// save in case of document reload
					storage.set('screen.height', height);
					storage.set('screen.width',  width);
			
					// hide content to avoid raw HTML blinking
					document.body.style.display = 'none';
			
					// apply new metrics
					app.setScreen(__webpack_require__(/*! ../../../../config/metrics */ 12)[height]);
			
					// restore visibility
					document.body.style.display = '';
				} else {
					// not really
					debug.log('no resolution change: new and current values are identical', 'red');
				}
			}


/***/ },
/* 21 */
/*!************************************!*\
  !*** ./app/js/stb/develop/grid.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Visual grid with cursor.
			 *
			 * @module stb/develop/grid
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var data    = __webpack_require__(/*! ../app */ 4).data,
				storage = __webpack_require__(/*! ./storage */ 7);
			
			
			// public
			module.exports = window.grid = {
			
				/** @type {HTMLElement} */
				$canvas: null,
			
				/** @type {CanvasRenderingContext2D} */
				ctx: null,
			
				lineWidth: 0.9,
			
				// content middle point
				centerX: 0,
				centerY: 0,
			
				// last click point
				lastX: 0,
				lastY: 0,
			
				// mouse pointer
				cursorX: 0,
				cursorY: 0,
			
				// list of click points
				points: storage.get('grid.points') || [],
			
				// points to snap
				snaps: [],
			
				// visible or not
				active: false,
			
			
				init: function () {
					// current execution context
					var self = this;
			
					this.$canvas = window.$develop.appendChild(document.createElement('canvas'));
					this.ctx = this.$canvas.getContext('2d');
			
					// apply size
					this.ctx.canvas.width  = data.screen.width;
					this.ctx.canvas.height = data.screen.height;
			
					// safe zone center
					this.centerX = data.screen.availWidth  / 2 + data.screen.availLeft;
					this.centerY = data.screen.availHeight / 2 + data.screen.availTop;
			
					this.snaps.push({x: data.screen.availLeft,  y: data.screen.availTop});
					this.snaps.push({x: data.screen.width - data.screen.availRight, y: data.screen.height - data.screen.availBottom});
					this.snaps.push({x: this.centerX, y: this.centerY});
			
					this.ctx.lineWidth = this.lineWidth;
					this.ctx.font = '14px Ubuntu';
			
					this.$canvas.addEventListener('contextmenu', function ( event ) {
						event.preventDefault();
					});
			
					this.$canvas.addEventListener('mousedown', function ( event ) {
						self.mousedown(event);
					});
			
					this.$canvas.addEventListener('mousemove', function ( event ) {
						self.mousemove(event);
					});
				},
			
			
				mousemove: function ( event ) {
					// current execution context
					var self = this;
			
					this.cursorX = event.x;
					this.cursorY = event.y;
			
					this.repaint();
			
					if ( event.shiftKey ) {
						// snap to the point divisible by 10
						this.cursorX = Math.round(event.x / 10) * 10;
						this.cursorY = Math.round(event.y / 10) * 10;
					} else if ( !event.ctrlKey ) {
						// snap to the nearest line
						this.points.concat(this.snaps).some(function ( point ) {
							if ( Math.abs(point.x - self.cursorX) <= 10 ) {
								self.cursorX = point.x;
							}
							if ( Math.abs(point.y - self.cursorY) <= 10 ) {
								self.cursorY = point.y;
							}
						});
					}
			
					this.drawPointer();
				},
			
			
				mousedown: function ( event ) {
					var matchPoint = null,
						self       = this,  // current execution context
						point;
			
					// all clicked crosses
					this.points.forEach(function ( point ) {
						if ( self.cursorX === point.x && self.cursorY === point.y ) {
							matchPoint = point;
						}
					});
			
					if ( event.button === 0 ) {
						// left mouse button
						if ( matchPoint === null ) {
							this.points.push({x: this.cursorX, y: this.cursorY});
						}
						this.lastX = this.cursorX;
						this.lastY = this.cursorY;
					} else if ( event.button === 1 ) {
						// middle mouse button
						this.points.pop();
						point = this.points[this.points.length - 1];
						if ( point ) {
							this.lastX = point.x;
							this.lastY = point.y;
						} else {
							this.lastX = 0;
							this.lastY = 0;
						}
					} else if ( event.button === 2 ) {
						// right mouse button
						if ( matchPoint !== null ) {
							this.points.splice(this.points.indexOf(matchPoint), 1);
							point = this.points[this.points.length - 1];
							if ( point ) {
								this.lastX = point.x;
								this.lastY = point.y;
							} else {
								this.lastX = 0;
								this.lastY = 0;
							}
						} else {
							this.lastX = 0;
							this.lastY = 0;
						}
					}
					this.repaint();
					this.drawPointer();
					storage.set('grid.points', this.points);
				},
			
			
				show: function () {
					this.active = true;
					this.$canvas.classList.add('active');
					this.repaint();
				},
			
			
				hide: function () {
					this.active = false;
					this.$canvas.classList.remove('active');
				},
			
			
				repaint: function () {
					var ctx  = this.ctx,
						self = this;  // current execution context
			
					// remove all
					ctx.clearRect(0, 0, data.screen.width, data.screen.height);
			
					// safe zone center
					this.drawCross({x: this.centerX, y: this.centerY}, {color: 'grey'});
			
					// draw safe zone borders
					ctx.strokeStyle = 'red';
					ctx.strokeRect(data.screen.availLeft, data.screen.availTop, data.screen.availWidth, data.screen.availHeight);
			
					// all clicked crosses
					this.points.forEach(function ( point ) {
						self.drawCross(point, {color:'green', mark: 5});
					});
				},
			
			
				drawPointer: function () {
					var ctx    = this.ctx,
						height = 16,
						width, dx, dy, angle, title;
			
					title = this.cursorX + ' : ' + this.cursorY;
			
					// there were some clicks
					if ( this.lastX || this.lastY ) {
						// distance by X and Y from last point
						dx = this.cursorX - this.lastX;
						dy = this.cursorY - this.lastY;
						title = title + ' [' + (dx > 0 ? '+' : '') + dx + ', ' + (dy > 0 ? '+' : '') + dy + ']';
			
						// angle of the line connecting the cursor and the last point
						angle = Math.atan2(dy, dx) * 180 / Math.PI;
						title = title + ' ' + angle.toFixed(2) + '°';
			
						// not perpendicular
						if ( dx && dy ) {
							// distance between the cursor and the last point
							title = title + ' len: ' + Math.sqrt(Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2)).toFixed(2);
						}
			
						// angle line
						ctx.beginPath();
						// show by color if 45°
						ctx.strokeStyle = [-135, 135, -45, 45].indexOf(angle) !== -1 ? 'yellow' : 'grey';
						ctx.moveTo(this.lastX, this.lastY);
						ctx.lineTo(this.cursorX, this.cursorY);
						ctx.stroke();
					}
			
					// pointer itself
					this.drawCross({x: this.cursorX, y: this.cursorY});
			
					title = ' ' + title + ' ';
					width = ctx.measureText(title).width;
			
					// title background
					ctx.fillStyle = 'yellow';
					ctx.fillRect(
						this.cursorX > this.centerX ? this.cursorX - width  : this.cursorX,
						this.cursorY > this.centerY ? this.cursorY - height : this.cursorY,
						width, height
					);
			
					// title itself
					ctx.fillStyle    = 'black';
					ctx.textBaseline = this.cursorY > this.centerY ? 'bottom' : 'top';
					ctx.textAlign    = this.cursorX > this.centerX ? 'right'  : 'left';
					ctx.fillText(title, this.cursorX, this.cursorY);
				},
			
			
				drawCross: function ( point, options ) {
					var ctx = this.ctx;
			
					// defaults
					options = options || {};
			
					// apply style options
					ctx.lineWidth   = options.width || this.lineWidth;
					ctx.strokeStyle = options.color || 'yellow';
			
					ctx.beginPath();
					// horizontal line
					ctx.moveTo(0, point.y);
					ctx.lineTo(data.screen.width, point.y);
					// vertical line
					ctx.moveTo(point.x, 0);
					ctx.lineTo(point.x, data.screen.height);
					// draw
					ctx.stroke();
			
					// center mark
					if ( options.mark ) {
						ctx.lineWidth = 1.5;
						ctx.beginPath();
						// horizontal line
						ctx.moveTo(point.x - options.mark, point.y);
						ctx.lineTo(point.x + options.mark, point.y);
						// vertical line
						ctx.moveTo(point.x, point.y - options.mark);
						ctx.lineTo(point.x, point.y + options.mark);
						// draw
						ctx.stroke();
						ctx.lineWidth = this.lineWidth;
					}
				}
			
			};


/***/ },
/* 22 */
/*!*************************************!*\
  !*** ./app/js/stb/develop/proxy.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * STB calls relay.
			 *
			 * @module stb/develop/proxy
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/* eslint new-cap: 0 */
			
			var host   = __webpack_require__(/*! ../app */ 4).data.host,
				util   = __webpack_require__(/*! util */ 8),
				config = __webpack_require__(/*! ../../../../config/proxy */ 48);
			
			
			/**
			 * Proxy host activation
			 */
			function initHost () {
				var ProxyHost = __webpack_require__(/*! code-proxy/client/host */ 52);
			
				// init and export to globals
				window.proxy = new ProxyHost({
					name: config.name,
					host: location.hostname,
					port: config.portWs
				});
			
				// redefine logging
				window.proxy.log = function log ( type, time, status, message, params ) {
					gSTB.Debug(util.format('[%s]\t%s\t%s\t%s\t%s',
						type.grey,
						config.name.magenta,
						time.toString().grey,
						(status ? message.green : message.red),
						(params ? JSON.stringify(params).grey : '')
					));
				};
			}
			
			/**
			 * Proxy guest activation
			 */
			function initGuest () {
				var ProxyGuest = __webpack_require__(/*! code-proxy/client/guest */ 51),
					stbNames   = ['dvbManager', 'gSTB', 'pvrManager', 'stbDownloadManager', 'stbStorage', 'stbUpdate', 'stbWebWindow', 'stbWindowMgr', 'timeShift'],
					skipKeys   = ['objectName', 'destroyed', 'deleteLater'];
			
				// init and export to globals
				window.proxy = new ProxyGuest({
					name: config.name,
					host: location.hostname,
					port: config.portHttp
				});
			
				// create local stb objects
				stbNames.forEach(function forEachStbNames ( stbObjName ) {
					// prepare
					var stbObj = window[stbObjName] = {},
						// for each global stb object get all its properties
						keysCode = util.format('Object.keys(%s)', stbObjName),
						stbObjKeys;
			
					// get data from cache if no connection
					if ( !window.proxy.active && config.cache ) {
						stbObjKeys = JSON.parse(localStorage.getItem('proxy:eval:' + keysCode));
						console.log('proxy cache: ', keysCode);
					} else {
						stbObjKeys = window.proxy.eval(keysCode);
						localStorage.setItem('proxy:eval:' + keysCode, JSON.stringify(stbObjKeys));
					}
			
					// valid list of keys
					if ( stbObjKeys && Array.isArray(stbObjKeys) ) {
			
						stbObjKeys.forEach(function forEachStbObjKeys ( stbObjKey ) {
							// strip signature
							stbObjKey = stbObjKey.split('(')[0];
							// get rid of system fields
							if ( skipKeys.indexOf(stbObjKey) === -1 ) {
								// wrap each method with proxy call
								stbObj[stbObjKey] = (function stbCallWrapper ( name, method ) {
									return function stbCallBody () {
										var code = name + '.' + method,
											data;
			
										// get data from cache if no connection
										if ( !window.proxy.active && config.cache ) {
											data = JSON.parse(localStorage.getItem('proxy:call:' + code));
											console.log('proxy cache: ', code);
										} else {
											data = window.proxy.call(code, Array.prototype.slice.call(arguments), name) || null;
											localStorage.setItem('proxy:call:' + code, JSON.stringify(data));
										}
										return data;
									};
								}(stbObjName, stbObjKey));
							}
						});
					}
				});
			}
			
			
			// init
			if ( config.active ) {
				if ( host ) {
					initHost();
				} else {
					initGuest();
				}
			}


/***/ },
/* 23 */
/*!*************************************!*\
  !*** ./app/js/stb/develop/shims.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
			 */
			
			'use strict';
			
			/* eslint-disable */
			
			if ( !Function.prototype.bind ) {
				Function.prototype.bind = function ( oThis ) {
					if ( typeof this !== 'function' ) {
						// closest thing possible to the ECMAScript 5
						// internal IsCallable function
						throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
					}
			
					var aArgs = Array.prototype.slice.call(arguments, 1),
						fToBind = this,
						fNOP = function () {},
						fBound = function () {
							return fToBind.apply(this instanceof fNOP && oThis
									? this
									: oThis,
								aArgs.concat(Array.prototype.slice.call(arguments)));
						};
			
					fNOP.prototype = this.prototype;
					fBound.prototype = new fNOP();
			
					return fBound;
				};
			}
			
			
			if ( !window.requestAnimationFrame ) {
				// shim layer with setTimeout fallback
				window.requestAnimationFrame =
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function ( callback ) {
						window.setTimeout(callback, 1000 / 60);
					};
			}


/***/ },
/* 24 */
/*!**************************************!*\
  !*** ./app/js/stb/develop/static.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Static files reload on change.
			 *
			 * @module stb/develop/static
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var dom    = __webpack_require__(/*! ../dom */ 9),
				config = __webpack_require__(/*! ../../../../config/static */ 49);
			
			
			// livereload activation
			if ( config.livereload ) {
				// load external script
				document.head.appendChild(dom.tag('script', {
					type: 'text/javascript',
					src: '//' + location.hostname + ':35729/livereload.js'
				}));
			}


/***/ },
/* 25 */
/*!**************************************!*\
  !*** ./app/js/stb/develop/weinre.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Web Inspector Remote.
			 *
			 * @module stb/develop/weinre
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var dom     = __webpack_require__(/*! ../dom */ 9),
				util    = __webpack_require__(/*! util */ 8),
				storage = __webpack_require__(/*! ./storage */ 7),
				config  = __webpack_require__(/*! ../../../../config/weinre */ 50);
			
			
			// web inspector is allowed only without SpyJS
			if ( config.active && !storage.get('spyjs.active') ) {
				// load external script
				document.head.appendChild(dom.tag('script', {
					type: 'text/javascript',
					src: util.format('//%s:%s/target/target-script-min.js#%s', location.hostname, config.port, config.name)
				}));
			}


/***/ },
/* 26 */
/*!*****************************!*\
  !*** ./app/js/stb/model.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/model
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Emitter = __webpack_require__(/*! ./emitter */ 10);
			
			
			/**
			 * Base model implementation.
			 *
			 * Represents domain-specific data or information that an application will be working with.
			 * A typical example is a user account (e.g name, avatar, e-mail) or a music track (e.g title, year, album).
			 * Holds information, but don’t handle behaviour and don’t format information or influence how data appears.
			 *
			 * @constructor
			 * @extends Emitter
			 *
			 * @param {Object} [data={}] init attributes
			 */
			function Model ( data ) {
				if ( true ) {
					if ( data !== undefined && typeof data !== 'object' ) { throw 'wrong data type'; }
				}
			
				// parent init
				Emitter.call(this);
			
				/**
				 * Model attributes with given data or empty hash table.
				 *
				 * @member {Object.<string, *>}
				 **/
				this.data = data || {};
			}
			
			
			// inheritance
			Model.prototype = Object.create(Emitter.prototype);
			Model.prototype.constructor = Model;
			
			
			// which of data fields is primary
			Model.prototype.idName = 'id';
			
			
			/**
			 * Remove all attributes from the model event.
			 *
			 * @event module:stb/model~Model#clear
			 *
			 * @type {Object}
			 * @property {Object} data old model attributes
			 */
			
			
			/**
			 * Remove all attributes from the model.
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/model~Model#clear
			 */
			Model.prototype.clear = function () {
				var data = this.data;
			
				if ( true ) {
					if ( typeof data !== 'object' ) { throw 'wrong data type'; }
				}
			
				// is there any data?
				if ( Object.keys(data).length > 0 ) {
					// reset
					this.data = {};
			
					// there are some listeners
					if ( this.events['clear'] !== undefined ) {
						// notify listeners
						this.emit('clear', {data: data});
					}
			
					return true;
				}
			
				return false;
			};
			
			
			/**
			 * Set model data event.
			 *
			 * @event module:stb/model~Model#init
			 *
			 * @type {Object}
			 * @property {Object} data new model attributes
			 */
			
			
			/**
			 * Clear and set model data.
			 *
			 * @param {Object} data attributes
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/model~Model#clear
			 * @fires module:stb/model~Model#init
			 */
			Model.prototype.init = function ( data ) {
				if ( true ) {
					if ( typeof data !== 'object' ) { throw 'wrong data type'; }
				}
			
				// valid input
				if ( data ) {
					// reset data
					this.clear();
			
					// init with given data
					this.data = data;
			
					// there are some listeners
					if ( this.events['init'] !== undefined ) {
						// notify listeners
						this.emit('init', {data: data});
					}
			
					return true;
				}
			
				return false;
			};
			
			
			/**
			 * Check an attribute existence.
			 *
			 * @param {string} name attribute
			 *
			 * @return {boolean} attribute exists or not
			 */
			Model.prototype.has = function ( name ) {
				if ( true ) {
					if ( typeof this.data !== 'object' ) { throw 'wrong this.data type'; }
				}
			
				// hasOwnProperty method is not available directly in case of Object.create(null)
				//return Object.hasOwnProperty.call(this.data, name);
				return this.data.hasOwnProperty(name);
			};
			
			/**
			 * Get the model attribute by name.
			 *
			 * @param {string} name attribute
			 *
			 * @return {*} associated value
			 */
			Model.prototype.get = function ( name ) {
				if ( true ) {
					if ( typeof this.data !== 'object' ) { throw 'wrong this.data type'; }
				}
			
				return this.data[name];
			};
			
			
			/**
			 * Update or create a model attribute event.
			 *
			 * @event module:stb/model~Model#change
			 *
			 * @type {Object}
			 * @property {string} name attribute name
			 * @property {*} [prev] old/previous attribute value (can be absent on attribute creation)
			 * @property {*} [curr] new/current attribute value (can be absent on attribute removal)
			 */
			
			
			/**
			 * Update or create a model attribute.
			 *
			 * @param {string} name attribute
			 * @param {*} value associated value
			 * @return {boolean} operation status (true - attribute value was changed/created)
			 *
			 * @fires module:stb/model~Model#change
			 */
			Model.prototype.set = function ( name, value ) {
				var isAttrSet = name in this.data,
					emitData  = {name: name, curr: value};
			
				if ( true ) {
					if ( typeof this.data !== 'object' ) { throw 'wrong this.data type'; }
				}
			
				if ( isAttrSet ) {
					// update
					emitData.prev = this.data[name];
					// only if values are different
					if ( value !== emitData.prev ) {
						this.data[name] = value;
			
						// there are some listeners
						if ( this.events['change'] !== undefined ) {
							// notify listeners
							this.emit('change', emitData);
						}
			
						return true;
					}
				} else {
					// create
					this.data[name] = value;
			
					// there are some listeners
					if ( this.events['change'] !== undefined ) {
						// notify listeners
						this.emit('change', emitData);
					}
			
					return true;
				}
			
				return false;
			};
			
			
			/**
			 * Delete the given attribute by name.
			 *
			 * @param {string} name attribute
			 * @return {boolean} operation status (true - attribute was deleted)
			 *
			 * @fires module:stb/model~Model#change
			 */
			Model.prototype.unset = function ( name ) {
				var isAttrSet = name in this.data,
					emitData;
			
				if ( true ) {
					if ( typeof this.data !== 'object' ) { throw 'wrong this.data type'; }
				}
			
				if ( isAttrSet ) {
					emitData = {name: name, prev: this.data[name]};
					delete this.data[name];
			
					// there are some listeners
					if ( this.events['change'] !== undefined ) {
						// notify listeners
						this.emit('change', emitData);
					}
			
					return true;
				}
			
				return false;
			};
			
			
			///**
			// * Extends the model with the given attribute list
			// * @param {Object} data
			// */
			//Model.prototype.attributes = function ( data ) {
			//	var index   = 0,
			//		keyList = data && typeof data === 'object' ? Object.keys(data) : [];
			//	for ( ; index < keyList.length; index++ ) {
			//		this.set(keyList[index], data[keyList[index]]);
			//	}
			//};
			
			
			///**
			// * Prepare all data for sending to a server
			// * @return {Object}
			// */
			//Model.prototype.pack = function () {
			//	return this._data;
			//};
			
			
			///**
			// * Restores the received data from a server to a model data
			// * @param {Object} data
			// * @return {Object}
			// */
			//Model.prototype.unpack = function ( data ) {
			//	return data;
			//};
			
			
			///**
			// * Sync model to a server
			// */
			//Model.prototype.save = function () {
			//	var self = this;
			//	if ( this.url ) {
			//		// collect data
			//		io.ajax(this.url, {
			//			// request params
			//			method: self._data[self.idName] ? 'put' : 'post',
			//			data  : self.pack(),
			//			onload: function ( data ) {
			//				data = self.unpack(self.parse(data));
			//				self.attributes(data);
			//				console.log(data);
			//				self.emit('save', true);
			//			},
			//			// error handlers
			//			onerror:   this.saveFailure,
			//			ontimeout: this.saveFailure
			//		});
			//	}
			//};
			
			
			///**
			// * Error handler while model data fetch
			// */
			//Model.prototype.saveFailure = function () {
			//	this.emit('save', false);
			//};
			
			
			///**
			// * Converts received data from a server to a model attributes
			// * @param {string} response
			// * @return {Object}
			// */
			//Model.prototype.parse = function ( response ) {
			//	var data = {};
			//	try {
			//		data = JSON.parse(response).data;
			//	} catch(e){ console.log(e); }
			//	return data;
			//};
			
			
			// public
			module.exports = Model;


/***/ },
/* 27 */
/*!*******************************!*\
  !*** ./app/js/stb/request.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Ajax request wrapper.
			 *
			 * @module stb/request
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var request = {},
				defaults = {
					method    : 'GET',  // HTTP method to use, such as "GET", "POST", "PUT", "DELETE", etc.
					async     : true,   // whether or not to perform the operation asynchronously
					headers   : {},     // list of HTTP request headers
					type      : 'text', // "", "arraybuffer", "blob", "document", "json", "text"
					data      : null,   // data to send (plain object)
					timeout   : 30000,  // amount of milliseconds a request can take before being terminated
					onload    : null,   // callback when the request has successfully completed
					onerror   : null,   // callback when the request has failed
					ontimeout : null    // callback when the author specified timeout has passed before the request could complete
				},
				defaultsKeys = Object.keys(defaults);
			
			
			/**
			 * Main method to send ajax requests.
			 *
			 * @param {string} url address
			 * @param {Object} options Plain object with call parameters
			 * @return {XMLHttpRequest|Boolean} false in case of wrong params
			 *
			 * @example
			 * TODO: add
			 */
			request.ajax = function ( url, options ) {
				var i, headersKeys, client;
			
				// init
				options = options || {};
				// valid non-empty string
				if ( url && (typeof url === 'string' || url instanceof String) && url.length > 0 ) {
					// plain object is given as param
					if ( options && typeof options === 'object') {
						// extend with default options
						for ( i = 0; i < defaultsKeys.length; i++ ) {
							// in case not redefined
							if ( options[defaultsKeys[i]] === undefined ) {
								options[defaultsKeys[i]] = defaults[defaultsKeys[i]];
							}
						}
					}
			
					client = new XMLHttpRequest();
					// init a request
					client.open(options.method, url, options.async);
			
					// apply the given headers
					if ( options.headers && typeof options.headers === 'object') {
						headersKeys = Object.keys(options.headers);
						for ( i = 0; i < headersKeys.length; i++ ) {
							client.setRequestHeader(headersKeys[i], options.headers[headersKeys[i]]);
						}
					}
			
					// set response type and timeout
					client.responseType = options.type;
					client.timeout      = options.timeout;
			
					// callbacks
					if ( options.onload && typeof options.onload === 'function' ) {
						client.onload = function onload () {
							options.onload.call(this, this.response || this.responseText, this.status);
						};
					}
					client.onerror   = options.onerror;
					client.ontimeout = options.ontimeout;
			
					// actual request
					//client.send(this.encode(options.data));
					client.send(options.data ? JSON.stringify(options.data) : null);
			
					return client;
				}
				return false;
			};
			
			
			/**
			 * Serializes the given data for sending to the server via ajax call.
			 *
			 * @param {Object} data Plain object to serialize
			 * @return {string} null if no data to encode
			 *
			 * @example
			 * TODO: add
			 */
			request.encode = function ( data ) {
				var result = [],
					i, keys;
			
				// input plain object validation
				if ( data && typeof data === 'object') {
					keys = Object.keys(data);
					// apply encoding
					for ( i = 0; i < keys.length; i++ ) {
						result.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data[keys[i]]));
					}
					// build the list of params
					if ( result.length > 0 ) {
						return result.join('&');
					}
				}
				return null;
			};
			
			
			// public
			module.exports = request;


/***/ },
/* 28 */
/*!*****************************!*\
  !*** ./app/js/stb/shims.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/* eslint-disable */
			
			if ( !('classList' in document.documentElement) ) {
				var prototype = Array.prototype,
					indexOf = prototype.indexOf,
					slice = prototype.slice,
					push = prototype.push,
					splice = prototype.splice,
					join = prototype.join;
			
				window.DOMTokenList = function ( el ) {
					this._element = el;
					if (el.className !== this._classCache) {
						this._classCache = el.className;
						if (!this._classCache) { return; }
						var classes = this._classCache.replace(/^\s+|\s+$/g,'').split(/\s+/),
							i;
						for (i = 0; i < classes.length; i++) {
							push.call(this, classes[i]);
						}
					}
				};
				window.DOMTokenList.prototype = {
					add: function ( token ) {
						if(this.contains(token)) { return; }
						push.call(this, token);
						this._element.className = slice.call(this, 0).join(' ');
					},
					contains: function ( token ) {
						return indexOf.call(this, token) !== -1;
					},
					item: function ( index ) {
						return this[index] || null;
					},
					remove: function ( token ) {
						var i = indexOf.call(this, token);
						if (i === -1) {
							return;
						}
						splice.call(this, i, 1);
						this._element.className = slice.call(this, 0).join(' ');
					},
					toString: function () {
						return join.call(this, ' ');
					},
					toggle: function ( token ) {
						if (!this.contains(token)) {
							this.add(token);
						} else {
							this.remove(token);
						}
						return this.contains(token);
					}
				};
			
				Object.defineProperty(Element.prototype, 'classList',{
					get: function () {
						return new window.DOMTokenList(this);
					}
				});
			}


/***/ },
/* 29 */
/*!************************************!*\
  !*** ./app/js/stb/ui/check.box.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/check.box
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1),
				keys      = __webpack_require__(/*! ../keys */ 3),
				groups    = {};
			
			
			/**
			 * Base check box implementation.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 * @param {boolean} [config.value=false] initial state
			 * @param {string} [config.group] group name to work synchronously with other checkboxes
			 *
			 * @example
			 * var CheckBox = require('stb/ui/check.box'),
			 *     checkBox = new CheckBox({
			 *         value: true,
			 *         group: 'lang'
			 *     });
			 */
			function CheckBox ( config ) {
				// current execution context
				var self = this;
			
				// sanitize
				config = config || {};
			
				/**
				 * Initial state.
				 *
				 * @type {boolean}
				 */
				this.value = !!config.value;
			
				/**
				 * Group name to work synchronously with other checkboxes.
				 *
				 * @type {string}
				 */
				this.group = null;
			
				// parent init
				Component.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('checkBox');
			
				// correct init styles
				if ( this.value ) {
					this.$node.classList.add('checked');
				}
			
				// apply hierarchy
				if ( config.group !== undefined ) {
					if ( true ) {
						if ( typeof config.group !== 'string' || config.group.length === 0 ) { throw 'wrong or empty config.group'; }
					}
			
					// save
					this.group = config.group;
			
					// fill groups data
					if ( groups[config.group] === undefined ) {
						groups[config.group] = [this];
					} else {
						groups[config.group].push(this);
					}
				}
			
				// invert on mouse click or enter
				this.addListeners({
					click: function () {
						self.set(!self.value);
					},
					keydown: function ( event ) {
						if ( event.code === keys.ok ) {
							self.set(!self.value);
						}
					}
				});
			}
			
			
			// inheritance
			CheckBox.prototype = Object.create(Component.prototype);
			CheckBox.prototype.constructor = CheckBox;
			
			
			/**
			 * Set the given state.
			 * Does nothing in case the value is already as necessary.
			 *
			 * @param {boolean} value new value to set
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/ui/check.box~CheckBox#change
			 */
			CheckBox.prototype.set = function ( value ) {
				var i, l;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
				}
			
				if ( this.value !== value ) {
					// going to be turned on and assigned to some group
					if ( !this.value && this.group !== null ) {
						// unset all checkboxes in this group
						for ( i = 0, l = groups[this.group].length; i < l; i++ ) {
							groups[this.group][i].set(false);
						}
					}
			
					// set new value
					this.value = !this.value;
			
					// set visible changes
					this.$node.classList.toggle('checked');
			
					// there are some listeners
					if ( this.events['change'] !== undefined ) {
						/**
						 * Update progress value.
						 *
						 * @event module:stb/ui/check.box~CheckBox#change
						 *
						 * @type {Object}
						 * @property {boolean} value current check state
						 */
						this.emit('change', {value: this.value});
					}
			
					return true;
				}
			
				return false;
			};
			
			
			// public
			module.exports = CheckBox;


/***/ },
/* 30 */
/*!*******************************!*\
  !*** ./app/js/stb/ui/grid.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/grid
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1),
				keys      = __webpack_require__(/*! ../keys */ 3);
			
			
			/**
			 * Mouse click event.
			 *
			 * @event module:stb/ui/grid~Grid#click:item
			 *
			 * @type {Object}
			 * @property {Element} $item clicked HTML item
			 * @property {Event} event click event data
			 */
			
			
			/**
			 * Base grid/table implementation.
			 *
			 * For navigation map implementation and tests see {@link https://gist.github.com/DarkPark/8c0c2926bfa234043ed1}.
			 *
			 * Each data cell can be either a primitive value or an object with these fields:
			 *
			 *  Name    | Description
			 * ---------|-------------
			 *  value   | actual cell value to render
			 *  colSpan | amount of cells to merge horizontally
			 *  rowSpan | amount of cells to merge vertically
			 *  mark    | is it necessary or not to render this cell as marked
			 *  focus   | is it necessary or not to render this cell as focused
			 *  disable | is it necessary or not to set this cell as disabled
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object}   [config={}] init parameters (all inherited from the parent)
			 * @param {Array[]}  [config.data=[]] component data to visualize
			 * @param {function} [config.render] method to build each grid cell content
			 * @param {function} [config.navigate] method to move focus according to pressed keys
			 * @param {boolean}  [config.cycleX=true] allow or not to jump to the opposite side of line when there is nowhere to go next
			 * @param {boolean}  [config.cycleY=true] allow or not to jump to the opposite side of column when there is nowhere to go next
			 *
			 * @fires module:stb/ui/grid~Grid#click:item
			 *
			 * @example
			 * var Grid = require('stb/ui/grid'),
			 *     grid = new Grid({
			 *         data: [
			 *             [1,   2,  3, {value: '4;8;12;16', focus: true, rowSpan: 4}],
			 *             [5,   6,  7],
			 *             [9,  10, 11],
			 *             [13, 14, {value: 15, disable: true}]
			 *         ],
			 *         render: function ( $item, data ) {
			 *             $item.innerHTML = '<div>' + (data.value) + '</div>';
			 *         },
			 *         cycleX: false
			 *     });
			 */
			function Grid ( config ) {
				// current execution context
				var self = this;
			
				/**
				 * List of DOM elements representing the component cells.
				 * Necessary for navigation calculations.
				 *
				 * @type {Element[][]}
				 */
				this.map = [];
			
				/**
				 * Link to the currently focused DOM element.
				 *
				 * @type {Element}
				 */
				this.$focusItem = null;
			
				/**
				 * Component data to visualize.
				 *
				 * @type {Array[]}
				 */
				this.data = [];
			
				/**
				 * Allow or not to jump to the opposite side of line when there is nowhere to go next.
				 *
				 * @type {boolean}
				 */
				this.cycleX = true;
			
				/**
				 * Allow or not to jump to the opposite side of column when there is nowhere to go next.
				 *
				 * @type {boolean}
				 */
				this.cycleY = true;
			
				/**
				 * Current navigation map horizontal position.
				 *
				 * @type {number}
				 */
				this.focusX = 0;
			
				/**
				 * Current navigation map vertical position.
				 *
				 * @type {number}
				 */
				this.focusY = 0;
			
			
				// sanitize
				config = config || {};
			
				// parent init
				Component.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('grid');
			
				// component setup
				this.init(config);
			
				// custom navigation method
				if ( config.navigate !== undefined ) {
					if ( true ) {
						if ( typeof config.navigate !== 'function' ) { throw 'wrong config.navigate type'; }
					}
					// apply
					this.navigate = config.navigate;
				}
			
				// navigation by keyboard
				this.addListener('keydown', this.navigate);
			
				// navigation by mouse
				this.$body.addEventListener('mousewheel', function ( event ) {
					// scrolling by Y axis
					if ( event.wheelDeltaY ) {
						self.move(event.wheelDeltaY > 0 ? keys.up : keys.down);
					}
			
					// scrolling by X axis
					if ( event.wheelDeltaX ) {
						self.move(event.wheelDeltaX > 0 ? keys.left : keys.right);
					}
				});
			}
			
			
			// inheritance
			Grid.prototype = Object.create(Component.prototype);
			Grid.prototype.constructor = Grid;
			
			
			/**
			 * Fill the given cell with data.
			 * $item.data can contain the old data (from the previous render).
			 *
			 * @param {Element} $item item DOM link
			 * @param {*} data associated with this item data
			 */
			Grid.prototype.renderItemDefault = function ( $item, data ) {
				if ( true ) {
					if ( arguments.length !== 2 ) { throw 'wrong arguments number'; }
					if ( !($item instanceof Element) ) { throw 'wrong $item type'; }
				}
			
				$item.innerText = data.value;
			};
			
			
			/**
			 * Method to build each grid cell content.
			 * Can be redefined to provide custom rendering.
			 *
			 * @type {function}
			 */
			Grid.prototype.renderItem = Grid.prototype.renderItemDefault;
			
			
			/**
			 * Default method to move focus according to pressed keys.
			 *
			 * @param {Event} event generated event source of movement
			 */
			Grid.prototype.navigateDefault = function ( event ) {
				switch ( event.code ) {
					case keys.up:
					case keys.down:
					case keys.right:
					case keys.left:
						// cursor move only on arrow keys
						this.move(event.code);
						break;
					case keys.ok:
						// there are some listeners
						if ( this.events['click:item'] !== undefined ) {
							// notify listeners
							this.emit('click:item', {$item: this.$focusItem, event: event});
						}
						break;
				}
			};
			
			
			/**
			 * Current active method to move focus according to pressed keys.
			 * Can be redefined to provide custom navigation.
			 *
			 * @type {function}
			 */
			Grid.prototype.navigate = Grid.prototype.navigateDefault;
			
			
			/**
			 * Make all the data items identical.
			 * Wrap to objects if necessary and add missing properties.
			 *
			 * @param {Array[]} data user 2-dimensional array
			 * @return {Array[]} reworked incoming data
			 */
			function normalize ( data ) {
				var i, j, item;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( !Array.isArray(data) ) { throw 'wrong data type'; }
				}
			
				// rows
				for ( i = 0; i < data.length; i++ ) {
					// cols
					for ( j = 0; j < data[i].length; j++ ) {
						// cell value
						item = data[i][j];
						// primitive value
						if ( typeof item !== 'object' ) {
							// wrap with defaults
							item = data[i][j] = {
								value: data[i][j],
								colSpan: 1,
								rowSpan: 1
							};
						} else {
							// always at least one row/col
							item.colSpan = item.colSpan || 1;
							item.rowSpan = item.rowSpan || 1;
						}
			
						if ( true ) {
							if ( !('value' in item) ) { throw 'field "value" is missing'; }
							if ( Number(item.colSpan) !== item.colSpan ) { throw 'item.colSpan must be a number'; }
							if ( Number(item.rowSpan) !== item.rowSpan ) { throw 'item.rowSpan must be a number'; }
							if ( item.colSpan <= 0 ) { throw 'item.colSpan should be positive'; }
							if ( item.rowSpan <= 0 ) { throw 'item.rowSpan should be positive'; }
							if ( ('focus' in item) && Boolean(item.focus) !== item.focus ) { throw 'item.focus must be boolean'; }
							if ( ('disable' in item) && Boolean(item.disable) !== item.disable ) { throw 'item.disable must be boolean'; }
						}
					}
				}
			
				return data;
			}
			
			
			/**
			 * Fill the given rectangle area with value.
			 *
			 * @param {Array[]} map link to navigation map
			 * @param {number} x current horizontal position
			 * @param {number} y current vertical position
			 * @param {number} dX amount of horizontal cell to fill
			 * @param {number} dY amount of vertical cell to fill
			 * @param {*} value filling data
			 */
			function fill ( map, x, y, dX, dY, value ) {
				var i, j;
			
				if ( true ) {
					if ( arguments.length !== 6 ) { throw 'wrong arguments number'; }
					if ( !Array.isArray(map) ) { throw 'wrong map type'; }
				}
			
				// rows
				for ( i = y; i < y + dY; i++ ) {
					// expand map rows
					if ( map.length < i + 1 ) { map.push([]); }
			
					// compensate long columns from previous rows
					while ( map[i][x] !== undefined ) {
						x++;
					}
			
					// cols
					for ( j = x; j < x + dX; j++ ) {
						// expand map row cols
						if ( map[i].length < j + 1 ) { map[i].push(); }
						// fill
						map[i][j] = value;
						// apply coordinates for future mouse clicks
						if ( value.x === undefined ) { value.x = j; }
						if ( value.y === undefined ) { value.y = i; }
					}
				}
			}
			
			
			/**
			 * Create a navigation map from incoming data.
			 *
			 * @param {Array[]} data user 2-dimensional array of objects
			 * @return {Array[]} navigation map
			 */
			function map ( data ) {
				var result = [],
					i, j, item;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( !Array.isArray(data) ) { throw 'wrong data type'; }
				}
			
				// rows
				for ( i = 0; i < data.length; i++ ) {
					// cols
					for ( j = 0; j < data[i].length; j++ ) {
						// cell value
						item = data[i][j];
						// process a cell
						fill(result, j, i, item.colSpan, item.rowSpan, item.$item);
						// clear redundant info
						delete item.$item;
					}
				}
			
				return result;
			}
			
			
			/**
			 * Init or re-init of the component inner structures and HTML.
			 *
			 * @param {Object} config init parameters (subset of constructor config params)
			 */
			Grid.prototype.init = function ( config ) {
				var self = this,
					draw = false,
					i, j,
					$row, $item, $tbody, $focusItem,
					itemData,
					/**
					 * Cell mouse click handler.
					 *
					 * @param {Event} event click event data
					 *
					 * @this Element
					 *
					 * @fires module:stb/ui/grid~Grid#click:item
					 */
					onItemClick = function ( event ) {
						// allow to accept focus
						if ( this.data.disable !== true ) {
							// visualize
							self.focusItem(this);
			
							// there are some listeners
							if ( self.events['click:item'] !== undefined ) {
								// notify listeners
								self.emit('click:item', {$item: this, event: event});
							}
						}
					};
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( typeof config !== 'object' ) { throw 'wrong config type'; }
				}
			
				// apply cycle behaviour
				if ( config.cycleX !== undefined ) { this.cycleX = config.cycleX; }
				if ( config.cycleY !== undefined ) { this.cycleY = config.cycleY; }
			
				// apply data
				if ( config.data !== undefined ) {
					if ( true ) {
						if ( !Array.isArray(config.data) || !Array.isArray(config.data[0]) ) { throw 'wrong config.data type'; }
					}
			
					// new data is different
					if ( this.data !== config.data ) {
						this.data = config.data;
						// need to redraw table
						draw = true;
					}
				}
			
				// custom render method
				if ( config.render !== undefined ) {
					if ( true ) {
						if ( typeof config.render !== 'function' ) { throw 'wrong config.render type'; }
					}
			
					// new render is different
					if ( this.renderItem !== config.render ) {
						this.renderItem = config.render;
						// need to redraw table
						draw = true;
					}
				}
			
				if ( !draw ) {
					// do not redraw table
					return;
				}
			
				// export pointer to inner table
				this.$table = document.createElement('table');
				$tbody      = document.createElement('tbody');
			
				// prepare user data
				this.data = normalize(this.data);
			
				// rows
				for ( i = 0; i < this.data.length; i++ ) {
					// dom
					$row = $tbody.insertRow();
			
					// cols
					for ( j = 0; j < this.data[i].length; j++ ) {
						// dom
						$item = $row.insertCell(-1);
						// additional params
						$item.className = 'item';
			
						// shortcut
						itemData = this.data[i][j];
			
						// for map
						itemData.$item = $item;
			
						// merge columns
						$item.colSpan = itemData.colSpan;
			
						// merge rows
						$item.rowSpan = itemData.rowSpan;
			
						// active cell
						if ( itemData.focus ) {
							// store and clean
							$focusItem = $item;
						}
			
						// disabled cell
						if ( itemData.disable ) {
							// apply CSS
							$item.classList.add('disable');
						}
			
						// marked cell
						if ( itemData.mark ) {
							// apply CSS
							$item.classList.add('mark');
						}
			
						// visualize
						this.renderItem($item, itemData);
			
						// save data link
						$item.data = itemData;
			
						// manual focusing
						$item.addEventListener('click', onItemClick);
					}
					// row is ready
					$tbody.appendChild($row);
				}
			
				// navigation map filling
				this.map = map(this.data);
			
				// clear all table
				this.$body.innerText = null;
			
				// everything is ready
				this.$table.appendChild($tbody);
				this.$body.appendChild(this.$table);
			
				// apply focus
				if ( $focusItem !== undefined ) {
					// focus item was given in data
					this.focusItem($focusItem);
				} else {
					// just the first cell
					this.focusItem(this.map[0][0]);
				}
			};
			
			
			/**
			 * Move focus to the given direction.
			 *
			 * @param {number} direction arrow key code
			 *
			 * @fires module:stb/ui/grid~Grid#cycle
			 * @fires module:stb/ui/grid~Grid#overflow
			 */
			Grid.prototype.move = function ( direction ) {
				var x        = this.focusX,
					y        = this.focusY,
					move     = true,
					overflow = false,
					cycle    = false;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( Number(direction) !== direction ) { throw 'direction must be a number'; }
				}
			
				// shift till full stop
				while ( move ) {
					// arrow keys
					switch ( direction ) {
						case keys.up:
							if ( y > 0 ) {
								// can go one step up
								y--;
							} else {
								if ( this.cycleY ) {
									// jump to the last row
									y = this.map.length - 1;
									cycle = true;
								} else {
									// grid edge
									overflow = true;
								}
							}
							break;
			
						case keys.down:
							if ( y < this.map.length - 1 ) {
								// can go one step down
								y++;
							} else {
								if ( this.cycleY ) {
									// jump to the first row
									y = 0;
									cycle = true;
								} else {
									// grid edge
									overflow = true;
								}
							}
							break;
			
						case keys.right:
							if ( x < this.map[y].length - 1 ) {
								// can go one step right
								x++;
							} else {
								if ( this.cycleX ) {
									// jump to the first column
									x = 0;
									cycle = true;
								} else {
									// grid edge
									overflow = true;
								}
							}
							break;
			
						case keys.left:
							if ( x > 0 ) {
								// can go one step left
								x--;
							} else {
								if ( this.cycleX ) {
									// jump to the last column
									x = this.map[y].length - 1;
									cycle = true;
								} else {
									// grid edge
									overflow = true;
								}
							}
							break;
					}
			
					// full cycle - has come to the start point
					if ( x === this.focusX && y === this.focusY ) {
						// full stop
						move = false;
					}
			
					// focus item has changed and it's not disabled
					if ( this.map[y][x] !== this.map[this.focusY][this.focusX] && this.map[y][x].data.disable !== true ) {
						// full stop
						move = false;
					}
			
					// the last cell in a row/col
					if ( overflow ) {
						// full stop
						move = false;
						// but it's disabled so need to go back
						if ( this.map[y][x].data.disable === true ) {
							// return to the start point
							x = this.focusX;
							y = this.focusY;
						}
					}
				}
			
				if ( cycle ) {
					// there are some listeners
					if ( this.events['cycle'] !== undefined ) {
						/**
						 * Jump to the opposite side.
						 *
						 * @event module:stb/ui/grid~Grid#cycle
						 *
						 * @type {Object}
						 * @property {number} direction key code initiator of movement
						 */
						this.emit('cycle', {direction: direction});
					}
				}
			
				if ( overflow ) {
					// there are some listeners
					if ( this.events['overflow'] !== undefined ) {
						/**
						 * Attempt to go beyond the edge of the grid.
						 *
						 * @event module:stb/ui/grid~Grid#overflow
						 *
						 * @type {Object}
						 * @property {number} direction key code initiator of movement
						 */
						this.emit('overflow', {direction: direction});
					}
				}
			
				// report
				debug.info(this.focusX + ' : ' + x, 'X old/new');
				debug.info(this.focusY + ' : ' + y, 'Y old/new');
				debug.info(cycle,  'cycle');
				debug.info(overflow, 'overflow');
			
				this.focusItem(this.map[y][x]);
			
				// correct coordinates
				// focusItem set approximate values
				this.focusX = x;
				this.focusY = y;
			};
			
			
			/**
			 * Highlight the given DOM element as focused.
			 * Remove focus from the previously focused item.
			 *
			 * @param {Node|Element} $item element to focus
			 * @param {number} $item.x the item horizontal position
			 * @param {number} $item.y the item vertical position
			 *
			 * @return {boolean} operation status
			 *
			 * @fires module:stb/ui/grid~Grid#focus:item
			 * @fires module:stb/ui/grid~Grid#blur:item
			 */
			Grid.prototype.focusItem = function ( $item ) {
				var $prev = this.$focusItem;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
				}
			
				// different element
				if ( $item !== undefined && $prev !== $item && $item.data.disable !== true ) {
					if ( true ) {
						if ( !($item instanceof Element) ) { throw 'wrong $item type'; }
						if ( $item.parentNode.parentNode.parentNode.parentNode !== this.$body ) { throw 'wrong $item parent element'; }
					}
			
					// some item is focused already
					if ( $prev !== null ) {
						if ( true ) {
							if ( !($prev instanceof Element) ) { throw 'wrong $prev type'; }
						}
			
						// style
						$prev.classList.remove('focus');
			
						// there are some listeners
						if ( this.events['blur:item'] !== undefined ) {
							/**
							 * Remove focus from an element.
							 *
							 * @event module:stb/ui/grid~Grid#blur:item
							 *
							 * @type {Object}
							 * @property {Element} $item previously focused HTML element
							 */
							this.emit('blur:item', {$item: $prev});
						}
					}
			
					// draft coordinates
					this.focusX = $item.x;
					this.focusY = $item.y;
			
					// reassign
					this.$focusItem = $item;
			
					// correct CSS
					$item.classList.add('focus');
			
					// there are some listeners
					if ( this.events['focus:item'] !== undefined ) {
						/**
						 * Set focus to an element.
						 *
						 * @event module:stb/ui/grid~Grid#focus:item
						 *
						 * @type {Object}
						 * @property {Element} $prev old/previous focused HTML element
						 * @property {Element} $curr new/current focused HTML element
						 */
						this.emit('focus:item', {$prev: $prev, $curr: $item});
					}
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			/**
			 * Set item state and appearance as marked.
			 *
			 * @param {Node|Element} $item element to focus
			 * @param {boolean} state true - marked, false - not marked
			 */
			Grid.prototype.markItem = function ( $item, state ) {
				if ( true ) {
					if ( arguments.length !== 2 ) { throw 'wrong arguments number'; }
					if ( !($item instanceof Element) ) { throw 'wrong $item type'; }
					if ( $item.parentNode.parentNode.parentNode.parentNode !== this.$body ) { throw 'wrong $item parent element'; }
					if ( Boolean(state) !== state ) { throw 'state must be boolean'; }
				}
			
				// correct CSS
				if ( state ) {
					$item.classList.add('mark');
				} else {
					$item.classList.remove('mark');
				}
			
				// apply flag
				$item.data.mark = state;
			};
			
			
			// public
			module.exports = Grid;


/***/ },
/* 31 */
/*!********************************!*\
  !*** ./app/js/stb/ui/input.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/input
			 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1),
				keys      = __webpack_require__(/*! ../keys */ 3);
			
			
			/**
			 * Base input field implementation.
			 * Has two types: text and password.
			 * Password - replace real text with '*', but real text presents in the own property 'value'.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 * @param {string} [config.value='text'] input text value
			 * @param {string} [config.placeholder='password'] placeholder text value
			 *
			 * @example
			 * var Input = require('stb/ui/input'),
			 *     input = new Input({
			 *         placeholder: 'input password'
			 *         events: {
			 *             change: function ( event ) {
			 *                 debug.log(event.value);
			 *             }
			 *         }
			 *     });
			 */
			function Input ( config ) {
				// current execution context
				var self = this;
			
				// sanitize
				config = config || {};
			
				/**
				 * Text value of input.
				 *
				 * @type {string}
				 */
				this.value = '';
			
				/**
				 * Hint element with placeholder text.
				 *
				 * @type {Element}
				 */
				this.$placeholder = document.createElement('div');
			
				/**
				 * Caret element, which shows current cursor position.
				 *
				 * @type {Element}
				 */
				this.$caret = document.createElement('div');
			
				this.$caret.index = 0;
			
				/**
				 * Input type, now available only text and password.
				 * Different logic with different types.
				 * TYPE_TEXT - normal input.
				 * TYPE_PASSWORD - hidden input, all chars replaced with '*', but real value is located in 'this.value'.
				 *
				 * @type {number}
				 */
				this.type = this.TYPE_TEXT;
			
				// parent init
				Component.call(this, config);
			
				// create $body if not provided
				if ( this.$node === this.$body ) {
					// insert text line
					this.$body = this.$node.appendChild(document.createElement('div'));
			
					// classes
					this.$body.className = 'body';
					this.$caret.className = 'caret';
					this.$placeholder.className = 'placeholder';
			
					// appends hint and caret to input
					this.$body.appendChild(this.$caret);
					this.$body.appendChild(this.$placeholder);
				}
			
				// correct CSS class names
				this.$node.classList.add('input');
			
				// component setup
				this.init(config);
			
				// custom navigation method
				// todo: reassign this.navigate in init
				if ( config.navigate !== undefined ) {
					if ( true ) {
						if ( typeof config.navigate !== 'function' ) { throw 'wrong config.navigate type'; }
					}
					// apply
					this.navigate = config.navigate;
				}
			
				// navigation by keyboard
				this.addListener('keydown', this.navigate);
			
				this.addListener('keypress', function ( event ) {
					self.addChar(String.fromCharCode(event.keyCode), self.$caret.index);
				});
			}
			
			
			// inheritance
			Input.prototype = Object.create(Component.prototype);
			Input.prototype.constructor = Input;
			
			// input types
			Input.prototype.TYPE_TEXT     = 0;
			Input.prototype.TYPE_PASSWORD = 1;
			
			
			/**
			 * Default method to move focus according to pressed keys.
			 *
			 * @param {Event} event generated event source of movement
			 */
			Input.prototype.navigateDefault = function ( event ) {
				switch ( event.code ) {
					case keys['delete']:
						this.removeChar(this.$caret.index);
						break;
			
					case keys.back:
						this.removeChar(this.$caret.index - 1);
						break;
			
					case keys.left:
						this.setCaretPosition(this.$caret.index - 1);
						break;
			
					case keys.right:
						this.setCaretPosition(this.$caret.index + 1);
						break;
			
					case keys.end:
					case keys.down:
						this.setCaretPosition(this.value.length);
						break;
			
					case keys.home:
					case keys.up:
						this.setCaretPosition(0);
						break;
			
					default:
						break;
				}
			};
			
			
			/**
			 * Current active method to move focus according to pressed keys.
			 * Can be redefined to provide custom navigation.
			 *
			 * @type {function}
			 */
			Input.prototype.navigate = Input.prototype.navigateDefault;
			
			
			/**
			 * Init or re-init of the component inner structures and HTML.
			 *
			 * @param {Object} config init parameters (subset of constructor config params)
			 */
			Input.prototype.init = function ( config ) {
				// type passed
				if ( config.type !== undefined ) {
					if ( true ) {
						if ( Number(config.type) !== config.type ) { throw 'config.type must be a number'; }
						if ( config.type !== this.TYPE_TEXT && config.type !== this.TYPE_PASSWORD ) { throw 'config.type must be one of the TYPE_* constant'; }
					}
					// apply
					this.type = config.type;
				}
			
				// default value passed
				if ( config.value !== undefined ) {
					if ( true ) {
						if ( typeof config.value !== 'string' ) { throw 'config.value must be a string'; }
					}
					// apply
					this.setValue(config.value);
				}
			
				// hint
				if ( config.placeholder !== undefined ) {
					if ( true ) {
						if ( typeof config.placeholder !== 'string' ) { throw 'config.placeholder must be a string'; }
						if ( config.placeholder.length === 0 ) { throw 'config.placeholder must be not an empty string'; }
					}
					// apply
					this.$placeholder.innerText = config.placeholder;
				}
			};
			
			
			/**
			 * Add given char to given position.
			 * Also moving caret in every action.
			 * Do nothing if position is < 0, or if index more or equals to length add char to the end.
			 *
			 * @param {string} char symbol to add
			 * @param {number} [index=this.value.length] given position
			 *
			 * @fires module:stb/ui/input~Input#input
			 */
			Input.prototype.addChar = function ( char, index ) {
				var $char = document.createElement('div');
			
				index = (index === undefined) ? this.$caret.index : index;
			
				if ( true ) {
					if ( index < 0 ) { throw 'index must be more than 0 or equal to 0'; }
					if ( typeof char !== 'string' ) { throw 'char must be a string'; }
					if ( char.length !== 1 ) { throw 'char must be a string with length = 1'; }
				}
			
				// remove hint
				if ( this.value.length === 0 ) {
					this.$body.removeChild(this.$placeholder);
				}
			
				// settings class name for span which presents one symbol in virtual input
				$char.className = 'char';
			
				// insert char into value
				this.value = this.value.substring(0, index) + char + this.value.substring(index, this.value.length);
			
				// move caret
				++this.$caret.index;
			
				if ( this.type === this.TYPE_PASSWORD ) {
					$char.innerText = '*';
				} else if ( char === ' ' ) {
					$char.innerHTML = '&nbsp;';
				} else {
					$char.innerText = char;
				}
			
				if ( index >= this.value.length ) { // add char to the end, move caret to the end
					this.$body.appendChild($char);
					this.$body.appendChild(this.$caret);
				} else { // move caret before index, append span before caret
					this.$body.insertBefore(this.$caret, this.$body.children[index]);
					this.$body.insertBefore($char, this.$caret);
				}
			
				// there are some listeners
				if ( this.events['input'] !== undefined ) {
					// notify listeners
					this.emit('input', {value: this.value});
				}
			};
			
			
			/**
			 * Remove char from given position.
			 * Do nothing if index is out of the range (0, length).
			 *
			 * @param {number} [index=this.$caret.index - 1] index given position
			 *
			 * @fires module:stb/ui/input~Input#input
			 */
			Input.prototype.removeChar = function ( index ) {
				index = (index === undefined) ? this.$caret.index - 1 : index;
				// non-empty string
				if ( this.value.length > 0 ) {
					if ( true ) {
						if ( index < 0 ) { throw 'index must be a positive value'; }
						if ( index > this.value.length ) { throw 'index must be a less than or equal to total length'; }
					}
			
					if ( this.$caret.index === index && index < this.value.length ) {
						// remove char after caret
						this.$body.removeChild(this.$body.children[index + 1]);
					} else if ( this.$caret.index > index ) {
						// remove char before caret
						--this.$caret.index;
						this.$body.removeChild(this.$body.children[index]);
					}
			
					// cut one char from the value
					this.value = this.value.substring(0, index) + this.value.substring(index + 1, this.value.length);
			
					// there are some listeners
					if ( this.events['input'] !== undefined ) {
						// notify listeners
						this.emit('input', {value: this.value});
					}
				}
			
				// only hint
				if ( this.value.length === 0 ) {
					this.$body.appendChild(this.$placeholder);
				}
			};
			
			
			/**
			 * Move caret to the given position.
			 * Do nothing if index is out of the range (0, this.value.length).
			 *
			 * @param {number} index given position
			 */
			Input.prototype.setCaretPosition = function ( index ) {
				// check boundaries and current position
				if ( index >= 0 && index <= this.value.length && this.$caret.index !== index ) {
					// extract caret
					this.$body.removeChild(this.$caret);
			
					// apply
					if ( index === this.value.length ) {
						// add to the end
						this.$body.appendChild(this.$caret);
					} else {
						this.$body.insertBefore(this.$caret, this.$body.children[index]);
					}
			
					this.$caret.index = index;
				}
			};
			
			
			/**
			 * Setting new text value of the input field.
			 *
			 * @param {string} value given string value
			 */
			Input.prototype.setValue = function ( value ) {
				var oldLength = this.value.length,
					newLength = value.length,
					i = 0,
					$char, diff;
			
				if ( true ) {
					if ( typeof value !== 'string' ) { throw 'value must be a string'; }
				}
			
				// non-empty string
				if ( newLength > 0 ) {
					// no hint
					if ( this.$placeholder.parentNode === this.$body ) {
						this.$body.removeChild(this.$placeholder);
					}
			
					// no cursor
					this.$body.removeChild(this.$caret);
			
					// value length has changed
					if ( newLength !== oldLength ) {
						diff = newLength - oldLength;
			
						// need to correct char divs amount
						if ( diff > 0 ) {
							// add missing chars
							for ( i = 0; i < diff; i++ ) {
								$char = this.$body.appendChild(document.createElement('div'));
								$char.className = 'char';
							}
						} else {
							// remove unnecessary chars
							for ( i = 0; i > diff; i-- ) {
								this.$body.removeChild(this.$body.lastChild);
							}
						}
					}
			
					// apply value
					for ( i = 0; i < newLength; i++ ) {
						$char = this.$body.children[i];
			
						if ( this.type === this.TYPE_PASSWORD ) {
							$char.innerHTML = '*';
						} else if ( value[i] === ' ' ) {
							$char.innerHTML = '&nbsp;';
						} else {
							$char.innerText = value[i];
						}
					}
			
					this.value = value;
					this.$caret.index = newLength;
					this.$body.appendChild(this.$caret);
				} else {
					// empty string
					this.value = '';
					this.$body.innerText = '';
					this.$body.appendChild(this.$caret);
					this.$body.appendChild(this.$placeholder);
				}
			
				// there are some listeners
				if ( this.events['input'] !== undefined ) {
					// notify listeners
					this.emit('input', {value: this.value});
				}
			};
			
			
			// public
			module.exports = Input;


/***/ },
/* 32 */
/*!****************************************!*\
  !*** ./app/js/stb/ui/modal.message.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/modal.message
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var ModalBox = __webpack_require__(/*! ./modal.box.js */ 14);
			
			
			/**
			 * Base modal window implementation.
			 *
			 * @constructor
			 * @extends ModalBox
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 */
			function ModalMessage ( config ) {
				// sanitize
				config = config || {};
			
				// parent init
				ModalBox.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('modalMessage');
			
				this.$header  = this.$body.appendChild(document.createElement('div'));
				this.$content = this.$body.appendChild(document.createElement('div'));
				this.$footer  = this.$body.appendChild(document.createElement('div'));
			
				this.$header.className  = 'header';
				this.$content.className = 'content';
				this.$footer.className  = 'footer';
			
				this.$header.innerText  = 'header';
				this.$content.innerText = 'content';
				this.$footer.innerText  = 'footer';
			}
			
			
			// inheritance
			ModalMessage.prototype = Object.create(ModalBox.prototype);
			ModalMessage.prototype.constructor = ModalMessage;
			
			
			// public
			module.exports = ModalMessage;


/***/ },
/* 33 */
/*!***************************************!*\
  !*** ./app/js/stb/ui/progress.bar.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/progress.bar
			 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base progress bar implementation.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 * @param {number} [config.value=0] initial value
			 * @param {number} [config.max=100] max progress value
			 * @param {number} [config.min=0] min progress value
			 *
			 * @example
			 * var ProgressBar = require('stb/ui/progress.bar'),
			 *     progressBar = new ProgressBar({
			 *         min: -100,
			 *         max:  200,
			 *         events: {
			 *             done: function () {
			 *                 debug.log('ProgressBar: done');
			 *             },
			 *             change: function ( data ) {
			 *                 debug.log('ProgressBar: change to ' + data.curr + ' from ' + data.prev);
			 *             }
			 *         }
			 *     });
			 */
			function ProgressBar ( config ) {
				// sanitize
				config = config || {};
			
				/**
				 * Max progress value.
				 *
				 * @type {number}
				 */
				this.max = 100;
			
				/**
				 * Min progress value.
				 *
				 * @type {number}
				 */
				this.min = 0;
			
				/**
				 * Initial progress position.
				 *
				 * @type {number}
				 */
				this.value = 0;
			
				/**
				 * Value of the one percent step
				 *
				 * @type {number}
				 */
				this.step = 1;
			
				// can't accept focus
				config.focusable = config.focusable || false;
			
				// parent init
				Component.call(this, config);
			
				// create $body if not provided
				if ( this.$node === this.$body ) {
					// insert bar line
					this.$body = this.$node.appendChild(document.createElement('div'));
				}
			
				// correct CSS class names
				this.$node.classList.add('progressBar');
				this.$body.classList.add('value');
			
				// component setup
				this.init(config);
			}
			
			
			// inheritance
			ProgressBar.prototype = Object.create(Component.prototype);
			ProgressBar.prototype.constructor = ProgressBar;
			
			
			/**
			 * Set position of the given value.
			 * Does nothing in case when progress is end and passed value is more than max value.
			 *
			 * @param {number} value new value to set
			 * @return {boolean} operation result
			 *
			 * @fires module:stb/ui/progress.bar~ProgressBar#done
			 * @fires module:stb/ui/progress.bar~ProgressBar#change
			 */
			ProgressBar.prototype.set = function ( value ) {
				var prevValue = this.value;
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
				}
			
				// value changed but in the given range
				if ( this.value !== value && value <= this.max && value >= this.min ) {
					if ( true ) {
						if ( Number(value) !== value ) { throw 'value must be a number'; }
					}
			
					// set new value
					this.value = value;
			
					// get value in percents
					value = Math.abs(this.value - this.min) / this.step;
			
					if ( value === 100 ) {
						// there are some listeners
						if ( this.events['done'] !== undefined ) {
							/**
							 * Set progress to its maximum value.
							 *
							 * @event module:stb/ui/progress.bar~ProgressBar#done
							 */
							this.emit('done');
						}
					}
			
					// set progress bar width
					this.$body.style.width = value + '%';
			
					// there are some listeners
					if ( this.events['change'] !== undefined ) {
						/**
						 * Update progress value.
						 *
						 * @event module:stb/ui/progress.bar~ProgressBar#change
						 *
						 * @type {Object}
						 * @property {number} prev old/previous progress value
						 * @property {number} curr new/current progress value
						 */
						this.emit('change', {curr: this.value, prev: prevValue});
					}
			
					return true;
				}
			
				return false;
			};
			
			
			/**
			 * Init or re-init current max or/and min or/and value.
			 *
			 * @param {Object} config init parameters (subset of constructor config params)
			 */
			ProgressBar.prototype.init = function ( config ) {
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( typeof config !== 'object' ) { throw 'wrong config type'; }
				}
			
				// set max progress value
				if ( config.max !== undefined ) {
					if ( true ) {
						if ( Number(config.max) !== config.max ) { throw 'config.max value must be a number'; }
					}
					// apply
					this.max = config.max;
				}
			
				// set min progress value
				if ( config.min !== undefined ) {
					if ( true ) {
						if ( Number(config.min) !== config.min ) { throw 'config.min value must be a number'; }
					}
					// apply
					this.min = config.min;
				}
			
				if ( true ) {
					if ( this.min >= this.max ) { throw 'this.min value must be less than this.max'; }
				}
			
				// set actual progress value
				if ( config.value !== undefined ) {
					if ( true ) {
						if ( Number(config.value) !== config.value ) { throw 'config.value must be a number'; }
						if ( config.value > this.max ) { throw 'config.value more than config.maximum'; }
						if ( config.value < this.min ) { throw 'config.value less than config.minimum'; }
					}
					// apply
					this.value = config.value;
				}
			
				this.step = Math.abs(this.max - this.min) / 100;
			
				// init bar size, (this.min - this.value) - calculate distance from start
				this.$body.style.width = (Math.abs(this.min - this.value) / this.step) + '%';
			};
			
			
			// public
			module.exports = ProgressBar;


/***/ },
/* 34 */
/*!*************************************!*\
  !*** ./app/js/stb/ui/scroll.bar.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/scroll.bar
			 * @author Igor Zaporozhets <deadbyelpy@gmail.com>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base scroll bar implementation.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 * @param {number} [config.value=0] initial thumb position
			 * @param {number} [config.realSize=100] actual scroll size
			 * @param {number} [config.viewSize=10] visible area size
			 *
			 * @example
			 * var ScrollBar = require('stb/ui/scroll.bar'),
			 *     scrollBar = new ScrollBar({
			 *         viewSize: 5,
			 *         realSize: 25,
			 *         events: {
			 *             done: function () {
			 *                 debug.log('ScrollBar: done');
			 *             },
			 *             change: function ( data ) {
			 *                 debug.log('ScrollBar: change to ' + data.curr + ' from ' + data.prev);
			 *             }
			 *         }
			 *     });
			 */
			function ScrollBar ( config ) {
				// sanitize
				config = config || {};
			
				/**
				 * Visible area size.
				 *
				 * @type {number}
				 */
				this.viewSize = 10;
			
				/**
				 * Scroll area actual height or width (if scroll is horizontal).
				 *
				 * @type {number}
				 */
				this.realSize = 100;
			
				/**
				 * Scroll thumb position.
				 *
				 * @type {number}
				 */
				this.value = 0;
			
				/**
				 * Component orientation.
				 *
				 * @type {number}
				 */
				this.type = this.TYPE_VERTICAL;
			
				/**
				 * Geometry of the scroll thumb element.
				 *
				 * @type {ClientRect}
				 */
				this.thumbRect = null;
			
				/**
				 * Geometry of the scroll track element.
				 *
				 * @type {ClientRect}
				 */
				this.trackRect = null;
			
				// can't accept focus
				config.focusable = config.focusable || false;
			
				// parent init
				Component.call(this, config);
			
				// create $body if not provided
				if ( this.$node === this.$body ) {
					// insert thumb line
					this.$body = this.$node.appendChild(document.createElement('div'));
				}
			
				// horizontal or vertical
				if ( config.type !== undefined ) {
					if ( true ) {
						if ( Number(config.type) !== config.type ) { throw 'config.type must be a number'; }
					}
					// apply
					this.type = config.type;
				}
			
				// correct CSS class names
				this.$node.classList.add('scrollBar');
				this.$body.classList.add('thumb');
			
				if ( this.type === this.TYPE_HORIZONTAL ) {
					this.$node.classList.add('horizontal');
				}
			
				// component setup
				this.init(config);
			}
			
			
			// inheritance
			ScrollBar.prototype = Object.create(Component.prototype);
			ScrollBar.prototype.constructor = ScrollBar;
			
			
			ScrollBar.prototype.TYPE_VERTICAL   = 1;
			ScrollBar.prototype.TYPE_HORIZONTAL = 2;
			
			
			/**
			 * Init or re-init realSize/viewSize/value parameters.
			 *
			 * @param {Object} config init parameters (subset of constructor config params)
			 */
			ScrollBar.prototype.init = function ( config ) {
				config = config || {};
			
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( typeof config !== 'object' ) { throw 'wrong config type'; }
				}
			
				// set actual scroll size
				if ( config.realSize !== undefined ) {
					if ( true ) {
						if ( Number(config.realSize) !== config.realSize ) { throw 'config.realSize value must be a number'; }
					}
					// apply
					this.realSize = config.realSize;
				}
			
				// set visible area size
				if ( config.viewSize !== undefined ) {
					if ( true ) {
						if ( Number(config.viewSize) !== config.viewSize ) { throw 'config.viewSize value must be a number'; }
						if ( config.viewSize <= 0 ) { throw 'config.viewSize value must be greater than 0'; }
					}
					// apply
					this.viewSize = config.viewSize;
				}
			
				// show or hide thumb
				if ( this.viewSize >= this.realSize ) {
					this.$body.classList.add('hidden');
				} else {
					this.$body.classList.remove('hidden');
				}
			
				// set thumb position
				if ( config.value !== undefined ) {
					// apply
					this.scrollTo(config.value);
				}
			
				// set thumb size
				if ( this.type === this.TYPE_VERTICAL ) {
					this.$body.style.height = (this.viewSize / this.realSize * 100) + '%';
				} else {
					this.$body.style.width = (this.viewSize / this.realSize * 100) + '%';
				}
			
				// geometry
				this.thumbRect = this.$body.getBoundingClientRect();
				this.trackRect = this.$node.getBoundingClientRect();
			};
			
			
			/**
			 * Set position of the given value.
			 * Does nothing in case when scroll is in the end and passed value is more than scroll bar length.
			 *
			 * @param {number} value new value to set
			 * @return {boolean} operation result
			 *
			 * @fires module:stb/ui/scroll.bar~ScrollBar#done
			 * @fires module:stb/ui/scroll.bar~ScrollBar#change
			 */
			ScrollBar.prototype.scrollTo = function ( value ) {
				if ( true ) {
					if ( arguments.length !== 1 ) { throw 'wrong arguments number'; }
					if ( Number(value) !== value ) { throw 'value must be a number'; }
					if ( this.realSize > this.viewSize && value > this.realSize - this.viewSize ) { throw 'value is greater than this.realSize-this.viewSize'; }
					if ( value < 0 ) { throw 'value is less then 0'; }
				}
			
				// value has changed
				if ( this.value !== value ) {
					// track and thumb geometry was not set
					if ( this.thumbRect.height === 0 || this.thumbRect.width === 0 ) {
						// apply
						this.trackRect = this.$node.getBoundingClientRect();
						this.thumbRect = this.$body.getBoundingClientRect();
					}
			
					// set scroll bar width
					if ( this.type === this.TYPE_VERTICAL ) {
						this.$body.style.marginTop = ((this.trackRect.height - this.thumbRect.height) * value / (this.realSize - this.viewSize)) + 'px';
					} else {
						this.$body.style.marginLeft = ((this.trackRect.width - this.thumbRect.width) * value / (this.realSize - this.viewSize)) + 'px';
					}
			
					// there are some listeners
					if ( this.events['change'] !== undefined ) {
						/**
						 * Update scroll value.
						 *
						 * @event module:stb/ui/scroll.bar~ScrollBar#change
						 *
						 * @type {Object}
						 * @property {number} prev old/previous scroll value
						 * @property {number} curr new/current scroll value
						 */
						this.emit('change', {curr: value, prev: this.value});
					}
			
					// is it the end?
					if ( value >= this.realSize ) {
						value = this.realSize;
			
						// there are some listeners
						if ( this.events['done'] !== undefined ) {
							/**
							 * Set scroll to its maximum value.
							 *
							 * @event module:stb/ui/scroll.bar~ScrollBar#done
							 */
							this.emit('done');
						}
					}
			
					// set new value
					this.value = value;
			
					return true;
				}
			
				// nothing was done
				return false;
			};
			
			
			// public
			module.exports = ScrollBar;


/***/ },
/* 35 */
/*!*********************************!*\
  !*** ./app/js/stb/ui/widget.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * @module stb/ui/widget
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Component = __webpack_require__(/*! ../component */ 1);
			
			
			/**
			 * Base widget implementation.
			 *
			 * A part-screen top-level layer that can operate as an independent separate entity.
			 *
			 * @constructor
			 * @extends Component
			 *
			 * @param {Object} [config={}] init parameters (all inherited from the parent)
			 * @param {boolean} [config.visible=false] component initial visibility state flag
			 * @param {boolean} [config.focusable=false] component can accept focus or not
			 *
			 * @example
			 * var Widget = require('stb/ui/widget'),
			 *     widget = new Widget({
			 *         $node: document.getElementById(id)
			 *     });
			 *
			 * // somewhere
			 * widget.show();
			 */
			function Widget ( config ) {
				// sanitize
				config = config || {};
			
				// can't accept focus
				config.focusable = config.focusable || false;
			
				// hidden
				config.visible = config.visible || false;
			
				// parent init
				Component.call(this, config);
			
				// correct CSS class names
				this.$node.classList.add('widget');
			}
			
			
			// inheritance
			Widget.prototype = Object.create(Component.prototype);
			Widget.prototype.constructor = Widget;
			
			
			// public
			module.exports = Widget;


/***/ },
/* 36 */
/*!************************************!*\
  !*** ./app/js/tabs/main.button.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Button = __webpack_require__(/*! ../stb/ui/button */ 6),
				Panel  = __webpack_require__(/*! ../stb/ui/panel */ 2),
				panel  = new Panel({
					$node: document.getElementById('pageMainTabButton'),
					visible: false
				});
			
			
			panel.add(
				new Panel({
					$node: document.getElementById('pageMainTabButtonSimple'),
					children: [
						new Button({
							value: 'press me'
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabButtonIcon'),
					children: [
						new Button({
							icon: 'menu'
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabButtonIconText'),
					children: [
						new Button({
							icon: 'menu',
							value: 'press me'
						})
					]
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 37 */
/*!***************************************!*\
  !*** ./app/js/tabs/main.check.box.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Panel    = __webpack_require__(/*! ../stb/ui/panel */ 2),
				CheckBox = __webpack_require__(/*! ../stb/ui/check.box */ 29),
				panel    = new Panel({
					$node: document.getElementById('pageMainTabCheckBox'),
					visible: false
				});
			
			
			panel.add(
				new Panel({
					$node: document.getElementById('pageMainTabCheckBoxSimple'),
					children: [
						new CheckBox()
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabCheckBoxGroup'),
					children: [
						new CheckBox({group: 'main', value: false}),
						new CheckBox({group: 'main', value: true}),
						new CheckBox({group: 'main', value: false}),
						new CheckBox({group: 'main', value: false})
					]
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 38 */
/*!***************************************!*\
  !*** ./app/js/tabs/main.grid.data.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			module.exports = {
				'table 1x1 with no merge': {
					raw: [
						[1]
					],
					check: [[1]]
				},
			
				'table 3x3 with no merge': {
					raw: [
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9]
					],
					check: [
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9]
					]
				},
			
				'table 3x3 with merge 2x2 #1': {
					raw: [
						[{value: '1;2;4;5', rowSpan: 2, colSpan: 2}, 3],
						[6],
						[7, 8, 9]
					],
					check: [
						['1;2;4;5', '1;2;4;5', 3],
						['1;2;4;5', '1;2;4;5', 6],
						[7,          8,        9]
					]
				},
			
				'table 3x3 with merge 2x2 #2': {
					raw: [
						[1, {value: '2;3;5;6', rowSpan: 2, colSpan: 2}],
						[4],
						[7, 8, 9]
					],
					check: [
						[1, '2;3;5;6', '2;3;5;6'],
						[4, '2;3;5;6', '2;3;5;6'],
						[7,  8,         9]
					]
				},
			
				'table 3x3 with merge 2x2 #3': {
					raw: [
						[1, 2, 3],
						[4, {value: '5;6;8;9', rowSpan: 2, colSpan: 2}],
						[7]
					],
					check: [
						[1,  2,         3],
						[4, '5;6;8;9', '5;6;8;9'],
						[7, '5;6;8;9', '5;6;8;9']
					]
				},
			
				'table 3x3 with merge 2x2 #4': {
					raw: [
						[1, 2, 3],
						[{value: '4;5;7;8', rowSpan: 2, colSpan: 2}, 6],
						[9]
					],
					check: [
						[1,          2,        3],
						['4;5;7;8', '4;5;7;8', 6],
						['4;5;7;8', '4;5;7;8', 9]
					]
				},
			
				'table 3x3 with merge 3x1 #1': {
					raw: [
						[{value: '1;2;3', colSpan: 3}],
						[4,       5,      6],
						[7,       8,      9]
					],
					check: [
						['1;2;3', '1;2;3', '1;2;3'],
						[4,        5,       6],
						[7,        8,       9]
					]
				},
			
				'table 3x3 with merge 3x1 #2': {
					raw: [
						[1, 2, 3],
						[{value: '4;5;6', colSpan: 3}],
						[7, 8, 9]
					],
					check: [
						[1,        2,       3],
						['4;5;6', '4;5;6', '4;5;6'],
						[7,        8,       9]
					]
				},
			
				'table 3x3 with merge 3x1 #3': {
					raw: [
						[1, 2, 3],
						[4, 5, 6],
						[{value: '7;8;9', colSpan: 3}]
					],
					check: [
						[1,        2,       3],
						[4,        5,       6],
						['7;8;9', '7;8;9', '7;8;9']
					]
				},
			
				'table 3x3 with merge 1x3 #1': {
					raw: [
						[{value: '1;4;7', rowSpan: 3}, 2, 3],
						[5, 6],
						[8, 9]
					],
					check: [
						['1;4;7', 2, 3],
						['1;4;7', 5, 6],
						['1;4;7', 8, 9]
					]
				},
			
				'table 3x3 with merge 1x3 #2': {
					raw: [
						[1, {value: '2;5;8', rowSpan: 3}, 3],
						[4, 6],
						[7, 9]
					],
					check: [
						[1, '2;5;8', 3],
						[4, '2;5;8', 6],
						[7, '2;5;8', 9]
					]
				},
			
				'table 3x3 with merge 1x3 #3': {
					raw: [
						[1, 2, {value: '3;6;9', rowSpan: 3}],
						[4, 5],
						[7, 8]
					],
					check: [
						[1, 2, '3;6;9'],
						[4, 5, '3;6;9'],
						[7, 8, '3;6;9']
					]
				},
			
				'table 2x2 with all merged cells': {
					raw: [
						[{value: '1-4', rowSpan: 2, colSpan: 2}]
					],
					check: [
						['1-4', '1-4'],
						['1-4', '1-4']
					]
				},
			
				'table 3x3 with all merged cells': {
					raw: [
						[{value: '1-9', rowSpan: 3, colSpan: 3}]
					],
					check: [
						['1-9', '1-9', '1-9'],
						['1-9', '1-9', '1-9'],
						['1-9', '1-9', '1-9']
					]
				},
			
				'table 3x3 with horizontal stripes #1': {
					raw: [
						[{value: '1;2', colSpan: 2}, 3],
						[4, {value: '5;6', colSpan: 2}],
						[{value: '7;8', colSpan: 2}, 9]
					],
					check: [
						['1;2', '1;2',  3],
						[4,     '5;6', '5;6'],
						['7;8', '7;8',  9]
					]
				},
			
				'table 3x3 with horizontal stripes #2': {
					raw: [
						[1, {value: '2;3', colSpan: 2}],
						[{value: '4;5', colSpan: 2}, 6],
						[7, {value: '8;9', colSpan: 2}]
					],
					check: [
						[1,     '2;3', '2;3'],
						['4;5', '4;5',  6],
						[7,     '8;9', '8;9']
					]
				},
			
				'table 3x3 with vertical stripes #1': {
					raw: [
						[{value: '1;4', rowSpan: 2}, 2, {value: '3;6', rowSpan: 2}],
						[{value: '5;8', rowSpan: 2}],
						[7, 9]
					],
					check: [
						['1;4',  2,    '3;6'],
						['1;4', '5;8', '3;6'],
						[7,     '5;8',  9]
					]
				},
			
				'table 3x3 with vertical stripes #2': {
					raw: [
						[1, {value: '2;5', rowSpan: 2}, 3],
						[{value: '4;7', rowSpan: 2}, {value: '6;9', rowSpan: 2}],
						[8]
					],
					check: [
						[1,     '2;5',  3],
						['4;7', '2;5', '6;9'],
						['4;7',  8,    '6;9']
					]
				},
			
				'table 3x3 with spiral merge #1': {
					raw: [
						[{value: '1;2', rowSpan: 1, colSpan: 2}, {value: '3;6', rowSpan: 2, colSpan: 1}],
						[{value: '4;7', rowSpan: 2, colSpan: 1}, 5],
						[{value: '8;9', rowSpan: 1, colSpan: 2}]
					],
					check: [
						['1;2', '1;2', '3;6'],
						['4;7',  5,    '3;6'],
						['4;7', '8;9', '8;9']
					]
				},
			
				'table 3x3 with spiral merge #2': {
					raw: [
						[{value: '1;4', rowSpan: 2, colSpan: 1}, {value: '2;3', rowSpan: 1, colSpan: 2}],
						[5, {value: '6;9', rowSpan: 2, colSpan: 1}],
						[{value: '7;8', rowSpan: 1, colSpan: 2}]
					],
					check: [
						['1;4', '2;3', '2;3'],
						['1;4',  5,    '6;9'],
						['7;8', '7;8', '6;9']
					]
				},
			
				'table 5x5 with merge #1': {
					raw: [
						[1, 2, 3, 4, 5],
						[6, {value: '7-9', colSpan: 3}, 10],
						[{value: '11;12;16;17', rowSpan: 2, colSpan: 2}, 13, 14, {value: '15;20', rowSpan: 2}],
						[18, 19],
						[{value: '26-30', colSpan: 5}],
						[{value: '31-40', colSpan: 5, rowSpan: 2}]
					],
					check: [
						[1,              2,            3,       4,       5],
						[6,             '7-9',        '7-9',   '7-9',    10],
						['11;12;16;17', '11;12;16;17', 13,      14,     '15;20'],
						['11;12;16;17', '11;12;16;17', 18,      19,     '15;20'],
						['26-30',       '26-30',      '26-30', '26-30', '26-30'],
						['31-40',       '31-40',      '31-40', '31-40', '31-40'],
						['31-40',       '31-40',      '31-40', '31-40', '31-40']
					]
				},
			
				'table 5x5 with merge #2': {
					raw: [
						[1, 2, 3, 4, {value: '5;10;15;20', rowSpan: 4}],
						[6, {value: '7-9', colSpan: 3}],
						[{value: '11;12;16;17', rowSpan: 2, colSpan: 2}, 13, 14],
						[18, 19],
						[{value: '21-25', colSpan: 5}],
						[{value: '26-35', colSpan: 5, rowSpan: 2}]
					],
					check: [
						[1,              2,            3,       4,      '5;10;15;20'],
						[6,             '7-9',        '7-9',   '7-9',   '5;10;15;20'],
						['11;12;16;17', '11;12;16;17', 13,      14,     '5;10;15;20'],
						['11;12;16;17', '11;12;16;17', 18,      19,     '5;10;15;20'],
						['21-25',       '21-25',      '21-25', '21-25', '21-25'],
						['26-35',       '26-35',      '26-35', '26-35', '26-35'],
						['26-35',       '26-35',      '26-35', '26-35', '26-35']
					]
				},
			
				'table 4x2 with tricky long columns #1': {
					raw: [
						[{value: '1;3;5', rowSpan: 3}, 2],
						[{value: '4;6;8', rowSpan: 3}],
						[],  // have to be specified
						[7]
					],
					check: [
						['1;3;5',  2],
						['1;3;5', '4;6;8'],
						['1;3;5', '4;6;8'],
						[7,       '4;6;8']
					]
				},
			
				'table 4x2 with tricky long columns #2': {
					raw: [
						[1, {value: '2;4;6', rowSpan: 3}],
						[{value: '3;5;7', rowSpan: 3}],
						[],  // have to be specified
						[8]
					],
					check: [
						[1,       '2;4;6'],
						['3;5;7', '2;4;6'],
						['3;5;7', '2;4;6'],
						['3;5;7',  8]
					]
				}
			};


/***/ },
/* 39 */
/*!**********************************!*\
  !*** ./app/js/tabs/main.grid.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Panel    = __webpack_require__(/*! ../stb/ui/panel */ 2),
				Button   = __webpack_require__(/*! ../stb/ui/button */ 6),
				Grid     = __webpack_require__(/*! ../stb/ui/grid */ 30),
				keys     = __webpack_require__(/*! ../stb/keys */ 3),
				gridData = __webpack_require__(/*! ./main.grid.data */ 38),
				panel    = new Panel({
					$node: document.getElementById('pageMainTabGrid'),
					visible: false
				}),
				gridDataIndex = 0,
				grid1, grid2;
			
			
			// add random disabled cells
			Object.keys(gridData).forEach(function ( key ) {
				gridData[key].raw.forEach(function ( row ) {
					row = row.map(function ( cell ) {
						if ( typeof cell !== 'object' ) {
							cell = {value: cell};
						}
						return cell;
					});
					row.forEach(function ( cell ) {
						if ( Math.random() > 0.7 ) {
							cell.disable = true;
						}
					});
				});
			});
			
			
			panel.add(
				new Button({
					$node: document.getElementById('pageMainTabGridBtnPrev'),
					value: '<< prev grid data',
					events: {
						click: function () {
							var key;
			
							if ( gridDataIndex > 0 ) {
								gridDataIndex--;
								key = Object.keys(gridData)[gridDataIndex];
								grid1.parent.$node.children[0].innerText = key;
								grid1.init({
									data: gridData[key].raw
								});
							}
						}
					}
				}),
			
				new Button({
					$node: document.getElementById('pageMainTabGridBtnNext'),
					value: 'next grid data >>',
					events: {
						click: function () {
							var key;
			
							if ( gridDataIndex < Object.keys(gridData).length - 1 ) {
								gridDataIndex++;
								key = Object.keys(gridData)[gridDataIndex];
								grid1.parent.$node.children[0].innerText = key;
								grid1.init({
									data: gridData[key].raw
								});
							}
						}
					}
				}),
			
				new Button({
					$node: document.getElementById('pageMainTabGridBtnCycle'),
					value: 'toggle cycle mode',
					events: {
						click: function () {
							grid1.init({
								cycleX: !grid1.cycleX,
								cycleY: !grid1.cycleY
							});
						}
					}
				}),
			
			
				new Panel({
					$node: document.getElementById('pageMainTabGridMain'),
					$body: document.getElementById('pageMainTabGridMainBody'),
					children: [
						grid1 = new Grid({
							data: [
								[{value: 1, disable: true}, 2,  3,  4],
								[5, {value: 6, disable: true},  7,  8],
								[9,  10, 11, 12],
								[13, 14, 15, {value: 16, focus: true}]
							],
							render: function ( $cell, data ) {
								$cell.innerHTML = '<div>' + (data.value) + '</div>';
							},
							cycleX: false,
							cycleY: false
						})
					]
				}),
			
				new Panel({
					$node: document.getElementById('pageMainTabGridJoin'),
					children: [
						grid2 = new Grid({
							data: [
								[1, 2, {value: 3, mark: true}, 4, {value: '5;10;15;20', rowSpan: 4, disable: true}],
								[{value: 6}, {value: '7-9', colSpan: 3, disable: true}],
								[{value: '11;12;16;17', rowSpan: 2, colSpan: 2, disable: true}, {value: 13, mark: true}, 14],
								[18, 19],
								[{value: '21-25', colSpan: 5}],
								[{value: '26-35', colSpan: 5, rowSpan: 2}]
							],
							events: {
								'click:item': function ( data ) {
									grid2.markItem(data.$item, !data.$item.data.mark);
								}
							},
							navigate: function ( event ) {
								if ( event.code === keys.up    ) { this.move(keys.down); }
								if ( event.code === keys.down  ) { this.move(keys.up); }
								if ( event.code === keys.right ) { this.move(keys.left); }
								if ( event.code === keys.left  ) { this.move(keys.right); }
							}
						})
					]
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 40 */
/*!***********************************!*\
  !*** ./app/js/tabs/main.input.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Input = __webpack_require__(/*! ../stb/ui/input */ 31),
				Panel = __webpack_require__(/*! ../stb/ui/panel */ 2),
				panel = new Panel({
					$node: document.getElementById('pageMainTabInput'),
					visible: false
				});
			
			
			panel.add(
				new Panel({
					$node: document.getElementById('pageMainTabInputEmpty'),
					children: [
						new Input()
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabInputSimple'),
					children: [
						new Input({
							value: 'some text',
							events: {
								click: function () {
			
								}
							}
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabInputPassword'),
					children: [
						new Input({
							value: 'some text',
							type: Input.prototype.TYPE_PASSWORD,
							events: {
								click: function () {
			
								}
							}
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabInputPlaceholder'),
					children: [
						new Input({
							//value: 'some text',
							placeholder: 'hint text',
							events: {
								click: function () {
			
								}
							}
						})
					]
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 41 */
/*!**********************************!*\
  !*** ./app/js/tabs/main.list.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Panel     = __webpack_require__(/*! ../stb/ui/panel */ 2),
				List      = __webpack_require__(/*! ../stb/ui/list */ 13),
				ScrollBar = __webpack_require__(/*! ../stb/ui/scroll.bar */ 34),
				panel     = new Panel({
					$node: document.getElementById('pageMainTabList'),
					visible: false
				}),
				listScrollN = new ScrollBar({
					$node: document.getElementById('pageMainTabListCustomScrollN'),
					viewSize: 5,
					realSize: 4
				}),
				listScrollV = new ScrollBar({
					$node: document.getElementById('pageMainTabListCustomScrollV'),
					viewSize: 5,
					realSize: 25
				}),
				listScrollH = new ScrollBar({
					$node: document.getElementById('pageMainTabListCustomScrollH'),
					type: ScrollBar.prototype.TYPE_HORIZONTAL,
					viewSize: 5,
					realSize: 100
				}),
				list2;
			
			
			panel.add(
				new Panel({
					$node: document.getElementById('pageMainTabListSimple'),
					children: [
						new List({
							$node: document.getElementById('pageMainTabListSimpleList'),
							scroll: listScrollN,
							//data: Array.apply(null, new Array(101)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 10000 + value + index; }),
							data: [1, {value: 2, mark: true}, 3, {value: 44, disable: true}],
							size: 5,
							//render: function ( $item, data ) {
							//	$item.innerHTML = '[' + (data) + ']';
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
					$node: document.getElementById('pageMainTabListCustom'),
					children: [
						list2 = new List({
							$node: document.getElementById('pageMainTabListCustomList'),
							scroll: listScrollV,
							data: Array.apply(null, new Array(25)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return {value: 10000 + value + index, mark: Math.random() > 0.7}; }),
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
					$node: document.getElementById('pageMainTabListHoriz'),
					children: [
						new List({
							$node: document.getElementById('pageMainTabListHList'),
							data: Array.apply(null, new Array(100)).map(Number.prototype.valueOf, 0).map(function ( value, index ) { return 'sequence: ' + index + value; }),
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
			
			
			// public
			module.exports = panel;


/***/ },
/* 42 */
/*!***********************************!*\
  !*** ./app/js/tabs/main.modal.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Button       = __webpack_require__(/*! ../stb/ui/button */ 6),
				Panel        = __webpack_require__(/*! ../stb/ui/panel */ 2),
				ModalBox     = __webpack_require__(/*! ../stb/ui/modal.box */ 14),
				ModalMessage = __webpack_require__(/*! ../stb/ui/modal.message */ 32),
				panel        = new Panel({
					$node: document.getElementById('pageMainTabModal'),
					visible: false
				});
			
			
			panel.add(
				new Button({
					value: 'show simple modal window',
					events: {
						click: function () {
							panel.add(
								panel.modal = new ModalBox({
									events: {
										click: function () {
											console.log(panel.modal);
											panel.modal.remove();
										}
									}
								})
							);
							panel.modal.$body.innerText = 'This is a simple modal box.\nClick to close.';
							panel.modal.focus();
						}
					}
				}),
				new Button({
					value: 'show modal window with a lot of text',
					events: {
						click: function () {
							panel.add(
								panel.modal = new ModalBox({
									events: {
										click: function () {
											console.log(panel.modal);
											panel.modal.remove();
										}
									}
								})
							);
							panel.modal.$body.innerText = new Array(300).join('text ');
							panel.modal.focus();
						}
					}
				}),
				new Button({
					value: 'show modal message',
					events: {
						click: function () {
							panel.add(
								panel.modal = new ModalMessage({
									events: {
										click: function () {
											console.log(panel.modal);
											panel.modal.remove();
										}
									}
								})
							);
							//panel.modal.$body.innerText = new Array(300).join('text ');
							panel.modal.focus();
						}
					}
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 43 */
/*!**********************************!*\
  !*** ./app/js/tabs/main.page.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Button = __webpack_require__(/*! ../stb/ui/button */ 6),
				Panel  = __webpack_require__(/*! ../stb/ui/panel */ 2),
				router = __webpack_require__(/*! ../stb/router */ 5),
				panel  = new Panel({
					$node: document.getElementById('pageMainTabPage'),
					visible: false
				});
			
			
			panel.add(
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
			module.exports = panel;


/***/ },
/* 44 */
/*!***********************************!*\
  !*** ./app/js/tabs/main.panel.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Panel = __webpack_require__(/*! ../stb/ui/panel */ 2),
				panel = new Panel({
					$node: document.getElementById('pageMainTabPanel'),
					visible: false
				});
			
			
			panel.add(
				new Panel({
					$node: document.getElementById('pageMainTabPanelSimple')
				}),
				new Panel({
					$node: document.getElementById('pageMainTabPanelMulti')
				}),
				new Panel({
					$node: document.getElementById('pageMainTabPanelParent'),
					children: [
						new Panel({
							$node: document.getElementById('pageMainTabPanelChild')
						})
					]
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 45 */
/*!******************************************!*\
  !*** ./app/js/tabs/main.progress.bar.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Panel       = __webpack_require__(/*! ../stb/ui/panel */ 2),
				ProgressBar = __webpack_require__(/*! ../stb/ui/progress.bar */ 33),
				keys        = __webpack_require__(/*! ../stb/keys */ 3),
				panel       = new Panel({
					$node: document.getElementById('pageMainTabProgressBar'),
					visible: false
				});
			
			
			panel.add(
				new Panel({
					$node: document.getElementById('pageMainTabProgressBarEmpty'),
					children: [
						new ProgressBar({
							value: 0
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabProgressBarFull'),
					children: [
						new ProgressBar({
							value: 100
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabProgressBarStep1'),
					children: [
						new ProgressBar({
							min: -5,
							max: 5,
							value: -2,
							focusable: true,
							events: {
								keydown: function ( event ) {
									if ( event.code === keys.right ) { this.set(this.value + 1); }
									if ( event.code === keys.left  ) { this.set(this.value - 1); }
								},
								done: function () {
									debug.log('ProgressBar: done');
								},
								change: function ( data ) {
									debug.log('ProgressBar: change to ' + data.curr + ' from ' + data.prev);
								}
							}
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabProgressBarStep2'),
					children: [
						new ProgressBar({
							min: -200,
							max: 200,
							value: 0,
							focusable: true,
							events: {
								keydown: function ( event ) {
									if ( event.code === keys.right ) { this.set(this.value + 1); }
									if ( event.code === keys.left  ) { this.set(this.value - 1); }
								},
								done: function () {
									debug.log('ProgressBar: done');
								},
								change: function ( data ) {
									debug.log('ProgressBar: change to ' + data.curr + ' from ' + data.prev);
								}
							}
						})
					]
				}),
				new Panel({
					$node: document.getElementById('pageMainTabProgressBarStyle'),
					children: [
						new ProgressBar({
							value: 70
						})
					]
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 46 */
/*!************************************!*\
  !*** ./app/js/tabs/main.widget.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Tab content.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var Button = __webpack_require__(/*! ../stb/ui/button */ 6),
				Panel  = __webpack_require__(/*! ../stb/ui/panel */ 2),
				Widget = __webpack_require__(/*! ../stb/ui/widget */ 35),
				panel  = new Panel({
					$node: document.getElementById('pageMainTabWidget'),
					visible: false
				}),
				w1 = new Widget({
					$node: document.getElementById('pageMainTabWidgetW1'),
					events: {
						click: function () { w1.hide(); }
					}
				}),
				w2 = new Widget({
					$node: document.getElementById('pageMainTabWidgetW2'),
					events: {
						click: function () { w2.hide(); }
					}
				}),
				w3 = new Widget({
					$node: document.getElementById('pageMainTabWidgetW3'),
					events: {
						click: function () { w3.hide(); }
					}
				});
			
			
			panel.add(
				new Button({
					value: 'show local tab widget',
					events: {
						click: function () {
							w1.show();
						}
					}
				}),
				new Button({
					value: 'show local page widget',
					events: {
						click: function () {
							w2.show();
						}
					}
				}),
				new Button({
					value: 'show global app widget',
					events: {
						click: function () {
							w3.show();
						}
					}
				})
			);
			
			
			// public
			module.exports = panel;


/***/ },
/* 47 */
/*!**************************!*\
  !*** ./config/logger.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * WebSocket logging server configuration.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			// public
			module.exports = {
				// turn on/off server
				active: false,
			
				// listening port
				port: 8010
			};


/***/ },
/* 48 */
/*!*************************!*\
  !*** ./config/proxy.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Code-proxy server configuration.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			// public
			module.exports = {
				// turn on/off server
				active: true,
			
				// listening HTTP port to serve proxy files
				portHttp: 8800,
			
				// listening WebSocket port to serve requests
				portWs: 8900,
			
				// time between connection/sending attempts (in ms)
				retryDelay: 100,
			
				// amount of connection/sending attempts before give up
				retryLimit: 30,
			
				// full logging
				logging: false,
			
				// session name
				name: 'anonymous',
			
				// use localStorage to get/save requests data
				cache: true
			};


/***/ },
/* 49 */
/*!**************************!*\
  !*** ./config/static.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * HTTP static server configuration.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			// public
			module.exports = {
				// turn on/off server
				active: true,
			
				// listening HTTP port to serve project files
				port: 8000,
			
				// static file server cache activation
				// false to disable of amount of seconds to cache
				cache: false,
			
				// full logging
				logging: true,
			
				// enable automatic reload on file changes mode
				livereload: true
			};


/***/ },
/* 50 */
/*!**************************!*\
  !*** ./config/weinre.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * WEb INspector REmote debugger server configuration.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			// public
			module.exports = {
				// turn on/off server
				active: true,
			
				// listening HTTP port to provide client interface
				port: 8080,
			
				// address to listen
				host: '-all-',
			
				// full logging
				logging: false,
			
				// debug servers session id
				name: 'anonymous'
			};


/***/ },
/* 51 */
/*!**************************************!*\
  !*** ./~/code-proxy/client/guest.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Client-side guest part.
			 *
			 * @author DarkPark
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/**
			 * @constructor
			 *
			 * @param {Object} [options] set of initialization parameters (host, port, name)
			 */
			function ProxyGuest ( options ) {
				// prepare
				var name;
			
				// connection with server
				this.active = false;
			
				/**
				 * proxy instance configuration
				 * @namespace
				 */
				this.config = {
					// node.js server address
					host: '127.0.0.1',
			
					// http server port
					port: 8800,
			
					// session name
					name: 'anonymous',
			
					// cached url for posting requests
					urlPost: '',
			
					// cached url for info collecting
					urlInfo: ''
				};
			
				// single ajax object for performance
				this.xhr = new XMLHttpRequest();
			
				// validate and iterate input
				if ( options && typeof options === 'object' ) {
					for ( name in options ) {
						// rewrite defaults
						if ( options.hasOwnProperty(name) ) {
							this.config[name] = options[name];
						}
					}
				}
			
				// there may be some special chars
				name = encodeURIComponent(this.config.name);
			
				// cache final request urls
				this.config.urlPost = 'http://' + this.config.host + ':' + this.config.port + '/' + name;
				this.config.urlInfo = 'http://' + this.config.host + ':' + this.config.port + '/info/' + name;
			
				// check initial connection status
				this.active = this.info().active;
			
				console.log('%c[core]\t%c%s\t%c0\t%cconnection to the host %c(%s:%s): %c%s',
					'color:grey',
					'color:purple', this.config.name,
					'color:grey',
					'color:black',
					'color:grey', this.config.host, this.config.port,
					'color:' + (this.active ? 'green' : 'red'), this.active ? 'available' : 'not available'
				);
			}
			
			
			/**
			 * Sends a synchronous request to the host system.
			 *
			 * @param {Object} request JSON data to send
			 * @return {*} execution result from the host
			 */
			ProxyGuest.prototype.send = function ( request ) {
				// prepare
				var time = +new Date(),
					response;
			
				// mandatory init check
				if ( !this.config.urlPost ) {
					return false;
				}
			
				// make request
				this.xhr.open('post', this.config.urlPost, false);
				this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				this.xhr.send(JSON.stringify(request));
			
				// proceed the result
				try {
					response = JSON.parse(this.xhr.responseText);
				} catch ( e ) {
					response = {error: e};
				}
			
				// update connection status
				this.active = !response.error;
			
				// detailed report
				console.groupCollapsed('%c[%s]\t%c%s\t%c%s\t%c%s',
					'color:grey;font-weight:normal', request.type,
					'color:purple;font-weight:normal', this.config.name,
					'color:grey;font-weight:normal', +new Date() - time,
					'color:' + (response.error ? 'red' : 'green'), request.method || request.code
				);
				if ( request.params !== undefined ) { console.log('%c%s:\t', 'font-weight:bold', 'Params', request.params); }
				if ( response.data  !== undefined ) { console.log('%c%s:\t', 'font-weight:bold', 'Result', response.data); }
				if ( response.error !== undefined ) { console.error(response.error); }
				console.groupEnd();
			
				// ready
				return response.data;
			};
			
			
			/**
			 * Wrapper to send a line of js code to eval on the host.
			 *
			 * @param {String} code javascript source code to execute on the device
			 * @return {*} execution result from the host
			 */
			ProxyGuest.prototype.eval = function ( code ) {
				return this.send({
					type: 'eval',
					code: code
				});
			};
			
			
			/**
			 * Wrapper to send one function of js code with arguments to eval on the host.
			 *
			 * @param {String} method javascript function name (like "encodeURIComponent")
			 * @param {Array} params list of the function arguments
			 * @param {String} [context=window] remote call context
			 * @return {*} execution result from the host
			 */
			ProxyGuest.prototype.call = function ( method, params, context ) {
				return this.send({
					type:    'call',
					method:  method,
					params:  params,
					context: context
				});
			};
			
			
			/**
			 * Wrapper to send a var name to get json.
			 *
			 * @param {String} name javascript var name to serialize
			 * @return {*} execution result from the host
			 */
			ProxyGuest.prototype.json = function ( name ) {
				var data = this.send({
					type: 'json',
					code: name
				});
			
				return data ? JSON.parse(data) : null;
			};
			
			
			/**
			 * Gets the detailed info about the current connection.
			 *
			 * @return {{active:Boolean, count:Number}|{active:Boolean}|Boolean} info
			 */
			ProxyGuest.prototype.info = function () {
				// mandatory init check
				if ( !this.config.urlInfo ) {
					return false;
				}
			
				// make request
				this.xhr.open('get', this.config.urlInfo, false);
				this.xhr.send();
			
				return JSON.parse(this.xhr.responseText || false);
			};
			
			
			// CommonJS modules support
			if ( typeof module !== 'undefined' && module.exports ) {
				module.exports = ProxyGuest;
			}


/***/ },
/* 52 */
/*!*************************************!*\
  !*** ./~/code-proxy/client/host.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Client-side host part.
			 *
			 * @author DarkPark
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			/**
			 * @constructor
			 *
			 * @param {Object} [options] set of initialization parameters (host, port, name)
			 */
			function ProxyHost ( options ) {
				// prepare
				var name;
			
			    // connection with server
			    this.active = false;
			
				/**
				 * proxy instance configuration
				 * @namespace
				 */
				this.config = {
					/** proxy server address */
					host : '127.0.0.1',
			
					/** proxy server websocket port */
					port : 8900,
			
					/** session name */
					name : 'anonymous',
			
					/** automatically try to restore connection on disconnect */
					reconnect : true,
			
					/** time between connection attempts (5s) */
					reconnectInterval : 5000
				};
			
				/**
				 * @type {WebSocket}
				 */
				this.socket = null;
			
				// validate and iterate input
				if ( options && typeof options === 'object' ) {
					for ( name in options ) {
						// rewrite defaults
						if ( options.hasOwnProperty(name) ) { this.config[name] = options[name]; }
					}
				}
			
				// try to establish connection
				this.connect();
			}
			
			
			/**
			 * Connect to the proxy server
			 */
			ProxyHost.prototype.connect = function () {
				// prepare
				var self = this;
			
				// establish the connection
				// there may be some special chars in name
				this.socket = new WebSocket('ws://' + this.config.host + ':' + this.config.port + '/' + encodeURIComponent(this.config.name));
			
				/**
				 * event hook
				 * @callback
				 */
				this.socket.onopen = function(){
					self.log('core', 0, true, 'connection established');
			
			        self.active = true;
				};
			
				/**
				 * event hook
				 * @callback
				 */
				this.socket.onclose = function(){
					self.log('core', 0, false, 'no connection');
			
			        self.active = false;
			
					if ( self.config.reconnect ) {
						setTimeout(function () {
							self.connect();
						}, self.config.reconnectInterval);
					}
				};
			
				/**
				 * Message from a desktop browser.
				 *
				 * @callback
				 */
				this.socket.onmessage = function ( message ) {
					// prepare
					var response = {time:+new Date()},
						request, context;
			
					// proceed the message
					try {
						request = JSON.parse(message.data || false);
						switch ( request.type ) {
							case 'call':
								context = request.context ? eval(request.context) : window;
								response.data = eval(request.method).apply(context, request.params);
								break;
							case 'eval':
								response.data = eval(request.code);
								break;
							case 'json':
								response.data = JSON.stringify(eval(request.code));
								break;
							default:
								response.error = 'invalid incoming request';
						}
					} catch ( e ) {
						response.error = e.toString();
					}
			
					// time taken
					response.time = +new Date() - response.time;
					// wrap and send back
					this.send(JSON.stringify(response));
			
					// detailed report
					self.log(request.type, response.time, !response.error, request.method || request.code, request.params);
				};
			};
			
			
			/**
			 * Finish the connection and strop reconnection if any.
			 */
			ProxyHost.prototype.disconnect = function () {
				// stop auto connection
				this.config.reconnect = false;
				this.socket.close();
			};
			
			
			/**
			 * Logging wrapper.
			 *
			 * @param {String} type
			 * @param {Number} time
			 * @param {Boolean} status
			 * @param {String} message
			 * @param {*} [params]
			 */
			ProxyHost.prototype.log = function ( type, time, status, message, params ) {
				console.log('%c[%s]\t%c%s\t%c%s\t%c%s\t',
					'color:grey', type,
					'color:purple', this.config.name,
					'color:grey', time,
					'color:' + (status ? 'green' : 'red'), message,
					params || ''
				);
			};
			
			
			// CommonJS modules support
			if ( typeof module !== 'undefined' && module.exports ) {
				module.exports = ProxyHost;
			}


/***/ },
/* 53 */
/*!***************************************!*\
  !*** ./~/gremlins.js/gremlins.min.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
			 * This file is generated. Don't modify it directly. (c)
			 */
			
			/**
			 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
			 * Available via the MIT or new BSD license.
			 * see: http://github.com/jrburke/almond for details
			 */
			
			//  Chance.js 0.5.4
			//  http://chancejs.com
			//  (c) 2013 Victor Quinn
			//  Chance may be freely distributed or modified under the MIT license.
			
			/**
			 * gremlins.js 0.1.0 Copyright (c) 2014, marmelab
			 * Available via the MIT license.
			 * see: http://github.com/marmelab/gremlins.js for details
			 */
			
			(function(e,t){true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):typeof exports=="object"?module.exports=t():e.gremlins=t()})(this,function(){var e,t,n;return function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("../src/vendor/almond.js",function(){}),function(){function a(e,t){e||(e={});if(!t)return e;for(var n in t)typeof e[n]=="undefined"&&(e[n]=t[n]);return e}function f(e,t){if(e)throw new RangeError(t)}var e=9007199254740992,t=-e,r="0123456789",i="abcdefghijklmnopqrstuvwxyz",s=i.toUpperCase(),o=r+"abcdef",u=function(e){e!==undefined&&(typeof e=="function"?this.random=e:this.seed=e),typeof this.random=="undefined"&&(this.mt=this.mersenne_twister(e),this.random=function(){return this.mt.random(this.seed)})};u.prototype.bool=function(e){return e=a(e,{likelihood:50}),f(e.likelihood<0||e.likelihood>100,"Chance: Likelihood accepts values from 0 to 100."),this.random()*100<e.likelihood},u.prototype.character=function(e){e=a(e);var t="!@#$%^&*()[]",n,o;return f(e.alpha&&e.symbols,"Chance: Cannot specify both alpha and symbols."),e.casing==="lower"?n=i:e.casing==="upper"?n=s:n=i+s,e.pool?o=e.pool:e.alpha?o=n:e.symbols?o=t:o=n+r+t,o.charAt(this.natural({max:o.length-1}))},u.prototype.floating=function(t){var n,r;t=a(t,{fixed:4});var i=Math.pow(10,t.fixed);f(t.fixed&&t.precision,"Chance: Cannot specify both fixed and precision.");var s=e/i,o=-s;f(t.min&&t.fixed&&t.min<o,"Chance: Min specified is out of range with fixed. Min should be, at least, "+o),f(t.max&&t.fixed&&t.max>s,"Chance: Max specified is out of range with fixed. Max should be, at most, "+s),t=a(t,{min:o,max:s}),n=this.integer({min:t.min*i,max:t.max*i});var u=(n/i).toFixed(t.fixed);return parseFloat(u)},u.prototype.integer=function(n){var r,i;n=a(n,{min:t,max:e}),i=Math.max(Math.abs(n.min),Math.abs(n.max));do r=this.natural({max:i}),r=this.bool()?r:r*-1;while(r<n.min||r>n.max);return r},u.prototype.natural=function(t){return t=a(t,{min:0,max:e}),f(t.min>t.max,"Chance: Min cannot be greater than Max."),Math.floor(this.random()*(t.max-t.min+1)+t.min)},u.prototype.normal=function(e){e=a(e,{mean:0,dev:1});var t,n,r,i,s=e.mean,o=e.dev;do n=this.random()*2-1,r=this.random()*2-1,t=n*n+r*r;while(t>=1);return i=n*Math.sqrt(-2*Math.log(t)/t),o*i+s},u.prototype.string=function(e){e=a(e);var t=e.length||this.natural({min:5,max:20}),n="",r=e.pool;for(var i=0;i<t;i++)n+=this.character({pool:r});return n},u.prototype.capitalize=function(e){return e.charAt(0).toUpperCase()+e.substr(1)},u.prototype.mixin=function(e){var t=this;for(var n in e)u.prototype[n]=e[n];return this},u.prototype.pick=function(e,t){return!t||t===1?e[this.natural({max:e.length-1})]:this.shuffle(e).slice(0,t)},u.prototype.shuffle=function(e){var t=e.slice(0),n=[],r=0,i=Number(t.length);for(var s=0;s<i;s++)r=this.natural({max:t.length-1}),n[s]=t[r],t.splice(r,1);return n},u.prototype.paragraph=function(e){e=a(e);var t=e.sentences||this.natural({min:3,max:7}),n=[];for(var r=0;r<t;r++)n.push(this.sentence());return n.join(" ")},u.prototype.sentence=function(e){e=a(e);var t=e.words||this.natural({min:12,max:18}),n,r=[];for(var i=0;i<t;i++)r.push(this.word());return n=r.join(" "),n=this.capitalize(n)+".",n},u.prototype.syllable=function(e){e=a(e);var t=e.length||this.natural({min:2,max:3}),n="bcdfghjklmnprstvwz",r="aeiou",i=n+r,s="",o;for(var u=0;u<t;u++)u===0?o=this.character({pool:i}):n.indexOf(o)===-1?o=this.character({pool:n}):o=this.character({pool:r}),s+=o;return s},u.prototype.word=function(e){e=a(e),f(e.syllables&&e.length,"Chance: Cannot specify both syllables AND length.");var t=e.syllables||this.natural({min:1,max:3}),n="";if(e.length){do n+=this.syllable();while(n.length<e.length);n=n.substring(0,e.length)}else for(var r=0;r<t;r++)n+=this.syllable();return n},u.prototype.age=function(e){e=a(e);var t;switch(e.type){case"child":t=this.natural({min:1,max:12});break;case"teen":t=this.natural({min:13,max:19});break;case"adult":t=this.natural({min:18,max:120});break;case"senior":t=this.natural({min:65,max:120});break;default:t=this.natural({min:1,max:120})}return t},u.prototype.birthday=function(e){return e=a(e,{year:(new Date).getFullYear()-this.age(e)}),this.date(e)};var l=["Sophia","Emma","Isabella","Jacob","Mason","Ethan","Noah","Olivia","William","Liam","Jayden","Michael","Ava","Alexander","Aiden","Daniel","Matthew","Elijah","Emily","James","Anthony","Benjamin","Abigail","Joshua","Andrew","David","Joseph","Logan","Jackson","Mia","Christopher","Gabriel","Madison","Samuel","Ryan","Lucas","John","Nathan","Isaac","Dylan","Caleb","Elizabeth","Chloe","Christian","Landon","Jonathan","Carter","Ella","Luke","Owen","Brayden","Avery","Gavin","Wyatt","Addison","Isaiah","Aubrey","Henry","Eli","Hunter","Lily","Jack","Natalie","Evan","Sofia","Jordan","Nicholas","Tyler","Aaron","Charlotte","Zoey","Jeremiah","Julian","Cameron","Grace","Hannah","Amelia","Harper","Levi","Lillian","Brandon","Angel","Austin","Connor","Adrian","Robert","Samantha","Charles","Evelyn","Victoria","Thomas","Brooklyn","Sebastian","Zoe","Colton","Jaxon","Layla","Kevin","Zachary","Ayden","Dominic","Blake","Jose","Hailey","Oliver","Justin","Bentley","Leah","Jason","Chase","Ian","Kaylee","Anna","Aaliyah","Gabriella","Josiah","Allison","Parker","Xavier","Nevaeh","Alexis","Adam","Audrey","Cooper","Savannah","Sarah","Alyssa","Claire","Taylor","Riley","Camila","Nathaniel","Arianna","Ashley","Grayson","Jace","Brianna","Carson","Sophie","Peyton","Nolan","Tristan","Luis","Brody","Bella","Khloe","Genesis","Alexa","Juan","Hudson","Serenity","Kylie","Aubree","Scarlett","Bryson","Carlos","Stella","Maya","Easton","Katherine","Julia","Damian","Alex","Kayden","Ryder","Lucy","Madelyn","Jesus","Cole","Autumn","Makayla","Kayla","Mackenzie","Micah","Vincent","Max","Lauren","Jaxson","Gianna","Eric","Ariana","Asher","Hayden","Faith","Alexandra","Melanie","Sydney","Bailey","Caroline","Naomi","Morgan","Kennedy","Ellie","Jasmine","Eva","Skylar","Diego","Kimberly","Violet","Molly","Miles","Steven","Aria","Ivan","Jocelyn","Trinity","Elias","Aidan","Maxwell","London","Bryce","Lydia","Madeline","Antonio","Giovanni","Reagan","Timothy","Bryan","Piper","Andrea","Santiago","Annabelle","Maria","Colin","Richard","Braxton","Kaleb","Brooke","Kyle","Kaden","Preston","Payton","Miguel","Jonah","Paisley","Paige","Lincoln","Ruby","Nora","Riley","Mariah","Leo","Victor","Brady","Jeremy","Mateo","Brian","Jaden","Ashton","Patrick","Rylee","Declan","Lilly","Brielle","Sean","Joel","Gael","Sawyer","Alejandro","Jade","Marcus","Destiny","Leonardo","Jesse","Caden","Jake","Kaiden","Nicole","Mila","Wesley","Kendall","Liliana","Camden","Kaitlyn","Natalia","Sadie","Edward","Brantley","Jordyn","Roman","Vanessa","Mary","Mya","Penelope","Isabelle","Alice","Axel","Silas","Jude","Grant","Reese","Gabrielle","Hadley","Katelyn","Angelina","Rachel","Isabel","Eleanor","Cayden","Emmanuel","George","Clara","Brooklynn","Jessica","Maddox","Malachi","Bradley","Alan","Weston","Elena","Gage","Aliyah","Vivian","Laila","Sara","Amy","Devin","Eliana","Greyson","Lyla","Juliana","Kenneth","Mark","Oscar","Tanner","Rylan","Valeria","Adriana","Nicolas","Makenzie","Harrison","Elise","Mckenzie","Derek","Quinn","Delilah","Peyton","Ezra","Cora","Kylee","Tucker","Emmett","Avery","Cody","Rebecca","Gracie","Izabella","Calvin","Andres","Jorge","Abel","Paul","Abraham","Kai","Josephine","Alaina","Michelle","Jennifer","Collin","Theodore","Ezekiel","Eden","Omar","Jayce","Valentina","Conner","Bennett","Aurora","Catherine","Stephanie","Trevor","Valerie","Eduardo","Peter","Maximus","Jayla","Jaiden","Willow","Jameson","Seth","Daisy","Alana","Melody","Hazel","Kingston","Summer","Melissa","Javier","Margaret","Travis","Kinsley","Kinley","Garrett","Everett","Ariel","Lila","Graham","Giselle","Ryleigh","Xander","Haley","Julianna","Ivy","Alivia","Cristian","Brynn","Damien","Ryker","Griffin","Keira","Daniela","Aniyah","Angela","Kate","Londyn","Corbin","Myles","Hayden","Harmony","Adalyn","Luca","Zane","Francisco","Ricardo","Alexis","Stephen","Zayden","Megan","Allie","Gabriela","Iker","Drake","Alayna","Lukas","Presley","Charlie","Spencer","Zion","Erick","Jenna","Josue","Alexandria","Ashlyn","Adrianna","Jada","Jeffrey","Trenton","Fiona","Chance","Norah","Paxton","Elliot","Emery","Fernando","Maci","Miranda","Keegan","Landen","Ximena","Amaya","Manuel","Amir","Shane","Cecilia","Raymond","Andre","Ana","Shelby","Katie","Hope","Callie","Jordan","Luna","Leilani","Eliza","Mckenna","Angel","Genevieve","Makenna","Isla","Lola","Danielle","Chelsea","Leila","Tessa","Adelyn","Camille","Mikayla","Adeline","Adalynn","Sienna","Esther","Jacqueline","Emerson","Arabella","Maggie","Athena","Lucia","Lexi","Ayla"];u.prototype.first=function(){return this.pick(l)},u.prototype.gender=function(){return this.pick(["Male","Female"])};var c=["Smith","Johnson","Williams","Jones","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Garcia","Martinez","Robinson","Clark","Rodriguez","Lewis","Lee","Walker","Hall","Allen","Young","Hernandez","King","Wright","Lopez","Hill","Scott","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Cox","Howard","Ward","Torres","Peterson","Gray","Ramirez","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Flores","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes","Myers","Ford","Hamilton","Graham","Sullivan","Wallace","Woods","Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald","Cruz","Marshall","Ortiz","Gomez","Murray","Freeman","Wells","Webb","Simpson","Stevens","Tucker","Porter","Hunter","Hicks","Crawford","Henry","Boyd","Mason","Morales","Kennedy","Warren","Dixon","Ramos","Reyes","Burns","Gordon","Shaw","Holmes","Rice","Robertson","Hunt","Black","Daniels","Palmer","Mills","Nichols","Grant","Knight","Ferguson","Rose","Stone","Hawkins","Dunn","Perkins","Hudson","Spencer","Gardner","Stephens","Payne","Pierce","Berry","Matthews","Arnold","Wagner","Willis","Ray","Watkins","Olson","Carroll","Duncan","Snyder","Hart","Cunningham","Bradley","Lane","Andrews","Ruiz","Harper","Fox","Riley","Armstrong","Carpenter","Weaver","Greene","Lawrence","Elliott","Chavez","Sims","Austin","Peters","Kelley","Franklin","Lawson","Fields","Gutierrez","Ryan","Schmidt","Carr","Vasquez","Castillo","Wheeler","Chapman","Oliver","Montgomery","Richards","Williamson","Johnston","Banks","Meyer","Bishop","McCoy","Howell","Alvarez","Morrison","Hansen","Fernandez","Garza","Harvey","Little","Burton","Stanley","Nguyen","George","Jacobs","Reid","Kim","Fuller","Lynch","Dean","Gilbert","Garrett","Romero","Welch","Larson","Frazier","Burke","Hanson","Day","Mendoza","Moreno","Bowman","Medina","Fowler","Brewer","Hoffman","Carlson","Silva","Pearson","Holland","Douglas","Fleming","Jensen","Vargas","Byrd","Davidson","Hopkins","May","Terry","Herrera","Wade","Soto","Walters","Curtis","Neal","Caldwell","Lowe","Jennings","Barnett","Graves","Jimenez","Horton","Shelton","Barrett","Obrien","Castro","Sutton","Gregory","McKinney","Lucas","Miles","Craig","Rodriquez","Chambers","Holt","Lambert","Fletcher","Watts","Bates","Hale","Rhodes","Pena","Beck","Newman","Haynes","McDaniel","Mendez","Bush","Vaughn","Parks","Dawson","Santiago","Norris","Hardy","Love","Steele","Curry","Powers","Schultz","Barker","Guzman","Page","Munoz","Ball","Keller","Chandler","Weber","Leonard","Walsh","Lyons","Ramsey","Wolfe","Schneider","Mullins","Benson","Sharp","Bowen","Daniel","Barber","Cummings","Hines","Baldwin","Griffith","Valdez","Hubbard","Salazar","Reeves","Warner","Stevenson","Burgess","Santos","Tate","Cross","Garner","Mann","Mack","Moss","Thornton","Dennis","McGee","Farmer","Delgado","Aguilar","Vega","Glover","Manning","Cohen","Harmon","Rodgers","Robbins","Newton","Todd","Blair","Higgins","Ingram","Reese","Cannon","Strickland","Townsend","Potter","Goodwin","Walton","Rowe","Hampton","Ortega","Patton","Swanson","Joseph","Francis","Goodman","Maldonado","Yates","Becker","Erickson","Hodges","Rios","Conner","Adkins","Webster","Norman","Malone","Hammond","Flowers","Cobb","Moody","Quinn","Blake","Maxwell","Pope","Floyd","Osborne","Paul","McCarthy","Guerrero","Lindsey","Estrada","Sandoval","Gibbs","Tyler","Gross","Fitzgerald","Stokes","Doyle","Sherman","Saunders","Wise","Colon","Gill","Alvarado","Greer","Padilla","Simon","Waters","Nunez","Ballard","Schwartz","McBride","Houston","Christensen","Klein","Pratt","Briggs","Parsons","McLaughlin","Zimmerman","French","Buchanan","Moran","Copeland","Roy","Pittman","Brady","McCormick","Holloway","Brock","Poole","Frank","Logan","Owen","Bass","Marsh","Drake","Wong","Jefferson","Park","Morton","Abbott","Sparks","Patrick","Norton","Huff","Clayton","Massey","Lloyd","Figueroa","Carson","Bowers","Roberson","Barton","Tran","Lamb","Harrington","Casey","Boone","Cortez","Clarke","Mathis","Singleton","Wilkins","Cain","Bryan","Underwood","Hogan","McKenzie","Collier","Luna","Phelps","McGuire","Allison","Bridges","Wilkerson","Nash","Summers","Atkins"];u.prototype.last=function(){return this.pick(c)},u.prototype.name=function(e){e=a(e);var t=this.first(),n=this.last(),r;return e.middle?r=t+" "+this.first()+" "+n:e.middle_initial?r=t+" "+this.character({alpha:!0,casing:"upper"})+". "+n:r=t+" "+n,e.prefix&&(r=this.prefix()+" "+r),r},u.prototype.name_prefixes=function(){return[{name:"Doctor",abbreviation:"Dr."},{name:"Miss",abbreviation:"Miss"},{name:"Misses",abbreviation:"Mrs."},{name:"Mister",abbreviation:"Mr."}]},u.prototype.prefix=function(e){return this.name_prefix(e)},u.prototype.name_prefix=function(e){return e=a(e),e.full?this.pick(this.name_prefixes()).name:this.pick(this.name_prefixes()).abbreviation},u.prototype.color=function(e){function t(e,t){return[e,e,e].join(t||"")}e=a(e,{format:this.pick(["hex","shorthex","rgb"]),grayscale:!1});var n=e.grayscale;if(e.format==="hex")return"#"+(n?t(this.hash({length:2})):this.hash({length:6}));if(e.format==="shorthex")return"#"+(n?t(this.hash({length:1})):this.hash({length:3}));if(e.format==="rgb")return n?"rgb("+t(this.natural({max:255}),",")+")":"rgb("+this.natural({max:255})+","+this.natural({max:255})+","+this.natural({max:255})+")";throw new Error('Invalid format provided. Please provide one of "hex", "shorthex", or "rgb"')},u.prototype.domain=function(e){return e=a(e),this.word()+"."+(e.tld||this.tld())},u.prototype.email=function(e){return e=a(e),this.word()+"@"+(e.domain||this.domain())},u.prototype.fbid=function(){return parseInt("10000"+this.natural({max:1e11}),10)},u.prototype.hashtag=function(){return"#"+this.word()},u.prototype.ip=function(){return this.natural({max:255})+"."+this.natural({max:255})+"."+this.natural({max:255})+"."+this.natural({max:255})},u.prototype.ipv6=function(){var e="";for(var t=0;t<8;t++)e+=this.hash({length:4})+":";return e.substr(0,e.length-1)},u.prototype.klout=function(){return this.natural({min:1,max:99})},u.prototype.tlds=function(){return["com","org","edu","gov","co.uk","net","io"]},u.prototype.tld=function(){return this.pick(this.tlds())},u.prototype.twitter=function(){return"@"+this.word()},u.prototype.address=function(e){return e=a(e),this.natural({min:5,max:2e3})+" "+this.street(e)},u.prototype.areacode=function(e){e=a(e,{parens:!0});var t=this.natural({min:2,max:9}).toString()+this.natural({min:0,max:8}).toString()+this.natural({min:0,max:9}).toString();return e.parens?"("+t+")":t},u.prototype.city=function(){return this.capitalize(this.word({syllables:3}))},u.prototype.coordinates=function(e){return e=a(e),this.latitude(e)+", "+this.longitude(e)},u.prototype.latitude=function(e){return e=a(e,{fixed:5}),this.floating({min:-90,max:90,fixed:e.fixed})},u.prototype.longitude=function(e){return e=a(e,{fixed:5}),this.floating({min:0,max:180,fixed:e.fixed})},u.prototype.phone=function(e){e=a(e,{formatted:!0}),e.formatted||(e.parens=!1);var t=this.areacode(e).toString(),n=this.natural({min:2,max:9}).toString()+this.natural({min:0,max:9}).toString()+this.natural({min:0,max:9}).toString(),r=this.natural({min:1e3,max:9999}).toString();return e.formatted?t+" "+n+"-"+r:t+n+r},u.prototype.postal=function(){var e=this.character({pool:"XVTSRPNKLMHJGECBA"}),t=e+this.natural({max:9})+this.character({alpha:!0,casing:"upper"}),n=this.natural({max:9})+this.character({alpha:!0,casing:"upper"})+this.natural({max:9});return t+" "+n},u.prototype.provinces=function(){return[{name:"Alberta",abbreviation:"AB"},{name:"British Columbia",abbreviation:"BC"},{name:"Manitoba",abbreviation:"MB"},{name:"New Brunswick",abbreviation:"NB"},{name:"Newfoundland and Labrador",abbreviation:"NL"},{name:"Nova Scotia",abbreviation:"NS"},{name:"Ontario",abbreviation:"ON"},{name:"Prince Edward Island",abbreviation:"PE"},{name:"Quebec",abbreviation:"QC"},{name:"Saskatchewan",abbreviation:"SK"},{name:"Northwest Territories",abbreviation:"NT"},{name:"Nunavut",abbreviation:"NU"},{name:"Yukon",abbreviation:"YT"}]},u.prototype.province=function(e){return e&&e.full?this.pick(this.provinces()).name:this.pick(this.provinces()).abbreviation},u.prototype.radio=function(e){e=a(e,{side:"?"});var t="";switch(e.side.toLowerCase()){case"east":case"e":t="W";break;case"west":case"w":t="K";break;default:t=this.character({pool:"KW"})}return t+this.character({alpha:!0,casing:"upper"})+this.character({alpha:!0,casing:"upper"})+this.character({alpha:!0,casing:"upper"})},u.prototype.state=function(e){return e&&e.full?this.pick(this.states()).name:this.pick(this.states()).abbreviation},u.prototype.states=function(){return[{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"American Samoa",abbreviation:"AS"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"Armed Forces Europe",abbreviation:"AE"},{name:"Armed Forces Pacific",abbreviation:"AP"},{name:"Armed Forces the Americas",abbreviation:"AA"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"District of Columbia",abbreviation:"DC"},{name:"Federated States of Micronesia",abbreviation:"FM"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Guam",abbreviation:"GU"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Marshall Islands",abbreviation:"MH"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Northern Mariana Islands",abbreviation:"MP"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Puerto Rico",abbreviation:"PR"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virgin Islands, U.S.",abbreviation:"VI"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}]},u.prototype.street=function(e){e=a(e);var t=this.word({syllables:2});return t=this.capitalize(t),t+=" ",t+=e.short_suffix?this.street_suffix().abbreviation:this.street_suffix().name,t},u.prototype.street_suffix=function(){return this.pick(this.street_suffixes())},u.prototype.street_suffixes=function(){return[{name:"Avenue",abbreviation:"Ave"},{name:"Boulevard",abbreviation:"Blvd"},{name:"Center",abbreviation:"Ctr"},{name:"Circle",abbreviation:"Cir"},{name:"Court",abbreviation:"Ct"},{name:"Drive",abbreviation:"Dr"},{name:"Extension",abbreviation:"Ext"},{name:"Glen",abbreviation:"Gln"},{name:"Grove",abbreviation:"Grv"},{name:"Heights",abbreviation:"Hts"},{name:"Highway",abbreviation:"Hwy"},{name:"Junction",abbreviation:"Jct"},{name:"Key",abbreviation:"Key"},{name:"Lane",abbreviation:"Ln"},{name:"Loop",abbreviation:"Loop"},{name:"Manor",abbreviation:"Mnr"},{name:"Mill",abbreviation:"Mill"},{name:"Park",abbreviation:"Park"},{name:"Parkway",abbreviation:"Pkwy"},{name:"Pass",abbreviation:"Pass"},{name:"Path",abbreviation:"Path"},{name:"Pike",abbreviation:"Pike"},{name:"Place",abbreviation:"Pl"},{name:"Plaza",abbreviation:"Plz"},{name:"Point",abbreviation:"Pt"},{name:"Ridge",abbreviation:"Rdg"},{name:"River",abbreviation:"Riv"},{name:"Road",abbreviation:"Rd"},{name:"Square",abbreviation:"Sq"},{name:"Street",abbreviation:"St"},{name:"Terrace",abbreviation:"Ter"},{name:"Trail",abbreviation:"Trl"},{name:"Turnpike",abbreviation:"Tpke"},{name:"View",abbreviation:"Vw"},{name:"Way",abbreviation:"Way"}]},u.prototype.tv=function(e){return this.radio(e)},u.prototype.zip=function(e){var t="";for(var n=0;n<5;n++)t+=this.natural({max:9}).toString();if(e&&e.plusfour===!0){t+="-";for(n=0;n<4;n++)t+=this.natural({max:9}).toString()}return t},u.prototype.ampm=function(){return this.bool()?"am":"pm"},u.prototype.date=function(e){var t=this.month({raw:!0}),n;e=a(e,{year:parseInt(this.year(),10),month:t.numeric-1,day:this.natural({min:1,max:t.days}),hour:this.hour(),minute:this.minute(),second:this.second(),millisecond:this.millisecond(),american:!0,string:!1});var r=new Date(e.year,e.month,e.day,e.hour,e.minute,e.second,e.millisecond);return e.american?n=r.getMonth()+1+"/"+r.getDate()+"/"+r.getFullYear():n=r.getDate()+"/"+(r.getMonth()+1)+"/"+r.getFullYear(),e.string?n:r},u.prototype.hammertime=function(e){return this.date(e).getTime()},u.prototype.hour=function(e){e=a(e);var t=e.twentyfour?24:12;return this.natural({min:1,max:t})},u.prototype.millisecond=function(){return this.natural({max:999})},u.prototype.minute=u.prototype.second=function(){return this.natural({max:59})},u.prototype.month=function(e){e=a(e);var t=this.pick(this.months());return e.raw?t:t.name},u.prototype.months=function(){return[{name:"January",short_name:"Jan",numeric:"01",days:31},{name:"February",short_name:"Feb",numeric:"02",days:28},{name:"March",short_name:"Mar",numeric:"03",days:31},{name:"April",short_name:"Apr",numeric:"04",days:30},{name:"May",short_name:"May",numeric:"05",days:31},{name:"June",short_name:"Jun",numeric:"06",days:30},{name:"July",short_name:"Jul",numeric:"07",days:31},{name:"August",short_name:"Aug",numeric:"08",days:31},{name:"September",short_name:"Sep",numeric:"09",days:30},{name:"October",short_name:"Oct",numeric:"10",days:31},{name:"November",short_name:"Nov",numeric:"11",days:30},{name:"December",short_name:"Dec",numeric:"12",days:31}]},u.prototype.second=function(){return this.natural({max:59})},u.prototype.timestamp=function(){return this.natural({min:1,max:parseInt((new Date).getTime()/1e3,10)})},u.prototype.year=function(e){return e=a(e,{min:(new Date).getFullYear()}),e.max=typeof e.max!="undefined"?e.max:e.min+100,this.natural(e).toString()},u.prototype.cc=function(e){e=a(e);var t,n,r,i;t=e.type?this.cc_type({name:e.type,raw:!0}):this.cc_type({raw:!0}),n=t.prefix.split(""),r=t.length-t.prefix.length-1;for(var s=0;s<r;s++)n.push(this.integer({min:0,max:9}));return n.push(this.luhn_calculate(n.join(""))),n.join("")},u.prototype.cc_types=function(){return[{name:"American Express",short_name:"amex",prefix:"34",length:15},{name:"Bankcard",short_name:"bankcard",prefix:"5610",length:16},{name:"China UnionPay",short_name:"chinaunion",prefix:"62",length:16},{name:"Diners Club Carte Blanche",short_name:"dccarte",prefix:"300",length:14},{name:"Diners Club enRoute",short_name:"dcenroute",prefix:"2014",length:15},{name:"Diners Club International",short_name:"dcintl",prefix:"36",length:14},{name:"Diners Club United States & Canada",short_name:"dcusc",prefix:"54",length:16},{name:"Discover Card",short_name:"discover",prefix:"6011",length:16},{name:"InstaPayment",short_name:"instapay",prefix:"637",length:16},{name:"JCB",short_name:"jcb",prefix:"3528",length:16},{name:"Laser",short_name:"laser",prefix:"6304",length:16},{name:"Maestro",short_name:"maestro",prefix:"5018",length:16},{name:"Mastercard",short_name:"mc",prefix:"51",length:16},{name:"Solo",short_name:"solo",prefix:"6334",length:16},{name:"Switch",short_name:"switch",prefix:"4903",length:16},{name:"Visa",short_name:"visa",prefix:"4",length:16},{name:"Visa Electron",short_name:"electron",prefix:"4026",length:16}]},u.prototype.cc_type=function(e){e=a(e);var t=this.cc_types(),n=null;if(e.name){for(var r=0;r<t.length;r++)if(t[r].name===e.name||t[r].short_name===e.name){n=t[r];break}if(n===null)throw new Error("Credit card type '"+e.name+"'' is not suppoted")}else n=this.pick(t);return e.raw?n:n.name},u.prototype.dollar=function(e){e=a(e,{max:1e4,min:0});var t=this.floating({min:e.min,max:e.max,fixed:2}).toString(),n=t.split(".")[1];return n===undefined?t+=".00":n.length<2&&(t+="0"),t<0?"-$"+t.replace("-",""):"$"+t},u.prototype.exp=function(e){e=a(e);var t={};return t.year=this.exp_year(),t.year===(new Date).getFullYear()?t.month=this.exp_month({future:!0}):t.month=this.exp_month(),e.raw?t:t.month+"/"+t.year},u.prototype.exp_month=function(e){e=a(e);var t,n;if(e.future){do t=this.month({raw:!0}).numeric,n=parseInt(t,10);while(n<(new Date).getMonth())}else t=this.month({raw:!0}).numeric;return t},u.prototype.exp_year=function(){return this.year({max:(new Date).getFullYear()+10})},u.prototype.d4=function(){return this.natural({min:1,max:4})},u.prototype.d6=function(){return this.natural({min:1,max:6})},u.prototype.d8=function(){return this.natural({min:1,max:8})},u.prototype.d10=function(){return this.natural({min:1,max:10})},u.prototype.d12=function(){return this.natural({min:1,max:12})},u.prototype.d20=function(){return this.natural({min:1,max:20})},u.prototype.d30=function(){return this.natural({min:1,max:30})},u.prototype.d100=function(){return this.natural({min:1,max:100})},u.prototype.rpg=function(e,t){t=a(t);if(e===null)throw new Error("A type of die roll must be included");var n=e.toLowerCase().split("d"),r=[];if(n.length!==2||!parseInt(n[0],10)||!parseInt(n[1],10))throw new Error("Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");for(var i=n[0];i>0;i--)r[i-1]=this.natural({min:1,max:n[1]});return typeof t.sum!="undefined"&&t.sum?r.reduce(function(e,t){return e+t}):r},u.prototype.guid=function(e){e=e||{version:5};var t="ABCDEF1234567890",n="AB89",r=this.string({pool:t,length:8})+"-"+this.string({pool:t,length:4})+"-"+e.version+this.string({pool:t,length:3})+"-"+this.string({pool:n,length:1})+this.string({pool:t,length:3})+"-"+this.string({pool:t,length:12});return r},u.prototype.hash=function(e){e=a(e,{length:40,casing:"lower"});var t=e.casing==="upper"?o.toUpperCase():o;return this.string({pool:t,length:e.length})},u.prototype.luhn_check=function(e){var t=e.toString(),n=+t.substring(t.length-1);return n===this.luhn_calculate(+t.substring(0,t.length-1))},u.prototype.luhn_calculate=function(e){var t=e.toString().split("").reverse(),n=0;for(var r=0,i=t.length;i>r;++r){var s=+t[r];r%2===0&&(s*=2,s>9&&(s-=9)),n+=s}return n*9%10},u.prototype.mersenne_twister=function(e){return new h(e)},u.prototype.VERSION="0.5.4";var h=function(e){e===undefined&&(e=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,this.init_genrand(e)};h.prototype.init_genrand=function(e){this.mt[0]=e>>>0;for(this.mti=1;this.mti<this.N;this.mti++)e=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30,this.mt[this.mti]=(((e&4294901760)>>>16)*1812433253<<16)+(e&65535)*1812433253+this.mti,this.mt[this.mti]>>>=0},h.prototype.init_by_array=function(e,t){var n=1,r=0,i,s;this.init_genrand(19650218),i=this.N>t?this.N:t;for(;i;i--)s=this.mt[n-1]^this.mt[n-1]>>>30,this.mt[n]=(this.mt[n]^(((s&4294901760)>>>16)*1664525<<16)+(s&65535)*1664525)+e[r]+r,this.mt[n]>>>=0,n++,r++,n>=this.N&&(this.mt[0]=this.mt[this.N-1],n=1),r>=t&&(r=0);for(i=this.N-1;i;i--)s=this.mt[n-1]^this.mt[n-1]>>>30,this.mt[n]=(this.mt[n]^(((s&4294901760)>>>16)*1566083941<<16)+(s&65535)*1566083941)-n,this.mt[n]>>>=0,n++,n>=this.N&&(this.mt[0]=this.mt[this.N-1],n=1);this.mt[0]=2147483648},h.prototype.genrand_int32=function(){var e,t=new Array(0,this.MATRIX_A);if(this.mti>=this.N){var n;this.mti===this.N+1&&this.init_genrand(5489);for(n=0;n<this.N-this.M;n++)e=this.mt[n]&this.UPPER_MASK|this.mt[n+1]&this.LOWER_MASK,this.mt[n]=this.mt[n+this.M]^e>>>1^t[e&1];for(;n<this.N-1;n++)e=this.mt[n]&this.UPPER_MASK|this.mt[n+1]&this.LOWER_MASK,this.mt[n]=this.mt[n+(this.M-this.N)]^e>>>1^t[e&1];e=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^e>>>1^t[e&1],this.mti=0}return e=this.mt[this.mti++],e^=e>>>11,e^=e<<7&2636928640,e^=e<<15&4022730752,e^=e>>>18,e>>>0},h.prototype.genrand_int31=function(){return this.genrand_int32()>>>1},h.prototype.genrand_real1=function(){return this.genrand_int32()*(1/4294967295)},h.prototype.random=function(){return this.genrand_int32()*(1/4294967296)},h.prototype.genrand_real3=function(){return(this.genrand_int32()+.5)*(1/4294967296)},h.prototype.genrand_res53=function(){var e=this.genrand_int32()>>>5,t=this.genrand_int32()>>>6;return(e*67108864+t)*(1/9007199254740992)},typeof exports!="undefined"&&(typeof module!="undefined"&&module.exports&&(exports=module.exports=u),exports.Chance=u),typeof n=="function"&&n.amd&&n("vendor/chance",[],function(){return u}),typeof window=="object"&&typeof window.document=="object"&&(window.Chance=u,window.chance=new u)}(),n("utils/configurable",["require"],function(e){function t(e,t){for(var n in t)(function(n){e[n]=function(r){return arguments.length?(t[n]=r,e):t[n]}})(n)}return t}),n("species/clicker",["require","../utils/configurable","../vendor/chance"],function(e){var t=e("../utils/configurable"),n=e("../vendor/chance");return function(){function f(){var t,n,r,i,s=0;do{t=a.positionSelector(),n=t[0],r=t[1],i=e.elementFromPoint(n,r),s++;if(s>a.maxNbTries)return!1}while(!i||!a.canClick(i));var o=e.createEvent("MouseEvents"),u=a.randomizer.pick(a.clickTypes);o.initMouseEvent(u,!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(o),typeof a.showAction=="function"&&a.showAction(n,r,u),typeof a.logger.log=="function"&&a.logger.log("gremlin","clicker   ",u,"at",n,r)}var e=window.document,r=e.body,i=["click","click","click","click","click","click","dblclick","dblclick","mousedown","mouseup","mouseover","mouseover","mouseover","mousemove","mouseout"],s=function(){return[a.randomizer.natural({max:e.documentElement.clientWidth-1}),a.randomizer.natural({max:e.documentElement.clientHeight-1})]},o=function(t,n){var i=e.createElement("div");i.style.border="3px solid red",i.style["border-radius"]="50%",i.style.width="40px",i.style.height="40px",i.style["box-sizing"]="border-box",i.style.position="absolute",i.style.webkitTransition="opacity 1s ease-out",i.style.mozTransition="opacity 1s ease-out",i.style.transition="opacity 1s ease-out",i.style.left=t-20+"px",i.style.top=n-20+"px";var s=r.appendChild(i);setTimeout(function(){r.removeChild(s)},1e3),setTimeout(function(){s.style.opacity=0},50)},u=function(){return!0},a={clickTypes:i,positionSelector:s,showAction:o,canClick:u,maxNbTries:10,logger:{},randomizer:new n};return t(f,a),f}}),n("species/formFiller",["require","../utils/configurable","../vendor/chance"],function(e){var t=e("../utils/configurable"),n=e("../vendor/chance");return function(){function u(){var t=[],n=d();for(var r in o.elementMapTypes)o.elementMapTypes.hasOwnProperty(r)&&t.push(r);var i,s=0;do{var u=e.querySelectorAll(t.join(","));if(u.length===0)return!1;i=o.randomizer.pick(u),s++;if(s>o.maxNbTries)return!1}while(!i||!o.canFillElement(i));var a=null;for(var f in o.elementMapTypes)if(i[n](f)){a=f;break}var l=o.elementMapTypes[a](i);typeof o.showAction=="function"&&o.showAction(i),typeof o.logger.log=="function"&&o.logger.log("gremlin","formFiller","input",l,"in",i)}function a(e){var t=o.randomizer.character();return e.value+=t,t}function f(e){var t=o.randomizer.character({pool:"0123456789"});return e.value+=t,t}function l(e){var t=e.querySelectorAll("option"),n=o.randomizer.pick(t);for(var r=0,i=t.length;r<i;r++){var s=t[r];s.selected=s.value==n.value}return n.value}function c(t){var n=e.createEvent("MouseEvents");return n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),t.dispatchEvent(n),t.value}function h(t){var n=e.createEvent("MouseEvents");return n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),t.dispatchEvent(n),t.value}function p(e){var t=o.randomizer.email();return e.value=t,t}function d(){var t=e.querySelector("body");return(t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector).name}var e=window.document,r={'input[type="text"]':a,'input[type="password"]':a,'input[type="number"]':f,select:l,'input[type="radio"]':c,'input[type="checkbox"]':h,'input[type="email"]':p,"input:not([type])":a},i=function(e){typeof e.attributes["data-old-border"]=="undefined"&&(e.attributes["data-old-border"]=e.style.border);var t=e.attributes["data-old-border"];e.style.border="1px solid red",setTimeout(function(){e.style.border=t},500)},s=function(){return!0},o={elementMapTypes:r,showAction:i,canFillElement:s,maxNbTries:10,logger:{},randomizer:new n};return t(u,o),u}}),n("species/scroller",["require","../utils/configurable","../vendor/chance"],function(e){var t=e("../utils/configurable"),n=e("../vendor/chance");return function(){function a(){var e=u.positionSelector(),t=e[0],n=e[1];window.scrollTo(t,n),typeof u.showAction=="function"&&u.showAction(t,n),typeof u.logger.log=="function"&&u.logger.log("gremlin","scroller  ","scroll to",t,n)}var e=window.document,r=e.documentElement,i=e.body,s=function(){var e=Math.max(i.scrollWidth,i.offsetWidth,r.scrollWidth,r.offsetWidth,r.clientWidth),t=Math.max(i.scrollHeight,i.offsetHeight,r.scrollHeight,r.offsetHeight,r.clientHeight);return[u.randomizer.natural({max:e-r.clientWidth}),u.randomizer.natural({max:t-r.clientHeight})]},o=function(t,n){var s=e.createElement("div");s.style.border="3px solid red",s.style.width=r.clientWidth-25+"px",s.style.height=r.clientHeight-25+"px",s.style.position="absolute",s.style.webkitTransition="opacity 1s ease-out",s.style.mozTransition="opacity 1s ease-out",s.style.transition="opacity 1s ease-out",s.style.left=t+10+"px",s.style.top=n+10+"px";var o=i.appendChild(s);setTimeout(function(){i.removeChild(o)},1e3),setTimeout(function(){o.style.opacity=0},50)},u={positionSelector:s,showAction:o,logger:{},randomizer:new n};return t(a,u),a}}),n("species/typer",["require","../utils/configurable","../vendor/chance"],function(e){var t=e("../utils/configurable"),n=e("../vendor/chance");return function(){function a(){var t=Math.max(i.scrollWidth,i.offsetWidth,r.scrollWidth,r.offsetWidth,r.clientWidth),n=Math.max(i.scrollHeight,i.offsetHeight,r.scrollHeight,r.offsetHeight,r.clientHeight),s=e.createEvent("KeyboardEvent"),o=typeof s.initKeyboardEvent!="undefined"?"initKeyboardEvent":"initKeyEvent",a=u.randomizer.natural({max:360}),f=u.randomizer.natural({max:r.clientWidth-1}),l=u.randomizer.natural({max:r.clientHeight-1}),c=e.elementFromPoint(f,l);s[o](u.randomizer.pick(u.eventTypes),!0,!0,c,!1,!1,!1,!1,a,0),c.dispatchEvent(s),typeof u.showAction=="function"&&u.showAction(c,f,l,a),typeof u.logger.log=="function"&&u.logger.log("gremlin","typer       type",a,"at",f,l)}var e=window.document,r=e.documentElement,i=e.body,s=["keypress","keyup","keydown"],o=function(t,n,r,s){var o=e.createElement("div");o.style.border="3px solid orange",o.style["border-radius"]="50%",o.style.width="40px",o.style.height="40px",o.style["box-sizing"]="border-box",o.style.position="absolute",o.style.webkitTransition="opacity 1s ease-out",o.style.mozTransition="opacity 1s ease-out",o.style.transition="opacity 1s ease-out",o.style.left=n+"px",o.style.top=r+"px",o.style.textAlign="center",o.style.paddingTop="7px",o.innerHTML=String.fromCharCode(s);var u=i.appendChild(o);setTimeout(function(){i.removeChild(u)},1e3),setTimeout(function(){u.style.opacity=0},50)},u={eventTypes:s,showAction:o,logger:{},randomizer:new n};return t(a,u),a}}),n("mogwais/alert",["require","../utils/configurable","../vendor/chance"],function(e){var t=e("../utils/configurable"),n=e("../vendor/chance");return function(){function l(){o.watchEvents.indexOf("alert")!==-1&&(window.alert=function(e){o.logger.warn("mogwai ","alert     ",e,"alert")}),o.watchEvents.indexOf("confirm")!==-1&&(window.confirm=function(e){o.confirmResponse(),o.logger.warn("mogwai ","alert     ",e,"confirm")}),o.watchEvents.indexOf("prompt")!==-1&&(window.prompt=function(e){o.promptResponse(),o.logger.warn("mogwai ","alert     ",e,"prompt")})}var e=["alert","confirm","prompt"],r=function(){return o.randomizer.bool()},i=function(){return o.randomizer.sentence()},s={warn:function(){}},o={watchEvents:e,confirmResponse:r,promptResponse:i,logger:s,randomizer:new n},u=window.alert,a=window.confirm,f=window.prompt;return l.cleanUp=function(){return window.alert=u,window.confirm=a,window.prompt=f,l},t(l,o),l}}),n("mogwais/fps",["require","../utils/configurable"],function(e){var t=e("../utils/configurable");return function(){function o(e){e-i>r.delay&&(u(e),i=e);if(!s)return;window.requestAnimationFrame(o)}function u(){function t(t){e=t,window.requestAnimationFrame(n)}function n(t){var n=t-e<16?60:1e3/(t-e),i=r.levelSelector(n);r.logger[i]("mogwai ","fps       ",n)}var e;window.requestAnimationFrame(t)}function a(){s=!0,window.requestAnimationFrame(o)}var e={log:function(){},warn:function(){},error:function(){}},n=function(e){return e<10?"error":e<20?"warn":"log"},r={delay:500,levelSelector:n,logger:e},i=-Infinity,s;return a.cleanUp=function(){return s=!1,a},t(a,r),a}}),n("mogwais/gizmo",["require","../utils/configurable"],function(e){var t=e("../utils/configurable");return function(){function s(){function s(){e++,e==n.maxErrors&&(t.stop(),window.setTimeout(function(){n.logger.warn("mogwai ","gizmo     ","stopped test execution after ",n.maxErrors,"errors")},4))}var e=0,t=this;r=window.onerror,window.onerror=function(e,t,n){return s(),r?r(e,t,n):!1},i=n.logger.error,n.logger.error=function(){s(),i.apply(n.logger,arguments)}}var e={warn:function(){}},n={maxErrors:10,logger:e},r,i;return s.cleanUp=function(){return window.onerror=r,n.logger.error=i.bind(n.logger),s},t(s,n),s}}),n("utils/executeInSeries",["require"],function(e){function t(e,t,n,r){var i=t.length;e=e.slice(0);var s=function(e,t){if(!e.length)return typeof r=="function"?r():!0;var o=e.shift();o.apply(n,t),o.length===i&&s(e,t,r)};t.push(function(){s(e,t,r)}),s(e,t,r)}return t}),n("strategies/allTogether",["require","../utils/executeInSeries","../utils/configurable"],function(e){var t=e("../utils/executeInSeries"),n=e("../utils/configurable");return function(){function s(n,s,u){function l(e){t(n,[],f,e)}function c(t){if(r)return;if(t>=a)return o();l(function(){setTimeout(function(){c(++t)},e.delay)})}var a=s&&s.nb?s.nb:e.nb,f=this;r=!1,i=u,c(0)}function o(){typeof i=="function"&&i(),i=null}var e={delay:10,nb:100},r,i;return s.stop=function(){r=!0,setTimeout(o,4)},n(s,e),s}}),n("strategies/bySpecies",["require","../utils/executeInSeries","../utils/configurable"],function(e){var t=e("../utils/executeInSeries"),n=e("../utils/configurable");return function(){function s(n,s,u){function l(n,i,s){if(r)return;if(i>=a)return s();t([n],[],f,function(){setTimeout(function(){l(n,++i,s)},e.delay)})}function c(){if(r)return;if(n.length===0)return o();l(n.shift(),0,c)}var a=s&&s.nb?s.nb:e.nb,n=n.slice(0),f=this;r=!1,i=u,c()}function o(){typeof i=="function"&&i(),i=null}var e={delay:10,nb:100},r,i;return s.stop=function(){r=!0,setTimeout(o,4)},n(s,e),s}}),n("strategies/distribution",["require","../utils/executeInSeries","../utils/configurable","../vendor/chance"],function(e){var t=e("../utils/executeInSeries"),n=e("../utils/configurable"),r=e("../vendor/chance");return function(){function o(n,r,o){function p(r,s,o){if(i)return;if(s>=l)return f();t([r],[],h,function(){setTimeout(function(){p(a(n,c),++s,o)},e.delay)})}var l=r&&r.nb?r.nb:e.nb,n=n.slice(0),c=e.distribution.length===0?u(n):e.distribution,h=this;if(l===0)return o();i=!1,s=o,p(a(n,c),0,p)}function u(e){var t=e.length;if(t===0)return[];var n=[],r=1/t;for(var i=0;i<t;i++)n.push(r);return n}function a(t,n){var r=0,i=e.randomizer.floating({min:0,max:1});for(var s=0,o=t.length;s<o;s++){r+=n[s];if(i<=r)return t[s]}return function(){}}function f(){typeof s=="function"&&s(),s=null}var e={distribution:[],delay:10,nb:100,randomizer:new r},i,s;return o.stop=function(){i=!0,setTimeout(f,4)},n(o,e),o}}),n("main",["require","./vendor/chance","./species/clicker","./species/formFiller","./species/scroller","./species/typer","./mogwais/alert","./mogwais/fps","./mogwais/gizmo","./strategies/allTogether","./strategies/bySpecies","./strategies/distribution","./utils/executeInSeries"],function(e){function s(e,t){for(var n=0,r=t.length;n<r;n++)for(var i in e)typeof t[n][i]=="function"&&t[n][i](e[i])}var t=e("./vendor/chance"),n={species:{clicker:e("./species/clicker"),formFiller:e("./species/formFiller"),scroller:e("./species/scroller"),typer:e("./species/typer")},mogwais:{alert:e("./mogwais/alert"),fps:e("./mogwais/fps"),gizmo:e("./mogwais/gizmo")},strategies:{allTogether:e("./strategies/allTogether"),bySpecies:e("./strategies/bySpecies"),distribution:e("./strategies/distribution")}},r=e("./utils/executeInSeries"),i=function(){this._gremlins=[],this._mogwais=[],this._strategies=[],this._beforeCallbacks=[],this._afterCallbacks=[],this._logger=console,this._randomizer=new t};return i.prototype.gremlin=function(e){return this._gremlins.push(e),this},i.prototype.allGremlins=function(){for(var e in n.species)this.gremlin(n.species[e]());return this},i.prototype.mogwai=function(e){return this._mogwais.push(e),this},i.prototype.allMogwais=function(){for(var e in n.mogwais)this.mogwai(n.mogwais[e]());return this},i.prototype.strategy=function(e){return this._strategies.push(e),this},i.prototype.before=function(e){return this._beforeCallbacks.push(e),this},i.prototype.after=function(e){return this._afterCallbacks.push(e),this},i.prototype.logger=function(e){return arguments.length?(this._logger=e,this):this._logger},i.prototype.log=function(e){this._logger.log(e)},i.prototype.randomizer=function(e){return arguments.length?(this._randomizer=e,this):this._randomizer},i.prototype.seed=function(e){return this._randomizer=new t(e),this},i.prototype.unleash=function(e,t){this._gremlins.length===0&&this.allGremlins(),this._mogwais.length===0&&this.allMogwais(),this._strategies.length===0&&this.strategy(n.strategies.distribution());var i=[].concat(this._gremlins,this._mogwais),o=i.concat(this._strategies,this._beforeCallbacks,this._afterCallbacks);s({logger:this._logger,randomizer:this._randomizer},o);var u=this._beforeCallbacks;u=u.concat(this._mogwais);var a=this._afterCallbacks;for(var f=0,l=i.length;f<l;f++)typeof i[f].cleanUp=="function"&&a.push(i[f].cleanUp);var c=this;r(u,[],c,function(){r(c._strategies,[c._gremlins,e],c,function(){r(a,[],c,function(){typeof t=="function"&&t()})})})},i.prototype.stop=function(){var e=this._strategies;for(var t=0,n=e.length;t<n;t++)e[t].stop()},n.createHorde=function(){return new i},n}),t(["main"]),t("main")});

/***/ },
/* 54 */
/*!*****************************************************************!*\
  !*** ./~/gulp-webpack/~/node-libs-browser/~/process/browser.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

			// shim for using process in browser
			
			var process = module.exports = {};
			var queue = [];
			var draining = false;
			var currentQueue;
			var queueIndex = -1;
			
			function cleanUpNextTick() {
			    draining = false;
			    if (currentQueue.length) {
			        queue = currentQueue.concat(queue);
			    } else {
			        queueIndex = -1;
			    }
			    if (queue.length) {
			        drainQueue();
			    }
			}
			
			function drainQueue() {
			    if (draining) {
			        return;
			    }
			    var timeout = setTimeout(cleanUpNextTick);
			    draining = true;
			
			    var len = queue.length;
			    while(len) {
			        currentQueue = queue;
			        queue = [];
			        while (++queueIndex < len) {
			            currentQueue[queueIndex].run();
			        }
			        queueIndex = -1;
			        len = queue.length;
			    }
			    currentQueue = null;
			    draining = false;
			    clearTimeout(timeout);
			}
			
			process.nextTick = function (fun) {
			    var args = new Array(arguments.length - 1);
			    if (arguments.length > 1) {
			        for (var i = 1; i < arguments.length; i++) {
			            args[i - 1] = arguments[i];
			        }
			    }
			    queue.push(new Item(fun, args));
			    if (queue.length === 1 && !draining) {
			        setTimeout(drainQueue, 0);
			    }
			};
			
			// v8 likes predictible objects
			function Item(fun, array) {
			    this.fun = fun;
			    this.array = array;
			}
			Item.prototype.run = function () {
			    this.fun.apply(null, this.array);
			};
			process.title = 'browser';
			process.browser = true;
			process.env = {};
			process.argv = [];
			process.version = ''; // empty string to avoid regexp issues
			process.versions = {};
			
			function noop() {}
			
			process.on = noop;
			process.addListener = noop;
			process.once = noop;
			process.off = noop;
			process.removeListener = noop;
			process.removeAllListeners = noop;
			process.emit = noop;
			
			process.binding = function (name) {
			    throw new Error('process.binding is not supported');
			};
			
			// TODO(shtylman)
			process.cwd = function () { return '/' };
			process.chdir = function (dir) {
			    throw new Error('process.chdir is not supported');
			};
			process.umask = function() { return 0; };


/***/ },
/* 55 */
/*!**********************************************************************************!*\
  !*** ./~/gulp-webpack/~/node-libs-browser/~/util/~/inherits/inherits_browser.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

			if (typeof Object.create === 'function') {
			  // implementation from standard node.js 'util' module
			  module.exports = function inherits(ctor, superCtor) {
			    ctor.super_ = superCtor
			    ctor.prototype = Object.create(superCtor.prototype, {
			      constructor: {
			        value: ctor,
			        enumerable: false,
			        writable: true,
			        configurable: true
			      }
			    });
			  };
			} else {
			  // old school shim for old browsers
			  module.exports = function inherits(ctor, superCtor) {
			    ctor.super_ = superCtor
			    var TempCtor = function () {}
			    TempCtor.prototype = superCtor.prototype
			    ctor.prototype = new TempCtor()
			    ctor.prototype.constructor = ctor
			  }
			}


/***/ },
/* 56 */
/*!******************************************************************************!*\
  !*** ./~/gulp-webpack/~/node-libs-browser/~/util/support/isBufferBrowser.js ***!
  \******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

			module.exports = function isBuffer(arg) {
			  return arg && typeof arg === 'object'
			    && typeof arg.copy === 'function'
			    && typeof arg.fill === 'function'
			    && typeof arg.readUInt8 === 'function';
			}

/***/ },
/* 57 */
/*!*******************************!*\
  !*** ./~/tty-colors/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

			/**
			 * Extend strings with ANSI escape codes for styling strings in the terminal.
			 *
			 * @author Stanislav Kalashnik <sk@infomir.eu>
			 * @license GNU GENERAL PUBLIC LICENSE Version 3
			 */
			
			'use strict';
			
			var styles = {
					reset:     [0,   0],
					bold:      [1,  22],
					dim:       [2,  22],
					italic:    [3,  23],
					underline: [4,  24],
					inverse:   [7,  27],
					hidden:    [8,  28],
					strike:    [9,  29],
					black:     [30, 39],
					red:       [31, 39],
					green:     [32, 39],
					yellow:    [33, 39],
					blue:      [34, 39],
					magenta:   [35, 39],
					cyan:      [36, 39],
					white:     [37, 39],
					grey:      [90, 39],
					bgBlack:   [40, 49],
					bgRed:     [41, 49],
					bgGreen:   [42, 49],
					bgYellow:  [43, 49],
					bgBlue:    [44, 49],
					bgMagenta: [45, 49],
					bgCyan:    [46, 49],
					bgWhite:   [47, 49]
				};
			
			
			// apply all styles to String prototype
			Object.keys(styles).forEach(function ( name ) {
				// rework values to avoid unnecessary concatenations
				styles[name][0] = '\u001b[' + styles[name][0] + 'm';
				styles[name][1] = '\u001b[' + styles[name][1] + 'm';
			
				// add getter by style name
				Object.defineProperty(String.prototype, name, {
					get: function () {
						return styles[name][0] + this + styles[name][1];
					},
					// hide from iteration
					enumerable: false,
					// allow to change or remove this property
					configurable: true
				});
			});


/***/ }
/******/ ]);
//# sourceMappingURL=develop.js.map