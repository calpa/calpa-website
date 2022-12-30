import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, Link } from 'gatsby';
import {
    Grid, Typography, CardContent, Pagination
} from '@mui/material';
import { CardActionArea, Button } from 'gatsby-theme-material-ui';
import { map } from 'lodash';
import UI from '@calpa/ui';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Date from '../components/Date';
// import Tag from '@calpa/ui/dist/Tag';

const { Tag, Card } = UI;

function TagPage (props) {
    const { data, pageContext } = props;
    const { allMarkdownRemark } = data;
    const { nodes } = allMarkdownRemark;

    return (
        <Layout>
            <Grid
                container
                item
                flexDirection="column"
                sx={{
                    marginTop: '20px',
                    marginLeft: '10px',
                    marginRight: '10px',
                }}
                xs
            >
                <Typography variant='h1'>
                    {pageContext.tag}
                </Typography>
                {map(nodes, (node, index) => (
                    <Link to={`/blog/${node.frontmatter.slug}`} style={{
                        width: '100%',
                    }}>
                        {index + 1}. {node.frontmatter.title}
                    </Link>
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
            </Grid>
        </Layout>
    );
}

TagPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    frontmatter: PropTypes.shape({
                        title: PropTypes.string.isRequired,
                        slug: PropTypes.string.isRequired,
                        date: PropTypes.string.isRequired,
                        headerImage: PropTypes.string,
                        description: PropTypes.string.isRequired,
                        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
                    }).isRequired,
                }).isRequired
            ).isRequired,
        }).isRequired,
    }).isRequired,
}


export default TagPage;

export const query = graphql`
query tagListQuery($tag: String!) {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {tags: {in: [$tag]}}}) {
      totalCount
      nodes {
        frontmatter {
          title
          slug
          date(formatString: "DD/MM/YYYY")
          headerImage
          description
          tags
        }
      }
    }
  }
`;
