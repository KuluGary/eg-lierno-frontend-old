import React from 'react'
import Helmet from 'react-helmet';

const DefaultMeta = () => (
    <>
        <title>Lierno App</title>
        <meta name="description" content="Haz tus propias campañas TTRPG con Lierno App" />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@KuluGary"/>
        <meta name="twitter:title" content="Lierno App"/>
        <meta name="twitter:description" content=" Haz tus propias campañas TTRPG con Lierno App"/>
    </>
)

export default function SEO(props) {
    return (
        <Helmet>
            <DefaultMeta />
            {props.children}
        </Helmet>
    );
}
