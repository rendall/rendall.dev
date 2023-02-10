#!/usr/bin/env node
// build script to remove /blog/js and copy files from /js
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('./js');
const destDir = path.resolve('./blog/js');

// Remove the destination directory
try {
  fs.rmSync(destDir, { recursive: true });
} catch (err) {
  // ignore error if directory doesn't exist
}

// Copy all files from the source directory to the destination directory
fs.mkdirSync(destDir, { recursive: true });
const files = fs.readdirSync(srcDir);
for (const file of files) {
  const srcPath = path.resolve(srcDir, file);
  const destPath = path.resolve(destDir, file);
  fs.copyFileSync(srcPath, destPath);
}
