import React from 'react';
import { useTriangleContext } from '../ContextTriangle/ContextTriangle';
import EquilateralTriangle from './EquilateralTriangle';
import IsoscelesTriangle from './IsoscelesTriangle';
import ScaleneTriangle from './ScaleneTriangle';
import RightTriangle from './RightTriangle';
import AcuteTriangle from './AcuteTriangle';
import ObtuseTriangle from './ObtuseTriangle';

const TriangleMapping = () => {
    const { trianglelist } = useTriangleContext();
    const componentMap = {
        'Equilateral Triangle': <EquilateralTriangle />,
        'Isosceles Triangle': <IsoscelesTriangle />,
        'Scalene Triangle': <ScaleneTriangle />,
        'Right Triangle': <RightTriangle />,
        'Acute Triangle': <AcuteTriangle />,
        'Obtuse Triangle': <ObtuseTriangle />,
    };

    const containerStyle = () => {
        return {
            width: '100%', // 'full' is not a valid CSS value
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center',
        };
    };
    // const containerStyles = ()=>{
    //     return {
    //         width: '500px', 
    //         height: '400px',
    //         display: 'flex',
    //         justifyContent: 'center',
    //         // alignItems: 'center',
    //         backgroundColor: 'white', 
    //     };
    // }

    return (
        <div style={containerStyle()}>
            {/* <div style={containerStyles()} > */}

                {componentMap[trianglelist]}
            {/* </div> */}
        </div>
    );
};

export default TriangleMapping;
