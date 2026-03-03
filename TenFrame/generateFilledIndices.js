// export const generateFilledIndices = (value) => {
//     const count =  Math.max(1, Math.floor(Math.random() * (value + 1)));
//     const indices = new Set();
//     while (indices.size < count) {
//       indices.add(Math.floor(Math.random() * value));
//     }
//     return [...indices];
//   };
  
export function generateFilledIndices(length) {
  const count = Math.floor(Math.random() * length) + 1; 
    return Array.from({ length: count }, (_, i) => i); 
  }
  

const emojis = ['🍎', '🐶', '🔵','🍓'];



export const generateRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];

}
