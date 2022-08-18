import React from 'react';
import { graphql } from 'gatsby';
import { Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';

import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';

import './blog.css';
import Date from '../../components/Date';

const MuiMarkdown = loadable(() => import('../../components/Markdown'));
const Waline = loadable(() => import('../../components/Waline'));

export default function Template ({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, rawMarkdownBody } = markdownRemark;

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>

      <Grid
        container
        item
        xs={8}
        // justifyContent="center"
        sx={{
          marginTop: '20px',
          marginLeft: '10px',
          marginRight: '10px',
          paddingTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          background: 'white',
          img: {
            maxWidth: '100%',
            objectFit: 'scale-down',
          },
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid xs>
            <Typography
              variant="h1"
            >
              {frontmatter.title}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Date date={frontmatter.date.split('T')[0]} />
          </Grid>
        </Grid>
        <MuiMarkdown>{rawMarkdownBody}</MuiMarkdown>
        <Waline />
      </Grid>
      <Sidebar />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      # html
      frontmatter {
        date(formatString: "DD/MM/YYYY")
        slug
        title
      }
      rawMarkdownBody
    }
  }
`;
