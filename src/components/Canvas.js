import React, { useRef, useEffect } from 'react';
import Director from '../lib/Director.js'
import { useSelector} from "react-redux";
import constants from '../lib/Constants.js'

const Canvas = () => {
  const canvasRef = useRef(null)
  const directorRef = useRef(null)
  const control = useSelector((state) => state.control)


  useEffect(() => {
    let editMode = constants.MODE.NONE;
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

    canvas.addEventListener('mousedown', (e) => {
      if (editMode === constants.MODE.NONE){
        editMode = constants.MODE.DRAWING;
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      if (editMode === constants.MODE.DRAWING) {
        editMode = constants.MODE.NONE;
      }
    });

    canvas.addEventListener('mousemove', (e) => {
      if (editMode === constants.MODE.DRAWING) {
        const drawEvent = new CustomEvent('onCanvasDraw', {
          detail: {
            x: e.clientX,
            y: e.clientY
          }
        });
        document.dispatchEvent(drawEvent);
      }
    })

    directorRef.current.bpm = control.bpm;
    directorRef.current.isPlaying = control.isPlaying
    directorRef.current.isPulseEnabled = control.isPulseEnabled
    directorRef.current.canvasWidth = width;
    directorRef.current.canvasHeight = height;
  }, [control, constants]);

  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef}  style={{ border: '1px solid black' }}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
export default Canvas;