import React, { useState } from 'react'


const QuadrilateralSetting = ({setFinalSelected,setState}) => {
    const options = [
        "Square",
        "Rectangle",
        "Rhombus",
        "Parallelogram",
        "Trapezoid",
        "Right Trapezoid",
        "Isosceles Trapezoid",
      ];
      
  
  const [selected, setSelected] = useState(options[0]); // Default to first option
 
  const handleChange = (e) => {
    setSelected(e.target.value);
  }

  const handleClosebtn =(()=>{
    setState(prev => ({ ...prev, toggleSetting: false }));

  })
  const submitHandler = () => {
    setFinalSelected(selected);
    setState(prev => ({ ...prev, toggleSetting: false }));
  };


  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <span className='h4-large' onClick={handleClosebtn} style={{
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
          fontSize: '1.125rem', // text-lg
          fontWeight: 600,      // font-semibold
          marginBottom: '1rem', // mb-4
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Select Quadrilaterals
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
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')} // hover:bg-blue-700
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Update
        </button>
      </div>
    </div>

  )
}


export default QuadrilateralSetting