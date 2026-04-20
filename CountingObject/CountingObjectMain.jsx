import React from 'react'
import CountingObject from './CountingObject';

const CountingObjectMain = () => {
    const prop = {
        isLiveClass: false,
        role_name: "tutor",
        studentData: {}
    };

    return (
        <>
            <CountingObject prop={prop} />
        </>
    )
}

export default CountingObjectMain