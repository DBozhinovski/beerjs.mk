module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'BeerJS MK', // Navigation and Site Title
  siteTitleAlt: 'BeerJS MK - A place for beer and JavaScript enthusiasts', // Alternative Site title for SEO
  siteUrl: 'https://beerjs.mk', // Domain of your site. No trailing slash!
  siteLanguage: 'mk', // Language Tag on <html> element
  siteBanner: '/social/beerjs.svg', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'BeerJS MK - A place for beer and JavaScript enthusiastsy', // Your site description
  author: 'BeerJS', // Author for schemaORGJSONLD
  siteLogo: '/social/beerjs.svg', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@BeerjsSk', // Twitter Username - Optional
  ogSiteName: 'BeerJS Skopje', // Facebook Site Name - Optional
  ogLanguage: 'mk', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#f8dc3d',
  backgroundColor: '#2b2e3c',

  // Settings for typography.js
  headerFontFamily: 'Noto Serif',
  // bodyFontFamily: 'Noto Serif',
  bodyFontFamily: 'Inter UI',
  baseFontSize: '18px',
};
