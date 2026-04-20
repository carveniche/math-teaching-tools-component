import React from 'react'

const Description = ({ data }) => {

    return (
        <div
            style={{ fontSize: "18px", lineHeight: "2",  color: "#333", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: data }}
        />
    )
}

export default Description