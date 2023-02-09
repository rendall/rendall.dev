const asciiMap: { [key: string]: string } = {
  Ä: "A",
  Å: "A",
  Ö: "O",
  ä: "a",
  å: "a",
  ö: "o",
}
const stripLeadingDashes = (str: string): string =>
  str.startsWith("-") ? stripLeadingDashes(str.substring(1)) : str
const toAscii = (x: string) => asciiMap[x] || x
/** Convert a string to a url-friendly slug */
const slugify = (title: string): string => {
  const slug = title
    .trim()
    .replace(/[^A-Za-z0-9\[\] ]/g, toAscii)
    .replace(/[^\w\s-]/g, "")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-*/g, "")
    .replace(/-*$/g, "")
    .toLowerCase()
  return slug
}

module.exports = slugify
