import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const Meta = ({
  title, description, image, url,
}) => (
  <Helmet>
    {title && <title>{title}</title>}
    {title && <meta name="title" content={title} />}
    {description && <meta name="description" content={description} />}

    {title && <meta itemProp="name" content={title} />}
    {description && <meta itemProp="description" content={description} />}

    {title && <meta property="og:title" content={title} />}
    {title && <meta property="og:site_name" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {url && <meta property="og:url" content={url} />}

    {title && <meta property="twitter:title" content={title} />}
    {description && <meta property="twitter:description" content={description} />}
    {image && <meta property="twitter:image" content={image} />}
    {image && <meta property="twitter:card" content="summary_large_image" />}
  </Helmet>
)

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
}

Meta.defaultProps = {
  title: 'Conference Hall',
  description: 'An open SaaS platform to manage call for papers',
  image: undefined,
  url: 'https://conference-hall.io',
}

export default Meta
