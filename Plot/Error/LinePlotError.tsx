import React, { useEffect } from 'react'
import { usePlotContext } from '../context/PlotContext';

const LinePlotError = () => {
    const { linerror, setLineError } = usePlotContext();

    useEffect(() => {
        const hasError = Object.values(linerror).some(Boolean);
        if (!hasError) return;

        const timeout = setTimeout(() => {
            setLineError({
                xlavelLinePlotError: false,
                ylavelLinePlotError: false,
                XMarkersLinePlotError: false,
                xlavelLinePlotEmptyError:false,
                ylavelLinePlotEmptyError:false,
                XMarkersLinePlotEmptyError:false,
            });
        }, 3000); // 20 seconds

        return () => clearTimeout(timeout);
    }, [linerror]);

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
  {linerror.XMarkersLinePlotError &&
    errorMessage("X Marker length  should not exceed 6 characters.")}

  {linerror.xlavelLinePlotError &&
    errorMessage("X label should not exceed 20 characters.")}

  {linerror.ylavelLinePlotError &&
    errorMessage("Y label should not exceed 20 characters.")}

  {linerror.xlavelLinePlotEmptyError &&
    errorMessage("X label can't be blank .")}

  {linerror.ylavelLinePlotEmptyError &&
    errorMessage("Y label can't be blank .")}

  {linerror.XMarkersLinePlotEmptyError &&
    errorMessage("X Marker can't be blank .")}
</div>

    )
}



export default LinePlotError