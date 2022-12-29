import React from 'react';
import { graphql } from 'gatsby';
import { Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';

import { map } from 'lodash';

import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';

import './blog.css';
import UI from '@calpa/ui'
const { Date, Tag } = UI;

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
        <Grid container alignItems="flex-start" justifyContent="space-between" sx={{
          paddingBottom: `5px`
        }}>
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

          <Grid item xs={12}>
            {map(frontmatter.tags, (tag, index) => (
              <Tag
                key={tag}
                tag={tag}
              >{tag}</Tag>
            ))}
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
        tags
      }
      rawMarkdownBody
    }
  }
`;
