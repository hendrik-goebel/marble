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
    const height = 300
    canvas.width = width;
    canvas.height = height;

    const rect = canvas.getBoundingClientRect();

    const handleMouseDown = (e) => {
      if (editMode === constants.MODE.NONE){
        let bar = canvasControllerRef.current.getCollidingBar(e.clientX - rect.left, e.clientY - rect.top);
        if (bar) {
          editMode = constants.MODE.MOVING;
        } else {
          editMode = constants.MODE.DRAWING;
          bar = canvasControllerRef.current.spawnBar(e.clientX - rect.left, e.clientY - rect.top);
        }
        canvasControllerRef.current.selectBar(bar);
      }
    }
    canvas.addEventListener('mousedown', handleMouseDown);

    const handleMouseUp = (e) => {
      editMode = constants.MODE.NONE;
    }
    canvas.addEventListener('mouseup', handleMouseUp);

    const handleMouseMove = (e) => {
      if (editMode === constants.MODE.DRAWING) {
        canvasControllerRef.current.extendSelectedBar(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove);

    directorRef.current.bpm = control.bpm;
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
      <canvas ref={canvasRef}  style={{ border: '1px solid black' }}>
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
};
export default Canvas;