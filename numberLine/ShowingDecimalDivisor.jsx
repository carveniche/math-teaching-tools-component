import React from 'react'

function ShowingDecimalDivisor({ getDivisor }) {
  return (
    <>
      {getDivisor.map((item, index) => (
        <span
          key={index}
          style={{
            border: '1px solid #d1d5db',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.375rem',
            fontSize: '1.5rem',
            width: "20%",
            height: "20%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

          }}
          className='tab-text'
        >
          {item}
        </span>
      ))}
    </>
  )
}

export default ShowingDecimalDivisor