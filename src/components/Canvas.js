import React, { useRef, useEffect } from 'react';
import Director from '../lib/Director.js'

const Canvas = ({speed}) => {
  const canvasRef = useRef(null)
  const directorRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!directorRef.current) {
      directorRef.current = new Director(context);
      directorRef.current.init();
    }

    directorRef.current.speed = speed;

    const width = document.getElementById('canvasContainer').offsetWidth;
    const height = 300
    canvas.width = width;
    canvas.height = height;
    directorRef.current.canvasWidth = width;
    directorRef.current.canvasHeight = height;
  }, [speed]);

  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef}  style={{ border: '1px solid black' }}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
export default Canvas;