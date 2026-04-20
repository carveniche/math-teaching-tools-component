import React from 'react';
import Cube from './Cube';
import Cone from './Cone';
import Hemisphere from './Hemisphere';
import RectangularPrism from './RectangularPrism';
import Sphere from './Sphere';
import { useTriangleContext } from '../contextDimensional/ContextTriangle';
import Cylinder from './Cylinder';
import TriangularPrism from './TriangularPrism';
import RectangularPyramid from './RectangularPyramid';
import SquarePyramid from './SquarePyramid';

const TriangleMapping = () => {
    const { trianglelist } = useTriangleContext();
    const componentMap = {
        'Cube': <Cube />,
        'Sphere': <Sphere />,
        'Cylinder': <Cylinder />,
        'Cone': <Cone />,
        'Rectangular Prism': <RectangularPrism />,
        'Hemisphere': <Hemisphere />,
        'Triangular Prism': <TriangularPrism />,
        'Rectangular Pyramid': <RectangularPyramid />,
        'Square Pyramid': <SquarePyramid />

    };
    const containerStyle = () => {
        return {
            width: '100%', // 'full' is not a valid CSS value
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
        };
    };


    return (
        <div style={containerStyle()}>
            {/* <div style={containerStyles()} > */}

            {componentMap[trianglelist]}
            {/* </div> */}
        </div>
    );
};

export default TriangleMapping;
