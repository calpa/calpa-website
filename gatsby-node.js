const path = require('path');
// const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // ...

  // Create blog-list pages
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post) => {
    const { node } = post;
    const obj = {
      fromPath: node.frontmatter.slug,
      toPath: `/blog${node.frontmatter.slug[0] === '/' ? node.frontmatter.slug : `/${node.frontmatter.slug}`}`,
      isPermanent: true,
    };

    createRedirect(obj);
  });

  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: `/blog/${i + 1}`,
      component: path.resolve('./src/templates/blog-list-template.js'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === 'MarkdownRemark') {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: 'slug',
//       node,
//       value,
//     });
//   }
// };
