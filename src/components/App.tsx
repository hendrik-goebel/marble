import React from 'react';
import './App.css';
import Canvas from './Canvas';
import ControlsBar from "./ControlsBar";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <ControlsBar />
        <div className="bg-slate-400">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default App;
