const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const img2picture = require("eleventy-plugin-img2picture")

const { DateTime } = require("luxon")

const slugify = require("../ts/slugify")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(img2picture, {
    // Should be same as Eleventy input folder set using `dir.input`.
    eleventyInputDir: ".",

    // Output folder for optimized images.
    imagesOutputDir: "../../dist/blog/images/",

    // URL prefix for images src URLS.
    // It should match with path suffix in `imagesOutputDir`.
    // Eg: imagesOutputDir with `_site/images` likely need urlPath as `/images/`
    urlPath: "/images/",
    hoistImgClass: true,
    pictureClass: "blog-picture",
    removeAttributes: ["width", "height"],
  })
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.enable("code"))

  /**
   * Use this shortcode directly in the .md like this:
   * {% imageCaption "/images/stephen-leonardi-ljNJn0ommQ8-unsplash.jpg", "Human in an alien mask", "Just a human in disguise", "Photo by Stephen Leonardi on Unsplash", "https://unsplash.com/it/@stephenleo1982?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" %}
   * It will output the image, credits and caption bundled together in a <FIGURE> tag
   */
  eleventyConfig.addShortcode(
    "imageCaption",
    (src, alt, caption, credit, href) => {
      const figStartSnippet = `<figure><img src="${src}" alt="${alt}" />`
      const figCaption = caption ? `<figcaption>${caption}</figcaption>` : ""
      const imageCredit =
        credit && href
          ? `<a href="${href}" class="image-credit">${credit}</a>`
          : credit
          ? `<span class="image-credit">${credit}</span>`
          : ""
      return `${figStartSnippet}${figCaption}${imageCredit}</figure>`
    }
  )

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd")
  })

  // This extracts the first paragraph of 'content' and returns it
  eleventyConfig.addFilter("teaser", (content) => {
    if (!content) return

    const paragraphRegex = /^\<p>.*\<\/p\>/m
    const firstParagraph = content.match(paragraphRegex)

    if (firstParagraph === null) return content
    return firstParagraph[0]
  })

  // The normal slug filter does not completely remove url-unsafe characters, so use this:
  eleventyConfig.addFilter("slugify", (input) => slugify(input))

  eleventyConfig.addShortcode("formName", function () {
    const formName = `${this.page.url}`
      .replace(/\//g, "-")
      .replace(/^-/, "")
      .replace(/-$/, "")
    return formName
  })

  eleventyConfig.addFilter("formatText", (text) =>
    text
      .trim()
      .replace(/\n+/g, "\n")
      .split("\n")
      .map((paragraph) => '<p class="comment__text">' + paragraph + "</p>")
      .join("")
  )

  // This is for post urls of the form ./posts/<year>/<month>/<date>
  eleventyConfig.addFilter("year", (date) => new Date(date).getFullYear())
  eleventyConfig.addFilter("month", (date) => new Date(date).getMonth() + 1)
  eleventyConfig.addFilter("day", (date) => new Date(date).getDate())

  eleventyConfig.addFilter("getTime", (dateString) =>
    new Date(dateString).getTime()
  )
  eleventyConfig.addFilter("toLocaleString", (dateString) =>
    new Date(dateString).toLocaleString()
  )

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy.MM.dd")
  })

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("./posts/*").sort((a, b) => a.date - b.date)
  )

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"))

  /* Markdown Plugins */
  let markdownIt = require("markdown-it")
  let markdownItAnchor = require("markdown-it-anchor")
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  }
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    tabIndex: false,
  }

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options).use(markdownItAnchor, opts)
  )

  eleventyConfig.addPassthroughCopy("images")

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "../../dist/blog/",
    },
  }
}
