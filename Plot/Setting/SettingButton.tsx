import React from 'react';
// import { IoSettingsOutline } from "react-icons/io5";
import PlotSetting from './PlotSetting';
import BarSetting from './BarSetting';
import PictureGraphSetting from './PictureGraphSetting';

const SettingButton = ({ graph, handleDataTrack,isTeacher }: any) => {


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                backgroundColor: '#d1d5db', // Tailwind's gray-300
                padding: '1rem', // 4 * 0.25rem
                color: '#000000',
                 display:"flex",
          justifyContent:"center",
          alignItems:"center"
            }}
        >
            {graph === "Line Plot" ? <PlotSetting  handleDataTrack={handleDataTrack} isTeacher={isTeacher} /> : graph === "Bar Graph" ? <BarSetting  handleDataTrack={handleDataTrack} isTeacher={isTeacher} /> : <PictureGraphSetting />}
        </div>
    );
};

export default SettingButton;
