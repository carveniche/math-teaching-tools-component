import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';
import { useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { MdDeleteForever } from "react-icons/md";
import { playDragAndDropSound } from '../utils/playSound';

/* ------------------------------------------------------- */
const DraggableImage = ({ src, isAccess }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'image',
        item: { src },
        canDrag: () => isAccess,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={dragRef}
            src={src}
            alt="drag"
            style={{
                width: 'clamp(45px, 8vh, 80px)',
                height: 'clamp(45px, 8vh, 80px)',
                objectFit: 'cover',
                cursor: 'move',
                margin: '1vh',
                padding: '1vh',
                border: '2px solid #000',
                borderRadius: '0.5rem',
                opacity: isDragging ? 0.5 : 1,
            }}
        />
    );
};

/* ------------------------------------------------------- */
const DraggableDroppedImage = ({ src, index, onRemove,isAccess }) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "dropped-image",
        item: { index, src },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (!dropResult || !dropResult.inside) {
                onRemove(item.index);
            }
        },
        canDrag:()=>isAccess,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));

    return (
        <div
            ref={dragRef}
            style={{
                width: "clamp(45px, 8vh, 80px)",
                height: "clamp(45px, 8vh, 80px)",
                margin: "0.5vh",
                position: "relative",
                cursor: "move",
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "clamp(14px,2vh,20px)",
                }}
            >
                {index + 1}
            </div>
        </div>
    );
};

/* ------------------------------------------------------- */
const DroppableArea = ({ onDrop, droppedImages, onClear, onDropRemove,isAccess }) => {

    const dropCountRef = useRef(droppedImages.length);

    useEffect(() => {
        dropCountRef.current = droppedImages.length;
    }, [droppedImages]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["image", "dropped-image"],
        drop: (item) => {
            if (item.index !== undefined) return { inside: true };

            if (dropCountRef.current < 10) {
                playDragAndDropSound();
                onDrop(item.src);
                return { inside: true };
            }
            return { inside: false };
        },
        collect: (monitor) => ({ isOver: monitor.isOver() })
    }));

    return (
        <div
            ref={drop}
            style={{
                width: "100%",
                flex: 1,
                minHeight: 0,
                border: "2px solid",
                borderColor: isOver ? "#22c55e" : "#6b7280",
                borderRadius: "0.75rem",
                background: isOver ? "#dcfce7" : "#f9fafb",
                display: "flex",
                flexWrap: "wrap",
                padding: "1vh",
                position: "relative",
                overflowY: "auto"
            }}
        >
            {!droppedImages.length ? (
                <div style={{
                    width: "100%",
                    fontSize: "clamp(16px,2vh,22px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777"
                }}>
                    Drag and Drop Here
                </div>
            ) : (
                droppedImages.map((img, idx) => (
                    <DraggableDroppedImage
                        key={idx}
                        src={img}
                        index={idx}
                        onRemove={onDropRemove}
                        isAccess={isAccess}
                    />
                ))
            )}

            <div
                style={{
                    position: "absolute",
                    bottom: "1vh",
                    right: "1vh",
                    cursor: "pointer",
                    fontSize: "clamp(24px,3vh,36px)",
                }}
                onClick={onClear}
            >
                <MdDeleteForever />
            </div>
        </div>
    );
};

