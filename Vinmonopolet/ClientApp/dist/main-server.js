(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(6);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(145);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(144);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(146);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RestUtilities__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_Auth__ = __webpack_require__(7);


var Auth = (function () {
    function Auth() {
    }
    Auth.isSignedInIn = function () {
        return !!__WEBPACK_IMPORTED_MODULE_1__store_Auth__["a" /* default */].getToken();
    };
    Auth.prototype.signInOrRegister = function (email, password, isRegister) {
        if (isRegister === void 0) { isRegister = false; }
        return __WEBPACK_IMPORTED_MODULE_0__RestUtilities__["a" /* default */].post("/api/auth/" + (isRegister ? 'register' : 'login'), "username=" + email + "&password=" + password + (!isRegister ? '&grant_type=password' : ''))
            .then(function (response) {
            if (response && response.content && !response.is_error) {
                __WEBPACK_IMPORTED_MODULE_1__store_Auth__["a" /* default */].setToken(response.content.token);
            }
            return response;
        });
    };
    Auth.prototype.signIn = function (email, password) {
        return this.signInOrRegister(email, password, false);
    };
    Auth.prototype.register = function (email, password) {
        return this.signInOrRegister(email, password, true);
    };
    Auth.prototype.confirm = function (token) {
        return __WEBPACK_IMPORTED_MODULE_0__RestUtilities__["a" /* default */].post('/api/auth/confirm', { token: token })
            .then(function (response) {
            return true;
        }).catch(function (err) {
            console.log(err);
            return false;
        });
    };
    Auth.prototype.signOut = function () {
        __WEBPACK_IMPORTED_MODULE_1__store_Auth__["a" /* default */].removeToken();
    };
    return Auth;
}());
/* harmony default export */ __webpack_exports__["a"] = (Auth);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_Auth__ = __webpack_require__(7);

;
var RestUtilities = (function () {
    function RestUtilities() {
    }
    RestUtilities.get = function (url) {
        return RestUtilities.request('GET', url);
    };
    RestUtilities.delete = function (url) {
        return RestUtilities.request('DELETE', url);
    };
    RestUtilities.put = function (url, data) {
        return RestUtilities.request('PUT', url, data);
    };
    RestUtilities.post = function (url, data) {
        return RestUtilities.request('POST', url, data);
    };
    RestUtilities.request = function (method, url, data) {
        var isJsonResponse = false;
        var isBadRequest = false;
        var body = data;
        var headers = {
            'Authorization': "Bearer " + __WEBPACK_IMPORTED_MODULE_0__store_Auth__["a" /* default */].getToken(),
            'Accept': 'application/json'
        };
        if (data) {
            if ((typeof data === 'object')) {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(data);
            }
            else {
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }
        return fetch(url, {
            method: method,
            headers: headers,
            body: body,
        }).then(function (response) {
            if (response.status == 401) {
                // Unauthorized; redirect to sign-in
                __WEBPACK_IMPORTED_MODULE_0__store_Auth__["a" /* default */].removeToken();
                window.location.replace("/?expired=1");
            }
            isBadRequest = (response.status == 400);
            var responseContentType = response.headers.get("content-type");
            if (responseContentType && responseContentType.indexOf("application/json") !== -1) {
                isJsonResponse = true;
                return response.json();
            }
            else {
                return response.text();
            }
        }).then(function (responseContent) {
            var response = {
                is_error: isBadRequest,
                error_content: isBadRequest ? responseContent : null,
                content: isBadRequest ? null : responseContent
            };
            return response;
        });
    };
    return RestUtilities;
}());
/* harmony default export */ __webpack_exports__["a"] = (RestUtilities);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Auth = (function () {
    function Auth() {
    }
    Auth.getToken = function () {
        return localStorage && localStorage.getItem(Auth.STORAGE_KEY);
    };
    Auth.setToken = function (token) {
        localStorage && localStorage.setItem(Auth.STORAGE_KEY, token);
    };
    Auth.removeToken = function () {
        localStorage && localStorage.removeItem(Auth.STORAGE_KEY);
    };
    Auth.STORAGE_KEY = "token";
    Auth.window = window || {};
    return Auth;
}());
/* harmony default export */ __webpack_exports__["a"] = (Auth);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_RestUtilities__ = __webpack_require__(6);


// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    requestBeerType: function (beerType) {
        if (beerType === void 0) { beerType = "Porter stout"; }
        return function (dispatch, getState) {
            // Only load data if it's something we don't already have (and are not already loading)
            var searchTerm = getState().beersByPolState.beerType;
            if (beerType !== searchTerm) {
                var fetchTask = __WEBPACK_IMPORTED_MODULE_1__services_RestUtilities__["a" /* default */].get("beers?query=" + beerType)
                    .then(function (response) {
                    if (response && response.content && !response.is_error) {
                        dispatch({ type: 'RECEIVE_BEER_TYPE', beerType: beerType, polViewModel: response.content });
                    }
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask); // Ensure server-side prerendering waits for this to complete
                dispatch({ type: 'REQUEST_BEER_TYPE', beerType: beerType });
            }
        };
    }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { polViewModel: { types: [], groupedBeers: [], searchTerm: "" }, isLoading: false };
var reducer = function (state, incomingAction) {
    if (state === void 0) { state = unloadedState; }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_BEER_TYPE':
            return {
                beerType: action.beerType,
                polViewModel: state.polViewModel,
                isLoading: true
            };
        case 'RECEIVE_BEER_TYPE':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.beerType === state.beerType) {
                console.log("receiving search term", action.polViewModel.searchTerm);
                return {
                    beerType: action.beerType,
                    polViewModel: action.polViewModel,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
var actionCreators = {
    increment: function () { return ({ type: 'INCREMENT_COUNT' }); },
    decrement: function () { return ({ type: 'DECREMENT_COUNT' }); }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var reducer = function (state, action) {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            var exhaustiveCheck = action;
    }
    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0 };
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(22);




function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension;
    var createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* reducers */]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
function buildRootReducer(allReducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object.assign({}, allReducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RoutePaths */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_FetchBeerType__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Counter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_Auth__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Auth__ = __webpack_require__(16);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};








var RoutePaths = (function () {
    function RoutePaths() {
    }
    RoutePaths.SignIn = "/login";
    RoutePaths.Register = "/register/";
    return RoutePaths;
}());

var DefaultLayout = function (_a) {
    var Component = _a.component, rest = __rest(_a, ["component"]);
    return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], __assign({}, rest, { render: function (props) { return (__WEBPACK_IMPORTED_MODULE_6__services_Auth__["a" /* default */].isSignedInIn() ? (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "container" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Component, __assign({}, props))))) : (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Redirect"], { to: {
                pathname: RoutePaths.SignIn,
                state: { from: props.location }
            } }))); } })));
};
var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: RoutePaths.SignIn, component: __WEBPACK_IMPORTED_MODULE_7__components_Auth__["a" /* SignIn */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: RoutePaths.Register, component: __WEBPACK_IMPORTED_MODULE_7__components_Auth__["b" /* Register */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__components_Home__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/counter', component: __WEBPACK_IMPORTED_MODULE_5__components_Counter__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](DefaultLayout, { path: '/beers', component: __WEBPACK_IMPORTED_MODULE_4__components_FetchBeerType__["a" /* default */] }));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(136);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(141);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(143);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__configureStore__ = __webpack_require__(10);









/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__["createServerRenderer"])(function (params) {
    return new Promise(function (resolve, reject) {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        var basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        var urlAfterBasename = params.url.substring(basename.length);
        var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__configureStore__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_history__["createMemoryHistory"])());
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__["replace"])(urlAfterBasename));
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        var routerContext = {};
        var app = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["StaticRouter"], { basename: basename, context: routerContext, location: params.location.path, children: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* routes */] })));
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app);
        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(function () {
            resolve({
                html: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
}));


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Register; });
/* unused harmony export RegisterComplete */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Auth__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var authService = new __WEBPACK_IMPORTED_MODULE_2__services_Auth__["a" /* default */]();
var SignIn = (function (_super) {
    __extends(SignIn, _super);
    function SignIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            initialLoad: true,
            error: ""
        };
        return _this;
    }
    SignIn.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        this.setState({ errors: null, initialLoad: false });
        authService.signIn(this.refs.username.value, this.refs.password.value).then(function (response) {
            if (response && response.is_error && response.error_content) {
                _this.setState({ error: response.error_content.error_description });
            }
            else {
                _this.props.history.push("/");
            }
        });
    };
    SignIn.prototype.render = function () {
        var _this = this;
        var search = this.props.location.search;
        var params = new URLSearchParams(search);
        var initialLoadContent = null;
        if (this.state.initialLoad) {
            if (params.get('confirmed')) {
                initialLoadContent = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-success", role: "alert" }, "Your email address has been successfully confirmed.");
            }
            if (params.get('expired')) {
                initialLoadContent = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-info", role: "alert" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Sesion Expired"),
                    " You need to sign in again.");
            }
            if (this.props.history.location.state && this.props.history.location.state.signedOut) {
                initialLoadContent = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-info", role: "alert" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Signed Out"));
            }
        }
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "auth" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("form", { className: "formAuth", onSubmit: function (e) { return _this.handleSubmit(e); } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h2", { className: "formAuthHeading" }, "Please sign in"),
                initialLoadContent,
                this.state.error &&
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-danger", role: "alert" }, this.state.error),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { htmlFor: "inputEmail", className: "form-control-label sr-only" }, "Email address"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "email", id: "inputEmail", ref: "username", defaultValue: "user@test.com", className: "form-control form-control-danger", placeholder: "Email address" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { htmlFor: "inputPassword", className: "form-control-label sr-only" }, "Password"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "password", id: "inputPassword", ref: "password", defaultValue: "P2ssw0rd!", className: "form-control", placeholder: "Password" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn btn-lg btn-primary btn-block", type: "submit" }, "Sign in")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "authEtc" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { to: "/register" }, "Register")));
    };
    return SignIn;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

