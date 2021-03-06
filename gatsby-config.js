module.exports = {
  siteMetadata: {
    title: 'Calpa Website',
    siteUrl: 'https://calpa.me/',
  },
  plugins: ['gatsby-plugin-netlify-cms', 'gatsby-plugin-image', 'gatsby-plugin-react-helmet', 'gatsby-plugin-sitemap', {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/images/icon.jpeg',
    },
  }, 'gatsby-plugin-mdx', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp', {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/images/',
    },
    __key: 'images',
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: `${__dirname}/src/content`,
    },
  },
  'gatsby-transformer-remark',
  'gatsby-theme-material-ui',
  'gatsby-plugin-netlify',
  ],
};
