import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, Link } from 'gatsby';
import {
  Grid, Typography, Card, CardContent, CardMedia,
} from '@mui/material';
import { CardActionArea, Button } from 'gatsby-theme-material-ui';
import Layout from '../components/Layout';

function BlogPage(props) {
  const { data, pageContext } = props;
  const { allMarkdownRemark } = data;
  const { currentPage } = pageContext;

  const { nodes } = allMarkdownRemark;

  return (
    <Layout>
      <Grid
        container
        item
        justifyContent="center"
        sx={{
          marginTop: '10px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {nodes.map(({ frontmatter }) => (
          <Grid
            container
            flexDirection="column"
            item
            xs={11}
            // sm={7}
          >
            <Card
              sx={{
                marginBottom: '10px',
              }}
              onClick={() => navigate(`/blog${frontmatter.slug[0] !== '/' ? '/' : ''}${frontmatter.slug}`)}
            >
              <CardActionArea>
                {/* {frontmatter.headerImage
                && (
                <CardMedia
                  component="img"
                  height="140"
                  alt="image"
                  src={frontmatter.headerImage}
                />
                )} */}
                <CardContent>
                  <Grid container alignItems="center">
                    <Typography sx={{
                      backgroundColor: '#77d7b9',
                      color: '#fff',
                      padding: '0.8em',
                      marginRight: '10px',
                    }}
                    >
                      {frontmatter.date.split('T')[0]}
                    </Typography>
                    <Typography sx={{
                      textDecoration: 'none',
                    }}
                    >
                      {frontmatter.title}
                    </Typography>
                  </Grid>
                  <Typography color="text.secondary">
                    {frontmatter.description}
                  </Typography>
                  <Typography color="primary">
                    More...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        item
        xs={7}
        justifyContent="space-between"
        sx={{
          margin: '0 auto',
          paddingLeft: '5px',
          paddingRight: '5px',
        }}
      >

        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => navigate(`/blog/${currentPage - 1}`)}
        >
          Previous
        </Button>

        <Link
          to={`/blog/${currentPage + 1}`}
          style={{
            textDecoration: 'none',
          }}
        >
          <Button variant="outlined">
            Next
          </Button>
        </Link>
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
          slug: PropTypes.string,
          date: PropTypes.string,
          headerImage: PropTypes.string,
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
        date
        headerImage
        description
      }
    }
  }
}
`;
