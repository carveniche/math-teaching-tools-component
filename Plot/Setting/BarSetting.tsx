import React, { useState } from 'react'
import { usePlotContext } from '../context/PlotContext';

const BarSetting = ({ handleDataTrack, isTeacher }: { handleDataTrack: Function; isTeacher: boolean }) => {
  const { setXMarkersBarPlot, setBarLineText, setyMarkersBarPlot, setBarError, setState } = usePlotContext();
  const [localLineText, setLocalLineText] = useState({
    xlavelBarPlot: "Sections",
    ylavelBarPlot: "Number of workshops",
  })
  const [localXMarkersBarPlot, setlocalXMarkersBarPlot] = useState<string[]>(["A", "B", "C", "D"]);
  const [localYMarkersBarPlot, setLocalYMarkersBarPlot] = useState<number[]>([0, 1, 2, 3, 4]);


  const handleLabelChange = (key: string, value: string) => {
    setLocalLineText(prev => ({
      ...prev,
      [key]: value,
    }))

  }
  const xmarkerHandler = (idx: number, value: string) => {
    const updata = [...localXMarkersBarPlot]
    updata[idx] = value;
    setlocalXMarkersBarPlot(updata);
  }

  const yMarkerHandler = (idx: number, value: number) => {
    const updata = [...localYMarkersBarPlot]
    updata[idx] = value;
    setLocalYMarkersBarPlot(updata);
  }


  const submitHandler = () => {
    const xmarkLengthlargest: string = localXMarkersBarPlot.reduce((a, b) =>
      a.length >= b.length ? a : b
    );
    const xmarkLengthSmallest: string = localXMarkersBarPlot.reduce((a, b) =>
      a.length <= b.length ? a : b
    );
    const ymarkLengthlargest = Math.max(...localYMarkersBarPlot);
    const localLineTextxlavelBarPlotLenght = localLineText.xlavelBarPlot.length;
    const localLineTextylavelBarPlotLenght = localLineText.ylavelBarPlot.length;
    if (xmarkLengthlargest.length > 6) {
      setBarError(prev => ({
        ...prev,
        XMarkersBarPlotError: true,
      }));
      return
    }
    if (xmarkLengthSmallest.length < 1) {
      setBarError(prev => ({
        ...prev,
        XMarkersBarPlotEmptyError: true,
      }));
      return
    }
    if (ymarkLengthlargest > 999) {
      setBarError(prev => ({
        ...prev,
        yMarkersBarPlotError: true,
      }));
      return;
    }



    if (localLineTextxlavelBarPlotLenght > 20) {
      setBarError(prev => ({
        ...prev,
        xlavelBarPlotError: true,
      }));
      return
    }
    if (localLineTextxlavelBarPlotLenght < 1) {
      setBarError(prev => ({
        ...prev,
        xlavelBarPlotEmptyError: true,
      }));
      return
    }
    if (localLineTextylavelBarPlotLenght > 20) {
      setBarError(prev => ({
        ...prev,
        ylavelBarPlotError: true,
      }));
      return
    }

    if (localLineTextylavelBarPlotLenght < 1) {
      setBarError(prev => ({
        ...prev,
        ylavelBarPlotEmptyError: true,
      }));
      return
    }

    setBarLineText(localLineText);
    setXMarkersBarPlot(localXMarkersBarPlot);
    setyMarkersBarPlot(localYMarkersBarPlot);
    if (isTeacher) {
      handleDataTrack?.({
        isFrom: "BarGraph",
        data: {
          xMarkersBarPlot: localXMarkersBarPlot,
          yMarkersBarPlot: localYMarkersBarPlot,
          barLineText: localLineText,
        }
      });
    }

    setState(prev => ({ ...prev, toggleSetting: false }));
  }

  const handleClosesetting = (() => {
    setState(prev => ({ ...prev, toggleSetting: false }));
  })


  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        position: "relative"
      }}
    >
      <span className='h4-large' onClick={handleClosesetting} style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        color: "white",
        background: "",
        border: "0.5px solid red",
        padding: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        cursor: "pointer"

      }}>❌</span>
      <div
        style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          marginBottom: '1rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Labels
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <label
            htmlFor="x-label"
            style={{
              width: '100px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            x Label
          </label>
          <input
            id="x-label"
            type="text"
            value={localLineText.xlavelBarPlot}
            onChange={(e) => handleLabelChange('xlavelBarPlot', e.target.value)}
            style={{
              width: '200px',
              height: '25px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <label
            htmlFor="x-label"
            style={{
              width: '100px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            Y Label
          </label>
          <input
            id="x-label"
            type="text"
            value={localLineText.ylavelBarPlot}
            onChange={(e) => handleLabelChange('ylavelBarPlot', e.target.value)}
            style={{
              width: '200px',
              height: '25px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            }}
          />
        </div>
      </div>

      {/* Markers */}
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Markers
        </div>

        <div style={{ display: 'flex' }}>
          {/* 1 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              X Markers
            </div>

            {Object.values(localXMarkersBarPlot).map((marker, idx) => (
              <input
                key={idx}
                id={`x-marker-${idx}`}
                type="text"
                value={marker}
                onChange={(e) => xmarkerHandler(idx, e.target.value)}
                style={{
                  width: '66.666%',
                  height: '25px',
                  fontSize: '1rem',
                  border: '1px solid #ccc',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                }}
              />
            ))}
          </div>

          {/* 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              Y Markers
            </div>

            {Object.values(localYMarkersBarPlot).slice(1).map((marker, idx) => (
              <input
                type="text"
                value={marker}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    yMarkerHandler(idx + 1, Number(value));
                  }
                }}
                style={{
                  width: '66.666%',
                  height: '25px',
                  fontSize: '1rem',
                  border: '1px solid #ccc',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                }}
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
          onClick={submitHandler}
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
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
        >
          Update
        </button>
      </div>
    </div>

  )
}

export default BarSetting