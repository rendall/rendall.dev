"use strict";
var asciiMap = { "Ä": "A", "Å": "A", "Ö": "O", "ä": "a", "å": "a", "ö": "o" };
var stripLeadingDashes = function (str) { return str.startsWith("-") ? stripLeadingDashes(str.substring(1)) : str; };
var toAscii = function (x) { return asciiMap[x] || x; };
var slugify = function (title) {
    var slug = title.trim()
        .replace(/[^A-Za-z0-9\[\] ]/g, toAscii)
        .replace(/[^\w\s-]/g, '')
        .replace(/[_\s]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-*/g, '')
        .replace(/-*$/g, '')
        .toLowerCase();
    return slug;
};
module.exports = slugify;
