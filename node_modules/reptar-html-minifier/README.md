# reptar-html-minifier

A Reptar plugin for [html-minifier](https://github.com/kangax/html-minifier).

### Installation

Add to your `reptar.config.js` file.

```
const reptarHtmlMinifier = require('reptar-html-minifier');

module.exports = {
  lifecycle: {
    didBuild: reptarHtmlMinifier,
  },
};
```
