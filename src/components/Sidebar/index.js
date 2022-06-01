import React from 'react';
import { Grid, Tooltip, Typography } from '@mui/material';
import { Link } from 'gatsby';

import { StaticImage } from 'gatsby-plugin-image';
import { palette } from '../../gatsby-theme-material-ui-top-layout/theme';

const avatarAlt = 'Calpa Liu';

const width = 120;

function Sidebar(props) {
  return (
    <Grid
      container
      item
      flexDirection="column"
      alignItems="center"
      xs={2}
      sx={{
        padding: '20px',
        marginTop: '20px',
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
          color: palette.blue.main,
        }}
      >
        <Typography variant="h2">
          Calpa Liu
        </Typography>
      </Link>

      <Typography>
        Nyahello
      </Typography>

    </Grid>
  );
}

export default Sidebar;
