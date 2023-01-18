import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, Link } from 'gatsby';
import {
  Grid, Typography, CardContent, Pagination
} from '@mui/material';
import { CardActionArea, Button } from 'gatsby-theme-material-ui';
import { map } from 'lodash';
import { Tag, Card } from '@calpa/ui'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Date from '../components/Date';

function BlogPage (props) {
  const { data, pageContext } = props;
  const { allMarkdownRemark } = data;
  const { currentPage } = pageContext;

  const { nodes, totalCount } = allMarkdownRemark;

  const count = Math.floor(totalCount / 10) + 1;

  return (
    <Layout>
      <Grid
        container
        item
        justifyContent="center"
        sx={{
          marginTop: '20px',
          marginLeft: {
            sm: '10px',
          },
          marginRight: {
            sm: '10px',
          }
        }}
        xs
      >
        {nodes.map(({ frontmatter, headerImage }) => (
          <Grid
            container
            flexDirection="column"
            item
            xs={12}
            key={frontmatter.title}
          >
            <Card
              onClick={(e) => {
                const isTag = Array.from(e.target.classList).includes('tag');
                if (!isTag) {
                  navigate(`/blog${frontmatter.slug[0] !== '/' ? '/' : ''}${frontmatter.slug}`)
                }
              }}
              title={frontmatter.title}
              description={frontmatter.description}
              date={frontmatter.date}
              tags={frontmatter.tags}
              Link={Link}
              showDateComponent
              showTagsComponent={false}
              imageProps={{
                sx: {
                  width: '100%',
                  height: `300px`
                },
                component: (props) => <GatsbyImage
                  {...props}
                  image={getImage(headerImage)}
                />,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Sidebar />

      <Grid
        container
        item
        xs={12}
        justifyContent="space-around"
        sx={{
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >

        <Pagination count={count} page={currentPage}
          onChange={(event, value) => {
            if (value === 1) {
              navigate(`/`);
            } else {
              navigate(`/blog/${value}`)
            }
          }}
          color="primary"
        />
      </Grid>
    </Layout>
  );
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number,
      nodes: PropTypes.arrayOf(PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          slug: PropTypes.string,
          date: PropTypes.string,
          headerImageUrl: PropTypes.string,
          tags: PropTypes.arrayOf(PropTypes.string),
        }),
      })),
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    limit: PropTypes.number,
    numPages: PropTypes.number,
    skip: PropTypes.number,
  }).isRequired,
};

BlogPage.defaultProps = {
  data: {
    totalCount: 0,
    nodes: [],
  },
};

export default BlogPage;

export const query = graphql`
query blogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    sort: {fields: frontmatter___date, order: DESC},
    limit: $limit,
    skip: $skip,
  ) {
    totalCount
    nodes {
      frontmatter {
        title
        slug
        date(formatString: "DD/MM/YYYY")
        description
        tags
        headerImageUrl
      }
      headerImage {
        id
        childImageSharp {
          id
          gatsbyImageData
        }
      }
    }
  }
}
`;
