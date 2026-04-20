import React, { useState } from 'react';
import { usePlotContext } from '../context/PlotContext';

const PlotSetting = () => {

    const { setLineText, setXMarkers, setState, setLineError } = usePlotContext();

    // Local state
    const [localLineText, setLocalLineText] = useState({
      xlavel: "Books Read",
      ylavel: "Number of Students",
    });

    const [localXMarkers, setLocalXMarkers] = useState<string[]>(["1", "2", "3", "4"]);

    const handleMarkerChange = (index: number, value: string) => {
        const updated = [...localXMarkers];
        updated[index] = (value);
        setLocalXMarkers(updated);
    };

    const handleLabelChange = (key: 'xlavel' | 'ylavel', value: string) => {
        setLocalLineText(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const errorCheckFrunction = (localXMarkers: any, localLineText: any) => {
        
        const xmarkLengthlargest: string = localXMarkers.reduce((a: string, b: string) =>
            a.length >= b.length ? a : b
        );
        const xmarkLengthMin: string = localXMarkers.reduce((a: string, b: string) =>
            a.length <= b.length ? a : b
        );

        const xLavelError = localLineText.xlavel
        const yLavelError = localLineText.ylavel
        
        if ( xmarkLengthlargest.length > 6) {
            setLineError(prev => ({
                ...prev,
                XMarkersLinePlotError: true,
            }))
            return false
        }
        if ( xmarkLengthMin === "") {
            setLineError(prev => ({
                ...prev,
                XMarkersLinePlotEmptyError: true,
            }))
            return false
        }
        
        if (xLavelError.length > 20) {
            setLineError(prev => ({
                ...prev,
                xlavelLinePlotError: true,
            }))
            return false
        }
        if(xLavelError === "" ){
            setLineError(prev => ({
                ...prev,
                xlavelLinePlotEmptyError: true,
            }))
            return false
            
        }
        if(yLavelError === "" ){
            setLineError(prev => ({
                ...prev,
                ylavelLinePlotEmptyError:true
            }))
            return false
            
        }

        if ( yLavelError.length > 20) {
            setLineError(prev => ({
                ...prev,
                ylavelLinePlotError: true,
            }))
            return false
        }
    }

    const handleSubmit = () => {
        const error = errorCheckFrunction(localXMarkers, localLineText)
        if (error === false) {
            return ;
        }
        setLineText(localLineText);
        setXMarkers(localXMarkers);
        setState(prev => ({ ...prev, toggleSetting: false }));
        
    };

    const handleCloseSetting =()=>{
 
    setState(prev => ({ ...prev, toggleSetting: false }));

    }

    return (
        <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: '1px solid black',
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'white',
          position:"relative"
        }}
      >
        <span className='h4-large' onClick={handleCloseSetting} style={{
          position:"absolute",
          top:"0.5rem",
          right:"0.5rem",
          color:"white",
          background:"",
          border:"0.5px solid red",
          padding:"0.5rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          borderRadius:"50px",
          cursor:"pointer"

        }}>❌</span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Labels
            </div>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '1rem',
                  gap:"10px"
                }}
              >
                <label
                  htmlFor="x-label"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    
                  }}
                  className='h4'
                >
                  x Label
                </label>
                <input
                  type="text"
                  value={localLineText.xlavel}
                  onChange={(e) => handleLabelChange('xlavel', e.target.value)}
                  placeholder="Enter x-axis label"
                  style={{
                    width: '66.666667%',
                    border: '1px solid #9ca3af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                  }}
                   className='text_body'
                />
              </div>
      
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap:"10px"
                }}
              >
                <label
                  htmlFor="x-label"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    
                  }}
                  className='h4'
                >
                  Y Label
                </label>
                <input
                  type="text"
                  value={localLineText.ylavel}
                  onChange={(e) => handleLabelChange('ylavel', e.target.value)}
                  placeholder="Enter y-axis label"
                  style={{
                    width: '66.666667%',
                    border: '1px solid #9ca3af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                  }}
                  className='text_body'
                />
              </div>
            </div>
          </div>
      
          {/* Markers */}
          <div>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center',
              }}
               className='h4'
            >
              Markers
            </div>
      
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div    className='h4' >X Markers</div>
      
              {localXMarkers.map((marker, idx) => (
                <input
                  key={idx}
                  id={`x-marker-${idx}`}
                  type="text"
                  value={marker}
                  onChange={(e) => handleMarkerChange(idx, e.target.value)}
                  style={{
                    width: '66.666667%',
                    border: '1px solid #9ca3af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                  }}
                   className='text_body'
                />
              ))}
            </div>
          </div>
        </div>
      
        <div
          style={{
            width: '100%',
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
               style={{
                background: "linear-gradient(90deg, #3b82f6, #2563eb)",
                color: "white",
                padding: "0.5rem 1.4rem",
                borderRadius: "10px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                border: "none",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                height: "40px",
              }}
            onClick={handleSubmit}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Update
          </button>
        </div>
      </div>
      
    );
};

export default PlotSetting;
