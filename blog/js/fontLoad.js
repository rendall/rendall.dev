"use strict";
exports.__esModule = true;
var FontFaceObserver = require('fontfaceobserver');
exports.onFontLoad = function (fontName, onLoad, onError) { return new FontFaceObserver(fontName).load().then(onLoad)["catch"](onError); };
