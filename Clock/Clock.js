export const createClockNumbers = (clockFace) => {
    // console.log(clockFace,"clockFace")
    for (let i = 1; i <= 12; i++) {
      const number = document.createElement('div');
      number.className = 'number';
      number.style.transform = `rotate(${i * 30}deg)`;
      // number.style.padding =`padding:0.75rem`
      const numberSpan = document.createElement('span');
      numberSpan.style.display = 'inline-block';
      numberSpan.style.transform = `rotate(${-i * 30}deg)`;
      numberSpan.textContent = i;
  
         const tick = document.createElement('div');
      tick.className = "tick-mark";
      number.appendChild(tick);
      number.appendChild(numberSpan);
      clockFace.appendChild(number);
    }
  };
  
  // export const validateTimeInput = (input) => {
  //   const parts = input.split(':');
  //   if (parts.length !== 2) return false;
    
  //   const hours = parseInt(parts[0]);
  //   const minutes = parseInt(parts[1]);
    
  //   if (isNaN(hours) || isNaN(minutes)) return false;
  //   if (hours < 1 || hours > 12) return false;
  //   if (minutes < 0 || minutes > 59) return false;
    
  //   return true;
  // };
  
  export const calculateDegrees = (time) => {
    return {
      hourDegrees: (time.hours % 12) * 30 + (time.minutes / 60) * 30,
      minuteDegrees: time.minutes * 6,
      secondDegrees: time.seconds * 6
    };
  };
  
  export const timeToWords = (hours, minutes) => {
  const numberWords = [
    'Twelve', 'One', 'Two', 'Three', 'Four', 
    'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
    'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three', 'Twenty-four',
    'Twenty-five', 'Twenty-six', 'Twenty-seven', 'Twenty-eight', 'Twenty-nine',
    'Thirty'
  ];
  
    // console.log(minutes,"minutes")
    // console.log(hours,"hours")
    const hour = hours % 12;
    const nextHour = (hour + 1) % 12;
    //  console.log(hour,"hour")
    //  console.log(nextHour,"nextHour")
    if (minutes === 0) {
      return `${numberWords[hour]} o'clock`;
    } else if (minutes === 15) {
      return `Quarter past ${numberWords[hour].toLowerCase()}`;
    } else if (minutes === 30) {
      return `Half past ${numberWords[hour].toLowerCase()}`;
    } else if (minutes === 45) {
      return `Quarter to ${numberWords[nextHour].toLowerCase()}`;
    } else if (minutes < 30) {
      return `${numberWords[minutes]} past ${numberWords[hour].toLowerCase()}`;
    } else {
      return `${numberWords[60 - minutes]} to ${numberWords[nextHour].toLowerCase()}`;
    }
  };
  