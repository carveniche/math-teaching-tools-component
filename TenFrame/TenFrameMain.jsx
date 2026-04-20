import React, { useEffect, useMemo, useState } from 'react'
import { generateFilledIndices, generateRandomEmoji } from './generateFilledIndices'; // Adjust path as needed

import TenFrame from './TenFrame';


const TenFrameMain = () => {

    const [filledIndices, setFilledIndices] = useState(() => generateFilledIndices(10));
    const randomEmoji = useMemo(() => {
        void filledIndices;
        return generateRandomEmoji();
    }, [filledIndices]);
    const prop = {
        isLiveClass: false,
        role_name: "tutor",
    }
    const handlePlayAgainParent = () => {
        setFilledIndices(generateFilledIndices(10))
    }

    return (
        <>
            <TenFrame prop={prop} filledIndices={filledIndices} setFilledIndices={setFilledIndices} randomEmoji={randomEmoji} handlePlayAgainParent={handlePlayAgainParent} />
        </>
    )
}

export default TenFrameMain