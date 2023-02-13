# rendall.dev

Website for [rendall.dev](https://rendall.dev)

[![CC BY-NC-ND 4.0](https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

## Magic instructions

- Create a blog post by adding a file to `_src/blog/posts`
- Re-build the site to incorporate any change using the command `yarn run build`

## Site structure

- `./dist` is the pubish directory of <https://www.rendall.dev>
- `./dist/blog/` is the _root_ directory of the _blog_ <https://blog.rendall.dev>
  -  redirects to <https://www.rendall.dev/blog> redirects to <https://blog.rendall.dev>
- `_src/` holds the source for <https://rendall.dev>
- `_src/blog/` holds the source for <https://blog.rendall.dev>
  - Each site has a separate build process.

## Build

`yarn run build`

## 11ty static site generator

This site is built using [11ty](https://11ty.io). The build process is [non-default](https://github.com/11ty/eleventy/issues/342#issuecomment-448224762) There are two eleventy builds, one for the <https://rendall.dev> site and the other for the <https://blog.rendall.dev> blog.

## Local development

The command `yarn run start` will create a server at http://localhost:8080 for local development. This command runs two servers concurrently, one for the blog and the other for the homepage. Put 

## Todo

- More pleasing visual design
- Add 'Next' and 'Previous' links in blog posts
- Add serviceworker, especially to cache Montserrat webfont
- E2E testing
