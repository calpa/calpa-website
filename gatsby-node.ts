import type { GatsbyNode } from 'gatsby';
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { createTagPages } from './createTagPages';
import { createArticlePages } from './createArticlePages';

// Create pages for a blog using data from markdown files
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  await createTagPages({ graphql, actions });
  await createArticlePages({ graphql, actions, reporter });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
  type MarkdownRemark implements Node {
    frontmatter: MarkdownRemarkFrontmatter
    headerImage: File @link(from: "fields.localFile")
  }

  type MarkdownRemarkFrontmatter {
    title: String!
    headerImageUrl: String
  }
`;
  createTypes(typeDefs);
}

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (
    node.internal.type === "MarkdownRemark" &&
    node.frontmatter?.headerImageUrl
  ) {
    const fileNode = await createRemoteFileNode({
      url: node.frontmatter.headerImageUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      getCache,
    })

    // if the file was created, extend the node with "localFile"
    if (fileNode) {
      createNodeField({ node, name: "localFile", value: fileNode.id })
    }
  }
}