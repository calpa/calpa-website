import type { CreatePagesArgs } from 'gatsby';
import { get } from 'lodash';
import path from "path";


export const createArticlePages = async ({ graphql, actions, reporter }: Pick<CreatePagesArgs, "graphql" | "actions" | "reporter">) => {
  // Destructure the createPage and createRedirect actions from the actions object
  const { createPage, createRedirect } = actions;

  // Run a GraphQL query to retrieve data for all markdown files in the project
  const result = await graphql(`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      limit: 1000,
      filter: {
				fileAbsolutePath: {
					regex: "/content.*/"
        }
      }) {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`);

  // If the query returns any errors, halt the build process and log an error message
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // Get the data for all the markdown files
  const posts = result.data.allMarkdownRemark.edges;

  // Create a redirect for each markdown file
  posts.forEach((post) => {
    const { node } = post;
    const slug = node.frontmatter.slug;
    if (slug === undefined || slug === null) {
      return;
    }

    const obj = {
      fromPath: node.frontmatter.slug,
      // Use the slug from the frontmatter to set the toPath
      toPath: `/blog${get(node, 'frontmatter.slug[0]') === '/' ? node.frontmatter.slug : `/${node.frontmatter.slug}`}`,
      isPermanent: true,
    };
    createRedirect(obj);
  });

  // Set the number of posts per page
  const postsPerPage = 10;
  // Calculate the number of pages based on the number of posts and the posts per page limit
  const numPages = Math.ceil(posts.length / postsPerPage);
  // Create a page for each page of the blog
  Array.from({ length: numPages }).forEach((_, i) => {
    let pathUrl = `/blog/${i + 1}`
    if (i === 0) {
      pathUrl = `/`
    }

    createPage({
      // Use the page number to set the path
      path: pathUrl,
      // Use the blog-list-template component for the page
      component: path.resolve('./src/templates/blog-list-template.js'),
      // Pass the necessary context to the template component
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
}