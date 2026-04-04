import React, {  useState } from 'react'
import { usePlotContext } from '../context/PlotContext';

const PictureGraphSetting = () => {
  // const options = ['Cake','Cold Drink','Chocalate','Donut','Ice Cream'];
  const options = ['Ice Cream',"Sea Creatures",'Cake', 'Cold Drink'];
   const { setPictureGraph,setState } = usePlotContext();
  const [selected, setSelected] = useState(options[0]); // Default to first option

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  }


  const submitHandler = () => {
    setPictureGraph(selected);
    setState(prev => ({ ...prev, toggleSetting: false }));
  };

const handleCloseBtn=(()=>{
    setState(prev => ({ ...prev, toggleSetting: false }));

})
  return (
    <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position:"relative"
    }}
  >
    <span className='h4-large' onClick={handleCloseBtn} style={{
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <select
          value={selected}
          onChange={handleChange}
          style={{
            border: '1px solid #ccc',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.25rem',
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

export default PictureGraphSetting