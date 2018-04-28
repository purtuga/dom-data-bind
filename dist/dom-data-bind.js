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
        return __webpack_require__(__webpack_require__.s = 52);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        var store = __webpack_require__(36)("wks");
        var uid = __webpack_require__(17);
        var _Symbol = __webpack_require__(3).Symbol;
        var USE_SYMBOL = "function" == typeof _Symbol;
        var $exports = module.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)("Symbol." + name));
        };
        $exports.store = store;
    }, /* 1 */
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
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(30);
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
    }, /* 2 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Directive */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(22);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_observable_data_src_ObservableObject__ = __webpack_require__(33);
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
                        Object(__WEBPACK_IMPORTED_MODULE_3_observable_data_src_ObservableObject__.d)(state.tracker);
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
                        Object(__WEBPACK_IMPORTED_MODULE_3_observable_data_src_ObservableObject__.c)(handlerState.tracker);
                        try {
                            newValue = this._tokenValueGetter(handlerState.data || {});
                            // Update node
                            handler.update && handler.update(newValue);
                        } catch (e) {
                            Object(__WEBPACK_IMPORTED_MODULE_2__utils__.n)(e);
                        }
                        Object(__WEBPACK_IMPORTED_MODULE_3_observable_data_src_ObservableObject__.e)(handlerState.tracker);
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
                        state.tracker && Object(__WEBPACK_IMPORTED_MODULE_3_observable_data_src_ObservableObject__.d)(state.tracker);
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
    }, /* 3 */
    /***/
    function(module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, /* 4 */
    /***/
    function(module, exports) {
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        module.exports = function(it) {
            return "object" === ("undefined" === typeof it ? "undefined" : _typeof(it)) ? null !== it : "function" === typeof it;
        };
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(18)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 6 */
    /***/
    function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, /* 7 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Set */
        var Set = __webpack_require__(55);
        /* harmony default export */
        __webpack_exports__.a = Set;
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(3);
        var hide = __webpack_require__(9);
        var has = __webpack_require__(6);
        var SRC = __webpack_require__(17)("src");
        var $toString = Function.toString;
        var TPL = ("" + $toString).split("toString");
        __webpack_require__(19).inspectSource = function(it) {
            return $toString.call(it);
        };
        (module.exports = function(O, key, val, safe) {
            var isFunction = "function" == typeof val;
            isFunction && (has(val, "name") || hide(val, "name", key));
            if (O[key] === val) return;
            isFunction && (has(val, SRC) || hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key))));
            if (O === global) O[key] = val; else if (safe) O[key] ? O[key] = val : hide(O, key, val); else {
                delete O[key];
                hide(O, key, val);
            }
        })(Function.prototype, "toString", function() {
            return "function" == typeof this && this[SRC] || $toString.call(this);
        });
    }, /* 9 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(10);
        var createDesc = __webpack_require__(24);
        module.exports = __webpack_require__(5) ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function(object, key, value) {
            object[key] = value;
            return object;
        };
    }, /* 10 */
    /***/
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(11);
        var IE8_DOM_DEFINE = __webpack_require__(37);
        var toPrimitive = __webpack_require__(39);
        var dP = Object.defineProperty;
        exports.f = __webpack_require__(5) ? Object.defineProperty : function(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
            "value" in Attributes && (O[P] = Attributes.value);
            return O;
        };
    }, /* 11 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(4);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, /* 12 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(3);
        var core = __webpack_require__(19);
        var hide = __webpack_require__(9);
        var redefine = __webpack_require__(8);
        var ctx = __webpack_require__(13);
        var $export = function $export(type, name, source) {
            var IS_FORCED = type & $export.F;
            var IS_GLOBAL = type & $export.G;
            var IS_STATIC = type & $export.S;
            var IS_PROTO = type & $export.P;
            var IS_BIND = type & $export.B;
            var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {}).prototype;
            var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
            var expProto = exports.prototype || (exports.prototype = {});
            var key, own, out, exp;
            IS_GLOBAL && (source = name);
            for (key in source) {
                // contains in native
                own = !IS_FORCED && target && void 0 !== target[key];
                // export native or passed
                out = (own ? target : source)[key];
                // bind timers to global for call from export context
                exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out;
                // extend global
                target && redefine(target, key, out, type & $export.U);
                // export
                exports[key] != out && hide(exports, key, exp);
                IS_PROTO && expProto[key] != out && (expProto[key] = out);
            }
        };
        global.core = core;
        // type bitmap
        $export.F = 1;
        // forced
        $export.G = 2;
        // global
        $export.S = 4;
        // static
        $export.P = 8;
        // proto
        $export.B = 16;
        // bind
        $export.W = 32;
        // wrap
        $export.U = 64;
        // safe
        $export.R = 128;
        // real proto method for `library`
        module.exports = $export;
    }, /* 13 */
    /***/
    function(module, exports, __webpack_require__) {
        // optional / simple context binding
        var aFunction = __webpack_require__(40);
        module.exports = function(fn, that, length) {
            aFunction(fn);
            if (void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, /* 14 */
    /***/
    function(module, exports) {
        module.exports = {};
    }, /* 15 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export getDestroyCallback */
        /* unused harmony export Compose */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectExtend__ = __webpack_require__(34);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__queueCallback__ = __webpack_require__(54);
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
    }, /* 16 */
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
    }, /* 17 */
    /***/
    function(module, exports) {
        var id = 0;
        var px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, /* 18 */
    /***/
    function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return true;
            }
        };
    }, /* 19 */
    /***/
    function(module, exports) {
        var core = module.exports = {
            version: "2.5.3"
        };
        "number" == typeof __e && (__e = core);
    }, /* 20 */
    /***/
    function(module, exports, __webpack_require__) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(63);
        var defined = __webpack_require__(26);
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, /* 21 */
    /***/
    function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(13);
        var call = __webpack_require__(74);
        var isArrayIter = __webpack_require__(75);
        var anObject = __webpack_require__(11);
        var toLength = __webpack_require__(43);
        var getIterFn = __webpack_require__(76);
        var BREAK = {};
        var RETURN = {};
        var exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
            var iterFn = ITERATOR ? function() {
                return iterable;
            } : getIterFn(iterable);
            var f = ctx(fn, that, entries ? 2 : 1);
            var index = 0;
            var length, step, iterator, result;
            if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
            // fast case for arrays with default iterator
            if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
                result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
                if (result === BREAK || result === RETURN) return result;
            } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
                result = call(iterator, f, step.value, entries);
                if (result === BREAK || result === RETURN) return result;
            }
        };
        exports.BREAK = BREAK;
        exports.RETURN = RETURN;
    }, /* 22 */
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
    }, /* 23 */
    /***/
    function(module, exports, __webpack_require__) {
        // getting tag from 19.1.3.6 Object.prototype.toString()
        var cof = __webpack_require__(35);
        var TAG = __webpack_require__(0)("toStringTag");
        // ES3 wrong here
        var ARG = "Arguments" == cof(function() {
            return arguments;
        }());
        // fallback for IE11 Script Access Denied error
        var tryGet = function(it, key) {
            try {
                return it[key];
            } catch (e) {}
        };
        module.exports = function(it) {
            var O, T, B;
            return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = tryGet(O = Object(it), TAG)) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
        };
    }, /* 24 */
    /***/
    function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, /* 25 */
    /***/
    function(module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil;
        var floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
    }, /* 26 */
    /***/
    function(module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, /* 27 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var LIBRARY = __webpack_require__(59);
        var $export = __webpack_require__(12);
        var redefine = __webpack_require__(8);
        var hide = __webpack_require__(9);
        var has = __webpack_require__(6);
        var Iterators = __webpack_require__(14);
        var $iterCreate = __webpack_require__(60);
        var setToStringTag = __webpack_require__(29);
        var getPrototypeOf = __webpack_require__(67);
        var ITERATOR = __webpack_require__(0)("iterator");
        var BUGGY = !([].keys && "next" in [].keys());
        var returnThis = function() {
            return this;
        };
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case "keys":
                  case "values":
                    return function() {
                        return new Constructor(this, kind);
                    };
                }
                return function() {
                    return new Constructor(this, kind);
                };
            };
            var TAG = NAME + " Iterator";
            var DEF_VALUES = "values" == DEFAULT;
            var VALUES_BUG = false;
            var proto = Base.prototype;
            var $native = proto[ITERATOR] || proto["@@iterator"] || DEFAULT && proto[DEFAULT];
            var $default = !BUGGY && $native || getMethod(DEFAULT);
            var $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0;
            var $anyNative = "Array" == NAME ? proto.entries || $native : $native;
            var methods, key, IteratorPrototype;
            // Fix native
            if ($anyNative) {
                IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
                if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
                    // Set @@toStringTag to native iterators
                    setToStringTag(IteratorPrototype, TAG, true);
                    // fix for some old engines
                    LIBRARY || has(IteratorPrototype, ITERATOR) || hide(IteratorPrototype, ITERATOR, returnThis);
                }
            }
            // fix Array#{values, @@iterator}.name in V8 / FF
            if (DEF_VALUES && $native && "values" !== $native.name) {
                VALUES_BUG = true;
                $default = function() {
                    return $native.call(this);
                };
            }
            // Define iterator
            LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default);
            // Plug for library
            Iterators[NAME] = $default;
            Iterators[TAG] = returnThis;
            if (DEFAULT) {
                methods = {
                    values: DEF_VALUES ? $default : getMethod("values"),
                    keys: IS_SET ? $default : getMethod("keys"),
                    entries: $entries
                };
                if (FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            }
            return methods;
        };
    }, /* 28 */
    /***/
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(36)("keys");
        var uid = __webpack_require__(17);
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        };
    }, /* 29 */
    /***/
    function(module, exports, __webpack_require__) {
        var def = __webpack_require__(10).f;
        var has = __webpack_require__(6);
        var TAG = __webpack_require__(0)("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: true,
                value: tag
            });
        };
    }, /* 30 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export MapPolyfill */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(91);
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var MapPolyfill = function() {
            //-------------------------------------
            // POLYFILL FOR ES6 MAP
            // http://devdocs.io/javascript/global_objects/map
            //-------------------------------------
            // Code below as taken from es6-shim project by Paul Millr. It was a
            // copy and paste to grab only the code associated with Map.
            //
            // For more details:
            // https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js
            // https://github.com/paulmillr/es6-shim
            //
            // @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com) and contributors,  MIT License
            //
            // es6-shim: v0.35.1
            // see https://github.com/paulmillr/es6-shim/blob/0.35.1/LICENSE
            // Details and documentation:
            // https://github.com/paulmillr/es6-shim/
            // [PT] Moved to common module
            //
            // var getGlobal = function () {
            //     /* global self, window, global */
            //     // the only reliable means to get the global object is
            //     // `Function('return this')()`
            //     // However, this causes CSP violations in Chrome apps.
            //     if (typeof self !== 'undefined') { return self; }
            //     if (typeof window !== 'undefined') { return window; }
            //     if (typeof global !== 'undefined') { return global; }
            //     throw new Error('unable to locate global object');
            // };
            var globals = Object(__WEBPACK_IMPORTED_MODULE_0__getGlobal__.a)();
            //[PT] use global if one exists
            if ("undefined" !== typeof globals.Map && "undefined" !== typeof globals.Map.prototype.keys && "undefined" !== typeof globals.Map.prototype.values && "undefined" !== typeof globals.Map.prototype.entries) return globals.Map;
            // ------------------- START POLYFILL ---------------------------------
            var _forEach = Function.call.bind(Array.prototype.forEach);
            var _toString = Function.call.bind(Object.prototype.toString);
            var _apply = Function.call.bind(Function.apply);
            var _call = Function.call.bind(Function.call);
            var keys = Object.keys;
            var _reduce = Function.call.bind(Array.prototype.reduce);
            var isArray = Array.isArray;
            var create = Object.create;
            var throwsError = function(func) {
                try {
                    func();
                    return false;
                } catch (e) {
                    return true;
                }
            };
            var isCallable = function(x) {
                return "function" === typeof x;
            };
            var _hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
            var $String = String;
            var emptyObject = function() {
                // accomodate some older not-quite-ES5 browsers
                return Object.create ? Object.create(null) : {};
            };
            // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
            // can be replaced with require('is-arguments') if we ever use a build process instead
            var isStandardArguments = function(value) {
                return "[object Arguments]" === _toString(value);
            };
            var isLegacyArguments = function(value) {
                return null !== value && "object" === ("undefined" === typeof value ? "undefined" : _typeof(value)) && "number" === typeof value.length && value.length >= 0 && "[object Array]" !== _toString(value) && "[object Function]" === _toString(value.callee);
            };
            var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;
            var numberIsNaN = Number.isNaN || function(value) {
                // NaN !== NaN, but they are identical.
                // NaNs are the only non-reflexive value, i.e., if x !== x,
                // then x is NaN.
                // isNaN is broken: it converts its argument to number, so
                // isNaN('foo') => true
                return value !== value;
            };
            var supportsDescriptors = !!Object.defineProperty && function() {
                // if Object.defineProperty exists but throws, it's IE 8
                return !throwsError(function() {
                    Object.defineProperty({}, "x", {
                        get: function() {}
                    });
                });
            }();
            var defineProperty = function(object, name, value, force) {
                if (!force && name in object) return;
                supportsDescriptors ? Object.defineProperty(object, name, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: value
                }) : object[name] = value;
            };
            // Our ArrayIterator is private; see
            // https://github.com/paulmillr/es6-shim/issues/252
            var ArrayIterator = function(array, kind) {
                this.i = 0;
                this.array = array;
                this.kind = kind;
            };
            var _Symbol = globals.Symbol || {};
            var Type = {
                string: function(x) {
                    return "[object String]" === _toString(x);
                },
                symbol: function(x) {
                    return "function" === typeof globals.Symbol && "symbol" === ("undefined" === typeof x ? "undefined" : _typeof(x));
                }
            };
            // This is a private name in the es6 spec, equal to '[Symbol.iterator]'
            // we're going to use an arbitrary _-prefixed name to make our shims
            // work properly with each other, even though we don't have full Iterator
            // support.  That is, `Array.from(map.keys())` will work, but we don't
            // pretend to export a "real" Iterator interface.
            var $iterator$ = Type.symbol(_Symbol.iterator) ? _Symbol.iterator : "_es6-shim iterator_";
            // Firefox ships a partial implementation using the name @@iterator.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
            // So use that name if we detect it.
            globals.Set && "function" === typeof new globals.Set()["@@iterator"] && ($iterator$ = "@@iterator");
            var ES = {
                // http://www.ecma-international.org/ecma-262/6.0/#sec-call
                Call: function(F, V) {
                    var args = arguments.length > 2 ? arguments[2] : [];
                    if (!ES.IsCallable(F)) throw new TypeError(F + " is not a function");
                    return _apply(F, V, args);
                },
                RequireObjectCoercible: function(x, optMessage) {
                    /* jshint eqnull:true */
                    if (null == x) throw new TypeError(optMessage || "Cannot call method on " + x);
                    return x;
                },
                // This might miss the "(non-standard exotic and does not implement
                // [[Call]])" case from
                // http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator-runtime-semantics-evaluation
                // but we can't find any evidence these objects exist in practice.
                // If we find some in the future, you could test `Object(x) === x`,
                // which is reliable according to
                // http://www.ecma-international.org/ecma-262/6.0/#sec-toobject
                // but is not well optimized by runtimes and creates an object
                // whenever it returns false, and thus is very slow.
                TypeIsObject: function(x) {
                    if (void 0 === x || null === x || true === x || false === x) return false;
                    return "function" === typeof x || "object" === ("undefined" === typeof x ? "undefined" : _typeof(x));
                },
                ToObject: function(o, optMessage) {
                    return Object(ES.RequireObjectCoercible(o, optMessage));
                },
                IsCallable: isCallable,
                SameValue: function(a, b) {
                    if (a === b) {
                        // 0 === -0, but they are not identical.
                        if (0 === a) return 1 / a === 1 / b;
                        return true;
                    }
                    return numberIsNaN(a) && numberIsNaN(b);
                },
                SameValueZero: function(a, b) {
                    // same as SameValue except for SameValueZero(+0, -0) == true
                    return a === b || numberIsNaN(a) && numberIsNaN(b);
                },
                GetIterator: function(o) {
                    if (isArguments(o)) // special case support for `arguments`
                    return new ArrayIterator(o, "value");
                    var itFn = ES.GetMethod(o, $iterator$);
                    if (!ES.IsCallable(itFn)) // Better diagnostics if itFn is null or undefined
                    throw new TypeError("value is not an iterable");
                    var it = ES.Call(itFn, o);
                    if (!ES.TypeIsObject(it)) throw new TypeError("bad iterator");
                    return it;
                },
                GetMethod: function(o, p) {
                    var func = ES.ToObject(o)[p];
                    if (void 0 === func || null === func) return;
                    if (!ES.IsCallable(func)) throw new TypeError("Method not callable: " + p);
                    return func;
                },
                IteratorComplete: function(iterResult) {
                    return !!iterResult.done;
                },
                IteratorClose: function(iterator, completionIsThrow) {
                    var returnMethod = ES.GetMethod(iterator, "return");
                    if (void 0 === returnMethod) return;
                    var innerResult, innerException;
                    try {
                        innerResult = ES.Call(returnMethod, iterator);
                    } catch (e) {
                        innerException = e;
                    }
                    if (completionIsThrow) return;
                    if (innerException) throw innerException;
                    if (!ES.TypeIsObject(innerResult)) throw new TypeError("Iterator's return method returned a non-object.");
                },
                IteratorNext: function(it) {
                    var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
                    if (!ES.TypeIsObject(result)) throw new TypeError("bad iterator");
                    return result;
                },
                IteratorStep: function(it) {
                    var result = ES.IteratorNext(it);
                    var done = ES.IteratorComplete(result);
                    return !done && result;
                },
                ToString: function(string) {
                    return $String(string);
                }
            };
            // Given an argument x, it will return an IteratorResult object,
            // with value set to x and done to false.
            // Given no arguments, it will return an iterator completion object.
            var iteratorResult = function(x) {
                return {
                    value: x,
                    done: 0 === arguments.length
                };
            };
            var addIterator = function(prototype, impl) {
                var implementation = impl || function() {
                    return this;
                };
                defineProperty(prototype, $iterator$, implementation);
                !prototype[$iterator$] && Type.symbol($iterator$) && (// implementations are buggy when $iterator$ is a Symbol
                prototype[$iterator$] = implementation);
            };
            var emulateES6construct = function(o, defaultNewTarget, defaultProto, slots) {
                // This is an es5 approximation to es6 construct semantics.  in es6,
                // 'new Foo' invokes Foo.[[Construct]] which (for almost all objects)
                // just sets the internal variable NewTarget (in es6 syntax `new.target`)
                // to Foo and then returns Foo().
                // Many ES6 object then have constructors of the form:
                // 1. If NewTarget is undefined, throw a TypeError exception
                // 2. Let xxx by OrdinaryCreateFromConstructor(NewTarget, yyy, zzz)
                // So we're going to emulate those first two steps.
                if (!ES.TypeIsObject(o)) throw new TypeError("Constructor requires `new`: " + defaultNewTarget.name);
                var proto = defaultNewTarget.prototype;
                ES.TypeIsObject(proto) || (proto = defaultProto);
                var obj = create(proto);
                for (var name in slots) if (_hasOwnProperty(slots, name)) {
                    var value = slots[name];
                    defineProperty(obj, name, value, true);
                }
                return obj;
            };
            var addIterableToMap = function(MapConstructor, map, iterable) {
                if (isArray(iterable) || Type.string(iterable)) _forEach(iterable, function(entry) {
                    if (!ES.TypeIsObject(entry)) throw new TypeError("Iterator value " + entry + " is not an entry object");
                    map.set(entry[0], entry[1]);
                }); else if (iterable instanceof MapConstructor) _call(MapConstructor.prototype.forEach, iterable, function(value, key) {
                    map.set(key, value);
                }); else {
                    var iter, adder;
                    if (null !== iterable && "undefined" !== typeof iterable) {
                        adder = map.set;
                        if (!ES.IsCallable(adder)) throw new TypeError("bad map");
                        iter = ES.GetIterator(iterable);
                    }
                    if ("undefined" !== typeof iter) for (;;) {
                        var next = ES.IteratorStep(iter);
                        if (false === next) break;
                        var nextItem = next.value;
                        try {
                            if (!ES.TypeIsObject(nextItem)) throw new TypeError("Iterator value " + nextItem + " is not an entry object");
                            _call(adder, map, nextItem[0], nextItem[1]);
                        } catch (e) {
                            ES.IteratorClose(iter, true);
                            throw e;
                        }
                    }
                }
            };
            var Value = {
                getter: function(object, name, _getter) {
                    if (!supportsDescriptors) throw new TypeError("getters require true ES5 support");
                    Object.defineProperty(object, name, {
                        configurable: true,
                        enumerable: false,
                        get: _getter
                    });
                }
            };
            // Define configurable, writable and non-enumerable props
            // if they don’t exist.
            var defineProperties = function(object, map, forceOverride) {
                _forEach(keys(map), function(name) {
                    var method = map[name];
                    defineProperty(object, name, method, !!forceOverride);
                });
            };
            // Map and Set require a true ES5 environment
            // Their fast path also requires that the environment preserve
            // property insertion order, which is not guaranteed by the spec.
            var testOrder = function(a) {
                var b = keys(_reduce(a, function(o, k) {
                    o[k] = true;
                    return o;
                }, {}));
                return a.join(":") === b.join(":");
            };
            var preservesInsertionOrder = testOrder([ "z", "a", "bb" ]);
            // some engines (eg, Chrome) only preserve insertion order for string keys
            var preservesNumericInsertionOrder = testOrder([ "z", 1, "a", "3", 2 ]);
            var fastkey = function(key) {
                if (!preservesInsertionOrder) return null;
                if ("undefined" === typeof key || null === key) return "^" + ES.ToString(key);
                if ("string" === typeof key) return "$" + key;
                if ("number" === typeof key) {
                    // note that -0 will get coerced to "0" when used as a property key
                    if (!preservesNumericInsertionOrder) return "n" + key;
                    return key;
                }
                if ("boolean" === typeof key) return "b" + key;
                return null;
            };
            var Map = function() {
                var empty = {};
                var MapEntry = function(key, value) {
                    this.key = key;
                    this.value = value;
                    this.next = null;
                    this.prev = null;
                };
                MapEntry.prototype.isRemoved = function() {
                    return this.key === empty;
                };
                var isMap = function(map) {
                    return !!map._es6map;
                };
                var requireMapSlot = function(map, method) {
                    if (!ES.TypeIsObject(map) || !isMap(map)) throw new TypeError("Method Map.prototype." + method + " called on incompatible receiver " + ES.ToString(map));
                };
                var MapIterator = function(map, kind) {
                    requireMapSlot(map, "[[MapIterator]]");
                    this.head = map._head;
                    this.i = this.head;
                    this.kind = kind;
                };
                MapIterator.prototype = {
                    next: function() {
                        var i = this.i;
                        var kind = this.kind;
                        var head = this.head;
                        if ("undefined" === typeof this.i) return iteratorResult();
                        for (;i.isRemoved() && i !== head; ) // back up off of removed entries
                        i = i.prev;
                        // advance to next unreturned element.
                        var result;
                        for (;i.next !== head; ) {
                            i = i.next;
                            if (!i.isRemoved()) {
                                result = "key" === kind ? i.key : "value" === kind ? i.value : [ i.key, i.value ];
                                this.i = i;
                                return iteratorResult(result);
                            }
                        }
                        // once the iterator is done, it is done forever.
                        this.i = void 0;
                        return iteratorResult();
                    }
                };
                addIterator(MapIterator.prototype);
                var Map$prototype;
                var MapShim = function Map() {
                    if (!(this instanceof Map)) throw new TypeError('Constructor Map requires "new"');
                    if (this && this._es6map) throw new TypeError("Bad construction");
                    var map = emulateES6construct(this, Map, Map$prototype, {
                        _es6map: true,
                        _head: null,
                        _storage: emptyObject(),
                        _size: 0
                    });
                    var head = new MapEntry(null, null);
                    // circular doubly-linked list.
                    head.next = head.prev = head;
                    map._head = head;
                    // Optionally initialize map from iterable
                    arguments.length > 0 && addIterableToMap(Map, map, arguments[0]);
                    return map;
                };
                Map$prototype = MapShim.prototype;
                Value.getter(Map$prototype, "size", function() {
                    if ("undefined" === typeof this._size) throw new TypeError("size method called on incompatible Map");
                    return this._size;
                });
                defineProperties(Map$prototype, {
                    get: function(key) {
                        requireMapSlot(this, "get");
                        var fkey = fastkey(key);
                        if (null !== fkey) {
                            // fast O(1) path
                            var entry = this._storage[fkey];
                            return entry ? entry.value : void 0;
                        }
                        var head = this._head;
                        var i = head;
                        for (;(i = i.next) !== head; ) if (ES.SameValueZero(i.key, key)) return i.value;
                    },
                    has: function(key) {
                        requireMapSlot(this, "has");
                        var fkey = fastkey(key);
                        if (null !== fkey) // fast O(1) path
                        return "undefined" !== typeof this._storage[fkey];
                        var head = this._head;
                        var i = head;
                        for (;(i = i.next) !== head; ) if (ES.SameValueZero(i.key, key)) return true;
                        return false;
                    },
                    set: function(key, value) {
                        requireMapSlot(this, "set");
                        var head = this._head;
                        var i = head;
                        var entry;
                        var fkey = fastkey(key);
                        if (null !== fkey) {
                            // fast O(1) path
                            if ("undefined" !== typeof this._storage[fkey]) {
                                this._storage[fkey].value = value;
                                return this;
                            }
                            entry = this._storage[fkey] = new MapEntry(key, value);
                            i = head.prev;
                        }
                        for (;(i = i.next) !== head; ) if (ES.SameValueZero(i.key, key)) {
                            i.value = value;
                            return this;
                        }
                        entry = entry || new MapEntry(key, value);
                        ES.SameValue(-0, key) && (entry.key = 0);
                        entry.next = this._head;
                        entry.prev = this._head.prev;
                        entry.prev.next = entry;
                        entry.next.prev = entry;
                        this._size += 1;
                        return this;
                    },
                    delete: function(key) {
                        requireMapSlot(this, "delete");
                        var head = this._head;
                        var i = head;
                        var fkey = fastkey(key);
                        if (null !== fkey) {
                            // fast O(1) path
                            if ("undefined" === typeof this._storage[fkey]) return false;
                            i = this._storage[fkey].prev;
                            delete this._storage[fkey];
                        }
                        for (;(i = i.next) !== head; ) if (ES.SameValueZero(i.key, key)) {
                            i.key = i.value = empty;
                            i.prev.next = i.next;
                            i.next.prev = i.prev;
                            this._size -= 1;
                            return true;
                        }
                        return false;
                    },
                    clear: function() {
                        requireMapSlot(this, "clear");
                        this._size = 0;
                        this._storage = emptyObject();
                        var head = this._head;
                        var i = head;
                        var p = i.next;
                        for (;(i = p) !== head; ) {
                            i.key = i.value = empty;
                            p = i.next;
                            i.next = i.prev = head;
                        }
                        head.next = head.prev = head;
                    },
                    keys: function() {
                        requireMapSlot(this, "keys");
                        return new MapIterator(this, "key");
                    },
                    values: function() {
                        requireMapSlot(this, "values");
                        return new MapIterator(this, "value");
                    },
                    entries: function() {
                        requireMapSlot(this, "entries");
                        return new MapIterator(this, "key+value");
                    },
                    forEach: function(callback) {
                        requireMapSlot(this, "forEach");
                        var context = arguments.length > 1 ? arguments[1] : null;
                        var it = this.entries();
                        for (var entry = it.next(); !entry.done; entry = it.next()) context ? _call(callback, context, entry.value[1], entry.value[0], this) : callback(entry.value[1], entry.value[0], this);
                    }
                });
                addIterator(Map$prototype, Map$prototype.entries);
                return MapShim;
            }();
            return Map;
        }();
        /* harmony default export */
        __webpack_exports__.a = MapPolyfill;
    }, /* 31 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export EventEmitter */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Compose__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__es6_Set__ = __webpack_require__(7);
        //----------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__dataStore__.a.create();
        var arraySlice = Function.call.bind(Array.prototype.slice);
        var isFunction = function(fn) {
            return "function" === typeof fn;
        };
        var objectKeys = Object.keys;
        /**
 * Emits events. Use it to extend other modules and thus add events to them.
 *
 * @class EventEmitter
 * @extends Compose
 */
        var EventEmitter = __WEBPACK_IMPORTED_MODULE_0__Compose__.a.extend(/** @lends EventEmitter.prototype */ {
            /**
     * Add a callback to a given event name
     *
     * @param {String} evName
     *  The event name to be listened to or a list of event sperated by a space.
     *  The EventEmitter instance can be used as the `evName` as well which will
     *  essentially listen to all events.
     *  Note that this special event however, will change the arguments
     *  passed to the callback by pre-pending the Event Name (`String`) and
     *  appending the Component instance.
     *
     * @param {Function} callback
     *  A callback function to listen to the event. The callback function
     *  can cancel any queued event callbacks by returning `true` (boolean).
     *
     * @return {EventEmitter#EventListener}
     *
     * @example
     *
     * events.on("some-event", (...args) => {});
     *
     * // List to all events
     * events.on(events, (evNameTriggered, ...args) => {}
     */
            on: function(evName, callback) {
                var _this = this;
                var _getSetup$call = getSetup.call(this), all = _getSetup$call.all, listeners = _getSetup$call.listeners;
                var events = getEventNameList(evName).reduce(function(eventList, eventName) {
                    var off = void 0;
                    // If eventName is `this` then listen to all events
                    if (eventName === _this) {
                        all.add(callback);
                        off = function() {
                            return all.delete(callback);
                        };
                    } else {
                        eventName in listeners || (listeners[eventName] = new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a());
                        listeners[eventName].add(callback);
                        off = function() {
                            return listeners[eventName].delete(callback);
                        };
                    }
                    eventList[eventName] = {
                        off: off
                    };
                    return eventList;
                }, {});
                /**
         * EventEmitter Listener object, returned when one of the listener setter methods
         * (ex. `on()`, `once()`, `pipe`) are used.
         *
         * @typedef {Object} EventEmitter~EventListener
         *
         * @property {Object} listeners
         *  An object with the individual listeners. Each respective event listener
         *  has an `off()` method to turn that listener off.
         *
         * @property {Function} off
         *  Remove callback from event.
         */
                var response = {
                    off: function() {
                        objectKeys(events).forEach(function(eventName) {
                            return events[eventName].off();
                        });
                    }
                };
                response.listeners = events;
                return response;
            },
            /**
     * Remove a callback from a given event
     *
     * @param {String} evName
     * @param {Function} callback
     *
     */
            off: function(evName, callback) {
                var _getSetup$call2 = getSetup.call(this), all = _getSetup$call2.all, listeners = _getSetup$call2.listeners;
                if (evName === this) {
                    all.delete(callback);
                    return;
                }
                listeners[evName] && listeners.delete(callback);
            },
            /**
     * Add a callback to a given event name that is executed only once.
     *
     * @param {String} evName
     *  The event name. This can be a list of event delimited with a space. Each
     *  event listeners will be triggered at most once.
     * @param {Function} callback
     *
     * @return {EventEmitter#EventListener}
     */
            once: function(evName, callback) {
                var _this2 = this;
                var events = getEventNameList(evName).reduce(function(eventListeners, eventName) {
                    var eventNameListener = _this2.on(evName, function() {
                        eventNameListener.off();
                        callback.apply(void 0, arguments);
                    });
                    eventListeners[eventName] = eventNameListener;
                    return eventListeners;
                }, {});
                var response = {
                    off: function() {
                        objectKeys(events).forEach(function(eventName) {
                            return events[eventName].off();
                        });
                    }
                };
                response.listeners = events;
                return response;
            },
            /**
     * Emit an event and execute any callback listening. Any of the listening
     * events can cancel the calling of queued callbacks by returning `true`
     * (boolean)
     *
     * @param {String} evName
     *  The event name to be triggered. __NOTE__: can not be a `"*"` or the EventEmitter
     *  instance since they holds special meaning.
     *
     * @param {...*} callbackArgs
     */
            emit: function(evName) {
                if ("*" === evName || evName === this) {
                    console.log("EventEmitter#emit(): can not emit to events to '*'");
                    // jshint ignore:line
                    return;
                }
                var setup = getSetup.call(this);
                var eventListeners = setup.listeners;
                var eventPipes = setup.pipes;
                var eventAll = setup.all;
                var args = arraySlice(arguments, 1);
                var isCanceled = false;
                var callbackHandler = function(callback) {
                    if (isFunction(callback)) {
                        var response = callback.apply(callback, args);
                        // if a boolean true was returned, don't call any more listeners.
                        if (true === response) {
                            isCanceled = true;
                            return true;
                        }
                    }
                };
                // Regular event listeners
                if (eventListeners[evName] && eventListeners[evName].size) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = void 0;
                    try {
                        for (var _step, _iterator = eventListeners[evName][Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var cb = _step.value;
                            if (callbackHandler(cb)) break;
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
                // Event listeners for all events
                if (!isCanceled && ("*" in eventListeners || eventAll.size)) {
                    // Special event "*": pass event name and instance
                    args = arraySlice(arguments, 0);
                    args.push(this);
                    if (eventListeners["*"] && eventListeners["*"].size) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = void 0;
                        try {
                            for (var _step2, _iterator2 = eventListeners["*"][Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _cb = _step2.value;
                                if (callbackHandler(_cb)) break;
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
                            } finally {
                                if (_didIteratorError2) throw _iteratorError2;
                            }
                        }
                    }
                    if (eventAll.size) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = void 0;
                        try {
                            for (var _step3, _iterator3 = eventAll[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _cb2 = _step3.value;
                                if (callbackHandler(_cb2)) break;
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion3 && _iterator3.return && _iterator3.return();
                            } finally {
                                if (_didIteratorError3) throw _iteratorError3;
                            }
                        }
                    }
                    // set args back to original
                    args = arraySlice(arguments, 1);
                }
                if (eventPipes.size) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = void 0;
                    try {
                        for (var _step4, _iterator4 = eventPipes[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var pipe = _step4.value;
                            pipe && pipe(evName, args);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion4 && _iterator4.return && _iterator4.return();
                        } finally {
                            if (_didIteratorError4) throw _iteratorError4;
                        }
                    }
                }
            },
            /**
     * Emit the events from one instance of EventEmitter to another. Useful
     * for when multiple components are used together as part of a larger
     * component and have the need to emit events to a common EventEmitter.
     *
     * @param {EventEmitter} pipeTo
     *  The EventEmitter instance object to where events should be piped.
     *  Can also be an object/class having an `emit(evName, data)` method.
     *
     * @param {String} [prefix]
     *  If defined, prefix will be added to any event emited. Example:
     *  if defining `foo-` as the prefix, then every event emitted will
     *  prefixed wth this value. So a `click` event on the source will
     *  be piped as `foo-click`.
     *
     * @param {Boolean} [includeInstance=true]
     *  When set to `true` (default), the piped event will include the source
     *  instance as an additional argument to the event that is piped.
     *
     *  @return {EventListener}
     */
            pipe: function(pipeTo, prefix, includeInstance) {
                var _this3 = this;
                if (!pipeTo || !pipeTo.emit) return {
                    off: function() {}
                };
                var pipes = getSetup.call(this).pipes;
                var pipeEvToReceiver = function(triggeredEvName, args) {
                    prefix ? args.unshift(prefix + triggeredEvName) : args.unshift(triggeredEvName);
                    (includeInstance || "undefined" === typeof includeInstance) && args.push(_this3);
                    pipeTo.emit.apply(pipeTo, args);
                };
                pipes.add(pipeEvToReceiver);
                return {
                    off: function() {
                        pipes.delete(pipeEvToReceiver);
                    }
                };
            },
            /**
     * Returns a boolean indicating if the current EventEmitter has listener
     * @returns {Boolean}
     */
            hasListeners: function() {
                var _getSetup$call3 = getSetup.call(this), listeners = _getSetup$call3.listeners, pipes = _getSetup$call3.pipes;
                return objectKeys(listeners).some(function(evName) {
                    return !!listeners[evName].size;
                }) || !!pipes.size;
            }
        });
        /**
 * Returns the instance setup object. Creates it if it does not have one.
 * @private
 * @this EventEmitter
 */
        function getSetup() {
            if (!PRIVATE.has(this)) {
                /*
            listeners: {
                'evName': Set[ Callbacks ]
            },
            pipes: Set[ Callbacks ]
            all: Set[ Callbacks ]
        */
                PRIVATE.set(this, {
                    listeners: {},
                    pipes: new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a(),
                    all: new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a()
                });
                // When this object is destroyed, remove all data
                this.onDestroy && this.onDestroy(function() {
                    PRIVATE.has(this) && PRIVATE.delete(this);
                }.bind(this));
            }
            return PRIVATE.get(this);
        }
        function getEventNameList(eventNamesStr) {
            if ("string" === typeof eventNamesStr) return eventNamesStr.split(/\s+/);
            return [ eventNamesStr ];
        }
        /**
 * Adds event emitter functionality to an object
 *
 * @param {Object} target
 */
        EventEmitter.mixin = function(target) {
            target && [ "on", "off", "emit", "once", "pipe" ].forEach(function(method) {
                Object.defineProperty(target, method, {
                    configurable: true,
                    value: EventEmitter.prototype[method].bind(target)
                });
            });
        };
        /* harmony default export */
        __webpack_exports__.a = EventEmitter;
    }, /* 32 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return PRIVATE;
        });
        /* unused harmony export INTERNAL_EVENTS */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return EV_STOP_DEPENDEE_NOTIFICATION;
        });
        /* unused harmony export ARRAY_PROTOTYPE */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return OBJECT_PROTOTYPE;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return IS_COMPUTED_NOTIFIER;
        });
        /* unused harmony export OBSERVABLE_FLAG */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return bindCallTo;
        });
        /* unused harmony export dependeeList */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return onInternalEvent;
        });
        /* unused harmony export emitInternalEvent */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return isArray;
        });
        /* unused harmony export arrayIndexOf */
        /* unused harmony export arraySplice */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return arrayForEach;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return isPureObject;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return isObservable;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return setObservableFlag;
        });
        /* harmony export (immutable) */
        __webpack_exports__.l = setDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.p = unsetDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.n = stopDependeeNotifications;
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return queueDependeeNotifier;
        });
        /* harmony export (immutable) */
        __webpack_exports__.o = storeDependeeNotifiers;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(22);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(7);
        //=======================================================================
        var NOOP = function() {};
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var INTERNAL_EVENTS = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.create();
        var EV_STOP_DEPENDEE_NOTIFICATION = "1";
        var ARRAY_PROTOTYPE = Array.prototype;
        var OBJECT_PROTOTYPE = Object.prototype;
        var IS_COMPUTED_NOTIFIER = "__od_cn__";
        var bindCallTo = Function.call.bind.bind(Function.call);
        var dependeeList = new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__.a();
        var onInternalEvent = INTERNAL_EVENTS.on.bind(INTERNAL_EVENTS);
        var emitInternalEvent = INTERNAL_EVENTS.emit.bind(INTERNAL_EVENTS);
        var isArray = Array.isArray;
        bindCallTo(ARRAY_PROTOTYPE.indexOf);
        bindCallTo(ARRAY_PROTOTYPE.splice);
        var arrayForEach = bindCallTo(ARRAY_PROTOTYPE.forEach);
        var isPureObject = function(obj) {
            return obj && "[object Object]" === OBJECT_PROTOTYPE.toString.call(obj);
        };
        var isObservable = function(obj) {
            return obj && obj.___observable_data___ === NOOP;
        };
        var setObservableFlag = function(obj) {
            return obj && Object.defineProperty(obj, "___observable_data___", {
                get: function() {
                    return NOOP;
                }
            });
        };
        /**
 * Allows for adding a Dependee notifier to the global list of dependency trackers.
 *
 * @param {Function} dependeeNotifier
 */
        function setDependencyTracker(dependeeNotifier) {
            dependeeNotifier && dependeeList.add(dependeeNotifier);
        }
        /**
 * Removes a Dependee notifier from the global list of dependency trackers.
 *
 * @param {Function} dependeeNotifier
 */
        function unsetDependencyTracker(dependeeNotifier) {
            if (!dependeeNotifier) return;
            dependeeList.delete(dependeeNotifier);
        }
        /**
 * Removes a Dependee notifier from any stored ObservableProperty list of dependees, thus
 * stopping all notifications to that depenedee.
 *
 * @param {Function} dependeeNotifier
 */
        function stopDependeeNotifications(dependeeNotifier) {
            dependeeNotifier && emitInternalEvent(EV_STOP_DEPENDEE_NOTIFICATION, dependeeNotifier);
        }
        var queueDependeeNotifier = function() {
            var dependeeNotifiers = new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__.a();
            var execNotifiers = function() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = void 0;
                try {
                    for (var _step, _iterator = dependeeNotifiers[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var notifierCb = _step.value;
                        notifierCb();
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
                dependeeNotifiers.clear();
            };
            return function(notifierCb) {
                // Computed property notifiers are lightweight, so execute
                // these now and don't queue them.
                if (notifierCb[IS_COMPUTED_NOTIFIER]) {
                    notifierCb();
                    return;
                }
                if (!notifierCb || dependeeNotifiers.has(notifierCb)) return;
                var callNextTick = !dependeeNotifiers.size;
                dependeeNotifiers.add(notifierCb);
                callNextTick && Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__.a)(execNotifiers);
            };
        }();
        function storeDependeeNotifiers(store) {
            if (store && dependeeList.size) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = void 0;
                try {
                    for (var _step2, _iterator2 = dependeeList[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var dependeeCallback = _step2.value;
                        store.add(dependeeCallback);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
                    } finally {
                        if (_didIteratorError2) throw _iteratorError2;
                    }
                }
            }
        }
    }, /* 33 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export createComputedProp */
        /* harmony export (immutable) */
        __webpack_exports__.b = observableAssign;
        /* harmony export (immutable) */
        __webpack_exports__.a = makeObservable;
        /* harmony export (immutable) */
        __webpack_exports__.f = watchProp;
        /* unused harmony export watchPropOnce */
        /* unused harmony export unwatchProp */
        /* unused harmony export notifyPropWatchers */
        /* unused harmony export observableMixin */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(34);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(22);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__common__ = __webpack_require__(32);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return __WEBPACK_IMPORTED_MODULE_5__common__.l;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return __WEBPACK_IMPORTED_MODULE_5__common__.p;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return __WEBPACK_IMPORTED_MODULE_5__common__.n;
        });
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //=======================================================
        var OBJECT = Object;
        // aliases
        var objectCreate = OBJECT.create;
        var objectDefineProperty = OBJECT.defineProperty;
        var objectHasOwnProperty = Object(__WEBPACK_IMPORTED_MODULE_5__common__.f)(__WEBPACK_IMPORTED_MODULE_5__common__.c.hasOwnProperty);
        var objectKeys = Object.keys;
        var noopEventListener = objectCreate({
            off: function() {}
        });
        /**
 * Adds the ability to observe `Object` property values for changes.
 * Uses an internal `EventEmitter` instance to list and trigger events,
 * and `Object.defineProperty` getter/setters to setup watchers on
 * property values.
 *
 * Currently has no support for addition or deletion from the object,
 * but with the ES7 forth coming Proxy functionality, that will be
 * added.
 *
 * @class ObservableObject
 * @extends Compose
 *
 * @param {Object} [model]
 * @param {Object} [options]
 * @param {Boolean} [options.watchAll=true]
 *  if `model` was given on input, then all properties will be automatically made watchable.
 * @param {Boolean} [options.deep=true]
 *  If set to true, the model is walked and all deep objects made observable as well
 *
 * @example
 *
 * // Used as a mixin
 * var myObj = {
 *      first: "paul",
 *      last: "tavares"
 * };
 *
 * ObservableObject.mixin(myObj);
 *
 * myObj.on("first", function(newValue, oldValue){
 *      alert("first name was changed");
 * });
 *
 * @example
 *
 * // Used as part of a class prototype
 * var MyModel = Compose.extend(ObservableObject);
 *
 * var user = MyModel.create({
 *      first: "paul",
 *      last: "tavares"
 * });
 *
 * user.on("first", function(newValue, oldValue){
 *  alert("first name was change")
 * });
 *
 */
        var ObservableObject = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends ObservableObject.prototype */ {
            init: function(model, options) {
                var opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                if (model) {
                    // FIXME: need to create prop that uses original getter/setters from `model` - or no?
                    Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(this, model);
                    opt.watchAll && makeObservable(this, null, opt.deep);
                    getInstance(this).opt = opt;
                }
            },
            /**
     * Add a callback to changes on a given property
     *
     * @param {String|Object} prop
     *  Object property name. If wanting to list to all changes to the object, the
     *  object instance itself can be passed as the prop.
     *
     * @param {Function} callback
     *  A callback function to list to the event. The callback function
     *  can cancel any queued event callbacks by returning `true` (boolean).
     *
     * @return {EventListener}
     *
     * @example
     *
     * obj.on("firstName", () => {});
     *
     * // List to all changes
     * obj.on(obj, () => {});
     */
            on: function(prop, callback) {
                return watchProp(this, prop, callback);
            },
            /**
     * Remove a callback the listening queue of a for a given property name
     *
     * @param {String} prop
     *  Object property name
     *
     * @param {Function} callback
     *  The callback that should be removed.
     */
            off: function(prop, callback) {
                unwatchProp(this, prop, callback);
            },
            /**
     * Add a callback for changes on a given property that is called only once
     *
     * @param {String} prop
     *  Object property name
     *
     * @param {Function} callback
     *  The callback that should be removed.
     */
            once: function(prop, callback) {
                return watchPropOnce(this, prop, callback);
            },
            /**
     * Emit an event and execute any callback listening. Any of the listening
     * events can cancel the calling of queued callbacks by returning `true`
     * (boolean)
     *
     * @param {String} prop
     */
            emit: function(prop) {
                return notifyPropWatchers(this, prop);
            },
            /**
     * Copies the properties of one or more objects into the current observable
     * and makes those properties "watchable".
     *
     * @param {...Object} args
     *
     * @returns {Object}
     */
            assign: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return observableAssign.apply(void 0, [ this ].concat(_toConsumableArray(args)));
            },
            /**
     * Sets a property on the observable object and automatically makes it watchable
     *
     * @param {String} propName
     * @param {*} [value]
     * @returns {*}
     */
            setProp: function(propName, value) {
                makePropWatchable(this, propName);
                return this[propName] = value;
            }
        });
        /**
 * Returns the private Instance data for this object
 *
 * @private
 * @param {Object} observableObj
 *
 * @return {EventEmitter}
 */
        function getInstance(observableObj) {
            if (!__WEBPACK_IMPORTED_MODULE_5__common__.d.has(observableObj)) {
                var instData = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_EventEmitter__.a.create();
                var watched = instData.watched = {};
                var isQueued = false;
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.m)(observableObj);
                instData.opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, ObservableObject.defaults);
                instData.notify = function() {
                    if (isQueued) return;
                    isQueued = true;
                    Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                        instData.emit("");
                        isQueued = false;
                    });
                };
                __WEBPACK_IMPORTED_MODULE_5__common__.d.set(observableObj, instData);
                observableObj.onDestroy && observableObj.onDestroy(function() {
                    objectKeys(watched).forEach(function(propName) {
                        watched[propName].destroy();
                        // FIXME remove property getter/setter on the object (if still there)
                        delete watched[propName];
                    });
                    delete instData.watched;
                    __WEBPACK_IMPORTED_MODULE_5__common__.d.delete(observableObj);
                    instData.destroy();
                }.bind(observableObj));
            }
            return __WEBPACK_IMPORTED_MODULE_5__common__.d.get(observableObj);
        }
        /**
 * A property setup
 *
 * @private
 * @class Observable~PropertySetup
 * @extends Compose
 */
        var PropertySetup = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends Observable~PropertySetup.prototype */ {
            init: function(observable, propName) {
                var _this = this;
                this.dependees = new __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_Set__.a();
                this.propName = propName;
                this._obj = observable;
                this.onDestroy(function() {
                    _this.dependees.clear();
                    _this.rmDepEvListener && _this.rmDepEvListener.off();
                    _this._obj = null;
                });
            },
            propName: "",
            /** @type Array */
            dependees: null,
            oldVal: null,
            newVal: null,
            queued: false,
            isComputed: false,
            /**
     * Notifies everyone that is listening for events on this property
     *
     * @param [noDelay=false]
     */
            notify: function(noDelay) {
                var _this2 = this;
                var propSetup = this;
                // Queue up calling all dependee notifiers
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = void 0;
                try {
                    for (var _step, _iterator = this.dependees[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var cb = _step.value;
                        Object(__WEBPACK_IMPORTED_MODULE_5__common__.k)(cb);
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
                if (propSetup.queued) return;
                propSetup.queued = true;
                if (noDelay) {
                    this._emit();
                    return;
                }
                Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                    return _this2._emit();
                });
            },
            _emit: function() {
                this.queued = false;
                getInstance(this._obj).emit(this.propName, this.newVal, this.oldVal);
                this.oldVal = null;
            },
            /**
     * Removes a callback from the list of dependees
     * @param {Function} cb
     */
            removeDependee: function(cb) {
                this.dependees.delete(cb);
                // Remove listener if no dependees
                if (this.rmDepEvListener && 0 === this.dependees.size) {
                    this.rmDepEvListener.off();
                    this.rmDepEvListener = null;
                }
            },
            /**
     * Stores global dependees into this Property list of dependees
     */
            storeDependees: function() {
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.o)(this.dependees);
                // If we have dependees, then setup an internal event bus listener
                this.dependees.size > 0 && !this.rmDepEvListener && (this.rmDepEvListener = Object(__WEBPACK_IMPORTED_MODULE_5__common__.j)(__WEBPACK_IMPORTED_MODULE_5__common__.a, this.removeDependee.bind(this)));
            }
        });
        /**
 * Checks to see if a given property on this object already has a watcher
 * and if not, it sets one up for it.
 *
 * @private
 * @param {ObservableObject} observable
 * @param {String} propName
 * @param {Function} [valueGetter]
 * @param {Function} [valueSetter]
 * @param {Boolean} [enumerable=true]
 *
 * @return {EventEmitter}
 */
        function makePropWatchable(observable, propName, valueGetter, valueSetter) {
            var enumerable = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
            var inst = getInstance(observable);
            var watched = inst.watched;
            if (watched[propName]) return inst;
            var currentValue = void 0;
            var emitNotification = !(propName in observable);
            var propDescriptor = Object.getOwnPropertyDescriptor(observable, propName);
            if (propDescriptor) {
                if (false === propDescriptor.configurable) // TODO: should we throw()?
                return;
                valueGetter = valueGetter || propDescriptor.get;
                valueSetter = valueSetter || propDescriptor.set;
                valueGetter || (currentValue = propDescriptor.value);
            }
            // if we're able to remove the current property (ex. Constants would fail),
            // then change this attribute to be watched
            if (delete observable[propName]) {
                var propSetup = watched[propName] = PropertySetup.create(observable, propName);
                propSetup.oldVal = propSetup.newVal = currentValue;
                objectDefineProperty(observable, propName, {
                    enumerable: enumerable,
                    configurable: true,
                    // Getter will either delegate to the prior getter(),
                    // or return the value that was originally assigned to the property
                    get: function() {
                        propSetup.storeDependees();
                        return valueGetter ? valueGetter() : propSetup.newVal;
                    },
                    // Setter is how we detect changes to the value.
                    set: function(newValue) {
                        if (propSetup.isComputed) return;
                        var oldValue = valueGetter ? valueGetter() : propSetup.newVal;
                        if (valueSetter) newValue = valueSetter.call(observable, newValue); else {
                            propSetup.oldVal = oldValue;
                            propSetup.newVal = newValue;
                        }
                        // Dirty checking...
                        // Only trigger if values are different. Also, only add a trigger
                        // if one is not already queued.
                        if (newValue !== oldValue) {
                            inst.opt.deep && newValue && Object(__WEBPACK_IMPORTED_MODULE_5__common__.i)(newValue) && makeObservable(newValue, null, true);
                            propSetup.notify();
                        }
                    }
                });
            } else console.log(new Error("Unable to watch property [" + propName + "] - delete failed"));
            emitNotification && inst.notify();
            return inst;
        }
        /**
 * Created a computed property on a given object
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} valueGenerator
 * @param {Boolean} [enumerable=true]
 */
        function createComputedProp(observable, propName, valueGenerator) {
            var enumerable = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            if (observable && propName && valueGenerator) {
                var runValueGenerator = true;
                var propValue = void 0;
                var dependencyChangeNotifier = function() {
                    // Trigger the Object property setter(). This does nothing as far as the
                    // computed value does, but provides compatibility for any code that
                    // might have overwritten the setter in order ot also listen for changes
                    // outside of this lib.
                    observable[propName] = "";
                    // Reset the internally cached prop value and set the flag to run the
                    // generator and then notify listeners.
                    propValue = null;
                    runValueGenerator = true;
                    getInstance(observable).watched[propName].notify();
                };
                var valueGetter = function() {
                    // FIXME: should we detect circular loops?
                    if (!runValueGenerator) return propValue;
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.l)(dependencyChangeNotifier);
                    try {
                        propValue = valueGenerator.call(observable);
                    } catch (e) {
                        Object(__WEBPACK_IMPORTED_MODULE_5__common__.p)(dependencyChangeNotifier);
                        throw e;
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.p)(dependencyChangeNotifier);
                    runValueGenerator = false;
                    return propValue;
                };
                var valueSetter = function() {
                    /* FIXME: should this anything? */
                    return propValue;
                };
                var inst = getInstance(observable);
                dependencyChangeNotifier[__WEBPACK_IMPORTED_MODULE_5__common__.b] = true;
                // If this propName is already being watched, then first destroy that instance
                if (propName in inst.watched) {
                    inst.watched[propName].destroy();
                    delete inst.watched[propName];
                }
                makePropWatchable(observable, propName, valueGetter, valueSetter, enumerable);
                inst.watched[propName].isComputed = true;
                inst.watched[propName].onDestroy(function() {
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.n)(dependencyChangeNotifier);
                    delete inst.watched[propName];
                    delete observable[propName];
                    observable[propName] = propValue;
                });
                return Object.create({
                    destroy: function() {
                        inst.watched[propName] && inst.watched[propName].destroy(true);
                    }
                });
            }
        }
        /**
 * Assign the properties of one (or more) objects to the observable and
 * makes those properties "watchable"
 *
 * @param {Object} observable
 * @param {...Object} objs
 *
 * @return {Object} observable
 */
        function observableAssign(observable) {
            for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) objs[_key2 - 1] = arguments[_key2];
            objs.length && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objs, function(obj) {
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(obj), function(key) {
                    makePropWatchable(observable, key);
                    observable[key] = obj[key];
                });
            });
            return observable;
        }
        /**
 * Makes an Object observable or a given property of the object observable.
 *
 * @param {Object} observable
 *  The object that should be made observable.
 *
 * @param {String} [propName]
 *  if left unset, then all existing `own properties` of the object will
 *  be made observable.
 *
 * @param {Boolean} [deep=false]
 *  If set to `true` then the object, or the value the given `prop` (if defined)
 *  will be "walked" and any object found made an observable as well.
 *
 * @param {Function} [onEach]
 *  A callback function to be called as each property is "walked". The property value
 *  is provided on input to the callback
 */
        function makeObservable(observable, propName, deep, onEach) {
            if (observable) {
                propName ? makePropWatchable(observable, propName) : Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(observable), function(prop) {
                    return makePropWatchable(observable, prop);
                });
                deep && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(observable), function(key) {
                    observable[key] && Object(__WEBPACK_IMPORTED_MODULE_5__common__.i)(observable[key]) && makeObservable(observable[key], null, deep, onEach);
                    onEach && onEach(observable[key]);
                });
            }
        }
        /**
 * Watch a given object property for changes.
 *
 * @param {Object} observable
 * @param {String} propName
 *  The `observable` property name or, if wanting to list to all property changes,
 *  the actual `observable` instance
 * @param {Function} notifier
 *
 * @returns {EventEmitter#EventListener}
 */
        function watchProp(observable, propName, notifier) {
            var inst = getInstance(observable);
            if (propName === observable) return inst.on(inst, notifier);
            if (objectHasOwnProperty(observable, propName)) {
                makePropWatchable(observable, propName);
                return inst.on(propName, notifier);
            }
            return noopEventListener;
        }
        /**
 * Watch for changes on a given object property only once
 * (automatically stops listening after the first invocation).
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} notifier
 * @returns {EventEmitter#EventListener}
 */
        function watchPropOnce(observable, propName, notifier) {
            var inst = getInstance(observable);
            if (propName === observable) return inst.once(inst, notifier);
            if (objectHasOwnProperty(observable, propName)) {
                makePropWatchable(observable, propName);
                return inst.once(propName, notifier);
            }
            return noopEventListener;
        }
        /**
 * Stop watching an object property.
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} notifier
 */
        function unwatchProp(observable, propName, notifier) {
            return getInstance(observable).off(propName, notifier);
        }
        /**
 * Notifies watchers of a given Observable property
 *
 * @param {Object} observable
 * @param {String} propName
 */
        function notifyPropWatchers(observable, propName) {
            var watched = getInstance(observable).watched;
            watched[propName] && watched[propName].notify(true);
        }
        /**
 * Adds ObservableObject capabilities to an object.
 *
 * @method ObservableObject.mixin
 *
 * @param {Object} observable
 *
 * @return {Object}
 *  Same object that was given on input will be returned
 */
        function observableMixin(observable) {
            observable && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(ObservableObject.prototype), function(method) {
                method in observable && observable[method] === ObservableObject.prototype[method] || objectDefineProperty(observable, method, {
                    value: ObservableObject.prototype[method],
                    enumerable: false,
                    configurable: true
                });
            });
            return observable;
        }
        ObservableObject.createComputed = createComputedProp;
        ObservableObject.mixin = observableMixin;
        /**
 * Default options to the ObservableObject constructor
 *
 * @type Object
 * @name ObservableObject.defaults
 */
        ObservableObject.defaults = {
            watchAll: true,
            deep: true
        };
    }, /* 34 */
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
    }, /* 35 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, /* 36 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(3);
        var store = global["__core-js_shared__"] || (global["__core-js_shared__"] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, /* 37 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(5) && !__webpack_require__(18)(function() {
            return 7 != Object.defineProperty(__webpack_require__(38)("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 38 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(4);
        var document = __webpack_require__(3).document;
        // typeof document.createElement is 'object' in old IE
        var is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        };
    }, /* 39 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(4);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
            if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };
    }, /* 40 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, /* 41 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(11);
        var dPs = __webpack_require__(61);
        var enumBugKeys = __webpack_require__(44);
        var IE_PROTO = __webpack_require__(28)("IE_PROTO");
        var Empty = function() {};
        // Create object with fake `null` prototype: use iframe Object with cleared prototype
        var _createDict = function() {
            // Thrash, waste and sodomy: IE GC bug
            var iframe = __webpack_require__(38)("iframe");
            var i = enumBugKeys.length;
            var iframeDocument;
            iframe.style.display = "none";
            __webpack_require__(66).appendChild(iframe);
            iframe.src = "javascript:";
            // eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write("<script>document.F=Object<\/script>");
            iframeDocument.close();
            _createDict = iframeDocument.F;
            for (;i--; ) delete _createDict.prototype[enumBugKeys[i]];
            return _createDict();
        };
        module.exports = Object.create || function(O, Properties) {
            var result;
            if (null !== O) {
                Empty.prototype = anObject(O);
                result = new Empty();
                Empty.prototype = null;
                // add "__proto__" for Object.getPrototypeOf polyfill
                result[IE_PROTO] = O;
            } else result = _createDict();
            return void 0 === Properties ? result : dPs(result, Properties);
        };
    }, /* 42 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(62);
        var enumBugKeys = __webpack_require__(44);
        module.exports = Object.keys || function(O) {
            return $keys(O, enumBugKeys);
        };
    }, /* 43 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.15 ToLength
        var toInteger = __webpack_require__(25);
        var min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
        };
    }, /* 44 */
    /***/
    function(module, exports) {
        // IE 8- don't enum bug keys
        module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, /* 45 */
    /***/
    function(module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        };
    }, /* 46 */
    /***/
    function(module, exports, __webpack_require__) {
        var redefine = __webpack_require__(8);
        module.exports = function(target, src, safe) {
            for (var key in src) redefine(target, key, src[key], safe);
            return target;
        };
    }, /* 47 */
    /***/
    function(module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
            if (!(it instanceof Constructor) || void 0 !== forbiddenField && forbiddenField in it) throw TypeError(name + ": incorrect invocation!");
            return it;
        };
    }, /* 48 */
    /***/
    function(module, exports, __webpack_require__) {
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var META = __webpack_require__(17)("meta");
        var isObject = __webpack_require__(4);
        var has = __webpack_require__(6);
        var setDesc = __webpack_require__(10).f;
        var id = 0;
        var isExtensible = Object.isExtensible || function() {
            return true;
        };
        var FREEZE = !__webpack_require__(18)(function() {
            return isExtensible(Object.preventExtensions({}));
        });
        var setMeta = function(it) {
            setDesc(it, META, {
                value: {
                    i: "O" + ++id,
                    // object ID
                    w: {}
                }
            });
        };
        var fastKey = function(it, create) {
            // return primitive with prefix
            if (!isObject(it)) return "symbol" == ("undefined" === typeof it ? "undefined" : _typeof(it)) ? it : ("string" == typeof it ? "S" : "P") + it;
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return "F";
                // not necessary to add metadata
                if (!create) return "E";
                // add missing metadata
                setMeta(it);
            }
            return it[META].i;
        };
        var getWeak = function(it, create) {
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return true;
                // not necessary to add metadata
                if (!create) return false;
                // add missing metadata
                setMeta(it);
            }
            return it[META].w;
        };
        // add metadata on freeze-family methods calling
        var onFreeze = function(it) {
            FREEZE && meta.NEED && isExtensible(it) && !has(it, META) && setMeta(it);
            return it;
        };
        var meta = module.exports = {
            KEY: META,
            NEED: false,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };
    }, /* 49 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(4);
        module.exports = function(it, TYPE) {
            if (!isObject(it) || it._t !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required!");
            return it;
        };
    }, /* 50 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = observeAll;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__ObservableArray__ = __webpack_require__(93);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__ObservableObject__ = __webpack_require__(33);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__(32);
        /* unused harmony reexport ObservableArray */
        /* unused harmony reexport ObservableObject */
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //==================================================================
        /**
 * Observes all data - object and arrays - given on input.
 *
 * @param {...Object|...Array} data
 */
        function observeAll() {
            for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) data[_key] = arguments[_key];
            Object(__WEBPACK_IMPORTED_MODULE_2__common__.e)(data, function(dataItem) {
                if (Object(__WEBPACK_IMPORTED_MODULE_2__common__.h)(dataItem)) return;
                if (Object(__WEBPACK_IMPORTED_MODULE_2__common__.i)(dataItem)) Object(__WEBPACK_IMPORTED_MODULE_1__ObservableObject__.a)(dataItem, null, true, function(propValue) {
                    propValue && Object(__WEBPACK_IMPORTED_MODULE_2__common__.g)(propValue) && observeAll(propValue);
                }); else if (Object(__WEBPACK_IMPORTED_MODULE_2__common__.g)(dataItem)) {
                    Object(__WEBPACK_IMPORTED_MODULE_0__ObservableArray__.a)(dataItem);
                    observeAll.apply(void 0, _toConsumableArray(dataItem));
                }
            });
        }
    }, /* 51 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export AttrDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
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
    }, /* 52 */
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
        var __WEBPACK_IMPORTED_MODULE_0__DomDataBind__ = __webpack_require__(53);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__directives_Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__directives_class_directive__ = __webpack_require__(95);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__directives_style_directive__ = __webpack_require__(99);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__directives_if_directive__ = __webpack_require__(100);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__directives_show_directive__ = __webpack_require__(101);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__directives_attr_directive__ = __webpack_require__(51);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__directives_prop_directive__ = __webpack_require__(102);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__directives_on_directive__ = __webpack_require__(103);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__directives_each_directive__ = __webpack_require__(105);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__directives_html_directive__ = __webpack_require__(106);
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
    }, /* 53 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export DomDataBind */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(30);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_observable_data__ = __webpack_require__(50);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__bindings_text_binding__ = __webpack_require__(94);
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
                var bindings = state.bindings = getBindingsFromDom(this, ele);
                Object(__WEBPACK_IMPORTED_MODULE_3_observable_data__.a)(data);
                Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(bindings, function(binding) {
                    return binding.render(data);
                });
                this.onDestroy(function() {
                    delete state.data;
                    delete state.directives;
                    delete state.bindings;
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(bindings, function(binding) {
                        return binding.destroy();
                    });
                    Factory.getDestroyCallback(state, __WEBPACK_IMPORTED_MODULE_4__utils__.a)();
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
    }, /* 54 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export queueCallback */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__es6_Set__ = __webpack_require__(7);
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
    }, /* 55 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(56);
        __webpack_require__(57);
        __webpack_require__(69);
        __webpack_require__(72);
        __webpack_require__(84);
        __webpack_require__(87);
        __webpack_require__(89);
        module.exports = __webpack_require__(19).Set;
    }, /* 56 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // 19.1.3.6 Object.prototype.toString()
        var classof = __webpack_require__(23);
        var test = {};
        test[__webpack_require__(0)("toStringTag")] = "z";
        test + "" != "[object z]" && __webpack_require__(8)(Object.prototype, "toString", function() {
            return "[object " + classof(this) + "]";
        }, true);
    }, /* 57 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var $at = __webpack_require__(58)(true);
        // 21.1.3.27 String.prototype[@@iterator]()
        __webpack_require__(27)(String, "String", function(iterated) {
            this._t = String(iterated);
            // target
            this._i = 0;
        }, function() {
            var O = this._t;
            var index = this._i;
            var point;
            if (index >= O.length) return {
                value: void 0,
                done: true
            };
            point = $at(O, index);
            this._i += point.length;
            return {
                value: point,
                done: false
            };
        });
    }, /* 58 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(25);
        var defined = __webpack_require__(26);
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var s = String(defined(that));
                var i = toInteger(pos);
                var l = s.length;
                var a, b;
                if (i < 0 || i >= l) return TO_STRING ? "" : void 0;
                a = s.charCodeAt(i);
                return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : b - 56320 + (a - 55296 << 10) + 65536;
            };
        };
    }, /* 59 */
    /***/
    function(module, exports) {
        module.exports = false;
    }, /* 60 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var create = __webpack_require__(41);
        var descriptor = __webpack_require__(24);
        var setToStringTag = __webpack_require__(29);
        var IteratorPrototype = {};
        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(9)(IteratorPrototype, __webpack_require__(0)("iterator"), function() {
            return this;
        });
        module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            });
            setToStringTag(Constructor, NAME + " Iterator");
        };
    }, /* 61 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(10);
        var anObject = __webpack_require__(11);
        var getKeys = __webpack_require__(42);
        module.exports = __webpack_require__(5) ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            var keys = getKeys(Properties);
            var length = keys.length;
            var i = 0;
            var P;
            for (;length > i; ) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };
    }, /* 62 */
    /***/
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(6);
        var toIObject = __webpack_require__(20);
        var arrayIndexOf = __webpack_require__(64)(false);
        var IE_PROTO = __webpack_require__(28)("IE_PROTO");
        module.exports = function(object, names) {
            var O = toIObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
            // Don't enum bug & hidden keys
            for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
            return result;
        };
    }, /* 63 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(35);
        // eslint-disable-next-line no-prototype-builtins
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, /* 64 */
    /***/
    function(module, exports, __webpack_require__) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(20);
        var toLength = __webpack_require__(43);
        var toAbsoluteIndex = __webpack_require__(65);
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var O = toIObject($this);
                var length = toLength(O.length);
                var index = toAbsoluteIndex(fromIndex, length);
                var value;
                // Array#includes uses SameValueZero equality algorithm
                // eslint-disable-next-line no-self-compare
                if (IS_INCLUDES && el != el) for (;length > index; ) {
                    value = O[index++];
                    // eslint-disable-next-line no-self-compare
                    if (value != value) return true;
                } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                return !IS_INCLUDES && -1;
            };
        };
    }, /* 65 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(25);
        var max = Math.max;
        var min = Math.min;
        module.exports = function(index, length) {
            index = toInteger(index);
            return index < 0 ? max(index + length, 0) : min(index, length);
        };
    }, /* 66 */
    /***/
    function(module, exports, __webpack_require__) {
        var document = __webpack_require__(3).document;
        module.exports = document && document.documentElement;
    }, /* 67 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(6);
        var toObject = __webpack_require__(68);
        var IE_PROTO = __webpack_require__(28)("IE_PROTO");
        var ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
            O = toObject(O);
            if (has(O, IE_PROTO)) return O[IE_PROTO];
            if ("function" == typeof O.constructor && O instanceof O.constructor) return O.constructor.prototype;
            return O instanceof Object ? ObjectProto : null;
        };
    }, /* 68 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(26);
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, /* 69 */
    /***/
    function(module, exports, __webpack_require__) {
        var $iterators = __webpack_require__(70);
        var getKeys = __webpack_require__(42);
        var redefine = __webpack_require__(8);
        var global = __webpack_require__(3);
        var hide = __webpack_require__(9);
        var Iterators = __webpack_require__(14);
        var wks = __webpack_require__(0);
        var ITERATOR = wks("iterator");
        var TO_STRING_TAG = wks("toStringTag");
        var ArrayValues = Iterators.Array;
        var DOMIterables = {
            CSSRuleList: true,
            // TODO: Not spec compliant, should be false.
            CSSStyleDeclaration: false,
            CSSValueList: false,
            ClientRectList: false,
            DOMRectList: false,
            DOMStringList: false,
            DOMTokenList: true,
            DataTransferItemList: false,
            FileList: false,
            HTMLAllCollection: false,
            HTMLCollection: false,
            HTMLFormElement: false,
            HTMLSelectElement: false,
            MediaList: true,
            // TODO: Not spec compliant, should be false.
            MimeTypeArray: false,
            NamedNodeMap: false,
            NodeList: true,
            PaintRequestList: false,
            Plugin: false,
            PluginArray: false,
            SVGLengthList: false,
            SVGNumberList: false,
            SVGPathSegList: false,
            SVGPointList: false,
            SVGStringList: false,
            SVGTransformList: false,
            SourceBufferList: false,
            StyleSheetList: true,
            // TODO: Not spec compliant, should be false.
            TextTrackCueList: false,
            TextTrackList: false,
            TouchList: false
        };
        for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
            var NAME = collections[i];
            var explicit = DOMIterables[NAME];
            var Collection = global[NAME];
            var proto = Collection && Collection.prototype;
            var key;
            if (proto) {
                proto[ITERATOR] || hide(proto, ITERATOR, ArrayValues);
                proto[TO_STRING_TAG] || hide(proto, TO_STRING_TAG, NAME);
                Iterators[NAME] = ArrayValues;
                if (explicit) for (key in $iterators) proto[key] || redefine(proto, key, $iterators[key], true);
            }
        }
    }, /* 70 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var addToUnscopables = __webpack_require__(71);
        var step = __webpack_require__(45);
        var Iterators = __webpack_require__(14);
        var toIObject = __webpack_require__(20);
        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(27)(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated);
            // target
            this._i = 0;
            // next index
            this._k = kind;
        }, function() {
            var O = this._t;
            var kind = this._k;
            var index = this._i++;
            if (!O || index >= O.length) {
                this._t = void 0;
                return step(1);
            }
            if ("keys" == kind) return step(0, index);
            if ("values" == kind) return step(0, O[index]);
            return step(0, [ index, O[index] ]);
        }, "values");
        // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array;
        addToUnscopables("keys");
        addToUnscopables("values");
        addToUnscopables("entries");
    }, /* 71 */
    /***/
    function(module, exports, __webpack_require__) {
        // 22.1.3.31 Array.prototype[@@unscopables]
        var UNSCOPABLES = __webpack_require__(0)("unscopables");
        var ArrayProto = Array.prototype;
        void 0 == ArrayProto[UNSCOPABLES] && __webpack_require__(9)(ArrayProto, UNSCOPABLES, {});
        module.exports = function(key) {
            ArrayProto[UNSCOPABLES][key] = true;
        };
    }, /* 72 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var strong = __webpack_require__(73);
        var validate = __webpack_require__(49);
        // 23.2 Set Objects
        module.exports = __webpack_require__(78)("Set", function(get) {
            return function() {
                return get(this, arguments.length > 0 ? arguments[0] : void 0);
            };
        }, {
            // 23.2.3.1 Set.prototype.add(value)
            add: function(value) {
                return strong.def(validate(this, "Set"), value = 0 === value ? 0 : value, value);
            }
        }, strong);
    }, /* 73 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var dP = __webpack_require__(10).f;
        var create = __webpack_require__(41);
        var redefineAll = __webpack_require__(46);
        var ctx = __webpack_require__(13);
        var anInstance = __webpack_require__(47);
        var forOf = __webpack_require__(21);
        var $iterDefine = __webpack_require__(27);
        var step = __webpack_require__(45);
        var setSpecies = __webpack_require__(77);
        var DESCRIPTORS = __webpack_require__(5);
        var fastKey = __webpack_require__(48).fastKey;
        var validate = __webpack_require__(49);
        var SIZE = DESCRIPTORS ? "_s" : "size";
        var getEntry = function(that, key) {
            // fast case
            var index = fastKey(key);
            var entry;
            if ("F" !== index) return that._i[index];
            // frozen object case
            for (entry = that._f; entry; entry = entry.n) if (entry.k == key) return entry;
        };
        module.exports = {
            getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
                var C = wrapper(function(that, iterable) {
                    anInstance(that, C, NAME, "_i");
                    that._t = NAME;
                    // collection type
                    that._i = create(null);
                    // index
                    that._f = void 0;
                    // first entry
                    that._l = void 0;
                    // last entry
                    that[SIZE] = 0;
                    // size
                    void 0 != iterable && forOf(iterable, IS_MAP, that[ADDER], that);
                });
                redefineAll(C.prototype, {
                    // 23.1.3.1 Map.prototype.clear()
                    // 23.2.3.2 Set.prototype.clear()
                    clear: function() {
                        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
                            entry.r = true;
                            entry.p && (entry.p = entry.p.n = void 0);
                            delete data[entry.i];
                        }
                        that._f = that._l = void 0;
                        that[SIZE] = 0;
                    },
                    // 23.1.3.3 Map.prototype.delete(key)
                    // 23.2.3.4 Set.prototype.delete(value)
                    delete: function(key) {
                        var that = validate(this, NAME);
                        var entry = getEntry(that, key);
                        if (entry) {
                            var next = entry.n;
                            var prev = entry.p;
                            delete that._i[entry.i];
                            entry.r = true;
                            prev && (prev.n = next);
                            next && (next.p = prev);
                            that._f == entry && (that._f = next);
                            that._l == entry && (that._l = prev);
                            that[SIZE]--;
                        }
                        return !!entry;
                    },
                    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
                    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
                    forEach: function(callbackfn) {
                        validate(this, NAME);
                        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
                        var entry;
                        for (;entry = entry ? entry.n : this._f; ) {
                            f(entry.v, entry.k, this);
                            // revert to the last existing entry
                            for (;entry && entry.r; ) entry = entry.p;
                        }
                    },
                    // 23.1.3.7 Map.prototype.has(key)
                    // 23.2.3.7 Set.prototype.has(value)
                    has: function(key) {
                        return !!getEntry(validate(this, NAME), key);
                    }
                });
                DESCRIPTORS && dP(C.prototype, "size", {
                    get: function() {
                        return validate(this, NAME)[SIZE];
                    }
                });
                return C;
            },
            def: function(that, key, value) {
                var entry = getEntry(that, key);
                var prev, index;
                // change existing entry
                if (entry) entry.v = value; else {
                    that._l = entry = {
                        i: index = fastKey(key, true),
                        // <- index
                        k: key,
                        // <- key
                        v: value,
                        // <- value
                        p: prev = that._l,
                        // <- previous entry
                        n: void 0,
                        // <- next entry
                        r: false
                    };
                    that._f || (that._f = entry);
                    prev && (prev.n = entry);
                    that[SIZE]++;
                    // add to index
                    "F" !== index && (that._i[index] = entry);
                }
                return that;
            },
            getEntry: getEntry,
            setStrong: function(C, NAME, IS_MAP) {
                // add .keys, .values, .entries, [@@iterator]
                // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
                $iterDefine(C, NAME, function(iterated, kind) {
                    this._t = validate(iterated, NAME);
                    // target
                    this._k = kind;
                    // kind
                    this._l = void 0;
                }, function() {
                    var that = this;
                    var kind = that._k;
                    var entry = that._l;
                    // revert to the last existing entry
                    for (;entry && entry.r; ) entry = entry.p;
                    // get next entry
                    if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
                        // or finish the iteration
                        that._t = void 0;
                        return step(1);
                    }
                    // return step by kind
                    if ("keys" == kind) return step(0, entry.k);
                    if ("values" == kind) return step(0, entry.v);
                    return step(0, [ entry.k, entry.v ]);
                }, IS_MAP ? "entries" : "values", !IS_MAP, true);
                // add [@@species], 23.1.2.2, 23.2.2.2
                setSpecies(NAME);
            }
        };
    }, /* 74 */
    /***/
    function(module, exports, __webpack_require__) {
        // call something on iterator step with safe closing on error
        var anObject = __webpack_require__(11);
        module.exports = function(iterator, fn, value, entries) {
            try {
                return entries ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (e) {
                var ret = iterator.return;
                void 0 !== ret && anObject(ret.call(iterator));
                throw e;
            }
        };
    }, /* 75 */
    /***/
    function(module, exports, __webpack_require__) {
        // check on default Array iterator
        var Iterators = __webpack_require__(14);
        var ITERATOR = __webpack_require__(0)("iterator");
        var ArrayProto = Array.prototype;
        module.exports = function(it) {
            return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
        };
    }, /* 76 */
    /***/
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(23);
        var ITERATOR = __webpack_require__(0)("iterator");
        var Iterators = __webpack_require__(14);
        module.exports = __webpack_require__(19).getIteratorMethod = function(it) {
            if (void 0 != it) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
    }, /* 77 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var global = __webpack_require__(3);
        var dP = __webpack_require__(10);
        var DESCRIPTORS = __webpack_require__(5);
        var SPECIES = __webpack_require__(0)("species");
        module.exports = function(KEY) {
            var C = global[KEY];
            DESCRIPTORS && C && !C[SPECIES] && dP.f(C, SPECIES, {
                configurable: true,
                get: function() {
                    return this;
                }
            });
        };
    }, /* 78 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var global = __webpack_require__(3);
        var $export = __webpack_require__(12);
        var redefine = __webpack_require__(8);
        var redefineAll = __webpack_require__(46);
        var meta = __webpack_require__(48);
        var forOf = __webpack_require__(21);
        var anInstance = __webpack_require__(47);
        var isObject = __webpack_require__(4);
        var fails = __webpack_require__(18);
        var $iterDetect = __webpack_require__(79);
        var setToStringTag = __webpack_require__(29);
        var inheritIfRequired = __webpack_require__(80);
        module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
            var Base = global[NAME];
            var C = Base;
            var ADDER = IS_MAP ? "set" : "add";
            var proto = C && C.prototype;
            var O = {};
            var fixMethod = function(KEY) {
                var fn = proto[KEY];
                redefine(proto, KEY, "delete" == KEY ? function(a) {
                    return !(IS_WEAK && !isObject(a)) && fn.call(this, 0 === a ? 0 : a);
                } : "has" == KEY ? function(a) {
                    return !(IS_WEAK && !isObject(a)) && fn.call(this, 0 === a ? 0 : a);
                } : "get" == KEY ? function(a) {
                    return IS_WEAK && !isObject(a) ? void 0 : fn.call(this, 0 === a ? 0 : a);
                } : "add" == KEY ? function(a) {
                    fn.call(this, 0 === a ? 0 : a);
                    return this;
                } : function(a, b) {
                    fn.call(this, 0 === a ? 0 : a, b);
                    return this;
                });
            };
            if ("function" == typeof C && (IS_WEAK || proto.forEach && !fails(function() {
                new C().entries().next();
            }))) {
                var instance = new C();
                // early implementations not supports chaining
                var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
                // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
                var THROWS_ON_PRIMITIVES = fails(function() {
                    instance.has(1);
                });
                // most early implementations doesn't supports iterables, most modern - not close it correctly
                var ACCEPT_ITERABLES = $iterDetect(function(iter) {
                    new C(iter);
                });
                // eslint-disable-line no-new
                // for early implementations -0 and +0 not the same
                var BUGGY_ZERO = !IS_WEAK && fails(function() {
                    // V8 ~ Chromium 42- fails only with 5+ elements
                    var $instance = new C();
                    var index = 5;
                    for (;index--; ) $instance[ADDER](index, index);
                    return !$instance.has(-0);
                });
                if (!ACCEPT_ITERABLES) {
                    C = wrapper(function(target, iterable) {
                        anInstance(target, C, NAME);
                        var that = inheritIfRequired(new Base(), target, C);
                        void 0 != iterable && forOf(iterable, IS_MAP, that[ADDER], that);
                        return that;
                    });
                    C.prototype = proto;
                    proto.constructor = C;
                }
                if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                    fixMethod("delete");
                    fixMethod("has");
                    IS_MAP && fixMethod("get");
                }
                (BUGGY_ZERO || HASNT_CHAINING) && fixMethod(ADDER);
                // weak collections should not contains .clear method
                IS_WEAK && proto.clear && delete proto.clear;
            } else {
                // create collection constructor
                C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
                redefineAll(C.prototype, methods);
                meta.NEED = true;
            }
            setToStringTag(C, NAME);
            O[NAME] = C;
            $export($export.G + $export.W + $export.F * (C != Base), O);
            IS_WEAK || common.setStrong(C, NAME, IS_MAP);
            return C;
        };
    }, /* 79 */
    /***/
    function(module, exports, __webpack_require__) {
        var ITERATOR = __webpack_require__(0)("iterator");
        var SAFE_CLOSING = false;
        try {
            var riter = [ 7 ][ITERATOR]();
            riter.return = function() {
                SAFE_CLOSING = true;
            };
            // eslint-disable-next-line no-throw-literal
            Array.from(riter, function() {
                throw 2;
            });
        } catch (e) {}
        module.exports = function(exec, skipClosing) {
            if (!skipClosing && !SAFE_CLOSING) return false;
            var safe = false;
            try {
                var arr = [ 7 ];
                var iter = arr[ITERATOR]();
                iter.next = function() {
                    return {
                        done: safe = true
                    };
                };
                arr[ITERATOR] = function() {
                    return iter;
                };
                exec(arr);
            } catch (e) {}
            return safe;
        };
    }, /* 80 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(4);
        var setPrototypeOf = __webpack_require__(81).set;
        module.exports = function(that, target, C) {
            var S = target.constructor;
            var P;
            S !== C && "function" == typeof S && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf && setPrototypeOf(that, P);
            return that;
        };
    }, /* 81 */
    /***/
    function(module, exports, __webpack_require__) {
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        var isObject = __webpack_require__(4);
        var anObject = __webpack_require__(11);
        var check = function(O, proto) {
            anObject(O);
            if (!isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
        };
        module.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? // eslint-disable-line
            function(test, buggy, set) {
                try {
                    set = __webpack_require__(13)(Function.call, __webpack_require__(82).f(Object.prototype, "__proto__").set, 2);
                    set(test, []);
                    buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = true;
                }
                return function(O, proto) {
                    check(O, proto);
                    buggy ? O.__proto__ = proto : set(O, proto);
                    return O;
                };
            }({}, false) : void 0),
            check: check
        };
    }, /* 82 */
    /***/
    function(module, exports, __webpack_require__) {
        var pIE = __webpack_require__(83);
        var createDesc = __webpack_require__(24);
        var toIObject = __webpack_require__(20);
        var toPrimitive = __webpack_require__(39);
        var has = __webpack_require__(6);
        var IE8_DOM_DEFINE = __webpack_require__(37);
        var gOPD = Object.getOwnPropertyDescriptor;
        exports.f = __webpack_require__(5) ? gOPD : function(O, P) {
            O = toIObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE) try {
                return gOPD(O, P);
            } catch (e) {}
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
        };
    }, /* 83 */
    /***/
    function(module, exports) {
        exports.f = {}.propertyIsEnumerable;
    }, /* 84 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://github.com/DavidBruant/Map-Set.prototype.toJSON
        var $export = __webpack_require__(12);
        $export($export.P + $export.R, "Set", {
            toJSON: __webpack_require__(85)("Set")
        });
    }, /* 85 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://github.com/DavidBruant/Map-Set.prototype.toJSON
        var classof = __webpack_require__(23);
        var from = __webpack_require__(86);
        module.exports = function(NAME) {
            return function() {
                if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
                return from(this);
            };
        };
    }, /* 86 */
    /***/
    function(module, exports, __webpack_require__) {
        var forOf = __webpack_require__(21);
        module.exports = function(iter, ITERATOR) {
            var result = [];
            forOf(iter, false, result.push, result, ITERATOR);
            return result;
        };
    }, /* 87 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
        __webpack_require__(88)("Set");
    }, /* 88 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // https://tc39.github.io/proposal-setmap-offrom/
        var $export = __webpack_require__(12);
        module.exports = function(COLLECTION) {
            $export($export.S, COLLECTION, {
                of: function() {
                    var length = arguments.length;
                    var A = new Array(length);
                    for (;length--; ) A[length] = arguments[length];
                    return new this(A);
                }
            });
        };
    }, /* 89 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
        __webpack_require__(90)("Set");
    }, /* 90 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // https://tc39.github.io/proposal-setmap-offrom/
        var $export = __webpack_require__(12);
        var aFunction = __webpack_require__(40);
        var ctx = __webpack_require__(13);
        var forOf = __webpack_require__(21);
        module.exports = function(COLLECTION) {
            $export($export.S, COLLECTION, {
                from: function(source) {
                    var mapFn = arguments[1];
                    var mapping, A, n, cb;
                    aFunction(this);
                    mapping = void 0 !== mapFn;
                    mapping && aFunction(mapFn);
                    if (void 0 == source) return new this();
                    A = [];
                    if (mapping) {
                        n = 0;
                        cb = ctx(mapFn, arguments[2], 2);
                        forOf(source, false, function(nextItem) {
                            A.push(cb(nextItem, n++));
                        });
                    } else forOf(source, false, A.push, A);
                    return new this(A);
                }
            });
        };
    }, /* 91 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /* unused harmony export getGlobal */
            var _GLOBAL = function() {
                /* global self, window, global */
                if ("undefined" !== typeof window) return window;
                if ("undefined" !== typeof global) return global;
                if ("undefined" !== typeof self) return self;
                return Function("return this;")();
            }();
            function getGlobal() {
                return _GLOBAL;
            }
            /* harmony default export */
            __webpack_exports__.a = getGlobal;
        }).call(__webpack_exports__, __webpack_require__(92));
    }, /* 92 */
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
    }, /* 93 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = mixin;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(22);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(32);
        /* unused harmony reexport setDependencyTracker */
        /* unused harmony reexport unsetDependencyTracker */
        /* unused harmony reexport stopDependeeNotifications */
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //==============================================================
        var ArrayPrototype = Array.prototype;
        var objectDefineProp = Object.defineProperty;
        var objectKeys = Object.keys;
        var emit = Object(__WEBPACK_IMPORTED_MODULE_3__common__.f)(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.prototype.emit);
        var changeMethods = [ "pop", "push", "shift", "splice", "unshift", "sort", "reverse" ];
        var addMethods = [ "push", "splice", "unshift" ];
        var removeMethods = [ "pop", "shift", "splice" ];
        /**
 * An Array like object with the added ability to listen to events.
 * It supports all methods available to a normal array, like `forEach`,
 * `some` and `reduce`
 *
 * @class ObservableArray
 *
 * @extends EventEmitter
 * @extends Array
 *
 * @fires ObservableArray#change
 */
        var ObservableArray = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.extend(/** @lends ObservableArray.prototype */ {
            /**
     * The length of the array. Unlike the `length` property, this one is able
     * to notify dependees if any are set to be track dependencies.
     *
     * @name len
     * @type {Number}
     */
            // For backwards compatible with initial version
            // use `len` property instead
            size: function() {
                Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                return this.length;
            },
            /**
     * Returns a member of the collection given an index (zero based),
     * or updates the item at a given index with a new value.
     *
     * @param {Number} index
     * @param {*} [newValue]
     */
            item: function(index) {
                var args = ArrayPrototype.slice.call(arguments, 0);
                var _array = this;
                Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                // GET mode..
                if (1 === args.length) return _array[index];
                // Update mode... Emits event
                var events = getNewEventObject();
                if (_array[index] === args[1]) events.updated = [ args[1] ]; else {
                    events.removed = [ _array[index] ];
                    events.added = [ args[1] ];
                }
                var updateResponse = _array[index] = args[1];
                notifyDependees(_array, events);
                return updateResponse;
            }
        });
        function getInstance(obArray) {
            if (!__WEBPACK_IMPORTED_MODULE_3__common__.d.has(obArray)) {
                var dependees = new __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__.a();
                var isQueued = false;
                var nextEvent = null;
                var storeEventData = function(events) {
                    if (!events) return;
                    nextEvent || (nextEvent = getNewEventObject());
                    objectKeys(events).forEach(function(eventName) {
                        var _nextEvent$eventName;
                        if (!events[eventName]) return;
                        nextEvent[eventName] || (nextEvent[eventName] = []);
                        (_nextEvent$eventName = nextEvent[eventName]).push.apply(_nextEvent$eventName, _toConsumableArray(events[eventName]));
                    });
                };
                var inst = {
                    dependees: dependees,
                    notify: function(events) {
                        // Queue up calling all dependee notifiers
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = void 0;
                        try {
                            for (var _step, _iterator = dependees[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var cb = _step.value;
                                Object(__WEBPACK_IMPORTED_MODULE_3__common__.k)(cb);
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
                        storeEventData(events);
                        if (isQueued) return;
                        isQueued = true;
                        Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                            var eventData = nextEvent;
                            nextEvent = null;
                            /**
                     * ObservableArray was changed.
                     *
                     * @event ObservableArray#change
                     * @type {ObservableArray~ObservableArrayChangeEvent}
                     */
                            emit(obArray, "change", eventData);
                            isQueued = false;
                        });
                    }
                };
                __WEBPACK_IMPORTED_MODULE_3__common__.d.set(obArray, inst);
                var ev1 = Object(__WEBPACK_IMPORTED_MODULE_3__common__.j)(__WEBPACK_IMPORTED_MODULE_3__common__.a, function(cb) {
                    dependees.delete(cb);
                });
                obArray.onDestroy && obArray.onDestroy(function() {
                    dependees.clear();
                    ev1.off();
                    __WEBPACK_IMPORTED_MODULE_3__common__.d.delete(obArray);
                });
            }
            return __WEBPACK_IMPORTED_MODULE_3__common__.d.get(obArray);
        }
        /**
 * Converts an array instance methods to a wrapped version that can detect changes
 * and also track dependee notifiers when data is accessed from the array
 *
 * @param {Array} arr
 *
 * @return {Array}
 */
        function makeArrayObservable(arr) {
            // If it looks like this array is already an being observered, then exit.
            if (Object(__WEBPACK_IMPORTED_MODULE_3__common__.h)(arr)) return;
            Object(__WEBPACK_IMPORTED_MODULE_3__common__.m)(arr);
            var arrCurrentProto = arr.__proto__;
            // eslint-disable-line
            var newArrProto = void 0;
            // If we already have a wrapped prototype for this array's
            // current prototype, then just use that
            if (__WEBPACK_IMPORTED_MODULE_3__common__.d.has(arrCurrentProto)) newArrProto = __WEBPACK_IMPORTED_MODULE_3__common__.d.get(arrCurrentProto); else {
                // Create new Array instance prototype
                newArrProto = Object.create(arrCurrentProto);
                // Add all methods of Array.prototype to the collection
                Object.getOwnPropertyNames(ArrayPrototype).forEach(function(method) {
                    if ("constructor" === method || "function" !== typeof ArrayPrototype[method]) return;
                    var origMethod = newArrProto[method];
                    var doEvents = -1 !== changeMethods.indexOf(method);
                    var canAdd = -1 !== addMethods.indexOf(method);
                    var canRemove = -1 !== removeMethods.indexOf(method);
                    var isArraySplice = "splice" === method;
                    objectDefineProp(newArrProto, method, {
                        value: function() {
                            var _this = this;
                            Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                            var response = origMethod.call.apply(origMethod, [ this ].concat(args));
                            // If the response is an array, then add method to it that allows it
                            // to be converted to an observable
                            Object(__WEBPACK_IMPORTED_MODULE_3__common__.g)(response) && response !== this && objectDefineProp(response, "toObservable", {
                                value: function() {
                                    if (_this.getFactory) return _this.getFactory().create(response);
                                    return mixin(response);
                                }
                            });
                            // If Array method can manipulate the array, then emit event
                            if (doEvents) {
                                var events = getNewEventObject();
                                // Add Events
                                canAdd && (isArraySplice ? args.length > 2 && (events.added = args.slice(2)) : events.added = args);
                                canRemove && (events.removed = isArraySplice ? response : [ response ]);
                                notifyDependees(this, events);
                            }
                            return response;
                        },
                        writable: true,
                        configurable: true
                    });
                });
                // Add `len` property, which is shorthand for `length` but with added
                // ability to observe for array changes when called and trigger notifiers
                // when changed.
                objectDefineProp(newArrProto, "len", {
                    get: function() {
                        Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                        return this.length;
                    },
                    set: function(n) {
                        var response = this.length = n;
                        notifyDependees(this);
                        return response;
                    },
                    configurable: true
                });
                __WEBPACK_IMPORTED_MODULE_3__common__.d.set(arrCurrentProto, newArrProto);
            }
            arr.__proto__ = newArrProto;
            // eslint-disable-line
            return arr;
        }
        function notifyDependees(arrObj, events) {
            getInstance(arrObj).notify(events);
        }
        /**
 * Make an array instance observable in place
 *
 * @param {Array} arr
 *
 * @return {Array}
 */
        function mixin(arr) {
            Object(__WEBPACK_IMPORTED_MODULE_3__common__.g)(arr) || (arr = []);
            return ObservableArray.create(arr);
        }
        // Define the "create" factory method that will then redefine each
        // our proxyied methods of Array prototype into the array instance
        objectDefineProp(ObservableArray, "create", {
            value: function(arrayInstance) {
                var observable = arrayInstance || [];
                var thisPrototype = this.prototype;
                if (Object(__WEBPACK_IMPORTED_MODULE_3__common__.h)(observable)) return observable;
                makeArrayObservable(observable);
                var observableProto = observable.__proto__;
                // eslint-disable-line
                // Copy all methods in this prototype to the Array instance
                for (var prop in thisPrototype) /* eslint-disable */
                objectDefineProp(observableProto, prop, {
                    value: thisPrototype[prop],
                    writable: true,
                    configurable: true
                });
                observable.init && observable.init.apply(observable, arguments);
                return observable;
            }
        });
        function getNewEventObject() {
            /**
     * The array was changed.
     *
     * @typedef {Object} ObservableArray~ObservableArrayChangeEvent
     * @property {Array|null} added
     * @property {Array|null} removed
     * @property {Array|null} updated
     */
            return {
                added: null,
                removed: null,
                updated: null
            };
        }
    }, /* 94 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export TextBinding */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__directives_Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
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
    }, /* 95 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export ClassDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domHasClass__ = __webpack_require__(96);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(97);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(98);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
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
    }, /* 96 */
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
    }, /* 97 */
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
    }, /* 98 */
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
    }, /* 99 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export StyleDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Directive__ = __webpack_require__(2);
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
    }, /* 100 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export IfDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
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
    }, /* 101 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export ShowDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
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
    }, /* 102 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export PropDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__attr_directive__ = __webpack_require__(51);
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
    }, /* 103 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export OnDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(104);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
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
    }, /* 104 */
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
    }, /* 105 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export EachDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(30);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableObject__ = __webpack_require__(33);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_observable_data__ = __webpack_require__(50);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
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
            return Array.isArray(list) && !list.length || Object(__WEBPACK_IMPORTED_MODULE_4__utils__.m)(list) && !Object.keys(list).length;
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
                    this._tokenValueGetter = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.g)(listVar || "");
                }
            }, {
                key: "render",
                value: function(handler, node, data) {
                    var _this2 = this;
                    _get(EachDirective.prototype.__proto__ || Object.getPrototypeOf(EachDirective.prototype), "render", this).call(this, handler, node, data);
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(handler);
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
                                    state.listChgEv.off();
                                    state.listChgEv = null;
                                }
                            }
                            if (!newList) {
                                _this2.destroyChildBinders(state.binders, handler);
                                return;
                            }
                            Object(__WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableObject__.e)(state.tracker);
                            // We don't need to be notified of changes for individual items.
                            state.value = newList;
                            // Make sure data is observable and setup event listners on it.
                            Object(__WEBPACK_IMPORTED_MODULE_2_observable_data__.a)(newList);
                            Array.isArray(newList) ? state.listChgEv = newList.on("change", state.listIterator) : Object(__WEBPACK_IMPORTED_MODULE_4__utils__.m)(newList) && (state.listChgEv = Object(__WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableObject__.f)(newList, newList, state.listIterator));
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
                            Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(binders.splice(0), function(binder) {
                                return binder.destroy();
                            });
                        });
                    } else Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(binders.splice(0), function(binder) {
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
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(handler);
                    var attachedEleBinder = [];
                    var newDomElements = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.f)();
                    var isArray = Array.isArray(newData);
                    var data = void 0;
                    if (isArray) {
                        isArray = true;
                        data = newData;
                    } else {
                        if (!Object(__WEBPACK_IMPORTED_MODULE_4__utils__.m)(newData)) return;
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
                    newDomElements.hasChildNodes() && Object(__WEBPACK_IMPORTED_MODULE_4__utils__.l)(handler._placeholderEle.parentNode, newDomElements, handler._placeholderEle);
                    // store the new attached set of elements in their new positions, and
                    // clean up old Binders that are no longer being used/displayed
                    // FIXME: this needs to be more efficient!!!!!!
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)((_state$binders = state.binders).splice.apply(_state$binders, [ 0, state.binders.length ].concat(attachedEleBinder)), function(childBinder) {
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
                    var state = __WEBPACK_IMPORTED_MODULE_4__utils__.a.get(handler);
                    var itemBinder = null;
                    var newDomElements = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.f)();
                    var rowKey = handler.getKey(rowData);
                    var rowEleBinder = void 0;
                    rowKey && (rowEleBinder = state.bindersByKey.get(rowKey));
                    // If a binder already exists for this key, then just update its data
                    if (rowEleBinder) {
                        delete rowData.$data;
                        Object(__WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableObject__.b)(rowEleBinder._loop.rowData, rowData);
                        itemBinder = rowEleBinder;
                        return [ itemBinder, newDomElements ];
                    }
                    var frag = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.f)();
                    var rowEle = handler._n.cloneNode(true);
                    frag.appendChild(rowEle);
                    rowEleBinder = new handler._Factory(rowEle, rowData);
                    rowEleBinder._loop = {
                        rowEle: rowEle,
                        rowData: rowData,
                        rowKey: rowKey,
                        pos: -1
                    };
                    newDomElements.appendChild(frag);
                    rowKey && state.bindersByKey.set(rowKey, rowEleBinder);
                    itemBinder = rowEleBinder;
                    rowEleBinder.onDestroy(function() {
                        rowEle.parentNode && Object(__WEBPACK_IMPORTED_MODULE_4__utils__.p)(handler._placeholderEle.parentNode, rowEle);
                        rowKey && state.bindersByKey.delete(rowKey);
                    });
                    return [ itemBinder, newDomElements ];
                }
            }, {
                key: "positionChildren",
                value: function(eleParentNode, placeholderEle, childEleBinders) {
                    // FIXME: speed improvement = convert to while() looop
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.c)(childEleBinders, function(childBinder, index) {
                        if (childBinder._loop.pos === index) return;
                        Object(__WEBPACK_IMPORTED_MODULE_4__utils__.l)(eleParentNode, childBinder._loop.rowEle, childEleBinders[index + 1] ? childEleBinders[index + 1]._loop.rowEle : placeholderEle);
                        childBinder._loop.pos = index;
                    });
                }
            }, {
                key: "getNodeHandler",
                value: function(node, binder) {
                    var handler = _get(EachDirective.prototype.__proto__ || Object.getPrototypeOf(EachDirective.prototype), "getNodeHandler", this).call(this, node);
                    handler._Factory = binder.getFactory();
                    handler._placeholderEle = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.e)("");
                    handler.getKey = Object(__WEBPACK_IMPORTED_MODULE_4__utils__.k)(node, "_key") ? Object(__WEBPACK_IMPORTED_MODULE_4__utils__.g)(Object(__WEBPACK_IMPORTED_MODULE_4__utils__.i)(node, "_key")) : NOOP;
                    handler._isSoleChild = hasDedicatedParent(node);
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.l)(node.parentNode, handler._placeholderEle, node);
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.p)(node.parentNode, node);
                    Object(__WEBPACK_IMPORTED_MODULE_4__utils__.o)(node, "_key");
                    return handler;
                }
            } ], [ {
                key: "has",
                value: function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_4__utils__.k)(ele, "_each") ? "_each" : "";
                }
            }, {
                key: "manages",
                value: function() {
                    return true;
                }
            } ]);
            return EachDirective;
        }(__WEBPACK_IMPORTED_MODULE_3__Directive__.a);
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
    }, /* 106 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export HtmlDirective */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Directive__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
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