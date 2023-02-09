const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

const pluginImage = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const string = require("string");
const { DateTime } = require("luxon");

async function imageShortcode(src, alt, sizes) {
  let metadata = await pluginImage(src, {
    widths: [600, 1200],
    formats: ["jpeg"],
  });

  let imageAttributes = {
    alt,
    loading: "lazy",
    decoding: "async",
  };

  return pluginImage.generateHTML(metadata, imageAttributes);
}
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(UpgradeHelper);

  eleventyConfig.amendLibrary("md", mdLib => mdLib.enable("code"));

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  // eleventyConfig.addLiquidShortcode("image", imageShortcode);
  // eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  // This extracts the first paragraph of 'content' and returns it
  eleventyConfig.addFilter("teaser", (content) => {
    if (!content) return;

    const paragraphRegex = /^\<p>.*\<\/p\>/m;
    const firstParagraph = content.match(paragraphRegex);

    if (firstParagraph === null) return content;
    return firstParagraph[0];
  });

  // The normal slug filter does not completely remove url-unsafe characters, so use this:
  eleventyConfig.addFilter("slugify", (input) =>
    string(input).slugify().toString()
  );

  // This is for post urls of the form ./posts/<year>/<month>/<date>
  eleventyConfig.addFilter("year", (date) => new Date(date).getFullYear());
  eleventyConfig.addFilter("month", (date) => new Date(date).getMonth() + 1);
  eleventyConfig.addFilter("day", (date) => new Date(date).getDate());

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy.MM.dd");
  });

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("./posts/*").sort((a, b) => a.date - b.date)
  );

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  //eleventyConfig.addPassthroughCopy("css");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  let opts = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options).use(markdownItAnchor, opts)
  );

  eleventyConfig.addPassthroughCopy("img");

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
      output: "../../blog/",
    },
  };
};
