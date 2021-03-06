import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, Link } from 'gatsby';
import {
  Grid, Typography, Card, CardContent,
} from '@mui/material';
import { CardActionArea, Button } from 'gatsby-theme-material-ui';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Date from '../components/Date';

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
          marginTop: '20px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
        xs
      >
        {nodes.map(({ frontmatter }) => (
          <Grid
            container
            flexDirection="column"
            item
            // sm={7}
          >
            <Card
              sx={{
                marginBottom: '10px',
              }}
              onClick={() => navigate(`/blog${frontmatter.slug[0] !== '/' ? '/' : ''}${frontmatter.slug}`)}
            >
              <CardActionArea>
                <CardContent>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Typography
                      variant="h1"
                      fullWidth
                      sx={{
                        textDecoration: 'none',
                      }}
                    >
                      {frontmatter.title}
                    </Typography>
                    <Date date={frontmatter.date} />
                  </Grid>
                  <Typography>
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

      <Sidebar />

      <Grid
        container
        item
        xs={12}
        justifyContent="space-around"
        sx={{
          marginTop: '10px',
          marginBottom: '10px',
          // margin: '0 auto',
          // paddingLeft: '8px',
          // paddingRight: '5px',
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
        date(formatString: "DD/MM/YYYY")
        headerImage
        description
      }
    }
  }
}
`;
