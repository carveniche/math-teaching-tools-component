import React, { useEffect } from 'react'
import { usePlotContext } from '../context/PlotContext';

const BarGraphError = () => {
  const { barerror, setBarError } = usePlotContext();

  useEffect(() => {
    const hasError = Object.values(barerror).some(Boolean);
    if (!hasError) return;

    const timeout = setTimeout(() => {
      setBarError({
        xlavelBarPlotError: false,
        ylavelBarPlotError: false,
        XMarkersBarPlotError: false,
        yMarkersBarPlotError: false,
        xlavelBarPlotEmptyError: false,
        ylavelBarPlotEmptyError: false,
        XMarkersBarPlotEmptyError: false,
      });
    }, 3000); // 20 seconds

    return () => clearTimeout(timeout);
  }, [barerror]);

  const errorMessage = (message: string) => {
    return (
      <div
        style={{
          width: '40%',
          height: '60px',
          wordWrap: 'break-word',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f87171', // Tailwind's red-400
          borderRadius: '0.75rem', // Tailwind's rounded-xl
          fontSize: '20px',
          color:"white",
        }}
      >
        {message}
      </div>
    );
  };


  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        zIndex: 20,
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      {barerror.XMarkersBarPlotError &&
        errorMessage("X Marker length should not exceed 6 characters.")}

      {barerror.yMarkersBarPlotError &&
        errorMessage("Y marker values should be between 0 and 999.")}

      {barerror.xlavelBarPlotError &&
        errorMessage("X label length should not exceed 20 characters.")}

      {barerror.ylavelBarPlotError &&
        errorMessage("Y label length should not exceed 20 characters.")}

      {barerror.XMarkersBarPlotEmptyError &&
        errorMessage("X Marker Can't be blank.")}

      {barerror.xlavelBarPlotEmptyError &&
        errorMessage("X label Can't be blank.")}

      {barerror.ylavelBarPlotEmptyError &&
        errorMessage("Y label Can't be blank.")}
    </div>

  )
}

export default BarGraphError