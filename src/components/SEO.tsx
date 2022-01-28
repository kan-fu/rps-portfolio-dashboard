import React from 'react'
import Helmet from 'react-helmet'
const SEO = ({ link, title }: { link: string; title: string }) => {
  const meta = {
    name: 'RPS Portfolio Dashboard',
    description: 'A personal stock dashboard to track my portfolio performance',
    image: '/thumbnail.png',
    type: 'website',
  }
  return (
    <Helmet title={title}>
      <meta name='robots' content='follow, index' />
      <meta name='description' content={meta.description} />
      <meta property='og:url' content={link} />
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.name} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={meta.image} />
    </Helmet>
  )
}

export default SEO
