import React, { useEffect, useRef } from 'react';
import * as Loop from '../lib/loop';
import {useAppDispatch} from "../lib/store/hooks";
import setup from '../lib/setup';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context || !canvasRef.current) {
      return;
    }
    canvasRef.current.width = setup.app.canvas.width;
    canvasRef.current.height = setup.app.canvas.height;

    Loop.default(context);
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas !== null) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const context = canvas.getContext('2d');
      if (context) {
        Loop.handleMouseDown(context, x, y);
      }

    }
  };

  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef} onMouseDown={handleMouseDown} style={{border: '1px solid black'}}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}

export default Canvas;