import React, { useRef, useEffect } from 'react';
import Director from '../lib/Director.js'
import CanvasController from "../lib/CanvasController";
import { useSelector} from "react-redux";
import constants from '../lib/Constants.js'


const Canvas = () => {
  const canvasRef = useRef(null);
  const directorRef = useRef(null);
  const canvasControllerRef = useRef(null);
  const control = useSelector((state) => state.control);
  const clickCounter = useRef(0);

  useEffect(() => {
    let editMode = constants.MODE.NONE;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!canvasControllerRef.current) {
      canvasControllerRef.current = new CanvasController(context);
    }

    if (!directorRef.current) {
      directorRef.current = new Director(canvasControllerRef.current);
      directorRef.current.init();
    }

    const width = document.getElementById('canvasContainer').offsetWidth;
    const height = 500
    if (canvas.width != width)  {
      canvas.width = width;
    }
    if (canvas.height != height) {
      canvas.height = height;
    }

    const rect = canvas.getBoundingClientRect();

    const handleMouseDown = (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const singleClickTimer = setTimeout(function () {
        if (clickCounter.current == 1) {
          singleClick()
        }
        if (clickCounter.current > 1) {
          doubleClick()
        }
        clickCounter.current = 0
      }, 200);

      clickCounter.current++

      const singleClick = () => {
        if (editMode === constants.MODE.NONE){
          let bar = canvasControllerRef.current.getCollidingBar(x, y);
          if (bar) {
            editMode = constants.MODE.MOVING;
          } else {
            editMode = constants.MODE.DRAWING;
            bar = canvasControllerRef.current.spawnBar(x, y);
          }
          canvasControllerRef.current.selectBar(bar,x, y);
        }
      };

      const doubleClick = () => {
        let bar = canvasControllerRef.current.getCollidingBar(x, y);
        if (bar) {
          canvasControllerRef.current.deleteBar(bar);
        }
      };
    }
    canvas.addEventListener('mousedown', handleMouseDown);

    const handleMouseUp = (e) => {
      editMode = constants.MODE.NONE;
    }
    canvas.addEventListener('mouseup', handleMouseUp);

    const handleMouseMove = (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (editMode === constants.MODE.DRAWING) {
        canvasControllerRef.current.extendSelectedBar(x, y);
      }
      if (editMode === constants.MODE.MOVING) {
        canvasControllerRef.current.moveSelectedBar(x, y);
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove);

    directorRef.current.bpm = control.bpm;
    directorRef.current.quantisation = control.quantisation;
    directorRef.current.isPlaying = control.isPlaying
    directorRef.current.isPulseEnabled = control.isPulseEnabled
    directorRef.current.canvasWidth = width;
    directorRef.current.canvasHeight = height;

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [control, constants]);

  return (
    <div id="canvasContainer">
      <canvas ref={canvasRef}  style={{ border: '1px solid black' }} >
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
export default Canvas;