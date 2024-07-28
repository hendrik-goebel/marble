import React, { useEffect, useRef } from 'react';
import * as Loop from '../lib/loop';
import setup from '../lib/setup';
import {init as initTimer } from "../lib/Timer";
import * as handle from '../lib/handle';


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initTimer();
    const context = canvasRef.current?.getContext('2d');
    if (!context || !canvasRef.current) {
      return;
    }

    canvasRef.current.width = setup.app.canvas.width;
    canvasRef.current.height = setup.app.canvas.height;

    Loop.init(context);
  }, []);

  const handleEvent = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas !== null) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const context = canvas.getContext('2d');
      if (context) {
        switch (event.type) {
          case 'mousedown':
            handle.mouseDown(x, y);
            break;
          case 'mouseup':
            handle.mouseUp(x, y);
            break;
          case 'mousemove':
            handle.mouseMove(x, y);
            break;
        }
      }
    }
  }
  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef} onMouseDown={handleEvent} onMouseUp={handleEvent} onMouseMove={handleEvent} style={{border: '1px solid black'}}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}

export default Canvas;