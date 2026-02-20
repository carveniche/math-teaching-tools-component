// src/utils/playSound.js
export const playClickSound = () => {
    const audio = new Audio(
        "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/clickbtN.wav"
    );
    audio.play();
};

export const playDragAndDropSound = () => {
    const audio = new Audio(
        "https://d3g74fig38xwgn.cloudfront.net/teaching-tool/dragAndDropAudio.mp3"
    );
    audio.play();
}