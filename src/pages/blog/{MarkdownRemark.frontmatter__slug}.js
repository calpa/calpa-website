import React from 'react';
import { graphql, Link } from 'gatsby';
import { Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { map } from 'lodash';

import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';

import './blog.css';
import { Date, Tag } from '@calpa/ui'

const MuiMarkdown = loadable(() => import('../../components/Markdown'));
const Waline = loadable(() => import('../../components/Waline'));

export default function Template ({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, rawMarkdownBody } = markdownRemark;

  const headerImage = getImage(markdownRemark.headerImage);

  return (
    <Layout>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>

      <Grid
        container
        item
        xs={12}
        sm={8}
        sx={{
          marginTop: '20px',
          marginLeft: '10px',
          marginRight: '10px',
          paddingTop: '16px',
          paddingLeft: {
            xs: '5px',
            sm: '16px',
          },
          paddingRight: {
            xs: '5px',
            sm: '16px',
          },
          background: 'white',
          img: {
            maxWidth: '100%',
            objectFit: 'scale-down',
          },
        }}
        flexDirection="column"
      >

        <Typography
          variant="h1"
        >
          {frontmatter.title}
        </Typography>

        {headerImage &&
          <GatsbyImage image={headerImage} alt={frontmatter.title} />
        }

        <MuiMarkdown>{rawMarkdownBody}</MuiMarkdown>

        <div>
          {map(frontmatter.tags, (tag, index) => (
            <Tag
              key={tag}
              tag={tag}
              Link={Link}
            >{tag}</Tag>
          ))}
        </div>
        <Waline />
      </Grid>
      <Sidebar />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "DD/MM/YYYY")
        slug
        title
        tags
      }
      headerImage {
        id
        childImageSharp {
          id
          gatsbyImageData
        }
      }
      rawMarkdownBody
    }
  }
`;
