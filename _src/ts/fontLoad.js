var FontFaceObserver = require('fontfaceobserver');
export var onFontLoad = function (fontName, onLoad, onError) { return new FontFaceObserver(fontName).load().then(onLoad).catch(onError); };
