import React from 'react'

import QuadrilateralSetting from './QuadrilateralSetting'

const Setting = ({setFinalSelected,setState}) => {
  return (
    <div
  style={{
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    backgroundColor: '#d1d5db', 
    padding: '1rem', 
    color: 'black',
  }}
>
  <QuadrilateralSetting setFinalSelected={setFinalSelected} setState={setState}/>
</div>

  )
}

export default Setting
