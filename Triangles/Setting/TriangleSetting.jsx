import React, { useState } from 'react'
import { useTriangleContext } from '../ContextTriangle/ContextTriangle.jsx';

const TriangleSetting = () => {
  const options = [
    "Equilateral Triangle",
    "Isosceles Triangle",
    "Scalene Triangle",
    "Acute Triangle",
    "Obtuse Triangle",
    "Right Triangle",

  ];
  const { trianglelist, setTriangleList, setState } = useTriangleContext();
  const [selected, setSelected] = useState(options[0]); // Default to first option
  // const { state, setState } = useTriangleContext();
  const handleChange = (e) => {
    setSelected(e.target.value);
  }

  const CloseTheSetting = () => {
    setState(prev => ({ ...prev, toggleSetting: false }));

  };
  const submitHandler = () => {
    setTriangleList(selected);
    setState(prev => ({ ...prev, toggleSetting: false }));

  };


  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <span className='h4-large' onClick={CloseTheSetting} style={{
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
          fontSize: '1.125rem', // text-lg
          fontWeight: 600,      // font-semibold
          marginBottom: '1rem', // mb-4
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Select Triangles
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <select
          value={selected}
          onChange={handleChange}
          style={{
            border: '1px solid #ccc',   // border-gray-400
            padding: '0.5rem 0.75rem',  // px-3 py-2
            borderRadius: '0.25rem',    // rounded
            width: '200px',
          }}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
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
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.25)";
            e.target.style.background = "linear-gradient(90deg, #2563eb, #1d4ed8)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.15)";
            e.target.style.background = "linear-gradient(90deg, #3b82f6, #2563eb)";
          }}
          className="text_body"
        >
          Update
        </button>
      </div>
    </div>

  )
}

export default TriangleSetting