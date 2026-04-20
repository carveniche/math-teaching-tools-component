export const createClockNumbers = (clockFace) => {
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement('div');
    number.className = 'number';
    number.style.transform = `rotate(${i * 30}deg)`;

    const numberSpan = document.createElement('span');
    numberSpan.style.display = 'inline-block';
    numberSpan.style.transform = `rotate(${-i * 30}deg)`;
    numberSpan.textContent = i;

    const tick = document.createElement('div');
    tick.className = 'tick-mark';
    number.appendChild(tick);
    number.appendChild(numberSpan);
    clockFace.appendChild(number);
  }
};

export const calculateDegrees = (time) => {
  return {
    hourDegrees: (time.hours % 12) * 30 + (time.minutes / 60) * 30,
    minuteDegrees: time.minutes * 6,
    secondDegrees: time.seconds * 6,
  };
};

const NUMBER_WORDS = [
  'Twelve',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
  'Twenty',
  'Twenty-one',
  'Twenty-two',
  'Twenty-three',
  'Twenty-four',
  'Twenty-five',
  'Twenty-six',
  'Twenty-seven',
  'Twenty-eight',
  'Twenty-nine',
  'Thirty',
];


export const timeToWords = (hours, minutes) => {
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);
  if (isNaN(h) || isNaN(m)) return '';

  const hourIdx = h % 12;
  const nextHourIdx = (hourIdx + 1) % 12;

  const hourWord = NUMBER_WORDS[hourIdx];
  const nextHourWord = NUMBER_WORDS[nextHourIdx];

  if (!hourWord || !nextHourWord) {
    return `${h}:${String(m).padStart(2, '0')}`;
  }

  if (m === 0) return `${hourWord} o'clock`;
  if (m === 15) return `Quarter past ${hourWord.toLowerCase()}`;
  if (m === 30) return `Half past ${hourWord.toLowerCase()}`;
  if (m === 45) return `Quarter to ${nextHourWord.toLowerCase()}`;

  if (m < 30) {
    const minWord = NUMBER_WORDS[m];
    if (!minWord) return `${m} past ${hourWord.toLowerCase()}`;
    return `${minWord} past ${hourWord.toLowerCase()}`;
  }

  // m > 30
  const remaining = 60 - m;
  const remWord = NUMBER_WORDS[remaining];
  if (!remWord) return `${remaining} to ${nextHourWord.toLowerCase()}`;
  return `${remWord} to ${nextHourWord.toLowerCase()}`;
};