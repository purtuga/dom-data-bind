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
            return DOM_DATA_BIND_PROP;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return PRIVATE;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return UUID;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return escapeString;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return bindCallTo;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "p", function() {
            return isPureObject;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "q", function() {
            return isString;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return arrayForEach;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return arraySlice;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "n", function() {
            return hasAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "l", function() {
            return getAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "u", function() {
            return setAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "s", function() {
            return removeAttribute;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "o", function() {
            return insertBefore;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "t", function() {
            return removeChild;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return createComment;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return createTextNode;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return createDocFragment;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "r", function() {
            return logError;
        });
        /* harmony export (immutable) */
        __webpack_exports__.j = createValueGetter;
        /* harmony export (immutable) */
        __webpack_exports__.m = getNodeAttrNames;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(6);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(11);
        //=====================================================
        var DOCUMENT = document;
        var FUNCTION = Function;
        var ELEMENT_PROTOTYPE = Element.prototype;
        var ARRAY_PROTOTYPE = Array.prototype;
        var VALUE_GETTERS = new __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__.a();
        var _bind = FUNCTION.bind.call.bind(FUNCTION.bind);
        var DOM_DATA_BIND_PROP = "DomDataBind";
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__.a.create();
        var UUID = "D-" + Date.now() + "-" + Math.random().toString(36).replace(/[^a-z0-9]+/g, "");
        var escapeString = function(str) {
            return String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        };
        var bindCallTo = _bind(FUNCTION.call.bind, FUNCTION.call);
        var isPureObject = function(o) {
            return "[object Object]" === Object.prototype.toString.call(o);
        };
        var isString = function(s) {
            return "string" === typeof s;
        };
        var arrayForEach = bindCallTo(ARRAY_PROTOTYPE.forEach);
        var arraySlice = bindCallTo(ARRAY_PROTOTYPE.slice);
        var hasAttribute = bindCallTo(ELEMENT_PROTOTYPE.hasAttribute);
        var getAttribute = bindCallTo(ELEMENT_PROTOTYPE.getAttribute);
        var setAttribute = bindCallTo(ELEMENT_PROTOTYPE.setAttribute);
        var removeAttribute = bindCallTo(ELEMENT_PROTOTYPE.removeAttribute);
        var insertBefore = bindCallTo(ELEMENT_PROTOTYPE.insertBefore);
        var removeChild = bindCallTo(ELEMENT_PROTOTYPE.removeChild);
        var createComment = _bind(DOCUMENT.createComment, DOCUMENT);
        var createTextNode = _bind(DOCUMENT.createTextNode, DOCUMENT);
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
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(5);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_observables_src_objectWatchProp__ = __webpack_require__(2);
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
 * @param {String} directiveAttr
 *  The directive html element attribute as found in the element.
 * @param {String} attrValue
 *  The value of the attribute
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
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(handler);
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
                        __WEBPACK_IMPORTED_MODULE_2__utils__.b.set(handler, state);
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
                    var handlerState = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(handler);
                    if (handlerState) {
                        var newValue = "";
                        Object(__WEBPACK_IMPORTED_MODULE_3_observables_src_objectWatchProp__.e)(handlerState.tracker);
                        try {
                            newValue = this._tokenValueGetter(handlerState.data || {});
                            // Update node
                            handler.update && handler.update(newValue);
                        } catch (e) {
                            Object(__WEBPACK_IMPORTED_MODULE_2__utils__.r)(e);
                        }
                        Object(__WEBPACK_IMPORTED_MODULE_3_observables_src_objectWatchProp__.f)(handlerState.tracker);
                        handlerState.isQueued = false;
                        handlerState.value !== newValue && (handlerState.value = newValue);
                    }
                }
            }, {
                key: "getNodeHandler",
                value: function(node) {
                    this._attr && 8 !== node.nodeType && Object(__WEBPACK_IMPORTED_MODULE_2__utils__.s)(node, this._attr);
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
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(this);
                    if (state) {
                        state.tracker && state.tracker.stopWatchingAll && state.tracker.stopWatchingAll();
                        state.data && (state.data = null);
                    }
                    _get(NodeHandler.prototype.__proto__ || Object.getPrototypeOf(NodeHandler.prototype), "destroy", this).call(this);
                    __WEBPACK_IMPORTED_MODULE_2__utils__.b.delete(this);
                }
            }, {
                key: "render",
                value: function(data) {
                    this._d.render(this, this._n, data);
                }
            }, {
                key: "update",
                value: function(newValue) {
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(this);
                    if (state && state.update) return state.update(newValue);
                }
            } ]);
            return NodeHandler;
        }(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Compose__.a);
    }, /* 2 */
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
        /* unused harmony export queueCallbackAndScheduleRun */
        /* unused harmony export destroyWatcher */
        /* harmony export (immutable) */
        __webpack_exports__.e = setDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.f = unsetDependencyTracker;
        /* unused harmony export stopTrackerNotification */
        /* harmony export (immutable) */
        __webpack_exports__.b = makeArrayWatchable;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_runtime_aliases__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Set__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(10);
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
    }, /* 3 */
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
    }, /* 4 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.b = render;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Template__ = __webpack_require__(12);
        //==========================================================================
        var TEMPLATES = new Map();
        /**
 * Returns a DocumentFragment representation of the given `html` code provided on
 * input bound to the given data.
 *
 * @param {String} html
 * @param {Object} [data]
 * @param {Array} [directives]
 *
 * @return {DocumentFragment}
 */
        function render(html, data, directives) {
            TEMPLATES.has(html) || TEMPLATES.set(html, new __WEBPACK_IMPORTED_MODULE_0__Template__.b(html, directives));
            return TEMPLATES.get(html).cloneWith(data);
        }
        /* harmony default export */
        __webpack_exports__.a = render;
    }, /* 5 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export getDestroyCallback */
        /* unused harmony export Compose */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectExtend__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(6);
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
    }, /* 6 */
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
    }, /* 7 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Set;
        });
        /* unused harmony export FakeSet */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Iterator__ = __webpack_require__(9);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__ = __webpack_require__(3);
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
    }, /* 8 */
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
        }).call(__webpack_exports__, __webpack_require__(19));
    }, /* 9 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = FakeIterator;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__runtime_aliases__ = __webpack_require__(3);
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
    }, /* 10 */
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
    }, /* 11 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(20);
        /* unused harmony reexport Map */
        /* unused harmony reexport FakeMap */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__Map__.a;
        });
    }, /* 12 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Template */
        /* harmony export (immutable) */
        __webpack_exports__.c = getBindingFor;
        /* harmony export (immutable) */
        __webpack_exports__.a = applyBindingsToTemplateInstance;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_observables_src_objectWatchProp__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_domutils_domFind__ = __webpack_require__(21);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__bindings_text_binding__ = __webpack_require__(22);
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
        var DROPS_NODES_ON_CLONE = function() {
            var frag = Object(__WEBPACK_IMPORTED_MODULE_2__utils__.h)();
            frag.appendChild(Object(__WEBPACK_IMPORTED_MODULE_2__utils__.i)("test"));
            frag.appendChild(Object(__WEBPACK_IMPORTED_MODULE_2__utils__.i)(""));
            return 1 === frag.cloneNode(true).childNodes.length;
        }();
        // Local aliases
        var nodeSplitText = Object(__WEBPACK_IMPORTED_MODULE_2__utils__.f)(Text.prototype.splitText);
        // short helpers
        var reHasDataToken = new RegExp("{{(.*?)}}");
        var reTokenMatch = new RegExp("{{(.*?)}}", "g");
        var getNodeValue = function(node) {
            return node ? node.nodeValue : "";
        };
        var hasToken = function(node) {
            return reHasDataToken.test(getNodeValue(node));
        };
        /**
 * A Dom template along with its set of know directives (after parsing it)
 */
        var Template = function() {
            function Template(html) {
                var directives = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                _classCallCheck(this, Template);
                this._template = document.createElement("template");
                this._template.innerHTML = html;
                this._directives = directives;
                this._bindings = getBindingFor(this._template.content, directives);
            }
            /**
     * Creates new DOM Element based on this template, initilizes directives
     * and then applies the data to it.
     *
     * @param {Object} [data]
     *
     * @return {DocumentFragment}
     *  Document Fragment returned will have a property named 'DomDataBind', which is
     *  a TemplateInstance class instance
     */
            _createClass(Template, [ {
                key: "cloneWith",
                value: function() {
                    var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object(__WEBPACK_IMPORTED_MODULE_0_observables_src_objectWatchProp__.c)(data);
                    var response = document.importNode(this._template.content, true);
                    response[__WEBPACK_IMPORTED_MODULE_2__utils__.a] = new TemplateInstance(response, applyBindingsToTemplateInstance(response, this._bindings, this._directives));
                    response[__WEBPACK_IMPORTED_MODULE_2__utils__.a].setData(data);
                    return response;
                }
            } ]);
            return Template;
        }();
        /* harmony default export */
        __webpack_exports__.b = Template;
        /**
 * Returns a Map() that includes the paths to nodes in the Dom template that
 * are using Directives or have bindings.
 * The map "key" is an array of `childNodes` paths from the root of the template
 * all the way to the node.
 * The map "value" is an array Directive instances for that node
 *
 * @return {Map}
 */
        function getBindingFor(ele, directives) {
            // FIXME: refactor this entire function to be faster and more efficient
            // template bindings Map() structure:
            //
            //      bindings = Map(
            //          [path, via, childNodes, to, element]: [ directive instances ],
            //          // example:
            //          [0,1,3]: [ directiveInstance1, directiveInstance2 ]
            //      )
            //  }
            //
            // The goal is to be able to provide a path to each elements for which a group of directives will be applied.
            var bindings = new Map();
            var eleToBindings = new Map();
            var ignoredChildren = new Set();
            var domEle = void 0;
            var directiveIterator = function(Directive) {
                var attrName = void 0;
                var attrValue = void 0;
                var managesNode = void 0;
                var elePlaceholder = domEle;
                for (;attrName = Directive.has(domEle); ) {
                    attrValue = Object(__WEBPACK_IMPORTED_MODULE_2__utils__.l)(domEle, attrName);
                    managesNode = Directive.manages();
                    managesNode && (elePlaceholder = Object(__WEBPACK_IMPORTED_MODULE_2__utils__.g)(""));
                    getArrayForNodeFromMap(eleToBindings, elePlaceholder).push(getDirectiveForAttribute(Directive, attrName, attrValue));
                    Object(__WEBPACK_IMPORTED_MODULE_2__utils__.s)(domEle, attrName);
                    if (managesNode) {
                        ignoredChildren.add(domEle);
                        // Replace this node with a Comment, and store the node's html
                        // as the comment data, which is then used by the directive instance
                        // to `render()` it to DOM when applicable
                        domEle.parentNode.insertBefore(elePlaceholder, domEle);
                        var fakeEle = document.createElement("div");
                        fakeEle.appendChild(domEle);
                        elePlaceholder.data = fakeEle.innerHTML;
                    }
                }
                return managesNode;
            };
            var processTextNode = function(child) {
                if (hasToken(child)) {
                    reTokenMatch.lastIndex = 0;
                    var nodeValue = getNodeValue(child);
                    var childTokenMatches = reTokenMatch.exec(nodeValue);
                    for (;childTokenMatches; ) // If no need to split the text node, then just create a binding for it and exit
                    if (nodeValue === "{{" + childTokenMatches[1] + "}}") {
                        getArrayForNodeFromMap(eleToBindings, child).push(getTextBindingForToken(__WEBPACK_IMPORTED_MODULE_3__bindings_text_binding__.a, childTokenMatches[1]));
                        childTokenMatches = null;
                    } else {
                        var tokenTextNode = nodeSplitText(child, childTokenMatches.index);
                        // IF browser drops empty nodes, then fix the child node (which now is the left portion
                        // of the split)
                        DROPS_NODES_ON_CLONE && fixEmptyTextNode(child);
                        // FIXME: need to handle empty node when browser does not do clones correctly (IE for sure... Edge might be fixed now)
                        // Split again at the end of token, so that we have a dedicated text node for the token value.
                        // Because this will be used as a template, also need to replace this token value node
                        // with an HTML comment, which will be replaced later during directive initialization
                        // The remainder of the Text value is assigned back to `child` so that we can continue
                        // to check it for other text tokens.
                        child = nodeSplitText(tokenTextNode, childTokenMatches[0].length);
                        var tokenPlaceholder = tokenTextNode.parentNode.insertBefore(Object(__WEBPACK_IMPORTED_MODULE_2__utils__.g)(__WEBPACK_IMPORTED_MODULE_2__utils__.c), tokenTextNode);
                        tokenTextNode.parentNode.removeChild(tokenTextNode);
                        getArrayForNodeFromMap(eleToBindings, tokenPlaceholder).push(getTextBindingForToken(__WEBPACK_IMPORTED_MODULE_3__bindings_text_binding__.a, childTokenMatches[1]));
                        // Reset the regular expression (since `child` was also "reset") and execute
                        // the regular expression again on the remaining text
                        reTokenMatch.lastIndex = 0;
                        childTokenMatches = reTokenMatch.exec(getNodeValue(child));
                        !childTokenMatches && DROPS_NODES_ON_CLONE && fixEmptyTextNode(child);
                    }
                }
            };
            findAllNodes(ele).forEach(function(node) {
                var skip = false;
                if (ignoredChildren.size) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = void 0;
                    try {
                        for (var _step, _iterator = ignoredChildren.values()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var ignoredParent = _step.value;
                            if (ignoredParent.contains(node)) {
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
                domEle = node;
                skip || (// Process Element level Directives
                1 === node.nodeType ? directives.some(directiveIterator) : 3 === node.nodeType && processTextNode(node));
            });
            domEle = null;
            // Create the list array of node indexes for each binding processed
            eleToBindings.forEach(function(directiveBindings, bindingEle) {
                if (ele === bindingEle) {
                    bindings.set([], directiveBindings);
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
                bindings.set(path, directiveBindings);
            });
            eleToBindings.clear();
            ignoredChildren.clear();
            return bindings;
        }
        /**
 * Applies the bindings in the given Map to the DocumentFragment provided on input.
 *
 * @param {DocumentFragment} frag
 * @param {Map<Array<Number>, Array<Directive>>} bindings
 * @param {Array<Directive>} Directives
 *
 * @return {Array<NodeHandler>}
 *  An array of Node directive handlers is returned.
 */
        function applyBindingsToTemplateInstance(frag, bindings, Directives) {
            var response = [];
            bindings.forEach(function(directivesInstances, path) {
                var node = getNodeAt(frag, path);
                if (!node) {
                    Object(__WEBPACK_IMPORTED_MODULE_2__utils__.r)(new Error("dom-data-bind#render(): Unable to find node!"));
                    return;
                }
                for (var i = 0, t = directivesInstances.length; i < t; i++) response.push(directivesInstances[i].getNodeHandler(node, Directives));
            });
            return response;
        }
        function getNodeAt(root, path) {
            if (!path.length) return root;
            Object(__WEBPACK_IMPORTED_MODULE_2__utils__.d)(path, function(index) {
                return root = root.childNodes[index];
            });
            return root;
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
            var directiveInstances = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(Directive);
            if (!directiveInstances) {
                directiveInstances = {};
                __WEBPACK_IMPORTED_MODULE_2__utils__.b.set(Directive, directiveInstances);
            }
            directiveInstances[tokenText] || (directiveInstances[tokenText] = new Directive(tokenText));
            return directiveInstances[tokenText];
        }
        function getDirectiveForAttribute(Directive, attrName, attrValue) {
            attrValue = attrValue.trim();
            var directiveSignature = attrName + "-" + __WEBPACK_IMPORTED_MODULE_2__utils__.c + "-" + attrValue;
            var directiveInstances = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(Directive);
            if (!directiveInstances) {
                directiveInstances = {};
                __WEBPACK_IMPORTED_MODULE_2__utils__.b.set(Directive, directiveInstances);
            }
            directiveInstances[directiveSignature] || (directiveInstances[directiveSignature] = new Directive(attrName, attrValue));
            return directiveInstances[directiveSignature];
        }
        /**
 *
 * @private
 * @param {HTMLElement} ele
 * @returns {boolean}
 */
        function onlyElementsWithAttributes(ele) {
            return 1 !== ele.nodeType || 1 === ele.nodeType && ele.attributes.length > 0;
        }
        /**
 *
 * @private
 * @param {Array} resultArr
 * @param {HTMLElement} ele
 * @returns {Array}
 */
        function addTextNodes(resultArr, ele) {
            resultArr.push(ele);
            if (ele.hasChildNodes()) {
                ele = ele.firstChild;
                for (;ele; ) {
                    var nextSibling = ele.nextSibling;
                    // IF Text node and it has the token
                    3 === ele.nodeType && !!ele.nodeValue && reHasDataToken.test(getNodeValue(ele)) && resultArr.push(ele);
                    DROPS_NODES_ON_CLONE && fixEmptyTextNode(ele);
                    ele = nextSibling;
                }
            }
            return resultArr;
        }
        function fixEmptyTextNode(node) {
            if (3 === node.nodeType && DROPS_NODES_ON_CLONE && !node.nodeValue) {
                node.parentNode.insertBefore(Object(__WEBPACK_IMPORTED_MODULE_2__utils__.g)(""), node);
                node.parentNode.removeChild(node);
            }
        }
        /**
 *
 * @private
 * @param {HTMLElement} ele
 *
 * @return {Array<Node>}
 */
        function findAllNodes(ele) {
            return [ ele ].concat(Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_domutils_domFind__.a)(ele, "*")).reduce(addTextNodes, []).filter(onlyElementsWithAttributes);
        }
        var TemplateInstance = function() {
            function TemplateInstance(docFrag, bindings) {
                _classCallCheck(this, TemplateInstance);
                this._frag = docFrag;
                this._bindings = bindings;
            }
            _createClass(TemplateInstance, [ {
                key: "destroy",
                value: function() {
                    if (this._bindings) {
                        for (var i = 0, t = this._bindings.length; i < t; i++) this._bindings[i].destroy();
                        this._bindings.length = 0;
                    }
                }
            }, {
                key: "setData",
                value: function(data) {
                    for (var i = 0, t = this._bindings.length; i < t; i++) this._bindings[i].render(data);
                }
            } ]);
            return TemplateInstance;
        }();
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.j)(attrValue || "");
                    this._htmlAttr = new RegExp(this.constructor._matches).exec(attr)[1];
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    _get(AttrDirective.prototype.__proto__ || Object.getPrototypeOf(AttrDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.b.get(handler);
                    state.update || (state.update = function(newValue) {
                        _this2.constructor._isProp ? newValue !== state.value && (node[_this2._htmlAttr] = newValue) : newValue && state.value !== newValue ? Object(__WEBPACK_IMPORTED_MODULE_1__utils__.u)(node, _this2._htmlAttr, newValue) : state.value && !newValue && Object(__WEBPACK_IMPORTED_MODULE_1__utils__.s)(node, _this2._htmlAttr);
                    });
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    var _this3 = this;
                    var directiveAttr = "";
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.m)(ele).some(function(attr) {
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
        var __WEBPACK_IMPORTED_MODULE_1__render__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__directives_Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__directives_class_directive__ = __webpack_require__(23);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__directives_style_directive__ = __webpack_require__(27);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__directives_if_directive__ = __webpack_require__(28);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__directives_show_directive__ = __webpack_require__(29);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__directives_attr_directive__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__directives_prop_directive__ = __webpack_require__(30);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__directives_on_directive__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__directives_each_directive__ = __webpack_require__(33);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__directives_html_directive__ = __webpack_require__(35);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "DomDataBind", function() {
            return __WEBPACK_IMPORTED_MODULE_0__DomDataBind__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "render", function() {
            return __WEBPACK_IMPORTED_MODULE_1__render__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "Directive", function() {
            return __WEBPACK_IMPORTED_MODULE_2__directives_Directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "EachDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_10__directives_each_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "IfDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_5__directives_if_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "ClassDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_3__directives_class_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "StyleDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_4__directives_style_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "ShowDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_6__directives_show_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "AttrDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_7__directives_attr_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "PropDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_8__directives_prop_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "OnDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_9__directives_on_directive__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "HtmlDirective", function() {
            return __WEBPACK_IMPORTED_MODULE_11__directives_html_directive__.a;
        });
        var DomDataBindAll = __WEBPACK_IMPORTED_MODULE_0__DomDataBind__.a.extend();
        DomDataBindAll.directives = [ __WEBPACK_IMPORTED_MODULE_10__directives_each_directive__.a, __WEBPACK_IMPORTED_MODULE_5__directives_if_directive__.a, __WEBPACK_IMPORTED_MODULE_3__directives_class_directive__.a, __WEBPACK_IMPORTED_MODULE_4__directives_style_directive__.a, __WEBPACK_IMPORTED_MODULE_6__directives_show_directive__.a, __WEBPACK_IMPORTED_MODULE_7__directives_attr_directive__.a, __WEBPACK_IMPORTED_MODULE_8__directives_prop_directive__.a, __WEBPACK_IMPORTED_MODULE_9__directives_on_directive__.a, __WEBPACK_IMPORTED_MODULE_11__directives_html_directive__.a ];
        /* harmony default export */
        __webpack_exports__.default = DomDataBindAll;
    }, /* 15 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export DomDataBind */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(5);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observables_src_objectWatchProp__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__Template__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__render__ = __webpack_require__(4);
        //======================================================================
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
 * @param {String |HTMLElement} html
 *  The HTML element that will be parse and to which `data` will be bound.
 *
 * @param {Object} data
 *  An object whose data will be used to bind to `html` element (once crated) .
 *
 */
        var DomDataBind = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend({
            /**
     * The Element whose data was bound to.
     * When a string is used on input, this will be a DocumentFragment, which
     * means that it could be empty if its content was inserted into DOM
     */
            $ele: null,
            init: function(html, data) {
                var Factory = this.getFactory();
                var state = {
                    html: html,
                    data: data,
                    directives: Factory.directives.slice(0)
                };
                __WEBPACK_IMPORTED_MODULE_2__utils__.b.set(this, state);
                if (Object(__WEBPACK_IMPORTED_MODULE_2__utils__.q)(html)) {
                    this.$ele = Object(__WEBPACK_IMPORTED_MODULE_4__render__.b)(html, data, state.directives);
                    state.bindings = this.$ele._domDataBindNodeHandlers;
                } else {
                    this.$ele = html;
                    state.bindings = Object(__WEBPACK_IMPORTED_MODULE_3__Template__.a)(html, Object(__WEBPACK_IMPORTED_MODULE_3__Template__.c)(html, state.directives), state.directives);
                    data && this.setData(data);
                }
                this.onDestroy(function() {
                    Object(__WEBPACK_IMPORTED_MODULE_2__utils__.d)(state.bindings, function(binding) {
                        return binding.destroy();
                    });
                    delete state.data;
                    delete state.directives;
                    delete state.bindings;
                    Factory.getDestroyCallback(state, __WEBPACK_IMPORTED_MODULE_2__utils__.b)();
                });
            },
            /**
     * Set data on to the DOM provided during initialization.
     * In most cases, you should never have the need to call this method. Data
     * provided during initialization is "live" and changes are automatically
     * reflected to dom.
     */
            setData: function(data) {
                Object(__WEBPACK_IMPORTED_MODULE_1_observables_src_objectWatchProp__.c)(data);
                var bindings = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(this).bindings;
                Object(__WEBPACK_IMPORTED_MODULE_2__utils__.d)(bindings, function(binding) {
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
        var __WEBPACK_IMPORTED_MODULE_0__es6_Set__ = __webpack_require__(18);
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
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Set__ = __webpack_require__(7);
        /* unused harmony reexport Set */
        /* unused harmony reexport FakeSet */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__Set__.a;
        });
    }, /* 19 */
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
    }, /* 20 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Map;
        });
        /* unused harmony export FakeMap */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Iterator__ = __webpack_require__(9);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__ = __webpack_require__(3);
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
    }, /* 21 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domFind */
        /**
 * Finds Elements within a given HTML Element using `querySelectorAll` and
 * return an Array with those elements.
 *
 * @function domFind
 *
 * @param {HTMLElement} domEle
 * @param {String} selector
 *
 * @returns {Array<HTMLElement>}
 */
        function domFind(domEle, selector) {
            return Array.prototype.slice.call(domEle.querySelectorAll(selector));
        }
        /* harmony default export */
        __webpack_exports__.a = domFind;
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.j)(tokenText);
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(TextBinding.prototype.__proto__ || Object.getPrototypeOf(TextBinding.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.b.get(handler);
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
                    if (8 === node.nodeType && node.nodeValue === __WEBPACK_IMPORTED_MODULE_1__utils__.c) {
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.j)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(ClassDirective.prototype.__proto__ || Object.getPrototypeOf(ClassDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.b.get(handler);
                    state.update || (state.update = function(newValue) {
                        return applyCssClassesToNode(node, newValue, newValue !== state.value ? state.value : {});
                    });
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_4__utils__.n)(ele, "_class") ? "_class" : "";
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_0__utils__.j)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(StyleDirective.prototype.__proto__ || Object.getPrototypeOf(StyleDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_0__utils__.b.get(handler);
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
                    return Object(__WEBPACK_IMPORTED_MODULE_0__utils__.n)(ele, "_style") ? "_style" : "";
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
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(4);
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.j)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(IfDirective.prototype.__proto__ || Object.getPrototypeOf(IfDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.b.get(handler);
                    if (!state.update) {
                        state.renderedEle = null;
                        state.insertEle = handler._placeholderEle;
                        state.directives = handler._directives;
                        state.destroyRenderedEle = destroyRenderedEle;
                        state.renderTemplate = handler._n.data;
                        state.update = renderUpdate;
                        handler.onDestroy(function() {
                            return state.destroyRenderedEle();
                        });
                    }
                }
            }, {
                key: "getNodeHandler",
                value: function(node, directives) {
                    var handler = _get(IfDirective.prototype.__proto__ || Object.getPrototypeOf(IfDirective.prototype), "getNodeHandler", this).call(this, node);
                    handler._placeholderEle = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.g)("");
                    handler._directives = directives;
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.o)(node.parentNode, handler._placeholderEle, node);
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.t)(node.parentNode, node);
                    return handler;
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__.n)(ele, "_if") ? "_if" : "";
                }
            }, {
                key: "manages",
                value: function() {
                    return true;
                }
            } ]);
            return IfDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__Directive__.a);
        function renderUpdate(showElement) {
            // this === state object
            if (this.value === showElement) return;
            if (showElement && !this.renderedEle) {
                this.renderedEle = Object(__WEBPACK_IMPORTED_MODULE_2__render__.b)(this.renderTemplate, this.data, this.directives);
                this.renderedEle._children = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.e)(this.renderedEle.childNodes, 0);
                Object(__WEBPACK_IMPORTED_MODULE_1__utils__.o)(this.insertEle.parentNode, this.renderedEle, this.insertEle);
            } else !showElement && this.renderedEle && this.destroyRenderedEle();
        }
        function destroyRenderedEle() {
            // this === state object
            if (this.renderedEle) {
                this.renderedEle._children.forEach(function(e) {
                    return e.parentNode && e.parentNode.removeChild(e);
                });
                this.renderedEle[__WEBPACK_IMPORTED_MODULE_1__utils__.a].destroy();
                this.renderedEle = null;
            }
        }
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.j)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(ShowDirective.prototype.__proto__ || Object.getPrototypeOf(ShowDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.b.get(handler);
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
                    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__.n)(ele, "_show") ? "_show" : "";
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
        var matchesDirective = new RegExp("^" + Object(__WEBPACK_IMPORTED_MODULE_2__utils__.k)("_on.") + "(.*)");
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_2__utils__.j)(attrValue || "");
                }
            }, {
                key: "handleEvent",
                value: function(handler, domEv) {
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(handler);
                    var tokenValue = void 0;
                    state.data.$ev = domEv;
                    try {
                        tokenValue = this._tokenValueGetter(state.data);
                    } catch (e) {
                        Object(__WEBPACK_IMPORTED_MODULE_2__utils__.r)(e);
                        return;
                    }
                    delete state.data.$ev;
                    if ("function" === typeof tokenValue) return tokenValue(domEv);
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    var state = __WEBPACK_IMPORTED_MODULE_2__utils__.b.get(handler);
                    if (!state) {
                        state = {
                            data: {
                                $data: {}
                            },
                            tracker: function() {
                                return _this2.render(handler, node, state.data);
                            }
                        };
                        __WEBPACK_IMPORTED_MODULE_2__utils__.b.set(handler, state);
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
                    Object(__WEBPACK_IMPORTED_MODULE_2__utils__.m)(ele).some(function(attr) {
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
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observables_src_objectWatchProp__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_observables_src_arrayWatch__ = __webpack_require__(34);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__Directive__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__render__ = __webpack_require__(4);
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
            return Array.isArray(list) && !list.length || Object(__WEBPACK_IMPORTED_MODULE_4__utils__.p)(list) && !Object.keys(list).length;
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.j)(listVar || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    _get(EachDirective.prototype.__proto__ || Object.getPrototypeOf(EachDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.b.get(handler);
                    if (!state.update) {
                        state.binders = [];
                        state.bindersByKey = new __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_Map__.a();
                        state.listIterator = function() {
                            return _this2.iterateOverList(handler, state.value);
                        };
                        state.isFirstRender = true;
                        state.usesKey = false;
                        state.getKey = NOOP;
                        state.update = function(newList) {
                            if (newList === state.value) return;
                            if (state.value) {
                                state.value = null;
                                state.listIterator.stopWatchingAll && state.listIterator.stopWatchingAll();
                            }
                            if (!newList) {
                                _this2.destroyChildBinders(state.binders, handler);
                                return;
                            }
                            Object(__WEBPACK_IMPORTED_MODULE_1_observables_src_objectWatchProp__.f)(state.tracker);
                            // We don't need to be notified of changes for individual items.
                            state.value = newList;
                            // Make sure data is observable and setup event listners on it.
                            Object(__WEBPACK_IMPORTED_MODULE_1_observables_src_objectWatchProp__.c)(newList);
                            Array.isArray(newList) ? Object(__WEBPACK_IMPORTED_MODULE_2_observables_src_arrayWatch__.a)(newList, state.listIterator) : Object(__WEBPACK_IMPORTED_MODULE_4__utils__.p)(newList) && Object(__WEBPACK_IMPORTED_MODULE_1_observables_src_objectWatchProp__.d)(newList, null, state.listIterator);
                            isEmptyList(newList) && state.binders ? _this2.destroyChildBinders(state.binders, handler) : _this2.iterateOverList(handler, newList);
                        };
                        // When handler is destroyed, remove data listeners
                        handler.onDestroy(function() {
                            state.listIterator.stopWatchingAll && state.listIterator.stopWatchingAll();
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
                            Object(__WEBPACK_IMPORTED_MODULE_4__utils__.d)(binders.splice(0), function(binder) {
                                return binder.destroy();
                            });
                        });
                    } else Object(__WEBPACK_IMPORTED_MODULE_4__utils__.d)(binders.splice(0), function(binder) {
                        return binder._destroy();
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
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.b.get(handler);
                    var attachedEleBinder = [];
                    var newDomElements = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.h)();
                    var isArray = Array.isArray(newData);
                    var data = void 0;
                    if (isArray) {
                        isArray = true;
                        data = newData;
                    } else {
                        if (!Object(__WEBPACK_IMPORTED_MODULE_4__utils__.p)(newData)) return;
                        data = Object.keys(newData);
                    }
                    for (var i = 0, t = data.length; i < t; i++) {
                        var rowData = {
                            $data: state.data.$data || state.data
                        };
                        isArray ? this.getDataForIteration([ data[i], i ], rowData) : this.getDataForIteration([ newData[data[i]], data[i], i ], rowData);
                        var binder = this.getRowBinder(handler, rowData);
                        binder._loop.pos = i;
                        attachedEleBinder.push(binder);
                        newDomElements.appendChild(binder);
                    }
                    newDomElements.hasChildNodes() && Object(__WEBPACK_IMPORTED_MODULE_4__utils__.o)(handler._placeholderEle.parentNode, newDomElements, handler._placeholderEle);
                    // store the new attached set of elements in their new positions, and
                    // clean up old Binders that are no longer being used/displayed
                    // FIXME: this needs to be more efficient!!!!!!
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.d)((_state$binders = state.binders).splice.apply(_state$binders, [ 0, state.binders.length ].concat(attachedEleBinder)), function(childBinder) {
                        -1 === attachedEleBinder.indexOf(childBinder) && childBinder._destroy();
                    });
                    state.binders.length && this.positionChildren(handler._placeholderEle.parentNode, handler._placeholderEle, state.binders);
                }
            }, {
                key: "getRowBinder",
                value: function(handler, rowData) {
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.b.get(handler);
                    var itemBinder = null;
                    var rowKey = state.getKey(rowData);
                    var rowEleBinder = void 0;
                    rowKey && (rowEleBinder = state.bindersByKey.get(rowKey));
                    // If a binder already exists for this key, then just update its data
                    if (rowEleBinder) {
                        delete rowData.$data;
                        rowEleBinder[__WEBPACK_IMPORTED_MODULE_4__utils__.a].setData(rowData);
                        itemBinder = rowEleBinder;
                        return itemBinder;
                    }
                    // Render a new Element from the template and store the nodes that are
                    // created by it (needed for later).
                    rowEleBinder = Object(__WEBPACK_IMPORTED_MODULE_5__render__.b)(handler._n.data, rowData, handler._directives);
                    // Is it first render? if so, then we need to determine if the DOM element
                    // that was rendered has the _key attribute
                    if (state.isFirstRender) {
                        state.isFirstRender = false;
                        if (1 === rowEleBinder.childNodes.length && 1 === rowEleBinder.firstChild.nodeType && Object(__WEBPACK_IMPORTED_MODULE_4__utils__.n)(rowEleBinder.firstChild, "_key")) {
                            state.usesKey = true;
                            state.getKey = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.j)(Object(__WEBPACK_IMPORTED_MODULE_4__utils__.l)(rowEleBinder.firstChild, "_key"));
                            rowKey = state.getKey();
                        }
                    }
                    state.usesKey && Object(__WEBPACK_IMPORTED_MODULE_4__utils__.s)(rowEleBinder.firstChild, "_key");
                    rowEleBinder._children = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.e)(rowEleBinder.childNodes, 0);
                    rowEleBinder._destroy = destroyRowElement;
                    rowEleBinder._state = state;
                    rowEleBinder._loop = {
                        rowEle: rowEleBinder,
                        rowKey: rowKey,
                        pos: -1
                    };
                    rowKey && state.bindersByKey.set(rowKey, rowEleBinder);
                    itemBinder = rowEleBinder;
                    return itemBinder;
                }
            }, {
                key: "positionChildren",
                value: function(eleParentNode, placeholderEle, childEleBinders) {
                    // FIXME: speed improvement = convert to while() looop
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.d)(childEleBinders, function(childBinder, index) {
                        if (childBinder._loop.pos === index) return;
                        Object(__WEBPACK_IMPORTED_MODULE_4__utils__.o)(eleParentNode, childBinder._loop.rowEle, childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle);
                        childBinder._loop.pos = index;
                    });
                }
            }, {
                key: "getNodeHandler",
                value: function(node, directives) {
                    var handler = _get(EachDirective.prototype.__proto__ || Object.getPrototypeOf(EachDirective.prototype), "getNodeHandler", this).call(this, node);
                    handler._directives = directives;
                    handler._placeholderEle = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.g)("");
                    handler._isSoleChild = hasDedicatedParent(node);
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.o)(node.parentNode, handler._placeholderEle, node);
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.t)(node.parentNode, node);
                    return handler;
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_4__utils__.n)(ele, "_each") ? "_each" : "";
                }
            }, {
                key: "manages",
                value: function() {
                    return true;
                }
            } ]);
            return EachDirective;
        }(__WEBPACK_IMPORTED_MODULE_3__Directive__.a);
        function destroyRowElement() {
            // this === DocumentFragment from `render()`
            // remove all elements/nodes of this row from DOM
            for (var i = 0, t = this._children.length; i < t; i++) this._children[i].parentNode && this._children[i].parentNode.removeChild(this._children[i]);
            this._loop.rowKey && this._state.bindersByKey.delete(this._loop.rowKey);
            this._state = null;
            this[__WEBPACK_IMPORTED_MODULE_4__utils__.a].destroy();
        }
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
        /* harmony export (immutable) */
        __webpack_exports__.a = arrayWatch;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectWatchProp__ = __webpack_require__(2);
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
    }, /* 35 */
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.j)(attrValue || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    _get(HtmlDirective.prototype.__proto__ || Object.getPrototypeOf(HtmlDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_1__utils__.b.get(handler);
                    state.update || (state.update = function(newValue) {
                        if (newValue === state.value) return;
                        node.innerHTML = newValue;
                    });
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_1__utils__.n)(ele, "_html") ? "_html" : "";
                }
            } ]);
            return HtmlDirective;
        }(__WEBPACK_IMPORTED_MODULE_0__Directive__.a);
        /* harmony default export */
        __webpack_exports__.a = HtmlDirective;
    } ]);
});
//# sourceMappingURL=dom-data-bind.js.map