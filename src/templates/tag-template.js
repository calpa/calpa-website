import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, Link } from 'gatsby';
import {
    Grid, Typography, CardContent, Pagination
} from '@mui/material';
import { CardActionArea, Button } from 'gatsby-theme-material-ui';
import { map } from 'lodash';
import { Tag, Card, List } from '@calpa/ui';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

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
                <List
                    topic={pageContext.tag}
                    listItems={map(nodes, (node, index) => (
                        {
                            number: index + 1,
                            title: node.frontmatter.title,
                            url: `/blog${node.frontmatter.slug[0] === '/' ? node.frontmatter.slug : `/${node.frontmatter.slug}`}`
                        }
                    ))}
                    Link={Link}
                />
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
                        headerImageUrl: PropTypes.string,
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
          description
          tags
        }
      }
    }
  }
`;
