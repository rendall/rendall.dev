const FontFaceObserver = require('fontfaceobserver');

export const onFontLoad = (fontName:string, onLoad:Function, onError?:Function) => new FontFaceObserver(fontName).load().then(onLoad).catch(onError);



