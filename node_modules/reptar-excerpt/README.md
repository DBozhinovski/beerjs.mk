# reptar-excerpt

A Reptar plugin for creating a post excerpt.

### Installation

Add to your array of `middlewares`:

```
const reptarExcerpt = require('reptar-excerpt');

module.exports = {
  middlewares: [
    reptarExcerpt({
      // This option lets you either use html enhanced excerpts
      // (meaning links, boldness, italicization, and so on will be there) by
      // setting the value to `false`. You can use plain text in your excerpt
      // by changing the value to `true`.
      textOnly: false,

      // This option can limit your excerpt length to your specified amount
      // of characters. Use the value `false` to disable it or a number value
      // such as `250` to set a max limit.
      charLimit: false,
    })
  ],
};
```
