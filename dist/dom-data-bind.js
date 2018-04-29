!function(root, factory) {
    "object" === typeof exports && "object" === typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define([], factory) : "object" === typeof exports ? exports.DomDataBind = factory() : root.DomDataBind = factory();
}("undefined" !== typeof self ? self : this, function() {
    /******/
    return function(modules) {
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/
            // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/
            // Return the exports of the module
            /******/
            return module.exports;
        }
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/
        // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        __webpack_require__.d = function(exports, name, getter) {
            /******/
            __webpack_require__.o(exports, name) || /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
            });
        };
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function() {
                return module.default;
            } : /******/
            function() {
                return module;
            };
            /******/
            __webpack_require__.d(getter, "a", getter);
            /******/
            return getter;
        };
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/
        // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 14);
    }([ /* 0 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return PRIVATE;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return UUID;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return escapeString;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return bindCallTo;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return isPureObject;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return arrayForEach;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return hasAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return getAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "q", function() {
            return setAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return removeAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return insertBefore;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return removeChild;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return createComment;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return createDocFragment;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return logError;
        });
        /* harmony export (immutable) */
        __webpack_exports__.g = createValueGetter;
        /* harmony export (immutable) */
        __webpack_exports__.j = getNodeAttrNames;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(3);
        //=====================================================
        var DOCUMENT = document;
        var FUNCTION = Function;
        var ELEMENT_PROTOTYPE = Element.prototype;
        var ARRAY_PROTOTYPE = Array.prototype;
        var VALUE_GETTERS = new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__.a();
        var _bind = FUNCTION.bind.call.bind(FUNCTION.bind);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__.a.create();
        var UUID = "D-" + Date.now() + "-" + Math.random().toString(36).replace(/[^a-z0-9]+/g, "");
        var escapeString = function(str) {
            return String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        };
        var bindCallTo = _bind(FUNCTION.call.bind, FUNCTION.call);
        var isPureObject = function(o) {
            return "[object Object]" === Object.prototype.toString.call(o);
        };
        var arrayForEach = bindCallTo(ARRAY_PROTOTYPE.forEach);
        var hasAttribute = bindCallTo(ELEMENT_PROTOTYPE.hasAttribute);
        var getAttribute = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
        var setAttribute = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);
        var removeAttribute = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
        var insertBefore = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);
        var removeChild = bindCallTo(ELEMENT_PROTOTYPE.removeChild);
        var createComment = _bind(DOCUMENT.createComment, DOCUMENT);
        var createDocFragment = _bind(DOCUMENT.createDocumentFragment, DOCUMENT);
        var logError = _bind(console.error, console);
        // eslint-disable-line
        function createValueGetter(evalCode) {
            evalCode = evalCode.trim();
            if (VALUE_GETTERS.has(evalCode)) return VALUE_GETTERS.get(evalCode);
            var fn = new FUNCTION("$data", "\nwith ($data) {\n    if ($data) {\n        with ($data) {\n            return " + evalCode + ";\n        }\n    } \n    else {\n        return " + evalCode + ";\n    }\n}\n");
            VALUE_GETTERS.set(evalCode, fn);
            return fn;
        }
        function getNodeAttrNames(node) {
            var attrNames = [];
            var total = node.attributes.length;
            for (var i = 0; i < total; i++) attrNames.push(node.attributes.item(i).name);
            return attrNames;
        }
    }, /* 1 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Directive */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(6);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_observables__ = __webpack_require__(4);
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        //===================================================================================
        /**
 * A DOM element directive.
 * NOte that any directive that removes the original DOM element from its parent
 * will prevent all subsequent directives from running.
 *
 * @class Directive
 * @extends Compose
 *
 * @param {HTMLElement} ele
 *  The HTML element that contains the directive
 * @param {String} directiveAttr
 *  The directive html element attribute as found in the element.
 * @param {String} attrValue
 *  The value of the attribute
 * @param {DomDataBind} binder
 *  The instance of DomDataBind that called the Directive
 */
        var Directive = function(_Compose) {
            _inherits(Directive, _Compose);
            function Directive() {
                _classCallCheck(this, Directive);
                return _possibleConstructorReturn(this, (Directive.__proto__ || Object.getPrototypeOf(Directive)).apply(this, arguments));
            }
            _createClass(Directive, [ {
                key: "render",
                /**
         * Render the Directive with given data
         *
         * @param {NodeHandler} handler
         * @param {Node} node
         * @param {Object} data
         */
                value: function(handler, node, data) {
                    var _this2 = this;
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.a.get(handler);
                    if (!state) {
                        state = {
                            data: null,
                            value: "",
                            isQueued: false,
                            deferUpd: this.update.bind(this, handler),
                            tracker: function() {
                                return _this2.render(handler, node, state.data);
                            }
                        };
                        __WEBPACK_IMPORTED_MODULE_2__utils__.a.set(handler, state);
                    }
                    if (state.data !== data) {
                        state.tracker.stopWatchingAll && state.tracker.stopWatchingAll();
                        state.data = data;
                    }
                    if (state.isQueued) return;
                    state.isQueued = true;
                    Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_nextTick__.a)(state.deferUpd);
                }
            }, {
                key: "update",
                value: function(handler) {
                    var handlerState = __WEBPACK_IMPORTED_MODULE_2__utils__.a.get(handler);
                    if (handlerState) {
                        var newValue = "";
                        Object(__WEBPACK_IMPORTED_MODULE_3_observables__.d)(handlerState.tracker);
                        try {
                            newValue = this._tokenValueGetter(handlerState.data || {});
                            // Update node
                            handler.update && handler.update(newValue);
                        } catch (e) {
                            Object(__WEBPACK_IMPORTED_MODULE_2__utils__.n)(e);
                        }
                        Object(__WEBPACK_IMPORTED_MODULE_3_observables__.e)(handlerState.tracker);
                        handlerState.isQueued = false;
                        handlerState.value !== newValue && (handlerState.value = newValue);
                    }
                }
            }, {
                key: "getNodeHandler",
                value: function(node) {
                    this._attr && Object(__WEBPACK_IMPORTED_MODULE_2__utils__.o)(node, this._attr);
                    return new NodeHandler(this, node);
                }
            } ], [ {
                key: "has",
                /**
         * Checks a given element has an element attribute that matches the Directive.
         * If a match is found, the html Element's attribute that was matched must be
         * returned.
         *
         * @param {HTMLElement} ele
         *
         * @returns {String}
         */
                value: function() {
                    return "";
                }
            }, {
                key: "manages",
                value: function() {
                    return false;
                }
            } ]);
            return Directive;
        }(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Compose__.a);
        /* harmony default export */
        __webpack_exports__.a = Directive;
        /**
 * A node directive handler.
 *
 * @extends Compose
 */
        var NodeHandler = function(_Compose2) {
            _inherits(NodeHandler, _Compose2);
            function NodeHandler() {
                _classCallCheck(this, NodeHandler);
                return _possibleConstructorReturn(this, (NodeHandler.__proto__ || Object.getPrototypeOf(NodeHandler)).apply(this, arguments));
            }
            _createClass(NodeHandler, [ {
                key: "init",
                value: function(directive, node) {
                    this._d = directive;
                    this._n = node;
                }
            }, {
                key: "destroy",
                value: function() {
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.a.get(this);
                    if (state) {
                        state.tracker && state.tracker.stopWatchingAll && state.tracker.stopWatchingAll();
                        state.data && (state.data = null);
                    }
                    _get(NodeHandler.prototype.__proto__ || Object.getPrototypeOf(NodeHandler.prototype), "destroy", this).call(this);
                    __WEBPACK_IMPORTED_MODULE_2__utils__.a.delete(this);
                }
            }, {
                key: "render",
                value: function(data) {
                    this._d.render(this, this._n, data);
                }
            }, {
                key: "update",
                value: function(newValue) {
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.a.get(this);
                    if (state && state.update) return state.update(newValue);
                }
            } ]);
            return NodeHandler;
        }(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Compose__.a);
    }, /* 2 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export functionBind */
        /* unused harmony export functionBindCall */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return objectDefineProperty;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return objectDefineProperties;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return objectKeys;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return isArray;
        });
        /* unused harmony export arrayForEach */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return arrayIndexOf;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return arraySplice;
        });
        /* unused harmony export consoleLog */
        /* unused harmony export consoleError */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return SymbolIterator;
        });
        // Function
        // functionBind(fn, fnParent)
        var functionBind = Function.bind.call.bind(Function.bind);
        // usage: functionBindCall(Array.prototype.forEach) // generates a bound function to Array.prototype.forEach.call
        var functionBindCall = functionBind(Function.call.bind, Function.call);
        // Object
        var objectDefineProperty = Object.defineProperty;
        var objectDefineProperties = Object.defineProperties;
        var objectKeys = Object.keys;
        // Array
        var arr = [];
        var isArray = Array.isArray;
        functionBindCall(arr.forEach);
        var arrayIndexOf = functionBindCall(arr.indexOf);
        var arraySplice = functionBindCall(arr.splice);
        // Logging
        var consoleLog = console.log;
        console.error;
        // Iterators
        var SymbolIterator = "undefined" !== typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
    }, /* 3 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(19);
        /* unused harmony reexport Map */
        /* unused harmony reexport FakeMap */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__Map__.a;
        });
    }, /* 4 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__ = __webpack_require__(5);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.d;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.c;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.f;
        });
        /* unused harmony reexport stopTrackerNotification */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.g;
        });
        /* harmony import */
        __webpack_require__(20);
        /* unused harmony reexport objectCreateComputedProp */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__arrayWatch__ = __webpack_require__(21);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_2__arrayWatch__.a;
        });
    }, /* 5 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return OBSERVABLE_IDENTIFIER;
        });
        /* harmony export (immutable) */
        __webpack_exports__.d = objectWatchProp;
        /* unused harmony export setupObjState */
        /* harmony export (immutable) */
        __webpack_exports__.c = makeObservable;
        /* harmony export (immutable) */
        __webpack_exports__.e = queueCallbackAndScheduleRun;
        /* unused harmony export destroyWatcher */
        /* harmony export (immutable) */
        __webpack_exports__.f = setDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.g = unsetDependencyTracker;
        /* unused harmony export stopTrackerNotification */
        /* harmony export (immutable) */
        __webpack_exports__.b = makeArrayWatchable;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__ = __webpack_require__(9);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(12);
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //---------------------------------------------------------------------------
        var OBSERVABLE_IDENTIFIER = "___$observable$___";
        // FIXME: this should be a Symbol()
        var DEFAULT_PROP_DEFINITION = {
            configurable: true,
            enumerable: true
        };
        var TRACKERS = new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b();
        var WATCHER_IDENTIFIER = "___$watching$___";
        var ARRAY_WATCHABLE_PROTO = "__$watchable$__";
        var HAS_ARRAY_WATCHABLE_PROTO = "__$is" + ARRAY_WATCHABLE_PROTO;
        var mutatingMethods = [ "pop", "push", "shift", "splice", "unshift", "sort", "reverse" ];
        var isPureObject = function(obj) {
            return obj && "[object Object]" === Object.prototype.toString.call(obj);
        };
        var NOTIFY_QUEUE = new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b();
        var isNotifyQueued = false;
        /**
 * A lightweight utility to Watch an object's properties and get notified when it changes.
 *
 * @param {Object} obj
 *
 * @param {String} [prop]
 *  the property to be watched. If left undefined, then all existing properties are watched.
 *
 * @param {Function} [callback]
 *  The callback to be executed when property or object changes. If left undefined, then
 *  `obj` is only made observable (internal structure created and all current enumerable'
 *  properties are made "watchable")
 *
 *  __NOTE:__
 *  The callback will receive a new non-enumerable property named `stopWatchingAll` of
 *  type `Function` that can be used to remove the given callback from all places where
 *  it is being used to watch a property.
 *
 *
 * @return {ObjectUnwatchProp}
 * Return a function to unwatch the property. Function also has a static property named
 * `destroy` that will do the same thing (ex. `unwatch.destroy()` is same as `unwatch()`)
 *
 * @example
 *
 * const oo = {};
 * const notifyNameChanged =() => console.log(`name changed: ${oo.name}`);
 * const unWatchName = objectWatchProp(oo, "name", notifyNameChanged);
 *
 * oo.name = "paul"; // console outputs: name changed: paul
 * unWatchName(); // stop watching
 * notifyNameChanged.stopWatchingAll(); // callback's `stopWatchingAll()` can also be called.
 *
 * @example
 *
 * const oo = {
 *      name: "paul",
 *      country: "usa"
 * };
 *
 * // watch all changes to object
 * objectWatchProp(oo, null, () => console.log("Something changed in object"));
 *
 * // OR: make all properties of object observable
 * objectWatchProp(oo);
 *
 */
        function objectWatchProp(obj, prop, callback) {
            obj[OBSERVABLE_IDENTIFIER] || setupObjState(obj);
            // Convert prop to observable?
            if (prop && !obj[OBSERVABLE_IDENTIFIER].props[prop]) {
                setupPropState(obj, prop);
                setupPropInterceptors(obj, prop);
            } else prop && obj[OBSERVABLE_IDENTIFIER].props[prop].setupInterceptors && setupPropInterceptors(obj, prop);
            if (prop && callback) obj[OBSERVABLE_IDENTIFIER].props[prop].storeCallback(callback); else if (!prop) {
                makeObservable(obj, false);
                callback && obj[OBSERVABLE_IDENTIFIER].storeCallback(callback);
            }
            /**
     * Unwatch an object property or object.
     *
     * @typedef {Function} ObjectUnwatchProp
     * @property {Function} destroy Same as function returned.
     */
            var unWatch = destroyWatcher.bind(obj, callback, prop ? obj[OBSERVABLE_IDENTIFIER].props[prop] : obj[OBSERVABLE_IDENTIFIER]);
            unWatch.destroy = unWatch;
            return unWatch;
        }
        function setupObjState(obj) {
            if (!obj[OBSERVABLE_IDENTIFIER]) {
                Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(obj, OBSERVABLE_IDENTIFIER, {
                    configurable: true,
                    writable: true,
                    deep: false,
                    value: {
                        props: {},
                        dependents: new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b(),
                        watchers: new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b(),
                        storeCallback: storeCallback
                    }
                });
                setupCallbackStore(obj[OBSERVABLE_IDENTIFIER].dependents, false);
                setupCallbackStore(obj[OBSERVABLE_IDENTIFIER].watchers, true);
            }
        }
        function setupCallbackStore(store) {
            var async = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            store.async = async;
            store.isQueued = false;
            store.notify = notify;
        }
        function setupPropState(obj, prop) {
            if (!obj[OBSERVABLE_IDENTIFIER].props[prop]) {
                obj[OBSERVABLE_IDENTIFIER].props[prop] = {
                    val: void 0,
                    dependents: new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b(),
                    watchers: new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b(),
                    parent: obj[OBSERVABLE_IDENTIFIER],
                    storeCallback: storeCallback,
                    setupInterceptors: true,
                    deep: obj[OBSERVABLE_IDENTIFIER].deep
                };
                setupCallbackStore(obj[OBSERVABLE_IDENTIFIER].props[prop].dependents, false);
                setupCallbackStore(obj[OBSERVABLE_IDENTIFIER].props[prop].watchers, true);
            }
            return obj[OBSERVABLE_IDENTIFIER].props[prop];
        }
        function setupPropInterceptors(obj, prop) {
            var propOldDescriptor = Object.getOwnPropertyDescriptor(obj, prop) || DEFAULT_PROP_DEFINITION;
            if (!propOldDescriptor.get) {
                obj[OBSERVABLE_IDENTIFIER].props[prop].val = obj[prop];
                // If prop is marked as `deep` then walk the value and convert it to observables
                obj[OBSERVABLE_IDENTIFIER].props[prop].deep && makeObservable(obj[OBSERVABLE_IDENTIFIER].props[prop].val);
            }
            Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(obj, prop, {
                configurable: propOldDescriptor.configurable || false,
                enumerable: propOldDescriptor.enumerable || false,
                get: function() {
                    TRACKERS.size && TRACKERS.forEach(obj[OBSERVABLE_IDENTIFIER].props[prop].storeCallback, obj[OBSERVABLE_IDENTIFIER].props[prop]);
                    if (propOldDescriptor.get) return propOldDescriptor.get.call(obj);
                    return obj[OBSERVABLE_IDENTIFIER].props[prop].val;
                },
                set: function(newVal) {
                    var priorVal = obj[prop];
                    propOldDescriptor.set ? newVal = propOldDescriptor.set.call(obj, newVal) : obj[OBSERVABLE_IDENTIFIER].props[prop].val = newVal;
                    // If this `deep` is true and the new value is an object,
                    // then ensure its observable
                    obj[OBSERVABLE_IDENTIFIER].props[prop].deep && makeObservable(newVal);
                    if (newVal !== priorVal) {
                        obj[OBSERVABLE_IDENTIFIER].props[prop].watchers.notify();
                        obj[OBSERVABLE_IDENTIFIER].props[prop].dependents.notify();
                        obj[OBSERVABLE_IDENTIFIER].watchers.notify();
                    }
                    return newVal;
                }
            });
            obj[OBSERVABLE_IDENTIFIER].props[prop].setupInterceptors = false;
            // Notify object watchers that a new prop was added
            propOldDescriptor === DEFAULT_PROP_DEFINITION && obj[OBSERVABLE_IDENTIFIER].watchers.notify();
        }
        /**
 * Makes an object (deep) observable.
 *
 * @param {Object|Array} obj
 * @param {Boolean} [walk=true]
 *  If `true` (default), the object's property values are walked and
 *  also make observable.
 * @param {Boolean} [force=false]
 *  if true, then even if object looks like it might have already been
 *  converted to an observable, it will still be walked
 *  (if `walk` is `true`)
 *
 * @return {Object|Array} Original `obj` is returned
 */
        function makeObservable(obj) {
            var walk = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            var force = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!isPureObject(obj) && !Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.d)(obj)) return obj;
            obj[OBSERVABLE_IDENTIFIER] || (// OBJECT
            isPureObject(obj) ? setupObjState(obj, force) : Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.d)(obj) && makeArrayWatchable(obj));
            // If object is marked as "deep" and we are not forcing the walk,
            // then no need to do anything. Otherwise, mark this object as
            // being `deep` and keep going
            if (!force && obj[OBSERVABLE_IDENTIFIER].deep) return;
            walk && (obj[OBSERVABLE_IDENTIFIER].deep = true);
            Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.d)(obj) ? walkArray(obj) : walkObject(obj);
            return obj;
        }
        function walkArray(arr, force) {
            for (var i = 0, t = arr.length; i < t; i++) makeObservable(arr[i], true, force);
        }
        function walkObject(obj, force) {
            // make ALL props observable
            var keys = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.g)(obj);
            for (var i = 0, t = keys.length; i < t; i++) {
                if (!obj[OBSERVABLE_IDENTIFIER].props[keys[i]]) {
                    setupPropState(obj, keys[i]);
                    setupPropInterceptors(obj, keys[i]);
                }
                // Do we need to walk this property's value?
                if (!obj[OBSERVABLE_IDENTIFIER].props[keys[i]].deep || force) {
                    obj[OBSERVABLE_IDENTIFIER].props[keys[i]].deep = true;
                    isPureObject(obj[keys[i]]) && makeObservable(obj[keys[i]], true, force);
                }
            }
        }
        function notify() {
            // this: new Set(). Set instance could have two additional attributes: async ++ isQueued
            if (!this.size) return;
            // If the watcher Set() is synchronous, then execute the callbacks now
            this.async ? this.forEach(pushCallbacksToQueue) : this.forEach(execCallback);
            queueCallbackAndScheduleRun();
        }
        function queueCallbackAndScheduleRun(cb) {
            cb && pushCallbacksToQueue(cb);
            if (isNotifyQueued || !NOTIFY_QUEUE.size) return;
            isNotifyQueued = true;
            Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_nextTick__.a)(flushQueue);
        }
        function pushCallbacksToQueue(callback) {
            NOTIFY_QUEUE.add(callback);
        }
        function execCallback(cb) {
            cb();
        }
        function flushQueue() {
            var queuedCallbacks = [].concat(_toConsumableArray(NOTIFY_QUEUE));
            NOTIFY_QUEUE.clear();
            isNotifyQueued = false;
            for (var x = 0, total = queuedCallbacks.length; x < total; x++) queuedCallbacks[x]();
            queuedCallbacks.length = 0;
        }
        function storeCallback(callback) {
            // this === PropState
            if (callback.asDependent && this.dependents) {
                setCallbackAsWatcherOf(callback, this.dependents);
                this.dependents.add(callback);
            } else {
                setCallbackAsWatcherOf(callback, this.watchers);
                this.watchers.add(callback);
            }
        }
        function destroyWatcher(callback, propSetup) {
            // this == obj
            if (callback) {
                // Object state does not have dependents
                if (propSetup.dependents) {
                    propSetup.dependents.delete(callback);
                    unsetCallbackAsWatcherOf(callback, propSetup.dependents);
                }
                propSetup.watchers.delete(callback);
                unsetCallbackAsWatcherOf(callback, propSetup.watchers);
            }
        }
        /**
 * Sets a callback to be added to the list of watchers for any property
 * that is accessed after this function is called.
 *
 * @param {Function} callback
 *  The callback to be added to dependency list of watchers.
 *  NOTE: the callback will modified to include a new property
 *  `stopWatchingAll()` which can be used to remove the given callback
 *  from ALL dependencies that include it.
 *
 */
        function setDependencyTracker(callback) {
            TRACKERS.add(callback);
        }
        /**
 * Removes a callback from being added to a property's watchers as they
 * are accessed.
 *
 * @param {Function} callback
 */
        function unsetDependencyTracker(callback) {
            TRACKERS.delete(callback);
        }
        /**
 * Store a reference to the Set instance provided on input, on the callback.
 * @private
 * @param {Function} callback
 * @param {Set} watchersSet
 */
        function setCallbackAsWatcherOf(callback, watchersSet) {
            if (!callback[WATCHER_IDENTIFIER]) {
                Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(callback, WATCHER_IDENTIFIER, {
                    configurable: true,
                    writable: true,
                    value: {
                        watching: new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__.b()
                    }
                });
                Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(callback, "stopWatchingAll", {
                    configurable: true,
                    writable: true,
                    value: function() {
                        callback[WATCHER_IDENTIFIER].watching.forEach(function(watcherList) {
                            return watcherList.delete(callback);
                        });
                        callback[WATCHER_IDENTIFIER].watching.clear();
                    }
                });
            }
            callback[WATCHER_IDENTIFIER].watching.add(watchersSet);
        }
        /**
 * Removes the reference to the given Set instance from the callback function provided
 * @private
 * @param {Function} callback
 * @param {Set} watchersSet
 */
        function unsetCallbackAsWatcherOf(callback, watchersSet) {
            callback[WATCHER_IDENTIFIER] && callback[WATCHER_IDENTIFIER].watching.delete(watchersSet);
        }
        function makeArrayWatchable(arr) {
            arr[OBSERVABLE_IDENTIFIER] || setupObjState(arr);
            // If array already has a watchable prototype, then exit
            if (arr[HAS_ARRAY_WATCHABLE_PROTO]) return;
            var arrCurrentProto = arr.__proto__;
            // eslint-disable-line
            // Create prototype interceptors?
            if (!arrCurrentProto[ARRAY_WATCHABLE_PROTO]) {
                var arrProtoInterceptor = Object.create(arrCurrentProto);
                mutatingMethods.forEach(function(method) {
                    Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(arrProtoInterceptor, method, {
                        configurable: true,
                        writable: true,
                        value: function() {
                            var _arrCurrentProto$meth;
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                            var response = (_arrCurrentProto$meth = arrCurrentProto[method]).call.apply(_arrCurrentProto$meth, [ this ].concat(args));
                            arr[OBSERVABLE_IDENTIFIER].dependents.notify();
                            arr[OBSERVABLE_IDENTIFIER].watchers.notify();
                            return response;
                        }
                    });
                });
                // VALUE ADD: include a `size` read only attribute
                Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(arrProtoInterceptor, "size", {
                    configurable: true,
                    get: function() {
                        TRACKERS.size && TRACKERS.forEach(this[OBSERVABLE_IDENTIFIER].storeCallback, this[OBSERVABLE_IDENTIFIER]);
                        return this.length;
                    }
                });
                // Add flag to new array interceptor prototype indicating its watchable
                Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(arrProtoInterceptor, HAS_ARRAY_WATCHABLE_PROTO, {
                    value: true
                });
                // Store the new interceptor prototype on the real prototype
                Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__.f)(arrCurrentProto, ARRAY_WATCHABLE_PROTO, {
                    configurable: true,
                    writable: true,
                    value: arrProtoInterceptor
                });
            }
            arr.__proto__ = arrCurrentProto[ARRAY_WATCHABLE_PROTO];
        }
    }, /* 6 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export getDestroyCallback */
        /* unused harmony export Compose */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectExtend__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__queueCallback__ = __webpack_require__(17);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        //=========================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__dataStore__.a.create();
        var COMMON_DESTROY_METHOD_NAME = [ "destroy", // Compose
        "remove", // DOM Events Listeners
        "off" ];
        // Aliases
        Object.create;
        // return all KEYs of an object, even those that are not iterable
        function objectKeys(prototype) {
            var k = void 0, keys = [];
            for (k in prototype) keys.push(k);
            return keys;
        }
        // Base instance methods for Compose'd object
        var baseMethods = /** @lends Compose.prototype */ {
            /**
     * Property indicating whether instance has been destroyed
     */
            isDestroyed: false,
            /**
     * instance initializing code
     */
            init: function() {},
            /**
     * Destroys the instance, by removing its private data.
     * Any attached `onDestroy` callback will be executed `async` - queued and
     * called on next event loop
     *
     * @param {Boolean} [executeCallbacksNow=false]
     */
            destroy: function(executeCallbacksNow) {
                if (PRIVATE.has(this)) {
                    var destroyCallbacks = PRIVATE.get(this);
                    PRIVATE.delete(this);
                    executeCallbacksNow ? destroyCallbacks.forEach(callOnDestroyCallback) : Object(__WEBPACK_IMPORTED_MODULE_2__queueCallback__.a)(function() {
                        return destroyCallbacks.forEach(callOnDestroyCallback);
                    });
                }
                "boolean" === typeof this.isDestroyed && (this.isDestroyed = true);
            },
            /**
     * Adds a callback to the queue to be called when this object's `.destroy()`
     * is called.
     *
     * @param {Function} callback
     */
            onDestroy: function(callback) {
                getInstanceState(this).push(callback);
            },
            /**
     * Returns the factory for this instance.
     *
     * @return {Compose}
     */
            getFactory: function() {
                if (this.constructor) return this.constructor;
            }
        };
        var staticMethods = /** @lends Compose */ {
            /**
     * Creates an new factory based on the prototye of the current Factory
     * and any other Factory given on input.
     *
     * @return {Compose}
     */
            extend: function() {
                var Class = function(_ref) {
                    _inherits(Class, _ref);
                    function Class() {
                        _classCallCheck(this, Class);
                        return _possibleConstructorReturn(this, (Class.__proto__ || Object.getPrototypeOf(Class)).apply(this, arguments));
                    }
                    return Class;
                }(this);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Class.prototype, args.reduce(function(newProto, obj) {
                    if (obj) {
                        var thisObjProto = obj.prototype || obj;
                        objectKeys(thisObjProto).forEach(function(objKey) {
                            newProto[objKey] = thisObjProto[objKey];
                        });
                    }
                    return newProto;
                }, {}));
                return Class;
            },
            /**
     * Checks if the Object given on input looks like an instance of this Factory.
     *
     * @return {Boolean}
     */
            isInstanceOf: function(instanceObj) {
                if (!instanceObj) return false;
                var neededKeys = objectKeys(this.prototype);
                // If any prototype key is not in the object prototype, then return false
                return !neededKeys.some(function(protoKey) {
                    return "undefined" === typeof instanceObj[protoKey];
                });
            },
            /**
     * Creates an instance object based on this factory.
     *
     * @return {Object}
     */
            create: function() {
                return new (Function.prototype.bind.apply(this, [ null ].concat(Array.prototype.slice.call(arguments))))();
            },
            /**
     * Returns a standard callback that can be used to remove cleanup instance state
     * from specific Store (WeakMap). Returned function will destroy known Instances
     * that have destroy methods.
     *
     * @param {Object} instanceState
     * @param {WeakMap} [stateStore]
     *
     * @return {Function}
     *
     * @example
     *
     * const MY_PRIVATE = new WeakMap();
     * cont NewWdg = Componse.extend({
     *      init() {
     *          const state = {};
     *          MY_PRIVATE.set(this, state);
     *          ...
     *
     *          this.onDestroy(Compose.getDestroyCallback(state, MY_PRIVATE));
     *      }
     * });
     */
            getDestroyCallback: getDestroyCallback
        };
        /**
 * Returns a standard callback that can be used to remove cleanup instance state
 * from specific Store (WeakMap). Returned function will destroy known Instances
 * that have destroy methods.
 *
 * @method Compose~getDestroyCallback
 *
 * @param {Object} instanceState
 * @param {WeakMap} [stateStore]
 *
 * @return {Function}
 *
 * @example
 *
 * const MY_PRIVATE = new WeakMap();
 * cont NewWdg = Componse.extend({
 *      init() {
 *          const state = {};
 *          MY_PRIVATE.set(this, state);
 *          ...
 *
 *          this.onDestroy(Compose.getDestroyCallback(state, MY_PRIVATE));
 *      }
 * });
 */
        function getDestroyCallback(instanceState, stateStore) {
            return function() {
                instanceState && // Destroy all Compose object
                Object.keys(instanceState).forEach(function(prop) {
                    if (instanceState[prop]) {
                        COMMON_DESTROY_METHOD_NAME.some(function(method) {
                            if (instanceState[prop][method] && ("remove" !== method || !(instanceState[prop] instanceof Node))) {
                                instanceState[prop][method]();
                                return true;
                            }
                        });
                        instanceState[prop] = void 0;
                    }
                });
                stateStore && stateStore.has && stateStore.has(instanceState) && stateStore.delete(instanceState);
            };
        }
        function getInstanceState(inst) {
            PRIVATE.has(inst) || PRIVATE.set(inst, []);
            return PRIVATE.get(inst);
        }
        function callOnDestroyCallback(callback) {
            "function" === typeof callback && callback();
        }
        /**
 * Composes new factory methods from a list of given Objects/Classes.
 *
 * @class Compose
 * @borrows Compose~getDestroyCallback as Compose.getDestroyCallback
 *
 * @example
 *
 * var Widget = Compose.create(Model, Events);
 *
 * myWidget = Widget.create();
 *
 */
        var Compose = function() {
            function ComposeConstructor() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                // Called with `new`?
                if (this && this.constructor && this instanceof this.constructor) return this.init.apply(this, args);
                // called directly
                return new (Function.prototype.bind.apply(ComposeConstructor, [ null ].concat(args)))();
            }
            ComposeConstructor.prototype.constructor = ComposeConstructor;
            return ComposeConstructor;
        }();
        Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Compose.prototype, baseMethods);
        Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Compose, staticMethods);
        /* harmony default export */
        __webpack_exports__.a = Compose;
    }, /* 7 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export dataStore */
        // POLYFILL FOR WEAKMAP
        //  [pt] changed how "delete" is defined so that it can work in IE8
        /* jshint ignore:start */
        /**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
        "undefined" === typeof WeakMap && function() {
            var defineProperty = Object.defineProperty;
            var counter = Date.now() % 1e9;
            var WeakMap = function() {
                this.name = "__st" + (1e9 * Math.random() >>> 0) + counter++ + "__";
            };
            WeakMap.prototype = {
                set: function(key, value) {
                    var entry = key[this.name];
                    entry && entry[0] === key ? entry[1] = value : defineProperty(key, this.name, {
                        value: [ key, value ],
                        writable: true
                    });
                    return this;
                },
                get: function(key) {
                    var entry;
                    return (entry = key[this.name]) && entry[0] === key ? entry[1] : void 0;
                },
                // [pt] Quotes around the delete property needed for IE8
                delete: function(key) {
                    var entry = key[this.name];
                    if (!entry || entry[0] !== key) return false;
                    entry[0] = entry[1] = void 0;
                    return true;
                },
                has: function(key) {
                    var entry = key[this.name];
                    if (!entry) return false;
                    return entry[0] === key;
                }
            };
            window.WeakMap = WeakMap;
        }();
        /* jshint ignore:end */
        /**
 * Returns an object that contains an initialized WeakMap (`stash` property)
 * where data can be stored.
 *
 * @namespace dataStore
 *
 */
        var dataStore = /** @lends dataStore */ {
            /**
   * Stash data here.
   * @type WeakMap
   */
            stash: new WeakMap(),
            /**
   * Create a private data store and return it.
   * @return {WeakMap}
   */
            create: function() {
                return new WeakMap();
            }
        };
        /* harmony default export */
        __webpack_exports__.a = dataStore;
    }, /* 8 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Set__ = __webpack_require__(9);
        /* unused harmony reexport Set */
        /* unused harmony reexport FakeSet */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__Set__.a;
        });
    }, /* 9 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Set;
        });
        /* unused harmony export FakeSet */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Iterator__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__ = __webpack_require__(2);
        //============================================================
        var Set = __WEBPACK_IMPORTED_MODULE_0__getGlobal__.a.Set && __WEBPACK_IMPORTED_MODULE_0__getGlobal__.a.Set.prototype[__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a] ? __WEBPACK_IMPORTED_MODULE_0__getGlobal__.a.Set : FakeSet;
        /* harmony default export */
        __webpack_exports__.b = Set;
        function FakeSet() {}
        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.e)(FakeSet.prototype, function(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }) : obj[key] = value;
            return obj;
        }({
            constructor: {
                value: FakeSet,
                configurable: true
            },
            _: {
                get: function() {
                    var values = [];
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.f)(this, "_", {
                        value: values
                    });
                    return values;
                }
            },
            add: {
                value: function(item) {
                    -1 === Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._, item) && this._.push(item);
                    return this;
                }
            },
            has: {
                value: function(item) {
                    return -1 !== Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._, item);
                }
            },
            size: {
                get: function() {
                    return this._.length;
                }
            },
            clear: {
                value: function() {
                    this._.splice(0);
                }
            },
            delete: {
                value: function(item) {
                    var idx = Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._, item);
                    if (-1 !== idx) {
                        this._.splice(idx, 1);
                        return true;
                    }
                    return false;
                }
            },
            values: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._);
                }
            },
            entries: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._, this._);
                }
            },
            forEach: {
                value: function(cb) {
                    var _this = this;
                    this._.forEach(function(item) {
                        return cb(item, item, _this);
                    });
                }
            }
        }, __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a, {
            value: function() {
                return this.values();
            }
        }));
    }, /* 10 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() {
                return GLOBAL;
            });
            /* unused harmony export getGlobal */
            var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            var GLOBAL = function() {
                /* global self, window, global */
                if ("undefined" !== ("undefined" === typeof window ? "undefined" : _typeof(window))) return window;
                if ("undefined" !== ("undefined" === typeof global ? "undefined" : _typeof(global))) return global;
                if ("undefined" !== ("undefined" === typeof self ? "undefined" : _typeof(self))) return self;
                return Function("return this;")();
            }();
        }).call(__webpack_exports__, __webpack_require__(18));
    }, /* 11 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = FakeIterator;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__runtime_aliases__ = __webpack_require__(2);
        //-----------------------------------------------------------------------
        // Great reference: http://2ality.com/2015/02/es6-iteration.html
        function FakeIterator(keys, values) {
            Object(__WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.f)(this, "_", {
                value: {
                    keys: keys.slice(0),
                    values: values ? values.slice(0) : null,
                    idx: 0,
                    total: keys.length
                }
            });
        }
        Object(__WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.e)(FakeIterator.prototype, {
            constructor: {
                value: FakeIterator
            },
            next: {
                enumerable: true,
                configurable: true,
                value: function() {
                    var response = {
                        done: this._.idx === this._.total
                    };
                    if (response.done) {
                        response.value = void 0;
                        return response;
                    }
                    var nextIdx = this._.idx++;
                    response.value = this._.keys[nextIdx];
                    this._.values && (response.value = [ response.value, this._.values[nextIdx] ]);
                    return response;
                }
            }
        });
        Object(__WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.f)(FakeIterator.prototype, __WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.a, {
            value: function() {
                return this;
            }
        });
    }, /* 12 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export nextTick */
        var reIsNativeCode = /native code/i;
        /**
 * Executes a function at the end of the current event Loop - during micro-task processing
 *
 * @param {Function} callback
 */
        var nextTick = function() {
            if ("undefined" !== typeof setImediate && reIsNativeCode.test(setImediate.toString())) return setImediate;
            // Native Promsie? Use it.
            if ("function" === typeof Promise && reIsNativeCode.test(Promise.toString())) {
                var resolved = Promise.resolve();
                return function(fn) {
                    resolved.then(fn).catch(function(e) {
                        return console.log(e);
                    });
                };
            }
            // fallback to setTimeout
            // From: https://bugzilla.mozilla.org/show_bug.cgi?id=686201#c68
            var immediates = [];
            var processing = false;
            function processPending() {
                setTimeout(function() {
                    immediates.shift()();
                    immediates.length ? processPending() : processing = false;
                }, 0);
            }
            return function(fn) {
                immediates.push(fn);
                if (!processing) {
                    processing = true;
                    processPending();
                }
            };
        }();
        /* harmony default export */
        __webpack_exports__.a = nextTick;
    }, /* 13 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export AttrDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        //============================================
        var attrRegExp = /^_attr\.(.*)/;
        var AttrDirective = function(_Directive) {
            _inherits(AttrDirective, _Directive);
            function AttrDirective() {
                _classCallCheck(this, AttrDirective);
                return _possibleConstructorReturn(this, (AttrDirective.__proto__ || Object.getPrototypeOf(AttrDirective)).apply(this, arguments));
            }
            _createClass(AttrDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    this._attr = attr;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.g)(attrValue || "");
                    this._htmlAttr = new RegExp(this.constructor._matches).exec(attr)[1];
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    _get(AttrDirective.prototype.__proto__ || Object.getPrototypeOf(AttrDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.a.get(handler);
                    state.update || (state.update = function(newValue) {
                        _this2.constructor._isProp ? newValue !== state.value && (node[_this2._htmlAttr] = newValue) : newValue && state.value !== newValue ? Object(__WEBPACK_IMPORTED_MODULE_1__utils__.q)(node, _this2._htmlAttr, newValue) : state.value && !newValue && Object(__WEBPACK_IMPORTED_MODULE_1__utils__.o)(node, _this2._htmlAttr);
                    });
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    var _this3 = this;
                    var directiveAttr = "";
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.j)(ele).some(function(attr) {
                        return _this3._matches.test(attr) && (directiveAttr = attr);
                    });
                    return directiveAttr;
                }
            }, {
                key: "_matches",
                get: function() {
                    return attrRegExp;
                }
            }, {
                key: "_isProp",
                get: function() {
                    return false;
                }
            } ]);
            return AttrDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = AttrDirective;
    }, /* 14 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "DomDataBindAll", function() {
            return DomDataBindAll;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__DomDataBind__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__directives_Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__directives_class_directive__ = __webpack_require__(23);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__directives_style_directive__ = __webpack_require__(27);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__directives_if_directive__ = __webpack_require__(28);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__directives_show_directive__ = __webpack_require__(29);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__directives_attr_directive__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__directives_prop_directive__ = __webpack_require__(30);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__directives_on_directive__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__directives_each_directive__ = __webpack_require__(33);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__directives_html_directive__ = __webpack_require__(34);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "DomDataBind", function() {
            return __WEBPACK_IMPORTED_MODULE_0__DomDataBind__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "Directive", function() {
            return __WEBPACK_IMPORTED_MODULE_1__directives_Directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "EachDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_9__directives_each_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "IfDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_4__directives_if_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "ClassDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_2__directives_class_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "StyleDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_3__directives_style_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "ShowDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_5__directives_show_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "AttrDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_6__directives_attr_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "PropDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_7__directives_prop_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "OnDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_8__directives_on_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "HtmlDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_10__directives_html_directive__.a;
        });
        var DomDataBindAll = __WEBPACK_IMPORTED_MODULE_0__DomDataBind__.a.extend();
        DomDataBindAll.directives = [ __WEBPACK_IMPORTED_MODULE_9__directives_each_directive__.a, __WEBPACK_IMPORTED_MODULE_4__directives_if_directive__.a, __WEBPACK_IMPORTED_MODULE_2__directives_class_directive__.a, __WEBPACK_IMPORTED_MODULE_3__directives_style_directive__.a, __WEBPACK_IMPORTED_MODULE_5__directives_show_directive__.a, __WEBPACK_IMPORTED_MODULE_6__directives_attr_directive__.a, __WEBPACK_IMPORTED_MODULE_7__directives_prop_directive__.a, __WEBPACK_IMPORTED_MODULE_8__directives_on_directive__.a, __WEBPACK_IMPORTED_MODULE_10__directives_html_directive__.a ];
        /* harmony default export */
        __webpack_exports__.default = DomDataBindAll;
    }, /* 15 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export DomDataBind */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(6);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_observables__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__bindings_text_binding__ = __webpack_require__(22);
        var TEMPLATES = new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__.a();
        // Local aliases
        var _NodeFilter = NodeFilter;
        var nodeSplitText = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.d)(Text.prototype.splitText);
        // short helpers
        var reHasDataToken = new RegExp("{{(.*?)}}");
        var reTokenMatch = new RegExp("{{(.*?)}}", "g");
        var getNodeValue = function(node) {
            return node ? node.nodeValue : "";
        };
        var hasToken = function(node) {
            return reHasDataToken.test(getNodeValue(node));
        };
        var treeWalkerFilter = {
            acceptNode: function(node) {
                if (1 === node.nodeType && !node.attributes.length) return _NodeFilter.FILTER_SKIP;
                if (3 === node.nodeType && (!node.nodeValue || -1 === node.nodeValue.indexOf("{{"))) return _NodeFilter.FILTER_SKIP;
                return _NodeFilter.FILTER_ACCEPT;
            }
        };
        /**
 * Bind data to a DOM element and automatically persist changes in that data to the UI.
 * By default, this constructor provides interpolation of Text tokens found in the DOM
 * structure (represented with double curly braces: `{{ }}`). Directives can be used
 * by extending this constructor and adding them to the [directives]{@link DomDataBind.directives}
 * static property.
 *
 * @class DomDataBind
 * @extends Compose
 *
 * @param {HTMLElement} ele
 *  The HTML element that will be parse and to which `data` will be bound.
 *
 * @param {Object} data
 *  An object whose data will be used to bind to `ele`.
 *
 */
        var DomDataBind = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend({
            init: function(ele) {
                var data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                var Factory = this.getFactory();
                var state = {
                    ele: ele,
                    data: data,
                    directives: Factory.directives.slice(0)
                };
                __WEBPACK_IMPORTED_MODULE_4__utils__.a.set(this, state);
                state.bindings = getBindingsFromDom(this, ele);
                data && this.setData(data);
                this.onDestroy(function() {
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(state.bindings, function(binding) {
                        return binding.destroy();
                    });
                    delete state.data;
                    delete state.directives;
                    delete state.bindings;
                    Factory.getDestroyCallback(state, __WEBPACK_IMPORTED_MODULE_4__utils__.a)();
                });
            },
            /**
     * Set data on to the DOM provided during initialization.
     * In most cases, you should never have the need to call this method. Data
     * provided during initialization is "live" and changes are automatically
     * reflected to dom.
     */
            setData: function(data) {
                Object(__WEBPACK_IMPORTED_MODULE_3_observables__.b)(data);
                var bindings = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(this).bindings;
                Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(bindings, function(binding) {
                    return binding.render(data);
                });
            }
        });
        /* harmony default export */
        __webpack_exports__.a = DomDataBind;
        /**
 * A list of Directives to be used.
 *
 * @name DomDataBind.directives
 * @type {Array}
 */
        DomDataBind.directives = [];
        function getBindingsFromDom(binder, ele) {
            var eleTemplate = getTemplateForDomElement(ele, binder);
            var response = [];
            if (eleTemplate.ele.hasChildNodes()) {
                ele.textContent = "";
                Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(eleTemplate.ele.childNodes, function(node) {
                    ele.appendChild(node.cloneNode(true));
                });
            }
            eleTemplate.bindings.forEach(function(directives, path) {
                var node = getNodeAt(ele, path);
                if (!node) {
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.n)(new Error("Unable to find node!"));
                    return;
                }
                Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(directives, function(Directive) {
                    response.push(Directive.getNodeHandler(node, binder));
                });
            });
            return response;
        }
        function getNodeAt(root, path) {
            if (!path.length) return root;
            Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(path, function(index) {
                return root = root.childNodes[index];
            });
            return root;
        }
        /**
 * Returns the template representation for a given dom Element
 *
 * @param {HTMLElement} ele
 * @param {DomDataBind} binder
 *
 * @return {Object}
 */
        function getTemplateForDomElement(ele, binder) {
            var templateId = ele.outerHTML;
            if (TEMPLATES.has(templateId)) return TEMPLATES.get(templateId);
            // TEMPLATE:
            //  {
            //      bindings: Map(
            //          [path via childNodes to element]: [ binding constructors ],
            //          // example:
            //          [0,1,3]: [ binding constructors ]
            //      )
            //  }
            //
            // The goal is to be able to provide a path to each elements for which a group of directives will be applied.
            var template = {
                bindings: new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__.a()
            };
            var eleToBindings = new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__.a();
            var _PRIVATE$get = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(binder), directives = _PRIVATE$get.directives;
            var domWalker = document.createTreeWalker(ele, 5, treeWalkerFilter, false);
            // 5 === NodeFilter.SHOW_ELEMENT | _NodeFilter.SHOW_TEXT
            var domEle = domWalker.currentNode;
            var ignoredChildren = new __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__.a();
            var directiveIterator = function(Directive) {
                var attrName = void 0;
                var attrValue = void 0;
                var managesNode = void 0;
                for (;attrName = Directive.has(domEle); ) {
                    attrValue = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.i)(domEle, attrName);
                    getArrayForNodeFromMap(eleToBindings, domEle).push(getDirectiveForAttribute(Directive, attrName, attrValue));
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.o)(domEle, attrName);
                    managesNode = Directive.manages();
                    managesNode && ignoredChildren.add(domEle);
                }
                return managesNode;
            };
            for (;domEle; ) {
                var skip = false;
                if (ignoredChildren.size) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = void 0;
                    try {
                        for (var _step, _iterator = ignoredChildren.values()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var ignoredParent = _step.value;
                            if (ignoredParent.contains(domEle)) {
                                skip = true;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
                        } finally {
                            if (_didIteratorError) throw _iteratorError;
                        }
                    }
                }
                skip || (// Process Element level Directives
                1 === domEle.nodeType ? directives.some(directiveIterator) : 3 === domEle.nodeType && function(child) {
                    if (hasToken(child)) {
                        reTokenMatch.lastIndex = 0;
                        var childTokenMatches = reTokenMatch.exec(getNodeValue(child));
                        for (;childTokenMatches; ) // If no need to split the text node, then just create a binding for it and exit
                        if (child.textContent === "{{" + childTokenMatches[1] + "}}") {
                            getArrayForNodeFromMap(eleToBindings, child).push(getTextBindingForToken(__WEBPACK_IMPORTED_MODULE_5__bindings_text_binding__.a, childTokenMatches[1]));
                            childTokenMatches = null;
                        } else {
                            var tokenTextNode = nodeSplitText(child, childTokenMatches.index);
                            // Split again at the end of token, so that we have a dedicated text node for the token value.
                            // Because we'll be using this as a template, well also need to replace this token value node
                            // with an HTML comment, which will be replaced later during directive initialization
                            nodeSplitText(tokenTextNode, childTokenMatches[0].length);
                            var tokenPlaceholder = tokenTextNode.parentNode.insertBefore(Object(__WEBPACK_IMPORTED_MODULE_4__utils__.e)(__WEBPACK_IMPORTED_MODULE_4__utils__.b), tokenTextNode);
                            tokenTextNode.parentNode.removeChild(tokenTextNode);
                            getArrayForNodeFromMap(eleToBindings, tokenPlaceholder).push(getTextBindingForToken(__WEBPACK_IMPORTED_MODULE_5__bindings_text_binding__.a, childTokenMatches[1]));
                            childTokenMatches = reTokenMatch.exec(getNodeValue(child));
                        }
                    }
                }(domEle));
                domEle = domWalker.nextNode();
            }
            // Create the list array of node indexes for each binding processed
            eleToBindings.forEach(function(bindings, bindingEle) {
                if (ele === bindingEle) {
                    template.bindings.set([], bindings);
                    return;
                }
                var path = [];
                var walkEle = bindingEle;
                var parent = walkEle.parentNode;
                for (;walkEle !== ele; ) {
                    path.unshift(path.indexOf.call(parent.childNodes, walkEle));
                    walkEle = walkEle.parentNode;
                    parent = walkEle.parentNode;
                }
                template.bindings.set(path, bindings);
            });
            TEMPLATES.set(templateId, template);
            eleToBindings.clear();
            ignoredChildren.clear();
            template.ele = ele.cloneNode(true);
            return template;
        }
        function getArrayForNodeFromMap(map, node) {
            map.has(node) || map.set(node, []);
            return map.get(node);
        }
        /**
 * Returns a node handlers for the given directive
 *
 * @param {Directive} Directive
 * @param {String} tokenText
 *  The token text (no curly braces)
 *
 * @returns {Directive}
 *  Returns a Directive instance. Call `.getNodeHandler` to get a handler for a given node
 */
        function getTextBindingForToken(Directive, tokenText) {
            tokenText = tokenText.trim();
            var directiveInstances = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(Directive);
            if (!directiveInstances) {
                directiveInstances = {};
                __WEBPACK_IMPORTED_MODULE_4__utils__.a.set(Directive, directiveInstances);
            }
            directiveInstances[tokenText] || (directiveInstances[tokenText] = new Directive(tokenText));
            return directiveInstances[tokenText];
        }
        function getDirectiveForAttribute(Directive, attrName, attrValue) {
            attrValue = attrValue.trim();
            var directiveSignature = attrName + "-" + __WEBPACK_IMPORTED_MODULE_4__utils__.b + "-" + attrValue;
            var directiveInstances = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(Directive);
            if (!directiveInstances) {
                directiveInstances = {};
                __WEBPACK_IMPORTED_MODULE_4__utils__.a.set(Directive, directiveInstances);
            }
            directiveInstances[directiveSignature] || (directiveInstances[directiveSignature] = new Directive(attrName, attrValue));
            return directiveInstances[directiveSignature];
        }
    }, /* 16 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export objectExtend */
        var OBJECT_TYPE = "[object Object]";
        var _toString = Function.call.bind(Object.prototype.toString);
        //============================================================
        /**
 * Extends an object with the properties of another.
 *
 * @param {Object|Boolean} mergeIntoObj
 *  The object that will have the properties of every other object provided
 *  on input merged into. This can also be a `Boolean`, in which case,
 *  a deep merge of objects will be done - argument number 2 will
 *  become the `mergeIntoObj`.
 * @param {...Object} mergeObjects
 *
 * @return {Object}
 */
        function objectExtend(mergeIntoObj) {
            var response = mergeIntoObj || {};
            for (var _len = arguments.length, mergeObjects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) mergeObjects[_key - 1] = arguments[_key];
            var total = mergeObjects.length;
            var deepMerge = false;
            var i = void 0;
            var key = void 0;
            if ("boolean" === typeof mergeIntoObj) {
                deepMerge = mergeIntoObj;
                response = mergeObjects.shift() || {};
                total = mergeObjects.length;
            }
            for (i = 0; i < total; i++) {
                if (!mergeObjects[i]) continue;
                for (key in mergeObjects[i]) mergeObjects[i].hasOwnProperty(key) && (deepMerge && _toString(response[key]) === OBJECT_TYPE && _toString(mergeObjects[i][key]) === OBJECT_TYPE ? response[key] = objectExtend(true, response[key], mergeObjects[i][key]) : response[key] = mergeObjects[i][key]);
            }
            return response;
        }
        /* harmony default export */
        __webpack_exports__.a = objectExtend;
    }, /* 17 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export queueCallback */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__es6_Set__ = __webpack_require__(8);
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //===============================================
        var callbacks = new __WEBPACK_IMPORTED_MODULE_0__es6_Set__.a();
        var queue = void 0;
        /**
 * Queue a callback to be executed after at the start of next event loop.
 * This differs from `nextTick` in that callbacks are not executed during
 * micro-processing, but rather on next event loop, so this is not ideal
 * for logic that can cause UI reflow.
 *
 * @param {Function} cb
 */
        function queueCallback(cb) {
            if ("function" === typeof cb) {
                callbacks.add(cb);
                queue || (queue = setTimeout(flushQueue, 0));
            }
        }
        /* harmony default export */
        __webpack_exports__.a = queueCallback;
        function flushQueue() {
            var cbList = [].concat(_toConsumableArray(callbacks));
            callbacks.clear();
            queue = null;
            var cb = void 0;
            for (;cb = cbList.shift(); ) {
                cb();
                cb = null;
            }
        }
    }, /* 18 */
    /***/
    function(module, exports) {
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var g;
        // This works in non-strict mode
        g = function() {
            return this;
        }();
        try {
            // This works if eval is allowed (see CSP)
            g = g || Function("return this")() || (0, eval)("this");
        } catch (e) {
            // This works if the window reference is available
            "object" === ("undefined" === typeof window ? "undefined" : _typeof(window)) && (g = window);
        }
        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}
        module.exports = g;
    }, /* 19 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Map;
        });
        /* unused harmony export FakeMap */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Iterator__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__ = __webpack_require__(2);
        //======================================================
        var Map = __WEBPACK_IMPORTED_MODULE_0__getGlobal__.a.Map && __WEBPACK_IMPORTED_MODULE_0__getGlobal__.a.Map.prototype[__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a] ? __WEBPACK_IMPORTED_MODULE_0__getGlobal__.a.Map : FakeMap;
        function FakeMap() {}
        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.e)(FakeMap.prototype, function(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }) : obj[key] = value;
            return obj;
        }({
            constructor: {
                value: FakeMap,
                configurable: true
            },
            _: {
                get: function() {
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.f)(this, "_", {
                        value: {
                            keys: [],
                            values: []
                        }
                    });
                    return this._;
                }
            },
            get: {
                value: function(key) {
                    return this._.values[Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.keys, key)];
                }
            },
            set: {
                value: function(key, _value) {
                    if (-1 === Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.keys, key)) {
                        this._.keys.push(key);
                        this._.values.push(_value);
                    }
                    return this;
                }
            },
            has: {
                value: function(key) {
                    return -1 !== Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.keys, key);
                }
            },
            size: {
                get: function() {
                    return this._.keys.length;
                }
            },
            clear: {
                value: function() {
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.c)(this._.keys, 0);
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.c)(this._.values, 0);
                }
            },
            delete: {
                value: function(key) {
                    var idx = Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.keys, key);
                    if (-1 !== idx) {
                        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.c)(this._.keys, idx, 1);
                        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.c)(this._.values, idx, 1);
                        return true;
                    }
                    return false;
                }
            },
            keys: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._.keys);
                }
            },
            values: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._.values);
                }
            },
            entries: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._.keys, this._.values);
                }
            },
            forEach: {
                value: function(cb) {
                    var _this = this;
                    this._.keys.forEach(function(item, i) {
                        return cb(_this._.values[i], item, _this);
                    });
                }
            }
        }, __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a, {
            value: function() {
                return this.entries();
            }
        }));
    }, /* 20 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export objectCreateComputedProp */
        /* harmony import */
        __webpack_require__(2);
        /* harmony import */
        __webpack_require__(5);
    }, /* 21 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = arrayWatch;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__ = __webpack_require__(5);
        //========================================================================
        /**
 * Watch an array for changes.  Utiltiy will override the array's mutating methods
 * so that notification can be provided to watchers when it changes
 *
 * @param {Array} arr
 * @param {Function} [callback]
 *  If not defined, then array is simply made "watchable"
 */
        function arrayWatch(arr, callback) {
            arr[__WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.a] || Object(__WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.b)(arr);
            callback && arr[__WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.a].storeCallback(callback);
            var unWatch = function() {
                return arr[__WEBPACK_IMPORTED_MODULE_0__objectWatchProp__.a].watchers.delete(callback);
            };
            unWatch.destroy = unWatch;
            return unWatch;
        }
    }, /* 22 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export TextBinding */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__directives_Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        //===========================================================
        var TextBinding = function(_Directive) {
            _inherits(TextBinding, _Directive);
            function TextBinding() {
                _classCallCheck(this, TextBinding);
                return _possibleConstructorReturn(this, (TextBinding.__proto__ || Object.getPrototypeOf(TextBinding)).apply(this, arguments));
            }
            _createClass(TextBinding, [ {
                key: "init",
                value: function(tokenText) {
                    this._tokenText = tokenText;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.g)(tokenText);
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(TextBinding.prototype.__proto__ || Object.getPrototypeOf(TextBinding.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.a.get(handler);
                    state.update || (state.update = function(newValue) {
                        newValue !== node.nodeValue && (node.nodeValue = newValue);
                    });
                }
            }, {
                key: "getNodeHandler",
                value: function(node) {
                    // Text nodes are processed in a special way in `DomDataBind.getTemplateForDomElement`, where
                    // free-floating textnode are replaced with HTML comments in order to not lose their place when
                    // converted to text and then back to dom elements. We replace those here now..
                    if (8 === node.nodeType && node.nodeValue === __WEBPACK_IMPORTED_MODULE_1__utils__.b) {
                        var nodeToRemove = node;
                        // FIXME: below code should use node.ownerDocument???
                        node = node.parentNode.insertBefore(document.createTextNode(""), nodeToRemove);
                        nodeToRemove.parentNode.removeChild(nodeToRemove);
                    }
                    return _get(TextBinding.prototype.__proto__ || Object.getPrototypeOf(TextBinding.prototype), "getNodeHandler", this).call(this, node);
                }
            } ]);
            return TextBinding;
        }(__WEBPACK_IMPORTED_MODULE_0__directives_Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = TextBinding;
    }, /* 23 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export ClassDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domHasClass__ = __webpack_require__(24);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(25);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(26);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var ClassDirective = function(_Directive) {
            _inherits(ClassDirective, _Directive);
            function ClassDirective() {
                _classCallCheck(this, ClassDirective);
                return _possibleConstructorReturn(this, (ClassDirective.__proto__ || Object.getPrototypeOf(ClassDirective)).apply(this, arguments));
            }
            _createClass(ClassDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    this._attr = attr;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.g)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(ClassDirective.prototype.__proto__ || Object.getPrototypeOf(ClassDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(handler);
                    state.update || (state.update = function(newValue) {
                        return applyCssClassesToNode(node, newValue, newValue !== state.value ? state.value : {});
                    });
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_4__utils__.k)(ele, "_class") ? "_class" : "";
                }
            } ]);
            return ClassDirective;
        }(__WEBPACK_IMPORTED_MODULE_3__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = ClassDirective;
        function applyCssClassesToNode(node) {
            var newClasses = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            var oldClasses = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            Object.keys(newClasses).concat(Object.keys(oldClasses)).forEach(function(className) {
                newClasses[className] && !Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domHasClass__.a)(node, className) ? Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_domutils_domAddClass__.a)(node, className) : !newClasses[className] && Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domHasClass__.a)(node, className) && Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domRemoveClass__.a)(node, className);
            });
        }
    }, /* 24 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domHasClass */
        /**
 * Check if an element has a given class
 *
 * @function domHasClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 *
 * @return {Boolean}
 */
        function domHasClass(el, cssClass) {
            if (el && cssClass) return el.classList.contains(cssClass);
            return false;
        }
        /* harmony default export */
        __webpack_exports__.a = domHasClass;
    }, /* 25 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domAddClass */
        /**
 * Adds class to an element
 *
 * @function domAddClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 *  Multiple classes can be set using spaces as a delimiter
 */
        function domAddClass(el, cssClass) {
            var classNameList = String(cssClass).trim().split(/\s+/).map(function(className) {
                return className.trim();
            });
            el && classNameList.length && classNameList.forEach(function(cssClass) {
                return el.classList.add(cssClass);
            });
        }
        /* harmony default export */
        __webpack_exports__.a = domAddClass;
    }, /* 26 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domRemoveClass */
        /**
 * removes a class from an element
 *
 * @function domRemoveClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 */
        function domRemoveClass(el, cssClass) {
            return el.classList.remove(cssClass);
        }
        /* harmony default export */
        __webpack_exports__.a = domRemoveClass;
    }, /* 27 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export StyleDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Directive__ = __webpack_require__(1);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var StyleDirective = function(_Directive) {
            _inherits(StyleDirective, _Directive);
            function StyleDirective() {
                _classCallCheck(this, StyleDirective);
                return _possibleConstructorReturn(this, (StyleDirective.__proto__ || Object.getPrototypeOf(StyleDirective)).apply(this, arguments));
            }
            _createClass(StyleDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    this._attr = attr;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_0__utils__.g)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(StyleDirective.prototype.__proto__ || Object.getPrototypeOf(StyleDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_0__utils__.a.get(handler);
                    if (!state.update) {
                        var eleStyleList = node.style;
                        state.update = function(newValue) {
                            Object.keys(newValue).forEach(function(styleProp) {
                                eleStyleList[styleProp] !== newValue[styleProp] && (eleStyleList[styleProp] = newValue[styleProp]);
                            });
                        };
                    }
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_0__utils__.k)(ele, "_style") ? "_style" : "";
                }
            } ]);
            return StyleDirective;
        }(__WEBPACK_IMPORTED_MODULE_1__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = StyleDirective;
    }, /* 28 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export IfDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var IfDirective = function(_Directive) {
            _inherits(IfDirective, _Directive);
            function IfDirective() {
                _classCallCheck(this, IfDirective);
                return _possibleConstructorReturn(this, (IfDirective.__proto__ || Object.getPrototypeOf(IfDirective)).apply(this, arguments));
            }
            _createClass(IfDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    this._attr = attr;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.g)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(IfDirective.prototype.__proto__ || Object.getPrototypeOf(IfDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.a.get(handler);
                    if (!state.update) {
                        state.cloneBinder = null;
                        state.update = function(showElement) {
                            if (state.value === showElement) return;
                            if (showElement && !state.cloneBinder) {
                                var frag = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.f)();
                                var clonedEle = node.cloneNode(true);
                                frag.appendChild(clonedEle);
                                state.cloneBinder = new handler._Factory(clonedEle, state.data);
                                Object(__WEBPACK_IMPORTED_MODULE_1__utils__.l)(handler._placeholderEle.parentNode, frag, handler._placeholderEle);
                                state.cloneBinder.onDestroy(function() {
                                    // We do this check because a directive could have
                                    // removed the element from its parent.
                                    clonedEle.parentNode && Object(__WEBPACK_IMPORTED_MODULE_1__utils__.p)(clonedEle.parentNode, clonedEle);
                                });
                            } else if (!showElement && state.cloneBinder) {
                                state.cloneBinder.destroy();
                                state.cloneBinder = null;
                            }
                        };
                        handler.onDestroy(function() {
                            if (state.cloneBinder) {
                                state.cloneBinder.destroy();
                                state.cloneBinder = null;
                            }
                        });
                    }
                }
            }, {
                key: "getNodeHandler",
                value: function(node, binder) {
                    var handler = _get(IfDirective.prototype.__proto__ || Object.getPrototypeOf(IfDirective.prototype), "getNodeHandler", this).call(this, node);
                    handler._Factory = binder.getFactory();
                    handler._placeholderEle = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.e)("");
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.l)(node.parentNode, handler._placeholderEle, node);
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.p)(node.parentNode, node);
                    return handler;
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__.k)(ele, "_if") ? "_if" : "";
                }
            }, {
                key: "manages",
                value: function() {
                    return true;
                }
            } ]);
            return IfDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = IfDirective;
    }, /* 29 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export ShowDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var ShowDirective = function(_Directive) {
            _inherits(ShowDirective, _Directive);
            function ShowDirective() {
                _classCallCheck(this, ShowDirective);
                return _possibleConstructorReturn(this, (ShowDirective.__proto__ || Object.getPrototypeOf(ShowDirective)).apply(this, arguments));
            }
            _createClass(ShowDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    this._attr = attr;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.g)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(ShowDirective.prototype.__proto__ || Object.getPrototypeOf(ShowDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.a.get(handler);
                    if (!state.update) {
                        var eleStyleList = node.style;
                        var eleDisplayStyle = node.display || "";
                        state.update = function(newValue) {
                            newValue ? eleStyleList.display = eleDisplayStyle : "none" !== eleStyleList.display && (eleStyleList.display = "none");
                        };
                    }
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__.k)(ele, "_show") ? "_show" : "";
                }
            } ]);
            return ShowDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = ShowDirective;
    }, /* 30 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export PropDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__attr_directive__ = __webpack_require__(13);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var matchRegExp = /^_prop\.(.*)/;
        var PropDirective = function(_AttrDirective) {
            _inherits(PropDirective, _AttrDirective);
            function PropDirective() {
                _classCallCheck(this, PropDirective);
                return _possibleConstructorReturn(this, (PropDirective.__proto__ || Object.getPrototypeOf(PropDirective)).apply(this, arguments));
            }
            _createClass(PropDirective, null, [ {
                key: "_isProp",
                value: function() {
                    return true;
                }
            }, {
                key: "_matches",
                get: function() {
                    return matchRegExp;
                }
            } ]);
            return PropDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__attr_directive__.a);
        /* harmony default export */
        __webpack_exports__.a = PropDirective;
    }, /* 31 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export OnDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(32);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var matchesDirective = new RegExp("^" + Object(__WEBPACK_IMPORTED_MODULE_2__utils__.h)("_on.") + "(.*)");
        var OnDirective = function(_Directive) {
            _inherits(OnDirective, _Directive);
            function OnDirective() {
                _classCallCheck(this, OnDirective);
                return _possibleConstructorReturn(this, (OnDirective.__proto__ || Object.getPrototypeOf(OnDirective)).apply(this, arguments));
            }
            _createClass(OnDirective, [ {
                key: "init",
                value: function(directiveAttr, attrValue) {
                    this._attr = directiveAttr;
                    this._eventName = new RegExp(matchesDirective).exec(directiveAttr)[1];
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_2__utils__.g)(attrValue || "");
                }
            }, {
                key: "handleEvent",
                value: function(handler, domEv) {
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.a.get(handler);
                    var tokenValue = void 0;
                    state.data.$ev = domEv;
                    try {
                        tokenValue = this._tokenValueGetter(state.data);
                    } catch (e) {
                        Object(__WEBPACK_IMPORTED_MODULE_2__utils__.n)(e);
                        return;
                    }
                    delete state.data.$ev;
                    if ("function" === typeof tokenValue) return tokenValue(domEv);
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.a.get(handler);
                    if (!state) {
                        state = {
                            data: {
                                $data: {}
                            },
                            tracker: function() {
                                return _this2.render(handler, node, state.data);
                            }
                        };
                        __WEBPACK_IMPORTED_MODULE_2__utils__.a.set(handler, state);
                    }
                    data && (data.$data ? state.data = data : state.data.$data = data);
                }
            }, {
                key: "getNodeHandler",
                value: function(node) {
                    var handler = _get(OnDirective.prototype.__proto__ || Object.getPrototypeOf(OnDirective.prototype), "getNodeHandler", this).call(this, node);
                    var evListener = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domAddEventListener__.a)(node, this._eventName, this.handleEvent.bind(this, handler));
                    handler.onDestroy(function() {
                        return evListener.remove();
                    });
                    return handler;
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    var directiveAttr = "";
                    Object(__WEBPACK_IMPORTED_MODULE_2__utils__.j)(ele).some(function(attr) {
                        return matchesDirective.test(attr) && (directiveAttr = attr);
                    });
                    return directiveAttr;
                }
            } ]);
            return OnDirective;
        }(__WEBPACK_IMPORTED_MODULE_1__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = OnDirective;
    }, /* 32 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domAddEventListener */
        /**
 * Adds an event handler to a DOM element and returns back an
 * object that allows for removal of the event.
 *
 * @function domAddEventListener
 *
 * @param {HTMLElement} ele
 * @param {String} event
 *  The event to listen to (ex. `click`). Multiple events can be defined
 *  by separating them with whitespace
 * @param {Function} callback
 * @param {Boolean} [capture]
 *
 * @return DOMEventListener
 *
 * @example
 *
 * var listener = domAddEventHandler(myEle, "click", function(){});
 * ...
 * listener.remove();
 */
        function domAddEventListener(ele, event, callback, capture) {
            var events = event.split(/\s+/);
            var evListeners = {};
            events.forEach(function(evName) {
                ele.addEventListener(evName, callback, capture);
                evListeners[evName] = {
                    remove: function() {
                        return ele.removeEventListener(evName, callback, capture);
                    }
                };
            });
            /**
     * A DOM Event listener.
     *
     * @typedef {Object} DOMEventListener
     *
     * @property {Function} remove
     * @property {Object} listeners
     *  List of listeners that were bound to the DOM element. Each listeners has a
     *  corresponding `.remove()` method.
     */
            return Object.create({
                listeners: evListeners,
                remove: function() {
                    events.forEach(function(evName) {
                        return evListeners[evName].remove();
                    });
                }
            });
        }
        /* harmony default export */
        __webpack_exports__.a = domAddEventListener;
    }, /* 33 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export EachDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observables__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var NOOP = function() {};
        var isEmptyList = function(list) {
            return Array.isArray(list) && !list.length || Object(__WEBPACK_IMPORTED_MODULE_3__utils__.m)(list) && !Object.keys(list).length;
        };
        /**
 * Directive to loop through an array or object. In addition, it also support an
 * internal binding directive called `b:key`
 *
 * @class EachDirective
 * @extends Directive
 *
 * @example
 *
 * // Use with array:
 * _each="item of arrayList"
 * _each="(item, index) of arrayList"
 *
 * // Use with Object
 * _each="value of objectList"
 * _each="(value, key) of objectList"
 */
        var EachDirective = function(_Directive) {
            _inherits(EachDirective, _Directive);
            function EachDirective() {
                _classCallCheck(this, EachDirective);
                return _possibleConstructorReturn(this, (EachDirective.__proto__ || Object.getPrototypeOf(EachDirective)).apply(this, arguments));
            }
            _createClass(EachDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    var _parseDirectiveValue = parseDirectiveValue((attrValue || "").trim()), _parseDirectiveValue2 = _slicedToArray(_parseDirectiveValue, 2), iteratorArgs = _parseDirectiveValue2[0], listVar = _parseDirectiveValue2[1];
                    this._attr = attr;
                    this._iteratorArgs = iteratorArgs;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_3__utils__.g)(listVar || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    _get(EachDirective.prototype.__proto__ || Object.getPrototypeOf(EachDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_3__utils__.a.get(handler);
                    if (!state.update) {
                        state.binders = [];
                        state.bindersByKey = new __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_Map__.a();
                        state.listChgEv = null;
                        state.listIterator = function() {
                            return _this2.iterateOverList(handler, state.value);
                        };
                        state.update = function(newList) {
                            if (newList === state.value) return;
                            if (state.value) {
                                state.value = null;
                                if (state.listChgEv) {
                                    state.listChgEv();
                                    state.listChgEv = null;
                                }
                            }
                            if (!newList) {
                                _this2.destroyChildBinders(state.binders, handler);
                                return;
                            }
                            Object(__WEBPACK_IMPORTED_MODULE_1_observables__.e)(state.tracker);
                            // We don't need to be notified of changes for individual items.
                            state.value = newList;
                            // Make sure data is observable and setup event listners on it.
                            Object(__WEBPACK_IMPORTED_MODULE_1_observables__.b)(newList);
                            Array.isArray(newList) ? // state.listChgEv = newList.on("change", state.listIterator);
                            state.listChgEv = Object(__WEBPACK_IMPORTED_MODULE_1_observables__.a)(newList, state.listIterator) : Object(__WEBPACK_IMPORTED_MODULE_3__utils__.m)(newList) && (// state.listChgEv = watchProp(newList, newList, state.listIterator);
                            state.listChgEv = Object(__WEBPACK_IMPORTED_MODULE_1_observables__.c)(newList, null, state.listIterator));
                            isEmptyList(newList) && state.binders ? _this2.destroyChildBinders(state.binders, handler) : _this2.iterateOverList(handler, newList);
                        };
                        // When handler is destroyed, remove data listeners
                        handler.onDestroy(function() {
                            if (state.listChgEv) {
                                state.listChgEv.off();
                                state.listChgEv = null;
                            }
                            state.bindersByKey.clear();
                            _this2.destroyChildBinders(state.binders, handler);
                        });
                    }
                }
            }, {
                key: "destroyChildBinders",
                value: function(binders, handler) {
                    if (!binders || !binders.length) return;
                    binders = binders.splice(0);
                    if (handler._isSoleChild) {
                        var parentEle = handler._placeholderEle.parentNode;
                        parentEle.textContent = "";
                        parentEle.appendChild(handler._placeholderEle);
                        setTimeout(function() {
                            Object(__WEBPACK_IMPORTED_MODULE_3__utils__.c)(binders.splice(0), function(binder) {
                                return binder.destroy();
                            });
                        });
                    } else Object(__WEBPACK_IMPORTED_MODULE_3__utils__.c)(binders.splice(0), function(binder) {
                        return binder.destroy();
                    });
                }
            }, {
                key: "getDataForIteration",
                value: function(values, dataObj) {
                    return this._iteratorArgs.reduce(function(rowData, argName) {
                        rowData[argName] = values.shift();
                        return rowData;
                    }, dataObj || {});
                }
            }, {
                key: "iterateOverList",
                value: function(handler, newData) {
                    var _state$binders;
                    var state = __WEBPACK_IMPORTED_MODULE_3__utils__.a.get(handler);
                    var attachedEleBinder = [];
                    var newDomElements = Object(__WEBPACK_IMPORTED_MODULE_3__utils__.f)();
                    var isArray = Array.isArray(newData);
                    var data = void 0;
                    if (isArray) {
                        isArray = true;
                        data = newData;
                    } else {
                        if (!Object(__WEBPACK_IMPORTED_MODULE_3__utils__.m)(newData)) return;
                        data = Object.keys(newData);
                    }
                    for (var i = 0, t = data.length; i < t; i++) {
                        var rowData = {
                            $data: state.data.$data || state.data
                        };
                        isArray ? this.getDataForIteration([ data[i], i ], rowData) : this.getDataForIteration([ newData[data[i]], data[i], i ], rowData);
                        var _getRowBinder = this.getRowBinder(handler, rowData), _getRowBinder2 = _slicedToArray(_getRowBinder, 2), binder = _getRowBinder2[0], newEle = _getRowBinder2[1];
                        binder._loop.pos = attachedEleBinder.length;
                        attachedEleBinder.push(binder);
                        newDomElements.appendChild(newEle);
                    }
                    newDomElements.hasChildNodes() && Object(__WEBPACK_IMPORTED_MODULE_3__utils__.l)(handler._placeholderEle.parentNode, newDomElements, handler._placeholderEle);
                    // store the new attached set of elements in their new positions, and
                    // clean up old Binders that are no longer being used/displayed
                    // FIXME: this needs to be more efficient!!!!!!
                    Object(__WEBPACK_IMPORTED_MODULE_3__utils__.c)((_state$binders = state.binders).splice.apply(_state$binders, [ 0, state.binders.length ].concat(attachedEleBinder)), function(childBinder) {
                        if (-1 === attachedEleBinder.indexOf(childBinder)) {
                            childBinder._loop.rowEle && childBinder._loop.rowEle.parentNode && childBinder._loop.rowEle.parentNode.removeChild(childBinder._loop.rowEle);
                            childBinder.destroy();
                        }
                    });
                    state.binders.length && this.positionChildren(handler._placeholderEle.parentNode, handler._placeholderEle, state.binders);
                }
            }, {
                key: "getRowBinder",
                value: function(handler, rowData) {
                    var state = __WEBPACK_IMPORTED_MODULE_3__utils__.a.get(handler);
                    var itemBinder = null;
                    var newDomElements = Object(__WEBPACK_IMPORTED_MODULE_3__utils__.f)();
                    var rowKey = handler.getKey(rowData);
                    var rowEleBinder = void 0;
                    rowKey && (rowEleBinder = state.bindersByKey.get(rowKey));
                    // If a binder already exists for this key, then just update its data
                    if (rowEleBinder) {
                        delete rowData.$data;
                        rowEleBinder.setData(rowData);
                        itemBinder = rowEleBinder;
                        return [ itemBinder, newDomElements ];
                    }
                    var frag = Object(__WEBPACK_IMPORTED_MODULE_3__utils__.f)();
                    var rowEle = handler._n.cloneNode(true);
                    frag.appendChild(rowEle);
                    rowEleBinder = new handler._Factory(rowEle, rowData);
                    rowEleBinder._loop = {
                        rowEle: rowEle,
                        rowKey: rowKey,
                        pos: -1
                    };
                    newDomElements.appendChild(frag);
                    rowKey && state.bindersByKey.set(rowKey, rowEleBinder);
                    itemBinder = rowEleBinder;
                    rowEleBinder.onDestroy(function() {
                        rowEle.parentNode && Object(__WEBPACK_IMPORTED_MODULE_3__utils__.p)(handler._placeholderEle.parentNode, rowEle);
                        rowKey && state.bindersByKey.delete(rowKey);
                    });
                    return [ itemBinder, newDomElements ];
                }
            }, {
                key: "positionChildren",
                value: function(eleParentNode, placeholderEle, childEleBinders) {
                    // FIXME: speed improvement = convert to while() looop
                    Object(__WEBPACK_IMPORTED_MODULE_3__utils__.c)(childEleBinders, function(childBinder, index) {
                        if (childBinder._loop.pos === index) return;
                        Object(__WEBPACK_IMPORTED_MODULE_3__utils__.l)(eleParentNode, childBinder._loop.rowEle, childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle);
                        childBinder._loop.pos = index;
                    });
                }
            }, {
                key: "getNodeHandler",
                value: function(node, binder) {
                    var handler = _get(EachDirective.prototype.__proto__ || Object.getPrototypeOf(EachDirective.prototype), "getNodeHandler", this).call(this, node);
                    handler._Factory = binder.getFactory();
                    handler._placeholderEle = Object(__WEBPACK_IMPORTED_MODULE_3__utils__.e)("");
                    handler.getKey = Object(__WEBPACK_IMPORTED_MODULE_3__utils__.k)(node, "_key") ? Object(__WEBPACK_IMPORTED_MODULE_3__utils__.g)(Object(__WEBPACK_IMPORTED_MODULE_3__utils__.i)(node, "_key")) : NOOP;
                    handler._isSoleChild = hasDedicatedParent(node);
                    Object(__WEBPACK_IMPORTED_MODULE_3__utils__.l)(node.parentNode, handler._placeholderEle, node);
                    Object(__WEBPACK_IMPORTED_MODULE_3__utils__.p)(node.parentNode, node);
                    Object(__WEBPACK_IMPORTED_MODULE_3__utils__.o)(node, "_key");
                    return handler;
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_3__utils__.k)(ele, "_each") ? "_each" : "";
                }
            }, {
                key: "manages",
                value: function() {
                    return true;
                }
            } ]);
            return EachDirective;
        }(__WEBPACK_IMPORTED_MODULE_2__Directive__.a);
        function parseDirectiveValue(attrValue) {
            var matches = /\(?(.+?)\)?\W?(?:of|in)\W(.*)/.exec(attrValue);
            if (matches) {
                matches = matches.slice(1);
                matches[0] = matches[0].split(/\,/).map(function(argName) {
                    return String(argName).trim();
                });
                return matches;
            }
            return [];
        }
        function hasDedicatedParent(node) {
            return Array.prototype.every.call(node.parentNode.childNodes, function(childNode) {
                return childNode === node || 3 === childNode.nodeType && !childNode.textContent.trim();
            });
        }
        /* harmony default export */
        __webpack_exports__.a = EachDirective;
    }, /* 34 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export HtmlDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    "value" in descriptor && (descriptor.writable = true);
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                protoProps && defineProperties(Constructor.prototype, protoProps);
                staticProps && defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            null === object && (object = Function.prototype);
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (void 0 === desc) {
                var parent = Object.getPrototypeOf(object);
                return null === parent ? void 0 : get(parent, property, receiver);
            }
            if ("value" in desc) return desc.value;
            var getter = desc.get;
            if (void 0 === getter) return;
            return getter.call(receiver);
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        var HtmlDirective = function(_Directive) {
            _inherits(HtmlDirective, _Directive);
            function HtmlDirective() {
                _classCallCheck(this, HtmlDirective);
                return _possibleConstructorReturn(this, (HtmlDirective.__proto__ || Object.getPrototypeOf(HtmlDirective)).apply(this, arguments));
            }
            _createClass(HtmlDirective, [ {
                key: "init",
                value: function(attr, attrValue) {
                    this._attr = attr;
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.g)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(HtmlDirective.prototype.__proto__ || Object.getPrototypeOf(HtmlDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.a.get(handler);
                    state.update || (state.update = function(newValue) {
                        if (newValue === state.value) return;
                        node.innerHTML = newValue;
                    });
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__.k)(ele, "_html") ? "_html" : "";
                }
            } ]);
            return HtmlDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = HtmlDirective;
    } ]);
});
//# sourceMappingURL=dom-data-bind.js.map