const cheerio = require('cheerio');

module.exports = function excerptMiddleware(options) {
  options = options || {};

  return (reptar) => {
    for (const fileKey in reptar.destination) {
      const file = reptar.destination[fileKey];
      const renderedFile = reptar.renderer.renderMarkdown(file.data.content);

      const $ = cheerio.load(renderedFile);
      const p = $('p').first().contents();

      // Clean text, or html enhanced text
      file.data.excerpt = options.textOnly ?
        $.text(p).trim() :
        $.html(p).trim();

      // Limits the excerpt length to your specified amount
      if (options.charLimit && file.data.excerpt.length > options.charLimit) {
        const substr = file.data.excerpt.substring(0, options.charLimit - 3);
        file.data.excerpt = `${substr}...`;
      }
    }
  };
}
