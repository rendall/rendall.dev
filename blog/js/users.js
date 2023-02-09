/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = "./js/users.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./js/users.js":
      /*!*********************!*\
  !*** ./js/users.js ***!
  \*********************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var gotrue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! gotrue-js */ "./node_modules/gotrue-js/lib/index.js"
        );
        /* harmony import */ var gotrue_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
          gotrue_js__WEBPACK_IMPORTED_MODULE_0__
        );

        const USER_API_URL = "https://www.rendall.tv/.netlify/identity";
        const auth = new gotrue_js__WEBPACK_IMPORTED_MODULE_0___default.a({
          APIUrl: USER_API_URL,
          audience: "",
          setCookie: false,
        });
        const displayError = (errorMessage) => {
          const messageDisplay = document.getElementById("message-display");
          const errMessage = errorMessage.startsWith("invalid_grant:")
            ? errorMessage.slice(14)
            : errorMessage;
          messageDisplay.innerText = errMessage;
          messageDisplay.classList.add("error");
        };
        const displayMessage = (message) => {
          const messageDisplay = document.getElementById("message-display");
          messageDisplay.innerText = message;
          messageDisplay.classList.remove("error");
        };
        const onSignup = () => {
          updateUI();
        };
        const onSignupError = (error) => displayError(error.message);
        const onLogin = () => {
          updateUI();
        }; // return user object
        const onLoginError = (error) => displayError(error.message);
        const onLogoutError = (error) => displayError(error.message);
        const onLogout = (e) =>
          auth
            .currentUser()
            .logout()
            .then(() => updateUI())
            .catch((error) => onLogoutError(error));
        const onSubmit = (e) => {
          e.preventDefault();
          const password = document.getElementById("password").value;
          const email = document.getElementById("email").value;
          const isSignup = document.getElementById("isSignup").checked;
          const full_name = document.getElementById("name").value;
          const login = () =>
            auth.login(email, password, true).then(onLogin).catch(onLoginError);
          const signup = () =>
            auth
              .signup(email, password, { full_name })
              .then(onSignup)
              .then(login)
              .catch(onSignupError);
          if (isSignup) signup();
          else login();
        };
        const onRecovery = () => {
          const email = document.getElementById("email").value;
          if (email === "") displayError("Please enter an email to recover");
          else {
            auth
              .requestPasswordRecovery(email)
              .then(() => displayMessage("Recovery email sent"))
              .catch((error) => displayError(error.message));
          }
        };
        const updateUI = () => {
          const loginForm = document.getElementById("login-form");
          const recoveryButton = document.getElementById("recovery-btn");
          const logoutButton = document.getElementById("logout-btn");
          document.getElementById("message-display").innerText = "";
          document.getElementById("message-display").classList.remove("error");
          if (auth.currentUser() === null) {
            loginForm.classList.remove("is-hidden");
            logoutButton.classList.add("is-hidden");
            const checkbox = document.getElementById("isSignup");
            const buttonText = checkbox.checked ? "Sign up" : "Log in";
            document.getElementById("submit-btn").innerText = buttonText;
            if (checkbox.checked) {
              document.querySelector("input#name").removeAttribute("disabled");
            } else {
              document
                .querySelector("input#name")
                .setAttribute("disabled", "disabled");
            }
          } else {
            loginForm.classList.add("is-hidden");
            logoutButton.classList.remove("is-hidden");
          }
        };
        document
          .getElementById("submit-btn")
          .addEventListener("click", onSubmit);
        document
          .getElementById("logout-btn")
          .addEventListener("click", onLogout);
        document
          .getElementById("recovery-btn")
          .addEventListener("click", onRecovery);
        document
          .getElementById("isSignup")
          .addEventListener("change", updateUI);
        updateUI();

        /***/
      },

    /***/ "./node_modules/gotrue-js/lib/admin.js":
      /*!*********************************************!*\
  !*** ./node_modules/gotrue-js/lib/admin.js ***!
  \*********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });

        var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Admin = (function () {
          function Admin(user) {
            _classCallCheck(this, Admin);

            this.user = user;
          }

          // Return a list of all users in an audience

          _createClass(Admin, [
            {
              key: "listUsers",
              value: function listUsers(aud) {
                return this.user._request("/admin/users", {
                  method: "GET",
                  audience: aud,
                });
              },
            },
            {
              key: "getUser",
              value: function getUser(user) {
                return this.user._request("/admin/users/" + user.id);
              },
            },
            {
              key: "updateUser",
              value: function updateUser(user) {
                var attributes =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};

                return this.user._request("/admin/users/" + user.id, {
                  method: "PUT",
                  body: JSON.stringify(attributes),
                });
              },
            },
            {
              key: "createUser",
              value: function createUser(email, password) {
                var attributes =
                  arguments.length > 2 && arguments[2] !== undefined
                    ? arguments[2]
                    : {};

                attributes.email = email;
                attributes.password = password;
                return this.user._request("/admin/users", {
                  method: "POST",
                  body: JSON.stringify(attributes),
                });
              },
            },
            {
              key: "deleteUser",
              value: function deleteUser(user) {
                return this.user._request("/admin/users/" + user.id, {
                  method: "DELETE",
                });
              },
            },
          ]);

          return Admin;
        })();

        exports.default = Admin;

        /***/
      },

    /***/ "./node_modules/gotrue-js/lib/index.js":
      /*!*********************************************!*\
  !*** ./node_modules/gotrue-js/lib/index.js ***!
  \*********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });

        var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        var _microApiClient = __webpack_require__(
          /*! micro-api-client */ "./node_modules/micro-api-client/lib/index.js"
        );

        var _microApiClient2 = _interopRequireDefault(_microApiClient);

        var _user = __webpack_require__(
          /*! ./user */ "./node_modules/gotrue-js/lib/user.js"
        );

        var _user2 = _interopRequireDefault(_user);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var HTTPRegexp = /^http:\/\//;
        var defaultApiURL = "/.netlify/identity";

        var GoTrue = (function () {
          function GoTrue() {
            var _ref =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : {},
              _ref$APIUrl = _ref.APIUrl,
              APIUrl = _ref$APIUrl === undefined ? defaultApiURL : _ref$APIUrl,
              _ref$audience = _ref.audience,
              audience = _ref$audience === undefined ? "" : _ref$audience,
              _ref$setCookie = _ref.setCookie,
              setCookie = _ref$setCookie === undefined ? false : _ref$setCookie;

            _classCallCheck(this, GoTrue);

            if (APIUrl.match(HTTPRegexp)) {
              console.warn(
                "Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely."
              );
            }

            if (audience) {
              this.audience = audience;
            }

            this.setCookie = setCookie;

            this.api = new _microApiClient2.default(APIUrl);
          }

          _createClass(GoTrue, [
            {
              key: "_request",
              value: function _request(path) {
                var options =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};

                options.headers = options.headers || {};
                var aud = options.audience || this.audience;
                if (aud) {
                  options.headers["X-JWT-AUD"] = aud;
                }
                return this.api.request(path, options).catch(function (err) {
                  if (
                    err instanceof _microApiClient.JSONHTTPError &&
                    err.json
                  ) {
                    if (err.json.msg) {
                      err.message = err.json.msg;
                    } else if (err.json.error) {
                      err.message =
                        err.json.error + ": " + err.json.error_description;
                    }
                  }
                  return Promise.reject(err);
                });
              },
            },
            {
              key: "settings",
              value: function settings() {
                return this._request("/settings");
              },
            },
            {
              key: "signup",
              value: function signup(email, password, data) {
                return this._request("/signup", {
                  method: "POST",
                  body: JSON.stringify({
                    email: email,
                    password: password,
                    data: data,
                  }),
                });
              },
            },
            {
              key: "login",
              value: function login(email, password, remember) {
                var _this = this;

                this._setRememberHeaders(remember);
                return this._request("/token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body:
                    "grant_type=password&username=" +
                    encodeURIComponent(email) +
                    "&password=" +
                    encodeURIComponent(password),
                }).then(function (response) {
                  _user2.default.removeSavedSession();
                  return _this.createUser(response, remember);
                });
              },
            },
            {
              key: "loginExternalUrl",
              value: function loginExternalUrl(provider) {
                return this.api.apiURL + "/authorize?provider=" + provider;
              },
            },
            {
              key: "confirm",
              value: function confirm(token, remember) {
                this._setRememberHeaders(remember);
                return this.verify("signup", token, remember);
              },
            },
            {
              key: "requestPasswordRecovery",
              value: function requestPasswordRecovery(email) {
                return this._request("/recover", {
                  method: "POST",
                  body: JSON.stringify({ email: email }),
                });
              },
            },
            {
              key: "recover",
              value: function recover(token, remember) {
                this._setRememberHeaders(remember);
                return this.verify("recovery", token, remember);
              },
            },
            {
              key: "acceptInvite",
              value: function acceptInvite(token, password, remember) {
                var _this2 = this;

                this._setRememberHeaders(remember);
                return this._request("/verify", {
                  method: "POST",
                  body: JSON.stringify({
                    token: token,
                    password: password,
                    type: "signup",
                  }),
                }).then(function (response) {
                  return _this2.createUser(response, remember);
                });
              },
            },
            {
              key: "acceptInviteExternalUrl",
              value: function acceptInviteExternalUrl(provider, token) {
                return (
                  this.api.apiURL +
                  "/authorize?provider=" +
                  provider +
                  "&invite_token=" +
                  token
                );
              },
            },
            {
              key: "createUser",
              value: function createUser(tokenResponse) {
                var remember =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : false;

                this._setRememberHeaders(remember);
                var user = new _user2.default(
                  this.api,
                  tokenResponse,
                  this.audience
                );
                return user.getUserData().then(function (user) {
                  if (remember) {
                    user._saveSession();
                  }
                  return user;
                });
              },
            },
            {
              key: "currentUser",
              value: function currentUser() {
                var user = _user2.default.recoverSession(this.api);
                user && this._setRememberHeaders(user._fromStorage);
                return user;
              },
            },
            {
              key: "verify",
              value: function verify(type, token, remember) {
                var _this3 = this;

                this._setRememberHeaders(remember);
                return this._request("/verify", {
                  method: "POST",
                  body: JSON.stringify({ token: token, type: type }),
                }).then(function (response) {
                  return _this3.createUser(response, remember);
                });
              },
            },
            {
              key: "_setRememberHeaders",
              value: function _setRememberHeaders(remember) {
                if (this.setCookie) {
                  this.api.defaultHeaders = this.api.defaultHeaders || {};
                  this.api.defaultHeaders["X-Use-Cookie"] = remember
                    ? "1"
                    : "session";
                }
              },
            },
          ]);

          return GoTrue;
        })();

        exports.default = GoTrue;

        if (typeof window !== "undefined") {
          window.GoTrue = GoTrue;
        }

        /***/
      },

    /***/ "./node_modules/gotrue-js/lib/user.js":
      /*!********************************************!*\
  !*** ./node_modules/gotrue-js/lib/user.js ***!
  \********************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });

        var _extends =
          Object.assign ||
          function (target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };

        var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        var _microApiClient = __webpack_require__(
          /*! micro-api-client */ "./node_modules/micro-api-client/lib/index.js"
        );

        var _microApiClient2 = _interopRequireDefault(_microApiClient);

        var _admin = __webpack_require__(
          /*! ./admin */ "./node_modules/gotrue-js/lib/admin.js"
        );

        var _admin2 = _interopRequireDefault(_admin);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var ExpiryMargin = 60 * 1000;
        var storageKey = "gotrue.user";
        var refreshPromises = {};
        var currentUser = null;
        var forbiddenUpdateAttributes = {
          api: 1,
          token: 1,
          audience: 1,
          url: 1,
        };
        var forbiddenSaveAttributes = { api: 1 };

        var User = (function () {
          function User(api, tokenResponse, audience) {
            _classCallCheck(this, User);

            this.api = api;
            this.url = api.apiURL;
            this.audience = audience;
            this._processTokenResponse(tokenResponse);
            currentUser = this;
          }

          _createClass(
            User,
            [
              {
                key: "update",
                value: function update(attributes) {
                  var _this = this;

                  return this._request("/user", {
                    method: "PUT",
                    body: JSON.stringify(attributes),
                  }).then(function (response) {
                    return _this._saveUserData(response)._refreshSavedSession();
                  });
                },
              },
              {
                key: "jwt",
                value: function jwt(forceRefresh) {
                  var _tokenDetails = this.tokenDetails(),
                    expires_at = _tokenDetails.expires_at,
                    refresh_token = _tokenDetails.refresh_token,
                    access_token = _tokenDetails.access_token;

                  if (forceRefresh || expires_at - ExpiryMargin < Date.now()) {
                    return this._refreshToken(refresh_token);
                  }
                  return Promise.resolve(access_token);
                },
              },
              {
                key: "logout",
                value: function logout() {
                  return this._request("/logout", { method: "POST" })
                    .then(this.clearSession.bind(this))
                    .catch(this.clearSession.bind(this));
                },
              },
              {
                key: "_refreshToken",
                value: function _refreshToken(refresh_token) {
                  var _this2 = this;

                  if (refreshPromises[refresh_token]) {
                    return refreshPromises[refresh_token];
                  }
                  return (refreshPromises[refresh_token] = this.api
                    .request("/token", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body:
                        "grant_type=refresh_token&refresh_token=" +
                        refresh_token,
                    })
                    .then(function (response) {
                      delete refreshPromises[refresh_token];
                      _this2._processTokenResponse(response);
                      _this2._refreshSavedSession();
                      return _this2.token.access_token;
                    })
                    .catch(function (error) {
                      delete refreshPromises[refresh_token];
                      _this2.clearSession();
                      return Promise.reject(error);
                    }));
                },
              },
              {
                key: "_request",
                value: function _request(path) {
                  var _this3 = this;

                  var options =
                    arguments.length > 1 && arguments[1] !== undefined
                      ? arguments[1]
                      : {};

                  options.headers = options.headers || {};

                  var aud = options.audience || this.audience;
                  if (aud) {
                    options.headers["X-JWT-AUD"] = aud;
                  }

                  return this.jwt().then(function (token) {
                    return _this3.api
                      .request(
                        path,
                        _extends(
                          {
                            headers: Object.assign(options.headers, {
                              Authorization: "Bearer " + token,
                            }),
                          },
                          options
                        )
                      )
                      .catch(function (err) {
                        if (
                          err instanceof _microApiClient.JSONHTTPError &&
                          err.json
                        ) {
                          if (err.json.msg) {
                            err.message = err.json.msg;
                          } else if (err.json.error) {
                            err.message =
                              err.json.error +
                              ": " +
                              err.json.error_description;
                          }
                        }
                        return Promise.reject(err);
                      });
                  });
                },
              },
              {
                key: "getUserData",
                value: function getUserData() {
                  return this._request("/user")
                    .then(this._saveUserData.bind(this))
                    .then(this._refreshSavedSession.bind(this));
                },
              },
              {
                key: "_saveUserData",
                value: function _saveUserData(attributes, fromStorage) {
                  for (var key in attributes) {
                    if (
                      key in User.prototype ||
                      key in forbiddenUpdateAttributes
                    ) {
                      continue;
                    }
                    this[key] = attributes[key];
                  }
                  if (fromStorage) {
                    this._fromStorage = true;
                  }
                  return this;
                },
              },
              {
                key: "_processTokenResponse",
                value: function _processTokenResponse(tokenResponse) {
                  this.token = tokenResponse;
                  var claims = void 0;
                  try {
                    claims = JSON.parse(
                      urlBase64Decode(tokenResponse.access_token.split(".")[1])
                    );
                    this.token.expires_at = claims.exp * 1000;
                  } catch (e) {
                    console.error(
                      new Error(
                        "Gotrue-js: Failed to parse tokenResponse claims: " +
                          JSON.stringify(tokenResponse)
                      )
                    );
                  }
                },
              },
              {
                key: "_refreshSavedSession",
                value: function _refreshSavedSession() {
                  // only update saved session if we previously saved something
                  if (localStorage.getItem(storageKey)) {
                    this._saveSession();
                  }
                  return this;
                },
              },
              {
                key: "_saveSession",
                value: function _saveSession() {
                  localStorage.setItem(
                    storageKey,
                    JSON.stringify(this._details)
                  );
                  return this;
                },
              },
              {
                key: "tokenDetails",
                value: function tokenDetails() {
                  return this.token;
                },
              },
              {
                key: "clearSession",
                value: function clearSession() {
                  User.removeSavedSession();
                  this.token = null;
                  currentUser = null;
                },
              },
              {
                key: "admin",
                get: function get() {
                  return new _admin2.default(this);
                },
              },
              {
                key: "_details",
                get: function get() {
                  var userCopy = {};
                  for (var key in this) {
                    if (
                      key in User.prototype ||
                      key in forbiddenSaveAttributes
                    ) {
                      continue;
                    }
                    userCopy[key] = this[key];
                  }
                  return userCopy;
                },
              },
            ],
            [
              {
                key: "removeSavedSession",
                value: function removeSavedSession() {
                  localStorage.removeItem(storageKey);
                },
              },
              {
                key: "recoverSession",
                value: function recoverSession(apiInstance) {
                  if (currentUser) {
                    return currentUser;
                  }

                  var json = localStorage.getItem(storageKey);
                  if (json) {
                    try {
                      var data = JSON.parse(json);
                      var url = data.url,
                        token = data.token,
                        audience = data.audience;

                      if (!url || !token) {
                        return null;
                      }

                      var api =
                        apiInstance || new _microApiClient2.default(url, {});
                      return new User(api, token, audience)._saveUserData(
                        data,
                        true
                      );
                    } catch (ex) {
                      console.error(
                        new Error("Gotrue-js: Error recovering session: " + ex)
                      );
                      return null;
                    }
                  }

                  return null;
                },
              },
            ]
          );

          return User;
        })();

        exports.default = User;

        function urlBase64Decode(str) {
          // From https://jwt.io/js/jwt.js
          var output = str.replace(/-/g, "+").replace(/_/g, "/");
          switch (output.length % 4) {
            case 0:
              break;
            case 2:
              output += "==";
              break;
            case 3:
              output += "=";
              break;
            default:
              throw "Illegal base64url string!";
          }
          var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
          try {
            return decodeURIComponent(escape(result));
          } catch (err) {
            return result;
          }
        }

        /***/
      },

    /***/ "./node_modules/micro-api-client/lib/index.js":
      /*!****************************************************!*\
  !*** ./node_modules/micro-api-client/lib/index.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.JSONHTTPError = exports.TextHTTPError = exports.HTTPError = exports.getPagination = undefined;

        var _extends =
          Object.assign ||
          function (target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };

        var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        var _pagination = __webpack_require__(
          /*! ./pagination */ "./node_modules/micro-api-client/lib/pagination.js"
        );

        Object.defineProperty(exports, "getPagination", {
          enumerable: true,
          get: function get() {
            return _pagination.getPagination;
          },
        });

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          }
          return call &&
            (typeof call === "object" || typeof call === "function")
            ? call
            : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof superClass
            );
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true,
              },
            }
          );
          if (superClass)
            Object.setPrototypeOf
              ? Object.setPrototypeOf(subClass, superClass)
              : (subClass.__proto__ = superClass);
        }

        function _extendableBuiltin(cls) {
          function ExtendableBuiltin() {
            var instance = Reflect.construct(cls, Array.from(arguments));
            Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
            return instance;
          }

          ExtendableBuiltin.prototype = Object.create(cls.prototype, {
            constructor: {
              value: cls,
              enumerable: false,
              writable: true,
              configurable: true,
            },
          });

          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(ExtendableBuiltin, cls);
          } else {
            ExtendableBuiltin.__proto__ = cls;
          }

          return ExtendableBuiltin;
        }

        var HTTPError = (exports.HTTPError = (function (_extendableBuiltin2) {
          _inherits(HTTPError, _extendableBuiltin2);

          function HTTPError(response) {
            _classCallCheck(this, HTTPError);

            var _this = _possibleConstructorReturn(
              this,
              (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(
                this,
                response.statusText
              )
            );

            _this.name = _this.constructor.name;
            if (typeof Error.captureStackTrace === "function") {
              Error.captureStackTrace(_this, _this.constructor);
            } else {
              _this.stack = new Error(response.statusText).stack;
            }
            _this.status = response.status;
            return _this;
          }

          return HTTPError;
        })(_extendableBuiltin(Error)));

        var TextHTTPError = (exports.TextHTTPError = (function (_HTTPError) {
          _inherits(TextHTTPError, _HTTPError);

          function TextHTTPError(response, data) {
            _classCallCheck(this, TextHTTPError);

            var _this2 = _possibleConstructorReturn(
              this,
              (
                TextHTTPError.__proto__ || Object.getPrototypeOf(TextHTTPError)
              ).call(this, response)
            );

            _this2.data = data;
            return _this2;
          }

          return TextHTTPError;
        })(HTTPError));

        var JSONHTTPError = (exports.JSONHTTPError = (function (_HTTPError2) {
          _inherits(JSONHTTPError, _HTTPError2);

          function JSONHTTPError(response, json) {
            _classCallCheck(this, JSONHTTPError);

            var _this3 = _possibleConstructorReturn(
              this,
              (
                JSONHTTPError.__proto__ || Object.getPrototypeOf(JSONHTTPError)
              ).call(this, response)
            );

            _this3.json = json;
            return _this3;
          }

          return JSONHTTPError;
        })(HTTPError));

        var API = (function () {
          function API() {
            var apiURL =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "";
            var options = arguments[1];

            _classCallCheck(this, API);

            this.apiURL = apiURL;
            if (this.apiURL.match(/\/[^\/]?/)) {
              // eslint-disable-line no-useless-escape
              this._sameOrigin = true;
            }
            this.defaultHeaders = (options && options.defaultHeaders) || {};
          }

          _createClass(API, [
            {
              key: "headers",
              value: function headers() {
                var _headers =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : {};

                return _extends(
                  {},
                  this.defaultHeaders,
                  {
                    "Content-Type": "application/json",
                  },
                  _headers
                );
              },
            },
            {
              key: "parseJsonResponse",
              value: function parseJsonResponse(response) {
                return response.json().then(function (json) {
                  if (!response.ok) {
                    return Promise.reject(new JSONHTTPError(response, json));
                  }

                  var pagination = (0, _pagination.getPagination)(response);
                  return pagination
                    ? { pagination: pagination, items: json }
                    : json;
                });
              },
            },
            {
              key: "request",
              value: function request(path) {
                var _this4 = this;

                var options =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};

                var headers = this.headers(options.headers || {});
                if (this._sameOrigin) {
                  options.credentials = options.credentials || "same-origin";
                }
                return fetch(
                  this.apiURL + path,
                  _extends({}, options, { headers: headers })
                ).then(function (response) {
                  var contentType = response.headers.get("Content-Type");
                  if (contentType && contentType.match(/json/)) {
                    return _this4.parseJsonResponse(response);
                  }

                  if (!response.ok) {
                    return response.text().then(function (data) {
                      return Promise.reject(new TextHTTPError(response, data));
                    });
                  }
                  return response.text().then(function (data) {
                    data;
                  });
                });
              },
            },
          ]);

          return API;
        })();

        exports.default = API;

        /***/
      },

    /***/ "./node_modules/micro-api-client/lib/pagination.js":
      /*!*********************************************************!*\
  !*** ./node_modules/micro-api-client/lib/pagination.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });

        var _slicedToArray = (function () {
          function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;
            try {
              for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
              ) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }
          return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance"
              );
            }
          };
        })();

        exports.getPagination = getPagination;
        function getPagination(response) {
          var links = response.headers.get("Link");
          var pagination = {};
          //var link, url, rel, m, page;
          if (links == null) {
            return null;
          }
          links = links.split(",");
          var total = response.headers.get("X-Total-Count");

          for (var i = 0, len = links.length; i < len; i++) {
            var link = links[i].replace(/(^\s*|\s*$)/, "");

            var _link$split = link.split(";"),
              _link$split2 = _slicedToArray(_link$split, 2),
              url = _link$split2[0],
              rel = _link$split2[1];

            var m = url.match(/page=(\d+)/);
            var page = m && parseInt(m[1], 10);
            if (rel.match(/last/)) {
              pagination.last = page;
            } else if (rel.match(/next/)) {
              pagination.next = page;
            } else if (rel.match(/prev/)) {
              pagination.prev = page;
            } else if (rel.match(/first/)) {
              pagination.first = page;
            }
          }

          pagination.last = Math.max(
            pagination.last || 0,
            (pagination.prev && pagination.prev + 1) || 0
          );
          pagination.current = pagination.next
            ? pagination.next - 1
            : pagination.last || 1;
          pagination.total = total ? parseInt(total, 10) : null;

          return pagination;
        }

        /***/
      },

    /******/
  }
);
//# sourceMappingURL=users.js.map