/* ------------------------------------------------------- */
const CountingObject = ({ prop, containerHeight, handleDataTrack }) => {

    const { isLiveClass, role_name, StudentData } = prop

    const theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

    const imageOptions = [
        'https://d3g74fig38xwgn.cloudfront.net/teaching-tool/drinkColour.png',
        'https://d3g74fig38xwgn.cloudfront.net/teaching-tool/orange.svg',
        'https://d3g74fig38xwgn.cloudfront.net/teaching-tool/pineapple.svg',
        'https://d3g74fig38xwgn.cloudfront.net/teaching-tool/enablebird.png',
        'https://d3g74fig38xwgn.cloudfront.net/teaching-tool/blueCircleButton.png'
    ];
    const imageName = ["Cold drinks", "Oranges", "Pineapples", "Birds", "Circles"];

    const [selectedImage, setSelectedImage] = useState({
        src: imageOptions[0],
        index: 0,
    });
    const [droppedImages, setDroppedImages] = useState([]);
    const [count, setCount] = useState(0);
    const [isError, setError] = useState(false);
    const errorTimeoutRef = useRef(null);

    const handleDrop = (src) => {
        setDroppedImages(prev => [...prev, src]);
    };

    const removeDroppedImage = (index) => {
        setDroppedImages(prev => prev.filter((_, i) => i !== index));
    };

    const selectImgeHandler = (img, idx) => {
        setSelectedImage({ src: img, index: idx });
        setDroppedImages([]);
        setCount(0);
    };


    useEffect(() => {
        if (!isLiveClass) return;
        handleDataTrack(
            selectedImage,
            count,
        )
    }, [isLiveClass, count, selectedImage])

    useEffect(() => {
        if (!isLiveClass) return;
        if (role_name === "tutor") return;
        if (!StudentData) return;
        const { count, image } = StudentData;
        if (typeof count === "number") {
            setDroppedImages(
                Array.from({ length: count }, () => selectedImage.src)
            );
            setCount(count);
        }
        setSelectedImage(image)

    }, [StudentData, isLiveClass, role_name])


    const inputHandleChange = (value) => {
        const parsed = parseInt(value);
        if (parsed > 10) {
            setError(true);
            clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => setError(false), 2000);
            return;
        }
        const count = Math.max(0, parsed);
        setDroppedImages(Array.from({ length: count }, () => selectedImage.src));
        setCount(count);
    };

    useEffect(() => {
        if (droppedImages.length > 0) {
            setCount(droppedImages.length);
        }
    }, [droppedImages]);

    const isTouchDevice = () =>
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const toggleFullscreen = () => {
        const elem = document.getElementById("enable-full-screen");
        if (!document.fullscreenElement) elem.requestFullscreen();
        else document.exitFullscreen();
    };

    const clearDroppedImages = () => {
        setDroppedImages([]);
        setCount(0);
    };

    const isAccess = isLiveClass ? role_name === "tutor" ? false : true : false;
    const isTutor = isLiveClass ? role_name == "tutor" ? true : false : true;

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                id='enable-full-screen'
                style={{
                    minHeight: isLiveClass ? containerHeight : '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: "url('https://d3g74fig38xwgn.cloudfront.net/teaching-tool/backgroundImages.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                    position: 'relative'
                }}
            >
                <div style={{
                    width: "100%",
                    maxWidth: "min(95vw, 600px)",
                    height: isLiveClass ? "550px" : '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>



                    <div
                        style={{
                            backgroundColor: '#fee2e2',
                            height: '80%',
                            width: '100%',
                            borderRadius: '1rem',
                            padding: '2vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2vh',
                            border: '2px solid #93c5fd',
                            position: 'relative',
                            minHeight: 0
                        }}
                    >
                        {isError && (
                            <div
                                style={{
                                    width: '70%',
                                    textAlign: 'center',
                                    padding: '0.5rem',
                                    borderRadius: '0.75rem',
                                    backgroundColor: '#f87171',
                                    position: 'absolute',
                                    zIndex: isLiveClass ? 1 : 999,
                                    fontSize: '20px',
                                    color: "white",
                                    top: isLiveClass ? "-50px" : "-50px"
                                }}
                            >
                                Enter a value between 0 to 10
                            </div>
                        )}




                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
                            {imageOptions.map((img, index) => (
                                <span
                                    key={index}
                                    onClick={() => selectImgeHandler(img, index)}
                                    style={{
                                        border: '2px solid',
                                        borderColor: selectedImage.src === img ? '#3b82f6' : '#d1d5db',
                                        borderRadius: '0.5rem',
                                        padding: '1vh',
                                        margin: '1vh',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        style={{
                                            width: 'clamp(45px, 8vh, 80px)',
                                            height: 'clamp(45px, 8vh, 80px)',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </span>
                            ))}
                        </div>

                        <DraggableImage key={selectedImage.src} src={selectedImage.src} isAccess={isTutor} />

                        <DroppableArea
                            onDrop={handleDrop}
                            droppedImages={droppedImages}
                            onClear={clearDroppedImages}
                            onDropRemove={removeDroppedImage}
                            isAccess={isTutor}
                        />

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: ismobile ? 'column' : "row",
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1vh'
                            }}
                        >
                            <label style={{ fontSize: "clamp(14px,2vh,20px)" }}>
                                {`Number of ${imageName[selectedImage.index]}`}
                            </label>

                            <input
                                type="number"
                                value={count}
                                min={0}
                                readOnly={isAccess}
                                placeholder="Enter 0-10"
                                onChange={(e) => inputHandleChange(e.target.value)}
                                style={{
                                    border: '2px solid #d1d5db',
                                    borderRadius: '0.5rem',
                                    padding: '1vh',
                                    width: 'clamp(80px,12vw,120px)',
                                    textAlign: 'center',
                                    fontSize: "clamp(14px,2vh,18px)",

                                }}
                            />
                        </div>
                    </div>
                </div>
                {!isLiveClass &&
                    <div
                        style={{
                            position: "absolute",
                            top: "2vh",
                            right: "2vh",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="https://d3g74fig38xwgn.cloudfront.net/teaching-tool/full.png"
                            alt="full-screen"
                            onClick={toggleFullscreen}
                            style={{ width: "clamp(30px,4vh,50px)" }}
                        />
                    </div>}
            </div>
        </DndProvider>
    );
};

export default CountingObject;