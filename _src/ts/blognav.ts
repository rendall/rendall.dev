// Add 'active' class to the anchor when clicked
// (otherwise there is a slight delay before it changes)
document.querySelectorAll(".Site__Side a").forEach((a, _i, all) => {
  const addActive = (a: Element, all: NodeListOf<Element>) => () =>
    all.forEach((b) =>
      a === b ? a.classList.add("active") : b.classList.remove("active")
    )
  a.addEventListener("click", addActive(a, all))
})
