import React from 'react';
import { graphql } from 'gatsby';
import { Grid, Typography } from '@mui/material';

import loadable from '@loadable/component';

import Layout from '../../components/Layout';

import './blog.css';

const MuiMarkdown = loadable(() => import('mui-markdown'));

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, rawMarkdownBody } = markdownRemark;

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        sx={{
          paddingTop: '20px',
        }}
      >
        <Grid
          container
          item
          xs={10}
          sx={{
            padding: '20px',
            background: 'white',
            img: {
              maxWidth: '100%',
              objectFit: 'scale-down',
            },
          }}
        >
          <Grid container alignItems="baseline" justifyContent="space-between">
            <Typography variant="h1" fullWidth>{frontmatter.title}</Typography>
            <Typography paragraph>{frontmatter.date}</Typography>
          </Grid>
          <MuiMarkdown>
            {rawMarkdownBody}
          </MuiMarkdown>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      # html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
      rawMarkdownBody
    }
  }
`;
