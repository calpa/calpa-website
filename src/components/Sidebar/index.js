import React from 'react';
import {
  Grid, Tooltip, Typography, Divider,
} from '@mui/material';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { StaticImage } from 'gatsby-plugin-image';
import { palette } from '../../gatsby-theme-material-ui-top-layout/theme';

const avatarAlt = 'Calpa Liu';

const width = 120;

function Sidebar (props) {
  const data = useStaticQuery(graphql`
  {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 10) {
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
        display: {
          xs: 'none',
          sm: 'block',
        }
      }}
    >
      <Tooltip title="Nyahello">
        <Link to="/blog/about/">
          <StaticImage
            alt={avatarAlt}
            src="../../images/icon.jpeg"
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
        }}
      >
        <Typography variant="h2">
          Calpa Liu
        </Typography>
      </Link>

      <Typography>
        Nyahello
      </Typography>
      <Divider
        sx={{
          width: '100%',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      />
      <Grid container>

        <Typography variant="h3">
          Recent Posts
        </Typography>
        {latestPosts.map(({ node }, index) => (
          <Link
            to={`/blog${node.frontmatter.slug[0] === '/' ? node.frontmatter.slug : `/${node.frontmatter.slug}`}`}
            key={node.frontmatter.slug}
            style={{
              textDecoration: 'none',
              color: palette.blue.dark,
              width: '100%',
            }}
          >
            {index + 1}. {node.frontmatter.title}
          </Link>
        ))}
      </Grid>

    </Grid>
  );
}

export default Sidebar;
