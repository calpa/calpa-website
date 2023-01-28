import React, { useMemo } from "react";
import { Link, PageProps, graphql } from 'gatsby';

import Layout from "../../components/Layout";
import Sidebar from '../../components/Sidebar';
import { Grid } from "@mui/material";
import { List } from "@calpa/ui";
import generateFlattenedList from "../../utils/generateFlattenedList";

function getTags(data: Queries.TagsPageQuery) {
  const tagCount = generateFlattenedList(data)
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count > 1)
    .map(([tag, count], index) => ({
      number: index,
      title: `${tag} (${count})`,
      url: `/blog/tag/${tag}`,
    }));
}


function TagsPage(props: PageProps<Queries.TagsPageQuery>) {
  const listItems = useMemo(() => {
    return getTags(props.data);
  }, []);

  return <Layout>
    <Grid container item xs={12} sm={8} sx={{
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
    }}>
      <List
        topic="Tags"
        listItems={listItems}
        Link={Link}
      />
    </Grid>
    <Sidebar />
  </Layout>
}

export default TagsPage;

export const pageQuery = graphql`
query TagsPage {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`