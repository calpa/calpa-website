import React from 'react';
import {
  Grid, Tooltip, Typography, Divider,
} from '@mui/material';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { StaticImage } from 'gatsby-plugin-image';
import { palette } from '../../gatsby-theme-material-ui-top-layout/theme';
import { List } from '@calpa/ui';

const avatarAlt = 'Calpa Liu';

const width = 120;

function Sidebar(props) {
  const data = useStaticQuery(graphql`
  {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC},
      limit: 10,
      filter: {
				fileAbsolutePath: {
					regex: "/content.*/"
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`);

  const latestPosts = data.allMarkdownRemark.edges;

  return (
    <Grid
      container
      item
      flexDirection="column"
      alignItems="center"
      xs={3}
      sx={{
        padding: '20px',
        marginTop: '20px',
        background: 'white',
        // margin: `0 auto`,
        display: {
          xs: 'none',
          sm: 'block',
        }
      }}
    >
      <Grid
        sx={{
          textAlign: 'center'
        }}
      >
        <Tooltip title="Nyahello">
          <Link to="/blog/about/">
            <StaticImage
              alt={avatarAlt}
              src="https://i.imgur.com/F2HnBGC.png"
              width={width}
              aspectRatio="1"
              style={{
                borderRadius: '100%',
                cursor: 'pointer',
              }}
            />
          </Link>
        </Tooltip>
        <Link
          to="/blog/about/"
          style={{
            textDecoration: 'none',
            color: palette.blue.dark,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2">
            Calpa Liu
          </Typography>
        </Link>

        <Typography sx={{
          textAlign: 'center',
        }}>
          Nyahello
        </Typography>
      </Grid>

      <Divider
        sx={{
          width: '100%',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      />
      <List
        topic="Recent Posts"
        listItems={latestPosts.map(({ node }, index) => (
          {
            number: index + 1,
            title: node.frontmatter.title,
            url: `/blog${node.frontmatter.slug[0] === '/' ? node.frontmatter.slug : `/${node.frontmatter.slug}`}`
          }
        ))}
        Link={Link}
      />

    </Grid>
  );
}

export default Sidebar;
