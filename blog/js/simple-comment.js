"use strict";
console.log("simple-comment");

fetch("https://blog-rendall-dev-comments.netlify.app/.netlify/functions/hello")
.then(response => {
  console.log({response})
})
.catch(error => console.error({error}))
