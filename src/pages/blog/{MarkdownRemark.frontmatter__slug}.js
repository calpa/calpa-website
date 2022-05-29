import React from 'react';
import { graphql } from 'gatsby';
import { Grid, Typography } from '@mui/material';

import Layout from '../../components/Layout';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Grid container>
        <Grid
          container
          sx={{
            padding: '10px',
            background: 'white',
          }}
        >
          <Grid container item xs={12}>
            <Typography variant="h1">{frontmatter.title}</Typography>
            <Typography variant="h2">{frontmatter.date}</Typography>
          </Grid>
          <Grid
            container
            flexDirection="column"
            item
            xs={12}
            sx={{
              blockquote: {
                maxWidth: '100%',
                width: '100%',
                wordBreak: 'break-word',
                caretColor: 'hsla(0,0%,100%,.9)',
                borderLeft: '3px solid',
                margin: 0,
                paddingLeft: '0.9em',
                paddingRight: '0.9em',
              },
              img: {
                maxWidth: '100%',
                objectFit: 'scale-down',
              },
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;