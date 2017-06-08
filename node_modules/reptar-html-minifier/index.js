const minify = require('html-minifier').minify;
const path = require('path');
const fs = require('fs');

module.exports = function htmlMinifierMiddleware(reptar) {
  for (const relativePath in reptar.destination) {
    if (path.extname(relativePath) !== '.html') {
      continue;
    }

    const file = reptar.destination[relativePath];

    if (file.filtered) {
      continue;
    }

    const destinationPath = path.join(
      reptar.config.get('path.destination'),
      relativePath
    );

    var fileContent;
    try {
      fileContent = fs.readFileSync(destinationPath, 'utf8');
    } catch (e) {
      console.log(file);
      throw e;
    }

    const newContent = minify(fileContent, {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
    });

    fs.writeFileSync(destinationPath, newContent, 'utf8');
  }
}
