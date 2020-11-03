const onShowPrintClick = () => document.querySelector(".print-instructions")!.classList.toggle("is-collapsed")
// Default assumption is "no javascript", so if this runs, then go ahead and add javascript bells & whistles
document.querySelector(".print-instructions")!.classList.add("is-collapsed")
document.querySelector(".show-instructions-button")!.classList.add("is-showing")
document.querySelector(".show-instructions-button")!.addEventListener("click", onShowPrintClick)