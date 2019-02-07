const FontFaceObserver = require('fontfaceobserver');
export const onFontLoad = (fontName, onLoad, onError) => new FontFaceObserver(fontName).load().then(onLoad).catch(onError);
