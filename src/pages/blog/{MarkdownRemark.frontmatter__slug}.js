import React from 'react';
import { graphql } from 'gatsby';
import { Grid, Typography } from '@mui/material';
import MuiMarkdown from 'mui-markdown';

import Layout from '../../components/Layout';

import './blog.css';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, rawMarkdownBody } = markdownRemark;
  return (
    <Layout>
      <Grid container>
        <Grid
          container
          sx={{
            padding: '10px',
            background: 'white',
            img: {
              maxWidth: '100%',
              objectFit: 'scale-down',
            },
          }}
        >
          <Grid container item xs={12}>
            <Typography variant="h1">{frontmatter.title}</Typography>
            <Typography variant="h2">{frontmatter.date}</Typography>
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
