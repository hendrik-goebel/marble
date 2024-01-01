import React, { useRef, useEffect } from 'react';
import Director from '../lib/Director.js'

const Canvas = ({bpm}) => {
  const canvasRef = useRef(null)
  const directorRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!directorRef.current) {
      directorRef.current = new Director(context);
      directorRef.current.init();
    }

    directorRef.current.bpm = bpm;

    const width = document.getElementById('canvasContainer').offsetWidth;
    const height = 300
    canvas.width = width;
    canvas.height = height;
    directorRef.current.canvasWidth = width;
    directorRef.current.canvasHeight = height;
  }, [bpm]);

  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef}  style={{ border: '1px solid black' }}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
export default Canvas;