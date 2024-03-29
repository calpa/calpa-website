import React from 'react';
import { graphql, Link } from 'gatsby';
import type { PageProps } from 'gatsby'
import {
    Grid, Typography, CardContent, Pagination
} from '@mui/material';
import { CardActionArea, Button } from 'gatsby-theme-material-ui';
import { map } from 'lodash';
import { Tag, Card, List } from '@calpa/ui';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

function getUrl(slug: string | null | undefined) {
    if (slug === undefined || slug === null) {
        return;
    }
    if (slug[0] === '/') {
        return `/blog${slug}`
    }

    return `/blog/${slug}`;
}

function TagPage(props: PageProps<Queries.TagPageQuery, Queries.TagPageQueryVariables>) {
    const { data, pageContext } = props;
    const { allMarkdownRemark } = data;
    const { nodes, totalCount } = allMarkdownRemark;
    const { tag } = pageContext;
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
                    {tag}
                </Typography>

                <Link to="/blog/tags">
                    &lt;&minus; Tags
                </Link>

                <Typography>
                    {data.file?.childMarkdownRemark?.rawMarkdownBody}
                </Typography>



                <List
                    topic=""
                    // topic={`${tag} (${totalCount})`}
                    listItems={map(nodes, (node, index) => (
                        {
                            number: index + 1,
                            title: node.frontmatter?.title,
                            url: getUrl(node.frontmatter?.slug)
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

export default TagPage;

export const query = graphql`
query TagPage($tag: String!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
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
    file(
      sourceInstanceName: {eq: "noun"}
      childMarkdownRemark: {frontmatter: {name: {eq: $tag}}}
    ) {
      id
      childMarkdownRemark {
        id
        rawMarkdownBody
      }
    }
  }
`;
