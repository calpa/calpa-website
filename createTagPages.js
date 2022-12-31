const path = require('path');

exports.createTagPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Run the GraphQL query to get all tags
  const result = await graphql(`
    {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  // Get the list of tags
  const tags = result.data.allMarkdownRemark.edges.reduce((acc, { node }) => {
    if (node.frontmatter.tags) {
      return [...acc, ...node.frontmatter.tags];
    }
    return acc;
  }, []);
  // Create a page for each tag
  return await Promise.all(tags.map(async (tag) => {
    return await createPage({
      path: `/tag/${tag}`,
      component: path.resolve('./src/templates/tag-template.js'),
      context: {
        tag,
      },
    })
  }));
};
