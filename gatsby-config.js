module.exports = {
  siteMetadata: {
    title: 'Calpa Website',
    siteUrl: 'https://calpa.me/',
  },
  plugins: ['gatsby-plugin-netlify-cms', 'gatsby-plugin-image', 'gatsby-plugin-react-helmet', 'gatsby-plugin-sitemap', {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/images/icon.png',
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
      name: 'markdown-pages',
      path: `${__dirname}/src/markdown-pages`,
    },
  },
  'gatsby-transformer-remark',
  'gatsby-theme-material-ui',
  ],
};
