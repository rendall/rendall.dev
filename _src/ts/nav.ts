// Add 'active' class to the correct anchor when #hash is in the url
window.addEventListener("hashchange", () => {
  const anchors = document.querySelectorAll(".Site__Side a")
  const hash = window.location.hash
  if (hash && hash.length > 1) {
    anchors.forEach((a) => a.classList.remove("active"))
    anchors.forEach((a) => {
      if (a.getAttribute("href") === hash) a.classList.add("active")
    })
  }
})

// Add 'active' class to the anchor when clicked
// (otherwise there is a slight delay before it changes)
document.querySelectorAll(".Site__Side a").forEach((a, _i, all) => {
  const addActive = (a: Element, all: NodeListOf<Element>) => () =>
    all.forEach((b) =>
      a === b ? a.classList.add("active") : b.classList.remove("active")
    )
  a.addEventListener("click", addActive(a, all))
})
