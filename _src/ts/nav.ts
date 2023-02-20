// Add 'active' class to the correct anchor when #hash is in the url
const updateActive = () => {
  const anchors = document.querySelectorAll(".Site__Side a")
  anchors.forEach((a) => a.classList.remove("active"))
  anchors.forEach((a) => {
    if (a.getAttribute("href") === window.location.hash)
      a.classList.add("active")
  })
}

// Add 'active' class to the anchor when clicked
// (otherwise there is a slight delay before it changes)
document.querySelectorAll(".Site__Side a").forEach((a, _i, all) => {
  const addActive = (a: Element, all: NodeListOf<Element>) => () =>
    all.forEach((b) =>
      a === b ? a.classList.add("active") : b.classList.remove("active")
    )
  a.addEventListener("click", addActive(a, all))
})

window.addEventListener("hashchange", updateActive)

updateActive()
