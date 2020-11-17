"use strict";
console.log("simple-comment");

fetch("https://blog-rendall-dev-comments.netlify.app/.netlify/functions/auth")
.then(response => {
  console.log({response})
})
.catch(error => console.error({error}))
