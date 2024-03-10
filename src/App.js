import './App.css';
import {useState} from "react";
import {default as SpeedStepper} from './components/Stepper';
import {default as PulseCheckbox} from './components/Checkbox';
import {default as PlayButton} from './components/Button';
import {default as QuantisationStepper} from './components/Stepper';
import {default as SoundButton} from './components/SoundButton';

import Canvas from './components/Canvas';
import {useSelector, useDispatch}  from "react-redux";
import {
  setBpm as dispatchSetBpm,
  setPlaying as dispatchPlaying,
  setPulseEnabled,
  setQuantisation as dispatchSetQuantisation,
  setCurrentSoundId as dispatchSetCurrentSoundId
} from "./lib/state/controlSlice";

function App() {
  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.control.isPlaying);
  const bpm = useSelector((state) => state.control.bpm);
  const isPulseEnabled = useSelector((state) => state.control.isPulseEnabled);
  const quantisation = useSelector((state) => state.control.quantisation);
  const currentSoundId = useSelector((state) => state.control.currentSoundId);
  const setIsPlaying = (state) => dispatch(dispatchPlaying(state));
  const setBpm = (state) => dispatch(dispatchSetBpm(state));
  const setIsPulseEnabled = (state) => dispatch(setPulseEnabled(state));
  const setQuantisation = (state) => dispatch(dispatchSetQuantisation(state));
  const setCurrentSoundId = (state) => dispatch(dispatchSetCurrentSoundId(state));


  const maxBpm = 180;
  const minBpm = 60;

  const plusplusBpm = (value) => value + 10 > maxBpm ? maxBpm : value + 10;
  const minusminusBpm = (value) => value - 10 < minBpm ? minBpm : value - 10;
  const doubleMax128 = (value) => (value * 2 <= 128) ? value * 2 : value;
  const halfMin4 = (value) => (value / 2) < 4 ? value : value / 2;
  const plusBpm = (value) => value + 1 > maxBpm ? maxBpm : value + 1;
  const minusBpm = (value) => value - 1 < minBpm ? minBpm : value - 1;

  const sounds = [
    {id: 1, value: 'A'},
    {id: 2, value: 'B'},
    {id: 3, value: 'C'},
  ]
  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-4 bg-slate-400">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {sounds.map((sound) => (
              <div key={sound.id}>
                <SoundButton title={sound.value} value={sound.value}  id={sound.id} setCurrentSoundId={setCurrentSoundId} currentSoundId={currentSoundId}/>
              </div>
            ))}
          </div>

          <div><SpeedStepper title="BPM" value={bpm} set={setBpm} plus={plusBpm} minus={minusBpm} plusplus={plusplusBpm} minusminus={minusminusBpm} /></div>
          <div><QuantisationStepper title="Quantisation" value={quantisation} set={setQuantisation} plus={doubleMax128} minus={halfMin4}  /></div>
          <div><PulseCheckbox title="Pulse" value={isPulseEnabled} set={setIsPulseEnabled}/></div>
          <div><PlayButton title="PLAY" value={isPlaying} set={setIsPlaying}/></div>
          <div className="col-span-5 bg-slate-400">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
