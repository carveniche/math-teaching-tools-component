export const calculateDivisors = (getIntegerStart, getIntegerEnd, denominator, setgegetDiviser, setShowError, setError) => {
  let totalDivisor = [];

  const start = parseInt(getIntegerStart);
  const end = parseInt(getIntegerEnd);
  const caldenominator = parseInt(denominator);
  const range = end - start;
  const value = range / caldenominator

  if (start < end && range < 26 && caldenominator) {
    // if(!caldenominator) return;
    setShowError(false);

    const firstElement = Math.floor(start / caldenominator);
    const lastElement = Math.ceil(end / caldenominator);

    const startNumerator = firstElement * caldenominator;
    const endNumerator = lastElement * caldenominator;

    let reachedEnd = false;

    const addEnd = end + 1
    const epsilon = 1e-10;
    for (let i = start; i < end + epsilon; i += value) {
      // Fix floating point for current step
      const step = Math.round(i * 1e10) / 1e10;

      let displayValue;

      if (Math.abs(step - start) < 1e-10) {
        displayValue = start; // keep start as-is
      } else if (Math.abs(step - end) < 1e-10) {
        displayValue = end; // keep end as-is
      } else {
        // Compute numerator as integer
        const numeratorValue = step * caldenominator;
        displayValue = `${Math.round(numeratorValue)}/${caldenominator}`;
      }

      totalDivisor.push(displayValue);
    }

    console.log(totalDivisor);

    setgegetDiviser(totalDivisor);
  } else {
    setShowError(true);
    if (!start && start != 0) {
      setError("Enter valid start value");
    }

    else if (!end) {
      setError("Enter the valid  end number");
    }
    else if (!caldenominator && caldenominator != 0) {
      setError("Enter the valid  divisions");
    }
    else if (start > end) {
      setError("Start Value Should Not Be Greater Than End value");
    }

    else if (range >= 25) {
      setError("After subtracting, both start and end values must be below 25.");
    }
  }

};