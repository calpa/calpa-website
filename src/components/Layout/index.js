import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

// components
import NavBar from '../NavBar';
// import Footer from '../Footer';
import UI from '@calpa/ui'

const { Footer } = UI;

import '../../css/typography.css';

const defaultPageTitle = 'Calpa\'s Blog';

function Layout ({ children }) {
  return (
    <>
      <Helmet
        defaultTitle="Calpa's Website"
        titleTemplate={`%s | ${defaultPageTitle}`}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/@waline/client@v2/dist/waline.css"
        />
      </Helmet>
      <NavBar />
      <Grid
        sx={{
          backgroundColor: '#f4f4f4',
        }}
      >
        <Grid
          container
          item
          sx={{
            margin: '0 auto',
            maxWidth: 'lg',
            justifyContent: 'center',
          }}
        >
          {children}
        </Grid>
        <Footer
          about="Build With Love and Peace"
          categories={[]}
          quickLinks={[
            {
              title: "Github Page",
              link: `https://github.com/calpa/`
            }
          ]}
        />
      </Grid>
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
