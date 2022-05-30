import React from 'react';

import {
  Link as MuiLink, Typography, Grid, Divider,
} from '@mui/material';

function Link(props) {
  return <MuiLink {...props} target="_blank" />;
}

function Footer() {
  return (
    <Grid
      container
      justifyContent="center"
    >
      <Divider sx={{
        width: '100%',
        // marginTop: '10px',
        marginBottom: '10px',
      }}
      />

      <Grid
        container
        item
        xs={10}
      >
        <Typography>
          Build with&nbsp;
        </Typography>
        <Link href="https://www.gatsbyjs.org/">GatsbyJS</Link>
        <Typography>
            &nbsp;and&nbsp;
        </Typography>
        <Link
          href="https://reactjs.org/"
        >
          React&nbsp;
          {React.version}
        </Link>
        <Typography>
          .&nbsp;Hosted on&nbsp;
        </Typography>
        <Link href="https://www.netlify.com/">Netlify</Link>
        <Typography>.</Typography>
      </Grid>
      <Grid container xs={10}>
        <Typography>
          The code is open source and available at&nbsp;
        </Typography>
        <Link
          href="https://github.com/calpa/calpa-website"
        >
          calpa-website
        </Link>
      </Grid>
      <Grid container xs={10}>
        <Typography>
          Copyright&nbsp;
        </Typography>
        <Typography>
          <Link href="https://calpa.me/">&copy;Calpa</Link>
              &nbsp;
          {new Date().getFullYear()}
            &nbsp;Theme by
          {' '}
          <Link href="https://calpa.me/">Calpa Liu</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
