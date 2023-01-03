import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

// components
import { Footer, NavBar } from '@calpa/ui';

import '../../css/typography.css';
import { navigate } from 'gatsby';

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <NavBar
        color="default"
        title="HOME"
        pages={["Guest Book", "About"]}
        avatarImage="https://i.imgur.com/F2HnBGC.png"
        avatarAlt='Nyahello'
        handleTitleClick={() => navigate("/")}
        onClick={(event) => {
          event.preventDefault();
          const { innerText } = event.target;
          if (innerText === 'GUEST BOOK') {
            navigate('/blog/guestbook/');
          } else if (innerText === 'ABOUT') {
            navigate('/blog/about/');
          }
        }}
      />
      <Grid
        sx={{
          backgroundColor: '#f4f4f4',
          paddingTop: `56px`,
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

