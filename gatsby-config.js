module.exports = {
  siteMetadata: {
    title: `rps-frontend`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-theme-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'RPS_Portfolio',
        short_name: 'RPS',
        start_url: `/`,
        display: `standalone`,
        icon: `src/images/android-chrome-512x512.png`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'RPS',
        // This is the field under which it's accessible
        fieldName: 'rps',
        // URL to query from
        url: 'https://rps-portfolio.herokuapp.com/graphql',
        // url: 'http://localhost:3000/graphql',
      },
    },
    `gatsby-plugin-client-side-redirect`,
  ],
}
