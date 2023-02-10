#!/usr/bin/env node
// build script to remove /blog/img
const fs = require('fs');
const path = require('path');

const imgDir = path.resolve('./blog/img');

// Remove the image directory
try {
  fs.rmSync(imgDir, { recursive: true });
} catch (err) {
  // ignore error if directory doesn't exist
}
