import React, { useRef, useEffect } from 'react';
import Director from '../lib/Director.js'
import { useSelector} from "react-redux";

const Canvas = () => {
  const canvasRef = useRef(null)
  const directorRef = useRef(null)
  const control = useSelector((state) => state.control)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!directorRef.current) {
      directorRef.current = new Director(context);
      directorRef.current.init();
    }

    const width = document.getElementById('canvasContainer').offsetWidth;
    const height = 300
    canvas.width = width;
    canvas.height = height;

    directorRef.current.bpm = control.bpm;
    directorRef.current.isPlaying = control.isPlaying
    directorRef.current.canvasWidth = width;
    directorRef.current.canvasHeight = height;
  }, [control]);

  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef}  style={{ border: '1px solid black' }}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
export default Canvas;