/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.Element
 * @alternateClassName Ext.core.Element
 *
 * Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.
 *
 * All instances of this class inherit the methods of {@link Ext.fx.Anim} making visual effects easily available to all
 * DOM elements.
 *
 * Note that the events documented in this class are not Ext events, they encapsulate browser events. Some older browsers
 * may not support the full range of events. Which events are supported is beyond the control of Ext JS.
 *
 * Usage:
 *
 *     // by id
 *     var el = Ext.get("my-div");
 *
 *     // by DOM element reference
 *     var el = Ext.get(myDivElement);
 *
 * # Animations
 *
 * When an element is manipulated, by default there is no animation.
 *
 *     var el = Ext.get("my-div");
 *
 *     // no animation
 *     el.setWidth(100);
 *
 * Many of the functions for manipulating an element have an optional "animate" parameter. This parameter can be
 * specified as boolean (true) for default animation effects.
 *
 *     // default animation
 *     el.setWidth(100, true);
 *
 * To configure the effects, an object literal with animation options to use as the Element animation configuration
 * object can also be specified. Note that the supported Element animation configuration options are a subset of the
 * {@link Ext.fx.Anim} animation options specific to Fx effects. The supported Element animation configuration options
 * are:
 *
 *     Option    Default   Description
 *     --------- --------  ---------------------------------------------
 *     {@link Ext.fx.Anim#duration duration}  .35       The duration of the animation in seconds
 *     {@link Ext.fx.Anim#easing easing}    easeOut   The easing method
 *     {@link Ext.fx.Anim#callback callback}  none      A function to execute when the anim completes
 *     {@link Ext.fx.Anim#scope scope}     this      The scope (this) of the callback function
 *
 * Usage:
 *
 *     // Element animation options object
 *     var opt = {
 *         {@link Ext.fx.Anim#duration duration}: 1,
 *         {@link Ext.fx.Anim#easing easing}: 'elasticIn',
 *         {@link Ext.fx.Anim#callback callback}: this.foo,
 *         {@link Ext.fx.Anim#scope scope}: this
 *     };
 *     // animation with some options set
 *     el.setWidth(100, opt);
 *
 * The Element animation object being used for the animation will be set on the options object as "anim", which allows
 * you to stop or manipulate the animation. Here is an example:
 *
 *     // using the "anim" property to get the Anim object
 *     if(opt.anim.isAnimated()){
 *         opt.anim.stop();
 *     }
 *
 * # Composite (Collections of) Elements
 *
 * For working with collections of Elements, see {@link Ext.CompositeElement}
 *
 * @constructor
 * Creates new Element directly.
 * @param {String/HTMLElement} element
 * @param {Boolean} forceNew (optional) By default the constructor checks to see if there is already an instance of this
 * element in the cache and if there is it returns the same instance. This will skip that check (useful for extending
 * this class).
 * @return {Object}
 */
 (function() {
    var DOC = document,
        EC = Ext.cache;

    Ext.Element = Ext.core.Element = function(element, forceNew) {
        var dom = typeof element == "string" ? DOC.getElementById(element) : element,
        id;

        if (!dom) {
            return null;
        }

        id = dom.id;

        if (!forceNew && id && EC[id]) {
            // element object already exists
            return EC[id].el;
        }

        /**
         * @property {HTMLElement} dom
         * The DOM element
         */
        this.dom = dom;

        /**
         * @property {String} id
         * The DOM element ID
         */
        this.id = id || Ext.id(dom);
    };

    var DH = Ext.DomHelper,
    El = Ext.Element;


    El.prototype = {
        /**
         * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
         * @param {Object} o The object with the attributes
         * @param {Boolean} useSet (optional) false to override the default setAttribute to use expandos.
         * @return {Ext.Element} this
         */
        set: function(o, useSet) {
            var el = this.dom,
                attr,
                val;
            useSet = (useSet !== false) && !!el.setAttribute;

            for (attr in o) {
                if (o.hasOwnProperty(attr)) {
                    val = o[attr];
                    if (attr == 'style') {
                        DH.applyStyles(el, val);
                    } else if (attr == 'cls') {
                        el.className = val;
                    } else if (useSet) {
                        el.setAttribute(attr, val);
                    } else {
                        el[attr] = val;
                    }
                }
            }
            return this;
        },

        //  Mouse events
        /**
         * @event click
         * Fires when a mouse click is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event contextmenu
         * Fires when a right click is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event dblclick
         * Fires when a mouse double click is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mousedown
         * Fires when a mousedown is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mouseup
         * Fires when a mouseup is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mouseover
         * Fires when a mouseover is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mousemove
         * Fires when a mousemove is detected with the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mouseout
         * Fires when a mouseout is detected with the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mouseenter
         * Fires when the mouse enters the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event mouseleave
         * Fires when the mouse leaves the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */

        //  Keyboard events
        /**
         * @event keypress
         * Fires when a keypress is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event keydown
         * Fires when a keydown is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event keyup
         * Fires when a keyup is detected within the element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */


        //  HTML frame/object events
        /**
         * @event load
         * Fires when the user agent finishes loading all content within the element. Only supported by window, frames,
         * objects and images.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event unload
         * Fires when the user agent removes all content from a window or frame. For elements, it fires when the target
         * element or any of its content has been removed.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event abort
         * Fires when an object/image is stopped from loading before completely loaded.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event error
         * Fires when an object/image/frame cannot be loaded properly.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event resize
         * Fires when a document view is resized.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event scroll
         * Fires when a document view is scrolled.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */

        //  Form events
        /**
         * @event select
         * Fires when a user selects some text in a text field, including input and textarea.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event change
         * Fires when a control loses the input focus and its value has been modified since gaining focus.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event submit
         * Fires when a form is submitted.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event reset
         * Fires when a form is reset.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event focus
         * Fires when an element receives focus either via the pointing device or by tab navigation.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event blur
         * Fires when an element loses focus either via the pointing device or by tabbing navigation.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */

        //  User Interface events
        /**
         * @event DOMFocusIn
         * Where supported. Similar to HTML focus event, but can be applied to any focusable element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMFocusOut
         * Where supported. Similar to HTML blur event, but can be applied to any focusable element.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMActivate
         * Where supported. Fires when an element is activated, for instance, through a mouse click or a keypress.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */

        //  DOM Mutation events
        /**
         * @event DOMSubtreeModified
         * Where supported. Fires when the subtree is modified.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMNodeInserted
         * Where supported. Fires when a node has been added as a child of another node.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMNodeRemoved
         * Where supported. Fires when a descendant node of the element is removed.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMNodeRemovedFromDocument
         * Where supported. Fires when a node is being removed from a document.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMNodeInsertedIntoDocument
         * Where supported. Fires when a node is being inserted into a document.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMAttrModified
         * Where supported. Fires when an attribute has been modified.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */
        /**
         * @event DOMCharacterDataModified
         * Where supported. Fires when the character data has been modified.
         * @param {Ext.EventObject} e The {@link Ext.EventObject} encapsulating the DOM event.
         * @param {HTMLElement} t The target of the event.
         */

        /**
         * @property {String} defaultUnit
         * The default unit to append to CSS values where a unit isn't provided.
         */
        defaultUnit: "px",

        /**
         * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
         * @param {String} selector The simple selector to test
         * @return {Boolean} True if this element matches the selector, else false
         */
        is: function(simpleSelector) {
            return Ext.DomQuery.is(this.dom, simpleSelector);
        },

        /**
         * Tries to focus the element. Any exceptions are caught and ignored.
         * @param {Number} defer (optional) Milliseconds to defer the focus
         * @return {Ext.Element} this
         */
        focus: function(defer,
                        /* private */
                        dom) {
            var me = this;
            dom = dom || me.dom;
            try {
                if (Number(defer)) {
                    Ext.defer(me.focus, defer, null, [null, dom]);
                } else {
                    dom.focus();
                }
            } catch(e) {}
            return me;
        },

        /**
         * Tries to blur the element. Any exceptions are caught and ignored.
         * @return {Ext.Element} this
         */
        blur: function() {
            try {
                this.dom.blur();
            } catch(e) {}
            return this;
        },

        /**
         * Returns the value of the "value" attribute
         * @param {Boolean} asNumber true to parse the value as a number
         * @return {String/Number}
         */
        getValue: function(asNumber) {
            var val = this.dom.value;
            return asNumber ? parseInt(val, 10) : val;
        },

        /**
         * Appends an event handler to this element.
         *
         * @param {String} eventName The name of event to handle.
         *
         * @param {Function} fn The handler function the event invokes. This function is passed the following parameters:
         *
         * - **evt** : EventObject
         *
         *   The {@link Ext.EventObject EventObject} describing the event.
         *
         * - **el** : HtmlElement
         *
         *   The DOM element which was the target of the event. Note that this may be filtered by using the delegate option.
         *
         * - **o** : Object
         *
         *   The options object from the addListener call.
         *
         * @param {Object} scope (optional) The scope (**this** reference) in which the handler function is executed. **If
         * omitted, defaults to this Element.**
         *
         * @param {Object} options (optional) An object containing handler configuration properties. This may contain any of
         * the following properties:
         *
         * - **scope** Object :
         *
         *   The scope (**this** reference) in which the handler function is executed. **If omitted, defaults to this
         *   Element.**
         *
         * - **delegate** String:
         *
         *   A simple selector to filter the target or look for a descendant of the target. See below for additional details.
         *
         * - **stopEvent** Boolean:
         *
         *   True to stop the event. That is stop propagation, and prevent the default action.
         *
         * - **preventDefault** Boolean:
         *
         *   True to prevent the default action
         *
         * - **stopPropagation** Boolean:
         *
         *   True to prevent event propagation
         *
         * - **normalized** Boolean:
         *
         *   False to pass a browser event to the handler function instead of an Ext.EventObject
         *
         * - **target** Ext.Element:
         *
         *   Only call the handler if the event was fired on the target Element, _not_ if the event was bubbled up from a
         *   child node.
         *
         * - **delay** Number:
         *
         *   The number of milliseconds to delay the invocation of the handler after the event fires.
         *
         * - **single** Boolean:
         *
         *   True to add a handler to handle just the next firing of the event, and then remove itself.
         *
         * - **buffer** Number:
         *
         *   Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed by the specified number of
         *   milliseconds. If the event fires again within that time, the original handler is _not_ invoked, but the new
         *   handler is scheduled in its place.
         *
         * **Combining Options**
         *
         * In the following examples, the shorthand form {@link #on} is used rather than the more verbose addListener. The
         * two are equivalent. Using the options argument, it is possible to combine different types of listeners:
         *
         * A delayed, one-time listener that auto stops the event and adds a custom argument (forumId) to the options
         * object. The options object is available as the third parameter in the handler function.
         *
         * Code:
         *
         *     el.on('click', this.onClick, this, {
         *         single: true,
         *         delay: 100,
         *         stopEvent : true,
         *         forumId: 4
         *     });
         *
         * **Attaching multiple handlers in 1 call**
         *
         * The method also allows for a single argument to be passed which is a config object containing properties which
         * specify multiple handlers.
         *
         * Code:
         *
         *     el.on({
         *         'click' : {
         *             fn: this.onClick,
         *             scope: this,
         *             delay: 100
         *         },
         *         'mouseover' : {
         *             fn: this.onMouseOver,
         *             scope: this
         *         },
         *         'mouseout' : {
         *             fn: this.onMouseOut,
         *             scope: this
         *         }
         *     });
         *
         * Or a shorthand syntax:
         *
         * Code:
         *
         *     el.on({
         *         'click' : this.onClick,
         *         'mouseover' : this.onMouseOver,
         *         'mouseout' : this.onMouseOut,
         *         scope: this
         *     });
         *
         * **delegate**
         *
         * This is a configuration option that you can pass along when registering a handler for an event to assist with
         * event delegation. Event delegation is a technique that is used to reduce memory consumption and prevent exposure
         * to memory-leaks. By registering an event for a container element as opposed to each element within a container.
         * By setting this configuration option to a simple selector, the target element will be filtered to look for a
         * descendant of the target. For example:
         *
         *     // using this markup:
         *     <div id='elId'>
         *         <p id='p1'>paragraph one</p>
         *         <p id='p2' class='clickable'>paragraph two</p>
         *         <p id='p3'>paragraph three</p>
         *     </div>
         *
         *     // utilize event delegation to registering just one handler on the container element:
         *     el = Ext.get('elId');
         *     el.on(
         *         'click',
         *         function(e,t) {
         *             // handle click
         *             console.info(t.id); // 'p2'
         *         },
         *         this,
         *         {
         *             // filter the target element to be a descendant with the class 'clickable'
         *             delegate: '.clickable'
         *         }
         *     );
         *
         * @return {Ext.Element} this
         */
        addListener: function(eventName, fn, scope, options) {
            Ext.EventManager.on(this.dom, eventName, fn, scope || this, options);
            return this;
        },

        /**
         * Removes an event handler from this element.
         *
         * **Note**: if a *scope* was explicitly specified when {@link #addListener adding} the listener,
         * the same scope must be specified here.
         *
         * Example:
         *
         *     el.removeListener('click', this.handlerFn);
         *     // or
         *     el.un('click', this.handlerFn);
         *
         * @param {String} eventName The name of the event from which to remove the handler.
         * @param {Function} fn The handler function to remove. **This must be a reference to the function passed into the
         * {@link #addListener} call.**
         * @param {Object} scope If a scope (**this** reference) was specified when the listener was added, then this must
         * refer to the same object.
         * @return {Ext.Element} this
         */
        removeListener: function(eventName, fn, scope) {
            Ext.EventManager.un(this.dom, eventName, fn, scope || this);
            return this;
        },

        /**
         * Removes all previous added listeners from this element
         * @return {Ext.Element} this
         */
        removeAllListeners: function() {
            Ext.EventManager.removeAll(this.dom);
            return this;
        },

        /**
         * Recursively removes all previous added listeners from this element and its children
         * @return {Ext.Element} this
         */
        purgeAllListeners: function() {
            Ext.EventManager.purgeElement(this);
            return this;
        },

        /**
         * Test if size has a unit, otherwise appends the passed unit string, or the default for this Element.
         * @param size {Mixed} The size to set
         * @param units {String} The units to append to a numeric size value
         * @private
         */
        addUnits: function(size, units) {

            // Most common case first: Size is set to a number
            if (Ext.isNumber(size)) {
                return size + (units || this.defaultUnit || 'px');
            }

            // Size set to a value which means "auto"
            if (size === "" || size == "auto" || size == null) {
                return size || '';
            }

            // Otherwise, warn if it's not a valid CSS measurement
            if (!unitPattern.test(size)) {
                //<debug>
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn("Warning, size detected as NaN on Element.addUnits.");
                }
                //</debug>
                return size || '';
            }
            return size;
        },

        /**
         * Tests various css rules/browsers to determine if this element uses a border box
         * @return {Boolean}
         */
        isBorderBox: function() {
            return Ext.isBorderBox || noBoxAdjust[(this.dom.tagName || "").toLowerCase()];
        },

        /**
         * Removes this element's dom reference. Note that event and cache removal is handled at {@link Ext#removeNode
         * Ext.removeNode}
         */
        remove: function() {
            var me = this,
            dom = me.dom;

            if (dom) {
                delete me.dom;
                Ext.removeNode(dom);
            }
        },

        /**
         * Sets up event handlers to call the passed functions when the mouse is moved into and out of the Element.
         * @param {Function} overFn The function to call when the mouse enters the Element.
         * @param {Function} outFn The function to call when the mouse leaves the Element.
         * @param {Object} scope (optional) The scope (`this` reference) in which the functions are executed. Defaults
         * to the Element's DOM element.
         * @param {Object} options (optional) Options for the listener. See {@link Ext.util.Observable#addListener the
         * options parameter}.
         * @return {Ext.Element} this
         */
        hover: function(overFn, outFn, scope, options) {
            var me = this;
            me.on('mouseenter', overFn, scope || me.dom, options);
            me.on('mouseleave', outFn, scope || me.dom, options);
            return me;
        },

        /**
         * Returns true if this element is an ancestor of the passed element
         * @param {HTMLElement/String} el The element to check
         * @return {Boolean} True if this element is an ancestor of el, else false
         */
        contains: function(el) {
            return ! el ? false: Ext.Element.isAncestor(this.dom, el.dom ? el.dom: el);
        },

        /**
         * Returns the value of a namespaced attribute from the element's underlying DOM node.
         * @param {String} namespace The namespace in which to look for the attribute
         * @param {String} name The attribute name
         * @return {String} The attribute value
         */
        getAttributeNS: function(ns, name) {
            return this.getAttribute(name, ns);
        },

        /**
         * Returns the value of an attribute from the element's underlying DOM node.
         * @param {String} name The attribute name
         * @param {String} namespace (optional) The namespace in which to look for the attribute
         * @return {String} The attribute value
         * @method
         */
        getAttribute: (Ext.isIE && !(Ext.isIE9 && document.documentMode === 9)) ?
        function(name, ns) {
            var d = this.dom,
            type;
            if(ns) {
                type = typeof d[ns + ":" + name];
                if (type != 'undefined' && type != 'unknown') {
                    return d[ns + ":" + name] || null;
                }
                return null;
            }
            if (name === "for") {
                name = "htmlFor";
            }
            return d[name] || null;
        }: function(name, ns) {
            var d = this.dom;
            if (ns) {
               return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name);
            }
            return  d.getAttribute(name) || d[name] || null;
        },

        /**
         * Update the innerHTML of this element
         * @param {String} html The new HTML
         * @return {Ext.Element} this
         */
        update: function(html) {
            if (this.dom) {
                this.dom.innerHTML = html;
            }
            return this;
        }
    };

    var ep = El.prototype;

    El.addMethods = function(o) {
        Ext.apply(ep, o);
    };

    /**
     * @method
     * @alias Ext.Element#addListener
     * Shorthand for {@link #addListener}.
     */
    ep.on = ep.addListener;

    /**
     * @method
     * @alias Ext.Element#removeListener
     * Shorthand for {@link #removeListener}.
     */
    ep.un = ep.removeListener;

    /**
     * @method
     * @alias Ext.Element#removeAllListeners
     * Alias for {@link #removeAllListeners}.
     */
    ep.clearListeners = ep.removeAllListeners;

    /**
     * @method destroy
     * @member Ext.Element
     * Removes this element's dom reference. Note that event and cache removal is handled at {@link Ext#removeNode
     * Ext.removeNode}. Alias to {@link #remove}.
     */
    ep.destroy = ep.remove;

    /**
     * @property {Boolean} autoBoxAdjust
     * true to automatically adjust width and height settings for box-model issues (default to true)
     */
    ep.autoBoxAdjust = true;

    // private
    var unitPattern = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    docEl;

    /**
     * Retrieves Ext.Element objects. {@link Ext#get} is an alias for {@link Ext.Element#get}.
     *
     * **This method does not retrieve {@link Ext.Component Component}s.** This method retrieves Ext.Element
     * objects which encapsulate DOM elements. To retrieve a Component by its ID, use {@link Ext.ComponentManager#get}.
     *
     * Uses simple caching to consistently return the same object. Automatically fixes if an object was recreated with
     * the same id via AJAX or DOM.
     *
     * @param {String/HTMLElement/Ext.Element} el The id of the node, a DOM Node or an existing Element.
     * @return {Ext.Element} The Element object (or null if no matching element was found)
     * @static
     */
    El.get = function(el) {
        var ex,
        elm,
        id;
        if (!el) {
            return null;
        }
        if (typeof el == "string") {
            // element id
            if (! (elm = DOC.getElementById(el))) {
                return null;
            }
            if (EC[el] && EC[el].el) {
                ex = EC[el].el;
                ex.dom = elm;
            } else {
                ex = El.addToCache(new El(elm));
            }
            return ex;
        } else if (el.tagName) {
            // dom element
            if (! (id = el.id)) {
                id = Ext.id(el);
            }
            if (EC[id] && EC[id].el) {
                ex = EC[id].el;
                ex.dom = el;
            } else {
                ex = El.addToCache(new El(el));
            }
            return ex;
        } else if (el instanceof El) {
            if (el != docEl) {
                // refresh dom element in case no longer valid,
                // catch case where it hasn't been appended
                // If an el instance is passed, don't pass to getElementById without some kind of id
                if (Ext.isIE && (el.id == undefined || el.id == '')) {
                    el.dom = el.dom;
                } else {
                    el.dom = DOC.getElementById(el.id) || el.dom;
                }
            }
            return el;
        } else if (el.isComposite) {
            return el;
        } else if (Ext.isArray(el)) {
            return El.select(el);
        } else if (el == DOC) {
            // create a bogus element object representing the document object
            if (!docEl) {
                var f = function() {};
                f.prototype = El.prototype;
                docEl = new f();
                docEl.dom = DOC;
            }
            return docEl;
        }
        return null;
    };

    /**
     * Retrieves Ext.Element objects like {@link Ext#get} but is optimized for sub-elements.
     * This is helpful for performance, because in IE (prior to IE 9), `getElementById` uses
     * an non-optimized search. In those browsers, starting the search for an element with a
     * matching ID at a parent of that element will greatly speed up the process.
     *
     * Unlike {@link Ext#get}, this method only accepts ID's. If the ID is not a child of
     * this element, it will still be found if it exists in the document, but will be slower
     * than calling {@link Ext#get} directly.
     *
     * @param {String} id The id of the element to get.
     * @return {Ext.Element} The Element object (or null if no matching element was found)
     * @member Ext.Element
     * @method getById
     * @markdown
     */
    ep.getById = (!Ext.isIE6 && !Ext.isIE7 && !Ext.isIE8) ? El.get :
        function (id) {
            var dom = this.dom,
                cached, el, ret;

            if (dom) {
                el = dom.all[id];
                if (el) {
                    // calling El.get here is a real hit (2x slower) because it has to
                    // redetermine that we are giving it a dom el.
                    cached = EC[id];
                    if (cached && cached.el) {
                        ret = cached.el;
                        ret.dom = el;
                    } else {
                        ret = El.addToCache(new El(el));
                    }
                    return ret;
                }
            }

            return El.get(id);
        };

    El.addToCache = function(el, id) {
        if (el) {
            id = id || el.id;
            EC[id] = {
                el: el,
                data: {},
                events: {}
            };
        }
        return el;
    };

    // private method for getting and setting element data
    El.data = function(el, key, value) {
        el = El.get(el);
        if (!el) {
            return null;
        }
        var c = EC[el.id].data;
        if (arguments.length == 2) {
            return c[key];
        } else {
            return (c[key] = value);
        }
    };

    // private
    // Garbage collection - uncache elements/purge listeners on orphaned elements
    // so we don't hold a reference and cause the browser to retain them
    function garbageCollect() {
        if (!Ext.enableGarbageCollector) {
            clearInterval(El.collectorThreadId);
        } else {
            var eid,
            el,
            d,
            o;

            for (eid in EC) {
                if (!EC.hasOwnProperty(eid)) {
                    continue;
                }
                o = EC[eid];
                if (o.skipGarbageCollection) {
                    continue;
                }
                el = o.el;
                d = el.dom;
                // -------------------------------------------------------
                // Determining what is garbage:
                // -------------------------------------------------------
                // !d
                // dom node is null, definitely garbage
                // -------------------------------------------------------
                // !d.parentNode
                // no parentNode == direct orphan, definitely garbage
                // -------------------------------------------------------
                // !d.offsetParent && !document.getElementById(eid)
                // display none elements have no offsetParent so we will
                // also try to look it up by it's id. However, check
                // offsetParent first so we don't do unneeded lookups.
                // This enables collection of elements that are not orphans
                // directly, but somewhere up the line they have an orphan
                // parent.
                // -------------------------------------------------------
                if (!d || !d.parentNode || (!d.offsetParent && !DOC.getElementById(eid))) {
                    if (d && Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(d);
                    }
                    delete EC[eid];
                }
            }
            // Cleanup IE Object leaks
            if (Ext.isIE) {
                var t = {};
                for (eid in EC) {
                    if (!EC.hasOwnProperty(eid)) {
                        continue;
                    }
                    t[eid] = EC[eid];
                }
                EC = Ext.cache = t;
            }
        }
    }
    El.collectorThreadId = setInterval(garbageCollect, 30000);

    var flyFn = function() {};
    flyFn.prototype = El.prototype;

    // dom is optional
    El.Flyweight = function(dom) {
        this.dom = dom;
    };

    El.Flyweight.prototype = new flyFn();
    El.Flyweight.prototype.isFlyweight = true;
    El._flyweights = {};

    /**
     * Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference
     * to this element - the dom node can be overwritten by other code. {@link Ext#fly} is alias for
     * {@link Ext.Element#fly}.
     *
     * Use this to make one-time references to DOM elements which are not going to be accessed again either by
     * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link
     * Ext#get Ext.get} will be more appropriate to take advantage of the caching provided by the Ext.Element
     * class.
     *
     * @param {String/HTMLElement} el The dom node or id
     * @param {String} named (optional) Allows for creation of named reusable flyweights to prevent conflicts (e.g.
     * internally Ext uses "_global")
     * @return {Ext.Element} The shared Element object (or null if no matching element was found)
     * @static
     */
    El.fly = function(el, named) {
        var ret = null;
        named = named || '_global';
        el = Ext.getDom(el);
        if (el) {
            (El._flyweights[named] = El._flyweights[named] || new El.Flyweight()).dom = el;
            ret = El._flyweights[named];
        }
        return ret;
    };

    /**
     * @member Ext
     * @method get
     * @alias Ext.Element#get
     */
    Ext.get = El.get;

    /**
     * @member Ext
     * @method fly
     * @alias Ext.Element#fly
     */
    Ext.fly = El.fly;

    // speedy lookup for elements never to box adjust
    var noBoxAdjust = Ext.isStrict ? {
        select: 1
    }: {
        input: 1,
        select: 1,
        textarea: 1
    };
    if (Ext.isIE || Ext.isGecko) {
        noBoxAdjust['button'] = 1;
    }
})();

