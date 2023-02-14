# rendall.dev

Website for [rendall.dev](https://rendall.dev)

[![CC BY-NC-ND 4.0](https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

## Magic instructions

### Blog

- Create a blog post by adding a markdown file to [_src/blog/posts](_src/blog/posts) and pushing it to the `master` branch.

### CV

- [ ] Update `./_src/resume.pug` (source of truth), then:
  - [ ] Update `./static/resume/rendallkoski.pdf`
  - [ ] Update <https://docs.google.com/document/d/1dfiAVUVUVMeFW6hxONcYYUL7-6tcze2rQTAbwT2XUKc/edit?usp=sharing>
  - [ ] Update <https://linkedin.com/in/rendallkoski>

## Site structure

- `./dist` is the pubish directory of <https://www.rendall.dev>
- `./dist/blog/` is the _root_ directory of the _blog_ <https://blog.rendall.dev>
  - Requests to <https://www.rendall.dev/blog> redirect to <https://blog.rendall.dev>
- `_src/` holds the source for <https://rendall.dev>
- `_src/blog/` holds the source for <https://blog.rendall.dev>
  - Each site has a separate build process.
- `./static` and `./static/blog` holds static resources and assets copied to `./dist` during build.

## Build

`yarn run build`

## 11ty static site generator

This site is built using [11ty](https://11ty.io). The build process is [non-default](https://github.com/11ty/eleventy/issues/342#issuecomment-448224762) There are two eleventy builds, one for the <https://rendall.dev> site and the other for the <https://blog.rendall.dev> blog.

## Local development

The command `yarn run start` will create a server at http://localhost:8080 for local development. This command runs two servers concurrently, one for the blog and the other for the homepage. Put:

- Blog posts in `./_src`
- `_/src/resume.pug` is the single source of truth, [propogate changes manually](#cv)

## Deployment

- Commit changes into a git change branch with an arbitrary name
  - `git checkout staging && git pull`
  - `git checkout -b <change branch name>`
- Pull request against the `staging` branch
  - These commands will make your life easier:
  - `git checkout staging && git pull`
  - `git fetch origin master:master`
  - `git rebase --reapply-cherry-picks master`
  - `git push --force`
- When ready _merge_ the PR into the staging branch, preserving history
  - Netlify will automatically deploy from `staging`
  - After deployment, can manually check at <https://staging.rendall.dev>
- Pull request from `staging` against `master`
- When ready _squash_ the PR into `master`, flattening history
  - Netlify will automatically deploy from `master`
  - After deployment, sites are live at <https://www.rendall.dev> and <https://blog.rendall.dev>

## Todo

- More pleasing visual design
- Add 'Next' and 'Previous' links in blog posts
- Add serviceworker, especially to cache Montserrat webfont
- E2E testing
- Automate propogation of CV changes
