# rendall.dev

Website for [rendall.dev](https://rendall.dev)

## Magic instructions

- Create a blog post by adding a file to `_src/blog/posts`
- Re-build the site to incorporate any change using the command `yarn run build`

## Site structure

- `./` The project root directory is the publish directory, except
- `./blog/` is the _root_ directory of the _blog_
  - <https://rendall.dev/blog> redirects to <https://blog.rendall.dev>
  - Likewise <https://blog.rendall.dev>`/**/*` is served from `./blog/**/*`
- `_src/` holds the source for <https://rendall.dev>
  - its structure mirrors that of its parent, `./` the publish directory
- `_src/blog/` holds the source for <https://blog.rendall.dev>

## Build

There are two build processes, one for the <https://rendall.dev> and another for <https://blog.rendall.dev>

## 11ty static site generator

This site is built using [11ty](https://11ty.io). The build process is [non-default](https://github.com/11ty/eleventy/issues/342#issuecomment-448224762) There are two eleventy builds, one for the <https://rendall.dev> site and the other for the <https://blog.rendall.dev> blog.

First, for <https://rendall.dev>, rather than the expected, default 11ty configuration of `input=.` and `output=./_site/`, the configuration is instead `input=./_src` and `output=.`, and it is necessary to issue the command from the source subdirectory to output to the parent directory with the command `cd _src && eleventy --input=. --output=../`

Second, for <https://blog.rendall.dev>, the subdirectory `./_src/blog` needs to output to `./blog`, but the URLs need to be prepended with `/` and not `/blog/` (as well as [other blog-specific configurations and plugins](https://github.com/11ty/eleventy-base-blog)). The server serves `/blog/` to <https://blog.rendall.dev>

To handle this, the build will:

- Ignore the `blog/` subdirectory: add the line `blog/` to `./_src/.eleventyignore`
- Keep resources separate: make sure that `blog/` has its own `_includes`, `_data`, `_11ty` directories and so forth
- Use a separate configuration for each build 11ty process: add a `./_src/blog/.eleventy.js` config file with `input: "."`, `pathprefix: "/"`, and `output: "../../blog/"`
- For the site, run the `eleventy` command from the `_src/` subdirectory and output to the parent: the command is `cd _src && eleventy --input=. --output=../`
- For the blog, run `eleventy` from the subdirectory: the command is `cd _src/blog && eleventy`

## Todo

- More pleasing visual design
- Add 'Next' and 'Previous' links in blog posts
- Add serviceworker, especially to cache Montserrat webfont
- Front-end testing probably using [cypress.io](https://www.cypress.io/)
- Use [details](https://github.github.io/details-dialog-element/index.html) for 'Say Hello'
- Use Netlify's CI build
- Add syntax highlighting for code examples in blog
- Add comment ability with id
- Delic.io.us style bookmarks