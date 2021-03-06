import React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Grid,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'gatsby';

const rootUrl = '/';

const pages = [
  {
    name: 'Blog',
    url: '/blog/1/',
  },
  {
    name: 'Guest Book',
    url: '/blog/guestbook/',
  },
  {
    name: 'About',
    url: '/blog/about/',
  },
];
const settings = ['Github'];

const avatarImageSrc = 'https://avatars.githubusercontent.com/u/19569045?v=4';
const avatarAlt = 'Calpa Liu';

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      color="background"
      elevation="0"
      sx={{
        boxShadow: '0 0 10px rgb(14 14 14 / 26%)',
        transition: 'background .5s',
        padding: '0.5rem 1.5rem',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to={rootUrl}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              color="black"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              HOME
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.url}
                    style={{
                      textDecoration: 'none',
                    }}
                  >
                    <Typography textAlign="center" color="#337ab7">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link
            to={rootUrl}
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',

              }}
              color="#337ab7"
            >
              HOME
            </Typography>
          </Link>
          <Grid
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            justifyContent="flex-end"
            alignSelf="flex-end"
          >
            {pages.map((page) => (
              <Link
                key={page.url}
                to={page.url}
                style={{
                  textDecoration: 'none',
                }}
              >
                <Typography
                  sx={{
                    my: 2,
                    display: 'block',
                    marginRight: '10px',
                    transition: 'all .15s ease-in-out',
                    ':hover': {
                      color: '#0056b3',
                      textDecoration: 'none',
                      backgroundColor: 'transparent',
                      ':after': {
                        width: '100%',
                      },
                    },
                    ':after': {
                      background: 'none repeat scroll 0 0 transparent',
                      width: '0',
                      content: '""',
                      display: 'block',
                      height: '0.1rem',
                      backgroundColor: '#0f457f',
                      transition: 'width .4s ease 0s',
                    },
                  }}
                  color="#337ab7"
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
