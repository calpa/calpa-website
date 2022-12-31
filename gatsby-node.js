const path = require('path');
const { get } = require('lodash');
const { createTagPages } = require('./createTagPages');
const { createArticlePages } = require('./createArticlePages');

// Create pages for a blog using data from markdown files
exports.createPages = async ({ graphql, actions, reporter }) => {
  await createTagPages({ graphql, actions, reporter });
  await createArticlePages({ graphql, actions, reporter });
};
