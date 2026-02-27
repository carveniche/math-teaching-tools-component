import React from 'react';

import Square from './Square';
import Rectangle from './Rectangle';
import Trapezoid from './Trapezoid';
import RightTrapezoid from './RightTrapeZoid';
import Parallelogram from './Parallelogram';
import Rhombus from './Rhombus';
import Isoscelesrapezoid from './Isoscelesrapezoid';

const QuadrilateralMaping = ({finalSelected}) => {

    const componentMap = {
        'Square': <Square />,
        'Rectangle': <Rectangle />,
        'Trapezoid':<Trapezoid/>,
        'Right Trapezoid':<RightTrapezoid/>,
        'Parallelogram':<Parallelogram/>,
        "Rhombus":<Rhombus/>,
        "Isosceles Trapezoid":<Isoscelesrapezoid/>,
        
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

                {componentMap[finalSelected]}
            {/* </div> */}
        </div>
    );
};
export default QuadrilateralMaping