import React from "react";
import {default as SpeedStepper} from './controls/Stepper'
import {default as SoundButton} from './controls/SoundButton'
import {useAppDispatch, useAppSelector} from "../lib/store/hooks";
import {selectBpm, selectSounds, selectCurrentSound, setBpm as setBpmAction, setCurrentSound as setCurrentSoundAction} from "../lib/store/controlsSlice";

function ControlsBar () {
  const dispatch = useAppDispatch();

  const setBpm = (state: number) => dispatch(setBpmAction(state));
  const bpm = useAppSelector(selectBpm);
  const sounds = useAppSelector(selectSounds);
  const currentSound = useAppSelector(selectCurrentSound);

  return (
    <div className="grid grid-cols-6 gap-4 bg-slate-400">
      <div>
        <SoundButton value={sounds[0].name}  id={sounds[0].id} currentSound={currentSound}/>
        <SoundButton value={sounds[1].name}  id={sounds[1].id} currentSound={currentSound}/>

        <SpeedStepper
          title="BPM"
          value={bpm}
          set={setBpm}
          plus={(value: number) => {
            return value + 1
          }}
          minus={(value: number) => {
            return value - 1
          }}
          plusplus={(value: number) => {
            return value + 10
          }}
          minusminus={(value: number) => {
            return value - 10
          }}/>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>


    </div>
  );
}

export default ControlsBar