const path = require('path');

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/categories/)) {
    page.matchPag = '/categories/*';
    createPage(page);
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/post.js`);
  const categoriesTemplate = path.resolve(`src/templates/categories.js`);

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              category
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const categorySet = new Set();

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    });

    categorySet.add(node.frontmatter.category);
  });

  const categories = Array.from(categorySet);

  categories.forEach(cat => {
    createPage({
      path: `/categories/${cat.toLowerCase()}`,
      component: categoriesTemplate,
      context: {
        category: cat,
      },
    });
  });
};
