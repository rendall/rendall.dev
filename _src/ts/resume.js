"use strict";
var onShowPrintClick = function () {
    return document
        .querySelector(".print-instructions")
        .classList.toggle("is-collapsed");
};
document.querySelector(".print-instructions").classList.add("is-collapsed");
document.querySelector(".show-instructions-button").classList.add("is-showing");
document
    .querySelector(".show-instructions-button")
    .addEventListener("click", onShowPrintClick);