var Register = (function (_super) {
    __extends(Register, _super);
    function Register() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            registerComplete: false,
            errors: {}
        };
        return _this;
    }
    Register.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        this.setState({ errors: {} });
        authService.register(this.refs.email.value, this.refs.password.value).then(function (response) {
            if (!response.is_error) {
                _this.setState({ registerComplete: true });
            }
            else {
                _this.setState({ errors: response.error_content });
            }
        });
    };
    Register.prototype._formGroupClass = function (field) {
        var className = "form-group ";
        if (field) {
            className += " has-danger";
        }
        return className;
    };
    Register.prototype.render = function () {
        var _this = this;
        if (this.state.registerComplete) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](RegisterComplete, { email: this.refs.email.value });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "auth" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("form", { className: "formAuth", onSubmit: function (e) { return _this.handleSubmit(e); } },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h2", { className: "formAuthHeading" }, "Please register for access"),
                    this.state.errors.general &&
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-danger", role: "alert" }, this.state.errors.general),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: this._formGroupClass(this.state.errors.username) },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { htmlFor: "inputEmail" }, "Email address"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "email", id: "inputEmail", ref: "email", className: "form-control", placeholder: "Email address" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-control-feedback" }, this.state.errors.username)),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: this._formGroupClass(this.state.errors.password) },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { htmlFor: "inputPassword" }, "Password"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { type: "password", id: "inputPassword", ref: "password", className: "form-control", placeholder: "Password" }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-control-feedback" }, this.state.errors.password)),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "btn btn-lg btn-primary btn-block", type: "submit" }, "Sign up")));
        }
        ;
    };
    return Register;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

var RegisterComplete = (function (_super) {
    __extends(RegisterComplete, _super);
    function RegisterComplete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegisterComplete.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "auth" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-success", role: "alert" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Success!"),
                "  Your account has been created."),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                "A confirmation email has been sent to ",
                this.props.email,
                ". You will need to follow the provided link to confirm your email address before signing in."),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { className: "btn btn-lg btn-primary btn-block", role: "button", to: "/" }, "Sign in"));
    };
    return RegisterComplete;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Counter__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Counter.prototype.render = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Counter"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "This is a simple example of a React component."),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                "Current count: ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, this.props.count)),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: function () { _this.props.increment(); } }, "Increment"));
    };
    return Counter;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
// Wire up the React component to the Redux store
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.counter; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_2__store_Counter__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(Counter));


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_BeerTypes__ = __webpack_require__(8);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var FetchBeerType = (function (_super) {
    __extends(FetchBeerType, _super);
    function FetchBeerType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchBeerType.prototype.componentWillMount = function () {
        // This method runs when the component is first added to the page
        this.props.requestBeerType(this.props.beerType);
    };
    FetchBeerType.prototype.render = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h3", null, this.props.beerType),
            this.props.polViewModel.types.map(function (type) {
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { key: type, onClick: function () { return _this.props.requestBeerType(type); }, className: "btn btn-primary" }, type);
            }),
            this.renderGroupedBeers());
    };
    FetchBeerType.prototype.renderGroupedBeers = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, this.props.polViewModel.groupedBeers.map(function (groupedBeer) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("table", { key: groupedBeer.storeName, className: "table table-condensed" },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("thead", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", { key: groupedBeer.storeName },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, groupedBeer.storeName),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", { className: "text-right" }, "Pris"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", { className: "text-right" }, "Alc"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", { className: "text-right" }, "Antall"))),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tbody", null, groupedBeer.beerLocations.map(function (beerLocation) {
                    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", { key: beerLocation.watchedBeer.materialNumber + beerLocation.storeId },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://untappd.com/search?q=' + beerLocation.watchedBeer.name, target: "blank" }, beerLocation.watchedBeer.name)),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", { className: "text-right" }, beerLocation.watchedBeer.price),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", { className: "text-right" },
                            beerLocation.watchedBeer.alcoholPercentage,
                            " %"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", { className: "text-right" }, beerLocation.stockLevel));
                })));
        }));
    };
    return FetchBeerType;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.beersByPolState; }, // Selects which state properties are merged into the component's props
__WEBPACK_IMPORTED_MODULE_2__store_BeerTypes__["a" /* actionCreators */] // Selects which action creators are merged into the component's props
)(FetchBeerType));


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Hello, world!"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "Welcome to your new single-page application, built with:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
                    " and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
                    " for cross-platform server-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://facebook.github.io/react/' }, "React"),
                    ", ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://redux.js.org' }, "Redux"),
                    ", and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://www.typescriptlang.org/' }, "TypeScript"),
                    " for client-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://webpack.github.io/' }, "Webpack"),
                    " for building and bundling client-side resources"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
                    " for layout and styling")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "To help you get started, we've also set up:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Client-side navigation"),
                    ". For example, click ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Counter"),
                    " then ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Back"),
                    " to return here."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Webpack dev middleware"),
                    ". In development mode, there's no need to run the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Hot module replacement"),
                    ". In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Efficient production builds"),
                    ". In production mode, development-time features are disabled, and the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool produces minified static CSS and JavaScript files."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Server-side prerendering"),
                    ". To optimize startup time, your React application is first rendered on the server. The initial HTML and state is then transferred to the browser, where client-side code picks up where the server left off.")));
    };
    return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (Home);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavMenu__ = __webpack_require__(21);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'container-fluid' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-3' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenu__["a" /* NavMenu */], null)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-9' }, this.props.children)));
    };
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'main-nav' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar navbar-inverse' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-header' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: 'button', className: 'navbar-toggle', "data-toggle": 'collapse', "data-target": '.navbar-collapse' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'sr-only' }, "Toggle navigation"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { className: 'navbar-brand', to: '/' }, "ReactAuth")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'clearfix' }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-collapse collapse' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: 'nav navbar-nav' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { exact: true, to: '/', activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-home' }),
                                " Home")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/counter', activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-education' }),
                                " Counter")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/beers', activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-th-list' }),
                                " Fetch data"))))));
    };
    return NavMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BeerTypes__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Counter__ = __webpack_require__(9);


// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    counter: __WEBPACK_IMPORTED_MODULE_1__Counter__["b" /* reducer */],
    beersByPolState: __WEBPACK_IMPORTED_MODULE_0__BeerTypes__["b" /* reducer */]
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(139);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(147);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(73);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBhZjk3MWY3ZDQ5NmYxYmIxNTEiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3NlcnZpY2VzL0F1dGgudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3NlcnZpY2VzL1Jlc3RVdGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL0F1dGgudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL0JlZXJUeXBlcy50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvQ291bnRlci50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL3NlcnZlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9BdXRoLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9Db3VudGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9GZXRjaEJlZXJUeXBlLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lLnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9jb21wb25lbnRzL05hdk1lbnUudHN4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2RvbWFpbi10YXNrL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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QUFHLFFBQVEsRUFBRyxlQUFlLEVBQUMsUUFBUTtnQ0FDN0MsK0RBQU0sU0FBUyxFQUFDLDZCQUE2QixHQUFROzhDQUMvQyxDQUNULENBQ0osQ0FDSCxDQUNKLENBQ0osQ0FBQztJQUNYLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxDQXBDNEIsZ0RBQWUsR0FvQzNDOzs7Ozs7Ozs7Ozs7QUN2Q3dDO0FBQ0o7QUFRckMsc0dBQXNHO0FBQ3RHLHdHQUF3RztBQUN4Ryw0REFBNEQ7QUFDckQsSUFBTSxRQUFRLEdBQUc7SUFDcEIsT0FBTyxFQUFFLHlEQUFlO0lBQ3hCLGVBQWUsRUFBRSwyREFBaUI7Q0FDckMsQ0FBQzs7Ozs7OztBQ2ZGLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMwYWY5NzFmN2Q0OTZmMWJiMTUxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi92ZW5kb3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCIuL3ZlbmRvclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQ1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQ0KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZXN0VXRpbGl0aWVzIGZyb20gJy4vUmVzdFV0aWxpdGllcyc7XHJcbmltcG9ydCBBdXRoU3RvcmUgZnJvbSAnLi4vc3RvcmUvQXV0aCc7XHJcblxyXG5pbnRlcmZhY2UgSUF1dGhSZXNwb25zZSB7XHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoIHtcclxuICAgIHN0YXRpYyBpc1NpZ25lZEluSW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhQXV0aFN0b3JlLmdldFRva2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluT3JSZWdpc3RlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBpc1JlZ2lzdGVyOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gUmVzdFV0aWxpdGllcy5wb3N0PElBdXRoUmVzcG9uc2U+KGAvYXBpL2F1dGgvJHtpc1JlZ2lzdGVyID8gJ3JlZ2lzdGVyJyA6ICdsb2dpbid9YCxcclxuICAgICAgICAgICAgYHVzZXJuYW1lPSR7ZW1haWx9JnBhc3N3b3JkPSR7cGFzc3dvcmR9JHshaXNSZWdpc3RlciA/ICcmZ3JhbnRfdHlwZT1wYXNzd29yZCcgOiAnJ31gKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5jb250ZW50ICYmICFyZXNwb25zZS5pc19lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIEF1dGhTdG9yZS5zZXRUb2tlbihyZXNwb25zZS5jb250ZW50LnRva2VuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaWduSW5PclJlZ2lzdGVyKGVtYWlsLCBwYXNzd29yZCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaWduSW5PclJlZ2lzdGVyKGVtYWlsLCBwYXNzd29yZCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlybSh0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIFJlc3RVdGlsaXRpZXMucG9zdCgnL2FwaS9hdXRoL2NvbmZpcm0nLCB7IHRva2VuOiB0b2tlbiB9KVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaWduT3V0KCk6IHZvaWQge1xyXG4gICAgICAgIEF1dGhTdG9yZS5yZW1vdmVUb2tlbigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zZXJ2aWNlcy9BdXRoLnRzIiwiaW1wb3J0IEF1dGhTdG9yZSBmcm9tICcuLi9zdG9yZS9BdXRoJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVycm9yQ29udGVudCB7XHJcbiAgICBlcnJvcjogc3RyaW5nO1xyXG4gICAgZXJyb3JfZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVzdFJlc3BvbnNlPFQ+IHtcclxuICAgIGlzX2Vycm9yPzogYm9vbGVhbjtcclxuICAgIGVycm9yX2NvbnRlbnQ/OiBJRXJyb3JDb250ZW50LFxyXG4gICAgY29udGVudD86IFRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3RVdGlsaXRpZXMge1xyXG5cclxuICAgIHN0YXRpYyBnZXQ8VD4odXJsOiBzdHJpbmcpOiBQcm9taXNlPElSZXN0UmVzcG9uc2U8VD4+IHtcclxuICAgICAgICByZXR1cm4gUmVzdFV0aWxpdGllcy5yZXF1ZXN0PFQ+KCdHRVQnLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZWxldGUodXJsOiBzdHJpbmcpOiBQcm9taXNlPElSZXN0UmVzcG9uc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gUmVzdFV0aWxpdGllcy5yZXF1ZXN0PHZvaWQ+KCdERUxFVEUnLCB1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwdXQ8VD4odXJsOiBzdHJpbmcsIGRhdGE6IE9iamVjdCB8IHN0cmluZyk6IFByb21pc2U8SVJlc3RSZXNwb25zZTxUPj4ge1xyXG4gICAgICAgIHJldHVybiBSZXN0VXRpbGl0aWVzLnJlcXVlc3Q8VD4oJ1BVVCcsIHVybCwgZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBvc3Q8VD4odXJsOiBzdHJpbmcsIGRhdGE6IE9iamVjdCB8IHN0cmluZyk6IFByb21pc2U8SVJlc3RSZXNwb25zZTxUPj4ge1xyXG4gICAgICAgIHJldHVybiBSZXN0VXRpbGl0aWVzLnJlcXVlc3Q8VD4oJ1BPU1QnLCB1cmwsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlcXVlc3Q8VD4obWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBkYXRhPzogT2JqZWN0KTogUHJvbWlzZTxJUmVzdFJlc3BvbnNlPFQ+PiB7XHJcblxyXG4gICAgICAgIGxldCBpc0pzb25SZXNwb25zZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc0JhZFJlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYm9keSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IGhlYWRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke0F1dGhTdG9yZS5nZXRUb2tlbigpfWAsXHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcclxuICAgICAgICAgICAgYm9keTogYm9keSxcclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVW5hdXRob3JpemVkOyByZWRpcmVjdCB0byBzaWduLWluXHJcbiAgICAgICAgICAgICAgICBBdXRoU3RvcmUucmVtb3ZlVG9rZW4oKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGAvP2V4cGlyZWQ9MWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc0JhZFJlcXVlc3QgPSAocmVzcG9uc2Uuc3RhdHVzID09IDQwMCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2VDb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2VDb250ZW50VHlwZSAmJiByZXNwb25zZUNvbnRlbnRUeXBlLmluZGV4T2YoXCJhcHBsaWNhdGlvbi9qc29uXCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaXNKc29uUmVzcG9uc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZUNvbnRlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2U6IElSZXN0UmVzcG9uc2U8VD4gPSB7XHJcbiAgICAgICAgICAgICAgICBpc19lcnJvcjogaXNCYWRSZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JfY29udGVudDogaXNCYWRSZXF1ZXN0ID8gcmVzcG9uc2VDb250ZW50IDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGlzQmFkUmVxdWVzdCA/IG51bGwgOiByZXNwb25zZUNvbnRlbnRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zZXJ2aWNlcy9SZXN0VXRpbGl0aWVzLnRzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aCB7XHJcbiAgICBzdGF0aWMgU1RPUkFHRV9LRVk6IHN0cmluZyA9IFwidG9rZW5cIjtcclxuICAgIHN0YXRpYyB3aW5kb3cgPSB3aW5kb3cgfHwge307XHJcbiAgICBzdGF0aWMgZ2V0VG9rZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBdXRoLlNUT1JBR0VfS0VZKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0VG9rZW4odG9rZW46IHN0cmluZykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBdXRoLlNUT1JBR0VfS0VZLCB0b2tlbik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlbW92ZVRva2VuKCk6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShBdXRoLlNUT1JBR0VfS0VZKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvQXV0aC50cyIsImltcG9ydCB7IGZldGNoLCBhZGRUYXNrIH0gZnJvbSAnZG9tYWluLXRhc2snO1xyXG5pbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIsIEFjdGlvbkNyZWF0b3IgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSAnLi8nO1xyXG5pbXBvcnQgUmVzdFV0aWxpdGllcyBmcm9tICcuLi9zZXJ2aWNlcy9SZXN0VXRpbGl0aWVzJztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJlZXJzR3JvdXBlZEJ5UG9sU3RhdGUge1xyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgYmVlclR5cGU/OiBzdHJpbmc7XHJcbiAgICBwb2xWaWV3TW9kZWw6IFBvbFZpZXdNb2RlbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQb2xWaWV3TW9kZWwge1xyXG4gICAgdHlwZXM6IHN0cmluZ1tdO1xyXG4gICAgZ3JvdXBlZEJlZXJzOiBCZWVyTG9jYXRpb25BdFBvbFtdO1xyXG4gICAgc2VhcmNoVGVybTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQmVlckxvY2F0aW9uQXRQb2wge1xyXG4gICAgc3RvcmVOYW1lOiBzdHJpbmc7XHJcbiAgICBiZWVyTG9jYXRpb25zOiBCZWVyTG9jYXRpb25bXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcm91cGVkQmVlciB7XHJcbiAgICBzdG9yZTogU3RvcmU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmUge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXYXRjaGVkQmVlciB7XHJcbiAgICBtYXRlcmlhbE51bWJlcjogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWxjb2hvbFBlcmNlbnRhZ2U6IG51bWJlcjtcclxuICAgIHByaWNlOiBudW1iZXI7XHJcbiAgICBiZWVyQ2F0ZWdvcnk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCZWVyTG9jYXRpb24ge1xyXG4gICAgc3RvcmVJZDogc3RyaW5nO1xyXG4gICAgc3RvY2tMZXZlbDogbnVtYmVyO1xyXG4gICAgc3RvY2tTdGF0dXM6IHN0cmluZztcclxuICAgIGFubm91bmNlZERhdGU/OiBEYXRlO1xyXG4gICAgd2F0Y2hlZEJlZXI6IFdhdGNoZWRCZWVyO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT05TIC0gVGhlc2UgYXJlIHNlcmlhbGl6YWJsZSAoaGVuY2UgcmVwbGF5YWJsZSkgZGVzY3JpcHRpb25zIG9mIHN0YXRlIHRyYW5zaXRpb25zLlxyXG4vLyBUaGV5IGRvIG5vdCB0aGVtc2VsdmVzIGhhdmUgYW55IHNpZGUtZWZmZWN0czsgdGhleSBqdXN0IGRlc2NyaWJlIHNvbWV0aGluZyB0aGF0IGlzIGdvaW5nIHRvIGhhcHBlbi5cclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0QmVlclR5cGVBY3Rpb24ge1xyXG4gICAgdHlwZTogJ1JFUVVFU1RfQkVFUl9UWVBFJztcclxuICAgIGJlZXJUeXBlPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUmVjZWl2ZUJlZXJUeXBlQWN0aW9uIHtcclxuICAgIHR5cGU6ICdSRUNFSVZFX0JFRVJfVFlQRSc7XHJcbiAgICBiZWVyVHlwZTogc3RyaW5nO1xyXG4gICAgcG9sVmlld01vZGVsOiBQb2xWaWV3TW9kZWw7XHJcbn1cclxuXHJcbi8vIERlY2xhcmUgYSAnZGlzY3JpbWluYXRlZCB1bmlvbicgdHlwZS4gVGhpcyBndWFyYW50ZWVzIHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gJ3R5cGUnIHByb3BlcnRpZXMgY29udGFpbiBvbmUgb2YgdGhlXHJcbi8vIGRlY2xhcmVkIHR5cGUgc3RyaW5ncyAoYW5kIG5vdCBhbnkgb3RoZXIgYXJiaXRyYXJ5IHN0cmluZykuXHJcbnR5cGUgS25vd25BY3Rpb24gPSBSZXF1ZXN0QmVlclR5cGVBY3Rpb24gfCBSZWNlaXZlQmVlclR5cGVBY3Rpb247XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTiBDUkVBVE9SUyAtIFRoZXNlIGFyZSBmdW5jdGlvbnMgZXhwb3NlZCB0byBVSSBjb21wb25lbnRzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgc3RhdGUgdHJhbnNpdGlvbi5cclxuLy8gVGhleSBkb24ndCBkaXJlY3RseSBtdXRhdGUgc3RhdGUsIGJ1dCB0aGV5IGNhbiBoYXZlIGV4dGVybmFsIHNpZGUtZWZmZWN0cyAoc3VjaCBhcyBsb2FkaW5nIGRhdGEpLlxyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge1xyXG4gICAgcmVxdWVzdEJlZXJUeXBlOiAoYmVlclR5cGU6IHN0cmluZyA9IFwiUG9ydGVyIHN0b3V0XCIpOiBBcHBUaHVua0FjdGlvbjxLbm93bkFjdGlvbj4gPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgICAgIC8vIE9ubHkgbG9hZCBkYXRhIGlmIGl0J3Mgc29tZXRoaW5nIHdlIGRvbid0IGFscmVhZHkgaGF2ZSAoYW5kIGFyZSBub3QgYWxyZWFkeSBsb2FkaW5nKVxyXG4gICAgICAgIGxldCBzZWFyY2hUZXJtID0gZ2V0U3RhdGUoKS5iZWVyc0J5UG9sU3RhdGUuYmVlclR5cGU7XHJcbiAgICAgICAgaWYgKGJlZXJUeXBlICE9PSBzZWFyY2hUZXJtKSB7XHJcbiAgICAgICAgICAgIGxldCBmZXRjaFRhc2sgPSBSZXN0VXRpbGl0aWVzLmdldDxQb2xWaWV3TW9kZWw+KGBiZWVycz9xdWVyeT0ke2JlZXJUeXBlfWApXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmNvbnRlbnQgJiYgIXJlc3BvbnNlLmlzX2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1JFQ0VJVkVfQkVFUl9UWVBFJywgYmVlclR5cGU6IGJlZXJUeXBlLCBwb2xWaWV3TW9kZWw6IHJlc3BvbnNlLmNvbnRlbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhZGRUYXNrKGZldGNoVGFzayk7IC8vIEVuc3VyZSBzZXJ2ZXItc2lkZSBwcmVyZW5kZXJpbmcgd2FpdHMgZm9yIHRoaXMgdG8gY29tcGxldGVcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnUkVRVUVTVF9CRUVSX1RZUEUnLCBiZWVyVHlwZTogYmVlclR5cGUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogQmVlcnNHcm91cGVkQnlQb2xTdGF0ZSA9IHsgcG9sVmlld01vZGVsOiB7IHR5cGVzOiBbXSwgZ3JvdXBlZEJlZXJzOiBbXSwgc2VhcmNoVGVybTogXCJcIn0sIGlzTG9hZGluZzogZmFsc2UgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPEJlZXJzR3JvdXBlZEJ5UG9sU3RhdGU+ID0gKHN0YXRlOiBCZWVyc0dyb3VwZWRCeVBvbFN0YXRlID0gdW5sb2FkZWRTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gaW5jb21pbmdBY3Rpb24gYXMgS25vd25BY3Rpb247XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnUkVRVUVTVF9CRUVSX1RZUEUnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYmVlclR5cGU6IGFjdGlvbi5iZWVyVHlwZSxcclxuICAgICAgICAgICAgICAgIHBvbFZpZXdNb2RlbDogc3RhdGUucG9sVmlld01vZGVsLFxyXG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnUkVDRUlWRV9CRUVSX1RZUEUnOlxyXG4gICAgICAgICAgICAvLyBPbmx5IGFjY2VwdCB0aGUgaW5jb21pbmcgZGF0YSBpZiBpdCBtYXRjaGVzIHRoZSBtb3N0IHJlY2VudCByZXF1ZXN0LiBUaGlzIGVuc3VyZXMgd2UgY29ycmVjdGx5XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBvdXQtb2Ytb3JkZXIgcmVzcG9uc2VzLlxyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmJlZXJUeXBlID09PSBzdGF0ZS5iZWVyVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNlaXZpbmcgc2VhcmNoIHRlcm1cIiwgYWN0aW9uLnBvbFZpZXdNb2RlbC5zZWFyY2hUZXJtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVlclR5cGU6IGFjdGlvbi5iZWVyVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBwb2xWaWV3TW9kZWw6IGFjdGlvbi5wb2xWaWV3TW9kZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL0JlZXJUeXBlcy50cyIsImltcG9ydCB7IEFjdGlvbiwgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvdW50ZXJTdGF0ZSB7XHJcbiAgICBjb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT05TIC0gVGhlc2UgYXJlIHNlcmlhbGl6YWJsZSAoaGVuY2UgcmVwbGF5YWJsZSkgZGVzY3JpcHRpb25zIG9mIHN0YXRlIHRyYW5zaXRpb25zLlxyXG4vLyBUaGV5IGRvIG5vdCB0aGVtc2VsdmVzIGhhdmUgYW55IHNpZGUtZWZmZWN0czsgdGhleSBqdXN0IGRlc2NyaWJlIHNvbWV0aGluZyB0aGF0IGlzIGdvaW5nIHRvIGhhcHBlbi5cclxuLy8gVXNlIEB0eXBlTmFtZSBhbmQgaXNBY3Rpb25UeXBlIGZvciB0eXBlIGRldGVjdGlvbiB0aGF0IHdvcmtzIGV2ZW4gYWZ0ZXIgc2VyaWFsaXphdGlvbi9kZXNlcmlhbGl6YXRpb24uXHJcblxyXG5pbnRlcmZhY2UgSW5jcmVtZW50Q291bnRBY3Rpb24geyB0eXBlOiAnSU5DUkVNRU5UX0NPVU5UJyB9XHJcbmludGVyZmFjZSBEZWNyZW1lbnRDb3VudEFjdGlvbiB7IHR5cGU6ICdERUNSRU1FTlRfQ09VTlQnIH1cclxuXHJcbi8vIERlY2xhcmUgYSAnZGlzY3JpbWluYXRlZCB1bmlvbicgdHlwZS4gVGhpcyBndWFyYW50ZWVzIHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gJ3R5cGUnIHByb3BlcnRpZXMgY29udGFpbiBvbmUgb2YgdGhlXHJcbi8vIGRlY2xhcmVkIHR5cGUgc3RyaW5ncyAoYW5kIG5vdCBhbnkgb3RoZXIgYXJiaXRyYXJ5IHN0cmluZykuXHJcbnR5cGUgS25vd25BY3Rpb24gPSBJbmNyZW1lbnRDb3VudEFjdGlvbiB8IERlY3JlbWVudENvdW50QWN0aW9uO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBBQ1RJT04gQ1JFQVRPUlMgLSBUaGVzZSBhcmUgZnVuY3Rpb25zIGV4cG9zZWQgdG8gVUkgY29tcG9uZW50cyB0aGF0IHdpbGwgdHJpZ2dlciBhIHN0YXRlIHRyYW5zaXRpb24uXHJcbi8vIFRoZXkgZG9uJ3QgZGlyZWN0bHkgbXV0YXRlIHN0YXRlLCBidXQgdGhleSBjYW4gaGF2ZSBleHRlcm5hbCBzaWRlLWVmZmVjdHMgKHN1Y2ggYXMgbG9hZGluZyBkYXRhKS5cclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuICAgIGluY3JlbWVudDogKCkgPT4gPEluY3JlbWVudENvdW50QWN0aW9uPnsgdHlwZTogJ0lOQ1JFTUVOVF9DT1VOVCcgfSxcclxuICAgIGRlY3JlbWVudDogKCkgPT4gPERlY3JlbWVudENvdW50QWN0aW9uPnsgdHlwZTogJ0RFQ1JFTUVOVF9DT1VOVCcgfVxyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBSRURVQ0VSIC0gRm9yIGEgZ2l2ZW4gc3RhdGUgYW5kIGFjdGlvbiwgcmV0dXJucyB0aGUgbmV3IHN0YXRlLiBUbyBzdXBwb3J0IHRpbWUgdHJhdmVsLCB0aGlzIG11c3Qgbm90IG11dGF0ZSB0aGUgb2xkIHN0YXRlLlxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI6IFJlZHVjZXI8Q291bnRlclN0YXRlPiA9IChzdGF0ZTogQ291bnRlclN0YXRlLCBhY3Rpb246IEtub3duQWN0aW9uKSA9PiB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnSU5DUkVNRU5UX0NPVU5UJzpcclxuICAgICAgICAgICAgcmV0dXJuIHsgY291bnQ6IHN0YXRlLmNvdW50ICsgMSB9O1xyXG4gICAgICAgIGNhc2UgJ0RFQ1JFTUVOVF9DT1VOVCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7IGNvdW50OiBzdGF0ZS5jb3VudCAtIDEgfTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGxpbmUgZ3VhcmFudGVlcyB0aGF0IGV2ZXJ5IGFjdGlvbiBpbiB0aGUgS25vd25BY3Rpb24gdW5pb24gaGFzIGJlZW4gY292ZXJlZCBieSBhIGNhc2UgYWJvdmVcclxuICAgICAgICAgICAgY29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGb3IgdW5yZWNvZ25pemVkIGFjdGlvbnMgKG9yIGluIGNhc2VzIHdoZXJlIGFjdGlvbnMgaGF2ZSBubyBlZmZlY3QpLCBtdXN0IHJldHVybiB0aGUgZXhpc3Rpbmcgc3RhdGVcclxuICAgIC8vICAob3IgZGVmYXVsdCBpbml0aWFsIHN0YXRlIGlmIG5vbmUgd2FzIHN1cHBsaWVkKVxyXG4gICAgcmV0dXJuIHN0YXRlIHx8IHsgY291bnQ6IDAgfTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL0NvdW50ZXIudHMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIEdlbmVyaWNTdG9yZUVuaGFuY2VyLCBTdG9yZSwgU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvciwgUmVkdWNlcnNNYXBPYmplY3QgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIsIHJvdXRlck1pZGRsZXdhcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgKiBhcyBTdG9yZU1vZHVsZSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSwgcmVkdWNlcnMgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlU3RvcmUoaGlzdG9yeTogSGlzdG9yeSwgaW5pdGlhbFN0YXRlPzogQXBwbGljYXRpb25TdGF0ZSkge1xyXG4gICAgLy8gQnVpbGQgbWlkZGxld2FyZS4gVGhlc2UgYXJlIGZ1bmN0aW9ucyB0aGF0IGNhbiBwcm9jZXNzIHRoZSBhY3Rpb25zIGJlZm9yZSB0aGV5IHJlYWNoIHRoZSBzdG9yZS5cclxuICAgIGNvbnN0IHdpbmRvd0lmRGVmaW5lZCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyBhcyBhbnk7XHJcbiAgICAvLyBJZiBkZXZUb29scyBpcyBpbnN0YWxsZWQsIGNvbm5lY3QgdG8gaXRcclxuICAgIGNvbnN0IGRldlRvb2xzRXh0ZW5zaW9uID0gd2luZG93SWZEZWZpbmVkICYmIHdpbmRvd0lmRGVmaW5lZC5kZXZUb29sc0V4dGVuc2lvbiBhcyAoKSA9PiBHZW5lcmljU3RvcmVFbmhhbmNlcjtcclxuICAgIGNvbnN0IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUgPSBjb21wb3NlKFxyXG4gICAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KSksXHJcbiAgICAgICAgZGV2VG9vbHNFeHRlbnNpb24gPyBkZXZUb29sc0V4dGVuc2lvbigpIDogPFM+KG5leHQ6IFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3I8Uz4pID0+IG5leHRcclxuICAgICkoY3JlYXRlU3RvcmUpO1xyXG5cclxuICAgIC8vIENvbWJpbmUgYWxsIHJlZHVjZXJzIGFuZCBpbnN0YW50aWF0ZSB0aGUgYXBwLXdpZGUgc3RvcmUgaW5zdGFuY2VcclxuICAgIGNvbnN0IGFsbFJlZHVjZXJzID0gYnVpbGRSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUoYWxsUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkgYXMgU3RvcmU8QXBwbGljYXRpb25TdGF0ZT47XHJcblxyXG4gICAgLy8gRW5hYmxlIFdlYnBhY2sgaG90IG1vZHVsZSByZXBsYWNlbWVudCBmb3IgcmVkdWNlcnNcclxuICAgIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vc3RvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmU8dHlwZW9mIFN0b3JlTW9kdWxlPignLi9zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihidWlsZFJvb3RSZWR1Y2VyKG5leHRSb290UmVkdWNlci5yZWR1Y2VycykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRSb290UmVkdWNlcihhbGxSZWR1Y2VyczogUmVkdWNlcnNNYXBPYmplY3QpIHtcclxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnM8QXBwbGljYXRpb25TdGF0ZT4oT2JqZWN0LmFzc2lnbih7fSwgYWxsUmVkdWNlcnMsIHsgcm91dGluZzogcm91dGVyUmVkdWNlciB9KSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSwgUmVkaXJlY3QsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvTGF5b3V0JztcclxuaW1wb3J0IEhvbWUgZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgRmV0Y2hEYXRhIGZyb20gJy4vY29tcG9uZW50cy9GZXRjaEJlZXJUeXBlJztcclxuaW1wb3J0IENvdW50ZXIgZnJvbSAnLi9jb21wb25lbnRzL0NvdW50ZXInO1xyXG5pbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy9BdXRoJztcclxuaW1wb3J0IHsgU2lnbkluLCBSZWdpc3RlciB9IGZyb20gJy4vY29tcG9uZW50cy9BdXRoJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSb3V0ZVBhdGhzIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2lnbkluOiBzdHJpbmcgPSBcIi9sb2dpblwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBSZWdpc3Rlcjogc3RyaW5nID0gXCIvcmVnaXN0ZXIvXCI7XHJcbn1cclxuXHJcbmNvbnN0IERlZmF1bHRMYXlvdXQgPSAoeyBjb21wb25lbnQ6IENvbXBvbmVudCwgLi4ucmVzdCB9OiB7IGNvbXBvbmVudDogYW55LCBwYXRoOiBzdHJpbmcsIGV4YWN0PzogYm9vbGVhbiB9KSA9PiAoXHJcbiAgICA8Um91dGUgey4uLnJlc3R9IHJlbmRlcj17cHJvcHMgPT4gKFxyXG4gICAgICAgIEF1dGhTZXJ2aWNlLmlzU2lnbmVkSW5JbigpID8gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8UmVkaXJlY3QgdG89e3tcclxuICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBSb3V0ZVBhdGhzLlNpZ25JbixcclxuICAgICAgICAgICAgICAgIHN0YXRlOiB7IGZyb206IHByb3BzLmxvY2F0aW9uIH1cclxuICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICApXHJcbiAgICApfSAvPlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IDxMYXlvdXQ+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD17Um91dGVQYXRocy5TaWduSW59IGNvbXBvbmVudD17U2lnbklufSAvPlxyXG4gICAgPFJvdXRlIHBhdGg9e1JvdXRlUGF0aHMuUmVnaXN0ZXJ9IGNvbXBvbmVudD17UmVnaXN0ZXJ9IC8+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXsgSG9tZSB9IC8+XHJcbiAgICA8Um91dGUgcGF0aD0nL2NvdW50ZXInIGNvbXBvbmVudD17IENvdW50ZXIgfSAvPlxyXG4gICAgPERlZmF1bHRMYXlvdXQgcGF0aD0nL2JlZXJzJyBjb21wb25lbnQ9eyBGZXRjaERhdGEgfSAvPlxyXG48L0xheW91dD47XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0Myk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgcmVwbGFjZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcclxuaW1wb3J0IHsgY3JlYXRlU2VydmVyUmVuZGVyZXIsIFJlbmRlclJlc3VsdCB9IGZyb20gJ2FzcG5ldC1wcmVyZW5kZXJpbmcnO1xyXG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL2NvbmZpZ3VyZVN0b3JlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNlcnZlclJlbmRlcmVyKHBhcmFtcyA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UmVuZGVyUmVzdWx0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gUHJlcGFyZSBSZWR1eCBzdG9yZSB3aXRoIGluLW1lbW9yeSBoaXN0b3J5LCBhbmQgZGlzcGF0Y2ggYSBuYXZpZ2F0aW9uIGV2ZW50XHJcbiAgICAgICAgLy8gY29ycmVzcG9uZGluZyB0byB0aGUgaW5jb21pbmcgVVJMXHJcbiAgICAgICAgY29uc3QgYmFzZW5hbWUgPSBwYXJhbXMuYmFzZVVybC5zdWJzdHJpbmcoMCwgcGFyYW1zLmJhc2VVcmwubGVuZ3RoIC0gMSk7IC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaFxyXG4gICAgICAgIGNvbnN0IHVybEFmdGVyQmFzZW5hbWUgPSBwYXJhbXMudXJsLnN1YnN0cmluZyhiYXNlbmFtZS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoY3JlYXRlTWVtb3J5SGlzdG9yeSgpKTtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChyZXBsYWNlKHVybEFmdGVyQmFzZW5hbWUpKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwbGljYXRpb24gYW5kIHBlcmZvcm0gYW4gaW5pdGFsIHJlbmRlciB0aGF0IHdpbGxcclxuICAgICAgICAvLyBjYXVzZSBhbnkgYXN5bmMgdGFza3MgKGUuZy4sIGRhdGEgYWNjZXNzKSB0byBiZWdpblxyXG4gICAgICAgIGNvbnN0IHJvdXRlckNvbnRleHQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IChcclxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXsgc3RvcmUgfT5cclxuICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgYmFzZW5hbWU9eyBiYXNlbmFtZSB9IGNvbnRleHQ9eyByb3V0ZXJDb250ZXh0IH0gbG9jYXRpb249eyBwYXJhbXMubG9jYXRpb24ucGF0aCB9IGNoaWxkcmVuPXsgcm91dGVzIH0gLz5cclxuICAgICAgICAgICAgPC9Qcm92aWRlcj5cclxuICAgICAgICApO1xyXG4gICAgICAgIHJlbmRlclRvU3RyaW5nKGFwcCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWRpcmVjdGlvbiwganVzdCBzZW5kIHRoaXMgaW5mb3JtYXRpb24gYmFjayB0byB0aGUgaG9zdCBhcHBsaWNhdGlvblxyXG4gICAgICAgIGlmIChyb3V0ZXJDb250ZXh0LnVybCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgcmVkaXJlY3RVcmw6IHJvdXRlckNvbnRleHQudXJsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgYW55IGFzeW5jIHRhc2tzIGFyZSBkb25lLCB3ZSBjYW4gcGVyZm9ybSB0aGUgZmluYWwgcmVuZGVyXHJcbiAgICAgICAgLy8gV2UgYWxzbyBzZW5kIHRoZSByZWR1eCBzdG9yZSBzdGF0ZSwgc28gdGhlIGNsaWVudCBjYW4gY29udGludWUgZXhlY3V0aW9uIHdoZXJlIHRoZSBzZXJ2ZXIgbGVmdCBvZmZcclxuICAgICAgICBwYXJhbXMuZG9tYWluVGFza3MudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgaHRtbDogcmVuZGVyVG9TdHJpbmcoYXBwKSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHsgaW5pdGlhbFJlZHV4U3RhdGU6IHN0b3JlLmdldFN0YXRlKCkgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCByZWplY3QpOyAvLyBBbHNvIHByb3BhZ2F0ZSBhbnkgZXJyb3JzIGJhY2sgaW50byB0aGUgaG9zdCBhcHBsaWNhdGlvblxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvYm9vdC1zZXJ2ZXIudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IExpbmssIFJlZGlyZWN0LCBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9BdXRoJztcclxuaW1wb3J0ICogYXMgUm91dGVzIGZyb20gXCIuLi9yb3V0ZXNcIjtcclxuaW1wb3J0IFJvdXRlUGF0aHMgPSBSb3V0ZXMuUm91dGVQYXRocztcclxubGV0IGF1dGhTZXJ2aWNlID0gbmV3IEF1dGhTZXJ2aWNlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgU2lnbkluIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJvdXRlQ29tcG9uZW50UHJvcHM8YW55PiwgYW55PiB7XHJcbiAgICByZWZzOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgcGFzc3dvcmQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgaW5pdGlhbExvYWQ6IHRydWUsXHJcbiAgICAgICAgZXJyb3I6IFwiXCJcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdWJtaXQoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yczogbnVsbCwgaW5pdGlhbExvYWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIGF1dGhTZXJ2aWNlLnNpZ25Jbih0aGlzLnJlZnMudXNlcm5hbWUudmFsdWUsIHRoaXMucmVmcy5wYXNzd29yZC52YWx1ZSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5pc19lcnJvciAmJiByZXNwb25zZS5lcnJvcl9jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZXJyb3I6IHJlc3BvbnNlLmVycm9yX2NvbnRlbnQuZXJyb3JfZGVzY3JpcHRpb24gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhpc3RvcnkucHVzaChcIi9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gdGhpcy5wcm9wcy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhzZWFyY2gpO1xyXG5cclxuICAgICAgICBsZXQgaW5pdGlhbExvYWRDb250ZW50ID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pbml0aWFsTG9hZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmdldCgnY29uZmlybWVkJykpIHtcclxuICAgICAgICAgICAgICAgIGluaXRpYWxMb2FkQ29udGVudCA9IDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFlvdXIgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY29uZmlybWVkLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmdldCgnZXhwaXJlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0aWFsTG9hZENvbnRlbnQgPSA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWluZm9cIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPlNlc2lvbiBFeHBpcmVkPC9zdHJvbmc+IFlvdSBuZWVkIHRvIHNpZ24gaW4gYWdhaW4uXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmhpc3RvcnkubG9jYXRpb24uc3RhdGUgJiYgdGhpcy5wcm9wcy5oaXN0b3J5LmxvY2F0aW9uLnN0YXRlLnNpZ25lZE91dCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbExvYWRDb250ZW50ID0gPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1pbmZvXCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TaWduZWQgT3V0PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRoXCI+XHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZvcm1BdXRoXCIgb25TdWJtaXQ9eyhlKSA9PiB0aGlzLmhhbmRsZVN1Ym1pdChlKX0+XHJcbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9ybUF1dGhIZWFkaW5nXCI+UGxlYXNlIHNpZ24gaW48L2gyPlxyXG4gICAgICAgICAgICAgICAge2luaXRpYWxMb2FkQ29udGVudH1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImlucHV0RW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wtbGFiZWwgc3Itb25seVwiPkVtYWlsIGFkZHJlc3M8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiaW5wdXRFbWFpbFwiIHJlZj1cInVzZXJuYW1lXCIgZGVmYXVsdFZhbHVlPVwidXNlckB0ZXN0LmNvbVwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtZGFuZ2VyXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBhZGRyZXNzXCIvPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJpbnB1dFBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sLWxhYmVsIHNyLW9ubHlcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJpbnB1dFBhc3N3b3JkXCIgcmVmPVwicGFzc3dvcmRcIiBkZWZhdWx0VmFsdWU9XCJQMnNzdzByZCFcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgLz5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1sZyBidG4tcHJpbWFyeSBidG4tYmxvY2tcIiB0eXBlPVwic3VibWl0XCI+U2lnbiBpbjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0aEV0Y1wiPlxyXG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvcmVnaXN0ZXJcIj5SZWdpc3RlcjwvTGluaz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IHtcclxuICAgIHJlZnM6IHtcclxuICAgICAgICBlbWFpbDogSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBwYXNzd29yZDogSFRNTElucHV0RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICByZWdpc3RlckNvbXBsZXRlOiBmYWxzZSxcclxuICAgICAgICBlcnJvcnM6IHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTdWJtaXQoZXZlbnQ6IFJlYWN0LkZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yczoge30gfSk7XHJcbiAgICAgICAgYXV0aFNlcnZpY2UucmVnaXN0ZXIodGhpcy5yZWZzLmVtYWlsLnZhbHVlLCB0aGlzLnJlZnMucGFzc3dvcmQudmFsdWUpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLmlzX2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcmVnaXN0ZXJDb21wbGV0ZTogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yczogcmVzcG9uc2UuZXJyb3JfY29udGVudCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9mb3JtR3JvdXBDbGFzcyhmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IFwiZm9ybS1ncm91cCBcIjtcclxuICAgICAgICBpZiAoZmllbGQpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9IFwiIGhhcy1kYW5nZXJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5yZWdpc3RlckNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8UmVnaXN0ZXJDb21wbGV0ZSBlbWFpbD17dGhpcy5yZWZzLmVtYWlsLnZhbHVlfSAvPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImF1dGhcIj5cclxuICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZvcm1BdXRoXCIgb25TdWJtaXQ9eyhlKSA9PiB0aGlzLmhhbmRsZVN1Ym1pdChlKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvcm1BdXRoSGVhZGluZ1wiPlBsZWFzZSByZWdpc3RlciBmb3IgYWNjZXNzPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvcnMuZ2VuZXJhbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LWRhbmdlclwiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3JzLmdlbmVyYWx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5fZm9ybUdyb3VwQ2xhc3ModGhpcy5zdGF0ZS5lcnJvcnMudXNlcm5hbWUpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJpbnB1dEVtYWlsXCI+RW1haWwgYWRkcmVzczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImlucHV0RW1haWxcIiByZWY9XCJlbWFpbFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwgYWRkcmVzc1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sLWZlZWRiYWNrXCI+e3RoaXMuc3RhdGUuZXJyb3JzLnVzZXJuYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLl9mb3JtR3JvdXBDbGFzcyh0aGlzLnN0YXRlLmVycm9ycy5wYXNzd29yZCl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImlucHV0UGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cImlucHV0UGFzc3dvcmRcIiByZWY9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbC1mZWVkYmFja1wiPnt0aGlzLnN0YXRlLmVycm9ycy5wYXNzd29yZH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbGcgYnRuLXByaW1hcnkgYnRuLWJsb2NrXCIgdHlwZT1cInN1Ym1pdFwiPlNpZ24gdXA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPC9kaXY+O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZWdpc3RlckNvbXBsZXRlUHJvcHMge1xyXG4gICAgZW1haWw6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyQ29tcGxldGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UmVnaXN0ZXJDb21wbGV0ZVByb3BzLCBhbnk+IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJhdXRoXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz5TdWNjZXNzITwvc3Ryb25nPiAgWW91ciBhY2NvdW50IGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgIEEgY29uZmlybWF0aW9uIGVtYWlsIGhhcyBiZWVuIHNlbnQgdG8ge3RoaXMucHJvcHMuZW1haWx9LiBZb3Ugd2lsbCBuZWVkIHRvIGZvbGxvdyB0aGUgcHJvdmlkZWQgbGluayB0byBjb25maXJtIHlvdXIgZW1haWwgYWRkcmVzcyBiZWZvcmUgc2lnbmluZyBpbi5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8TGluayBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1wcmltYXJ5IGJ0bi1ibG9ja1wiIHJvbGU9XCJidXR0b25cIiB0bz1cIi9cIj5TaWduIGluPC9MaW5rPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9BdXRoLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gIGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgQ291bnRlclN0b3JlIGZyb20gJy4uL3N0b3JlL0NvdW50ZXInO1xyXG5cclxudHlwZSBDb3VudGVyUHJvcHMgPVxyXG4gICAgQ291bnRlclN0b3JlLkNvdW50ZXJTdGF0ZVxyXG4gICAgJiB0eXBlb2YgQ291bnRlclN0b3JlLmFjdGlvbkNyZWF0b3JzXHJcbiAgICAmIFJvdXRlQ29tcG9uZW50UHJvcHM8e30+O1xyXG5cclxuY2xhc3MgQ291bnRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxDb3VudGVyUHJvcHMsIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8aDE+Q291bnRlcjwvaDE+XHJcblxyXG4gICAgICAgICAgICA8cD5UaGlzIGlzIGEgc2ltcGxlIGV4YW1wbGUgb2YgYSBSZWFjdCBjb21wb25lbnQuPC9wPlxyXG5cclxuICAgICAgICAgICAgPHA+Q3VycmVudCBjb3VudDogPHN0cm9uZz57IHRoaXMucHJvcHMuY291bnQgfTwvc3Ryb25nPjwvcD5cclxuXHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17ICgpID0+IHsgdGhpcy5wcm9wcy5pbmNyZW1lbnQoKSB9IH0+SW5jcmVtZW50PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBXaXJlIHVwIHRoZSBSZWFjdCBjb21wb25lbnQgdG8gdGhlIFJlZHV4IHN0b3JlXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICAoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLmNvdW50ZXIsIC8vIFNlbGVjdHMgd2hpY2ggc3RhdGUgcHJvcGVydGllcyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbiAgICBDb3VudGVyU3RvcmUuYWN0aW9uQ3JlYXRvcnMgICAgICAgICAgICAgICAgIC8vIFNlbGVjdHMgd2hpY2ggYWN0aW9uIGNyZWF0b3JzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuKShDb3VudGVyKSBhcyB0eXBlb2YgQ291bnRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9Db3VudGVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluaywgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gIGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgQmVlclR5cGVTdGF0ZSBmcm9tICcuLi9zdG9yZS9CZWVyVHlwZXMnO1xyXG5cclxuLy8gQXQgcnVudGltZSwgUmVkdXggd2lsbCBtZXJnZSB0b2dldGhlci4uLlxyXG50eXBlIEJlZXJUeXBlUHJvcHMgPVxyXG4gICAgQmVlclR5cGVTdGF0ZS5CZWVyc0dyb3VwZWRCeVBvbFN0YXRlICAgICAgICAvLyAuLi4gc3RhdGUgd2UndmUgcmVxdWVzdGVkIGZyb20gdGhlIFJlZHV4IHN0b3JlXHJcbiAgICAmIHR5cGVvZiBCZWVyVHlwZVN0YXRlLmFjdGlvbkNyZWF0b3JzICAgICAgLy8gLi4uIHBsdXMgYWN0aW9uIGNyZWF0b3JzIHdlJ3ZlIHJlcXVlc3RlZFxyXG4gICAgJiBSb3V0ZUNvbXBvbmVudFByb3BzPHsgcXVlcnk6IHN0cmluZyB9PjsgLy8gLi4uIHBsdXMgaW5jb21pbmcgcm91dGluZyBwYXJhbWV0ZXJzXHJcblxyXG5jbGFzcyBGZXRjaEJlZXJUeXBlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEJlZXJUeXBlUHJvcHMsIHt9PiB7XHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgcnVucyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZmlyc3QgYWRkZWQgdG8gdGhlIHBhZ2VcclxuICAgICAgICB0aGlzLnByb3BzLnJlcXVlc3RCZWVyVHlwZSh0aGlzLnByb3BzLmJlZXJUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPGgzPnt0aGlzLnByb3BzLmJlZXJUeXBlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5wb2xWaWV3TW9kZWwudHlwZXMubWFwKHR5cGUgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICA8YSBrZXk9e3R5cGV9IG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMucmVxdWVzdEJlZXJUeXBlKHR5cGUpfSBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj57dHlwZX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckdyb3VwZWRCZWVycygpIH1cclxuICAgICAgICAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyR3JvdXBlZEJlZXJzKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnBvbFZpZXdNb2RlbC5ncm91cGVkQmVlcnMubWFwKGdyb3VwZWRCZWVyID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBrZXk9e2dyb3VwZWRCZWVyLnN0b3JlTmFtZX0gY2xhc3NOYW1lPVwidGFibGUgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtncm91cGVkQmVlci5zdG9yZU5hbWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD57Z3JvdXBlZEJlZXIuc3RvcmVOYW1lfTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5QcmlzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPkFsYzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5BbnRhbGw8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z3JvdXBlZEJlZXIuYmVlckxvY2F0aW9ucy5tYXAoYmVlckxvY2F0aW9uID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGJlZXJMb2NhdGlvbi53YXRjaGVkQmVlci5tYXRlcmlhbE51bWJlciArIGJlZXJMb2NhdGlvbi5zdG9yZUlkIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YSBocmVmPXsnaHR0cHM6Ly91bnRhcHBkLmNvbS9zZWFyY2g/cT0nICsgYmVlckxvY2F0aW9uLndhdGNoZWRCZWVyLm5hbWUgfSB0YXJnZXQ9XCJibGFua1wiPntiZWVyTG9jYXRpb24ud2F0Y2hlZEJlZXIubmFtZX08L2E+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj57IGJlZXJMb2NhdGlvbi53YXRjaGVkQmVlci5wcmljZSB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj57YmVlckxvY2F0aW9uLndhdGNoZWRCZWVyLmFsY29ob2xQZXJjZW50YWdlfSAlPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj57YmVlckxvY2F0aW9uLnN0b2NrTGV2ZWx9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4oc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLmJlZXJzQnlQb2xTdGF0ZSwgLy8gU2VsZWN0cyB3aGljaCBzdGF0ZSBwcm9wZXJ0aWVzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuQmVlclR5cGVTdGF0ZS5hY3Rpb25DcmVhdG9ycyAvLyBTZWxlY3RzIHdoaWNoIGFjdGlvbiBjcmVhdG9ycyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbikoRmV0Y2hCZWVyVHlwZSkgYXMgdHlwZW9mIEZldGNoQmVlclR5cGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0ZldGNoQmVlclR5cGUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJvdXRlQ29tcG9uZW50UHJvcHM8e30+LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgxPkhlbGxvLCB3b3JsZCE8L2gxPlxyXG4gICAgICAgICAgICA8cD5XZWxjb21lIHRvIHlvdXIgbmV3IHNpbmdsZS1wYWdlIGFwcGxpY2F0aW9uLCBidWlsdCB3aXRoOjwvcD5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vZ2V0LmFzcC5uZXQvJz5BU1AuTkVUIENvcmU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5LzY3ZWY4c2JkLmFzcHgnPkMjPC9hPiBmb3IgY3Jvc3MtcGxhdGZvcm0gc2VydmVyLXNpZGUgY29kZTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvJz5SZWFjdDwvYT4sIDxhIGhyZWY9J2h0dHA6Ly9yZWR1eC5qcy5vcmcnPlJlZHV4PC9hPiwgYW5kIDxhIGhyZWY9J2h0dHA6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnLyc+VHlwZVNjcmlwdDwvYT4gZm9yIGNsaWVudC1zaWRlIGNvZGU8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9J2h0dHBzOi8vd2VicGFjay5naXRodWIuaW8vJz5XZWJwYWNrPC9hPiBmb3IgYnVpbGRpbmcgYW5kIGJ1bmRsaW5nIGNsaWVudC1zaWRlIHJlc291cmNlczwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+PGEgaHJlZj0naHR0cDovL2dldGJvb3RzdHJhcC5jb20vJz5Cb290c3RyYXA8L2E+IGZvciBsYXlvdXQgYW5kIHN0eWxpbmc8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8cD5UbyBoZWxwIHlvdSBnZXQgc3RhcnRlZCwgd2UndmUgYWxzbyBzZXQgdXA6PC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+PHN0cm9uZz5DbGllbnQtc2lkZSBuYXZpZ2F0aW9uPC9zdHJvbmc+LiBGb3IgZXhhbXBsZSwgY2xpY2sgPGVtPkNvdW50ZXI8L2VtPiB0aGVuIDxlbT5CYWNrPC9lbT4gdG8gcmV0dXJuIGhlcmUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPldlYnBhY2sgZGV2IG1pZGRsZXdhcmU8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHRoZXJlJ3Mgbm8gbmVlZCB0byBydW4gdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wuIFlvdXIgY2xpZW50LXNpZGUgcmVzb3VyY2VzIGFyZSBkeW5hbWljYWxseSBidWlsdCBvbiBkZW1hbmQuIFVwZGF0ZXMgYXJlIGF2YWlsYWJsZSBhcyBzb29uIGFzIHlvdSBtb2RpZnkgYW55IGZpbGUuPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT48c3Ryb25nPkhvdCBtb2R1bGUgcmVwbGFjZW1lbnQ8L3N0cm9uZz4uIEluIGRldmVsb3BtZW50IG1vZGUsIHlvdSBkb24ndCBldmVuIG5lZWQgdG8gcmVsb2FkIHRoZSBwYWdlIGFmdGVyIG1ha2luZyBtb3N0IGNoYW5nZXMuIFdpdGhpbiBzZWNvbmRzIG9mIHNhdmluZyBjaGFuZ2VzIHRvIGZpbGVzLCByZWJ1aWx0IFJlYWN0IGNvbXBvbmVudHMgd2lsbCBiZSBpbmplY3RlZCBkaXJlY3RseSBpbnRvIHlvdXIgcnVubmluZyBhcHBsaWNhdGlvbiwgcHJlc2VydmluZyBpdHMgbGl2ZSBzdGF0ZS48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+RWZmaWNpZW50IHByb2R1Y3Rpb24gYnVpbGRzPC9zdHJvbmc+LiBJbiBwcm9kdWN0aW9uIG1vZGUsIGRldmVsb3BtZW50LXRpbWUgZmVhdHVyZXMgYXJlIGRpc2FibGVkLCBhbmQgdGhlIDxjb2RlPndlYnBhY2s8L2NvZGU+IGJ1aWxkIHRvb2wgcHJvZHVjZXMgbWluaWZpZWQgc3RhdGljIENTUyBhbmQgSmF2YVNjcmlwdCBmaWxlcy48L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPjxzdHJvbmc+U2VydmVyLXNpZGUgcHJlcmVuZGVyaW5nPC9zdHJvbmc+LiBUbyBvcHRpbWl6ZSBzdGFydHVwIHRpbWUsIHlvdXIgUmVhY3QgYXBwbGljYXRpb24gaXMgZmlyc3QgcmVuZGVyZWQgb24gdGhlIHNlcnZlci4gVGhlIGluaXRpYWwgSFRNTCBhbmQgc3RhdGUgaXMgdGhlbiB0cmFuc2ZlcnJlZCB0byB0aGUgYnJvd3Nlciwgd2hlcmUgY2xpZW50LXNpZGUgY29kZSBwaWNrcyB1cCB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmLjwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0hvbWUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBOYXZNZW51IH0gZnJvbSAnLi9OYXZNZW51JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyLWZsdWlkJz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTMnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxOYXZNZW51IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tOSc+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTmF2TGluaywgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdk1lbnUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbWFpbi1uYXYnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmJhciBuYXZiYXItaW52ZXJzZSc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2YmFyLWhlYWRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzTmFtZT0nbmF2YmFyLXRvZ2dsZScgZGF0YS10b2dnbGU9J2NvbGxhcHNlJyBkYXRhLXRhcmdldD0nLm5hdmJhci1jb2xsYXBzZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc3Itb25seSc+VG9nZ2xlIG5hdmlnYXRpb248L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naWNvbi1iYXInPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdpY29uLWJhcic+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2ljb24tYmFyJz48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmsgY2xhc3NOYW1lPSduYXZiYXItYnJhbmQnIHRvPXsgJy8nIH0+UmVhY3RBdXRoPC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2xlYXJmaXgnPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmJhci1jb2xsYXBzZSBjb2xsYXBzZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nbmF2IG5hdmJhci1uYXYnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBleGFjdCB0bz17ICcvJyB9IGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24taG9tZSc+PC9zcGFuPiBIb21lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIHRvPXsgJy9jb3VudGVyJyB9IGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tZWR1Y2F0aW9uJz48L3NwYW4+IENvdW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgdG89eyAnL2JlZXJzJyB9IGFjdGl2ZUNsYXNzTmFtZT0nYWN0aXZlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2dseXBoaWNvbiBnbHlwaGljb24tdGgtbGlzdCc+PC9zcGFuPiBGZXRjaCBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hdkxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTmF2TWVudS50c3giLCJpbXBvcnQgKiBhcyBCZWVyVHlwZXMgZnJvbSAnLi9CZWVyVHlwZXMnO1xyXG5pbXBvcnQgKiBhcyBDb3VudGVyIGZyb20gJy4vQ291bnRlcic7XHJcblxyXG4vLyBUaGUgdG9wLWxldmVsIHN0YXRlIG9iamVjdFxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uU3RhdGUge1xyXG4gICAgY291bnRlcjogQ291bnRlci5Db3VudGVyU3RhdGU7XHJcbiAgICBiZWVyc0J5UG9sU3RhdGU6IEJlZXJUeXBlcy5CZWVyc0dyb3VwZWRCeVBvbFN0YXRlO1xyXG59XHJcblxyXG4vLyBXaGVuZXZlciBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCwgUmVkdXggd2lsbCB1cGRhdGUgZWFjaCB0b3AtbGV2ZWwgYXBwbGljYXRpb24gc3RhdGUgcHJvcGVydHkgdXNpbmdcclxuLy8gdGhlIHJlZHVjZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZS4gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgbmFtZXMgbWF0Y2ggZXhhY3RseSwgYW5kIHRoYXQgdGhlIHJlZHVjZXJcclxuLy8gYWN0cyBvbiB0aGUgY29ycmVzcG9uZGluZyBBcHBsaWNhdGlvblN0YXRlIHByb3BlcnR5IHR5cGUuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VycyA9IHtcclxuICAgIGNvdW50ZXI6IENvdW50ZXIucmVkdWNlcixcclxuICAgIGJlZXJzQnlQb2xTdGF0ZTogQmVlclR5cGVzLnJlZHVjZXJcclxufTtcclxuXHJcbi8vIFRoaXMgdHlwZSBjYW4gYmUgdXNlZCBhcyBhIGhpbnQgb24gYWN0aW9uIGNyZWF0b3JzIHNvIHRoYXQgaXRzICdkaXNwYXRjaCcgYW5kICdnZXRTdGF0ZScgcGFyYW1zIGFyZVxyXG4vLyBjb3JyZWN0bHkgdHlwZWQgdG8gbWF0Y2ggeW91ciBzdG9yZS5cclxuZXhwb3J0IGludGVyZmFjZSBBcHBUaHVua0FjdGlvbjxUQWN0aW9uPiB7XHJcbiAgICAoZGlzcGF0Y2g6IChhY3Rpb246IFRBY3Rpb24pID0+IHZvaWQsIGdldFN0YXRlOiAoKSA9PiBBcHBsaWNhdGlvblN0YXRlKTogdm9pZDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0Nyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDczKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==