import React from "react";
import {default as SoundButton} from './controls/SoundButton'
import {useAppSelector} from "../lib/store/hooks";
import {
  selectSounds,
  selectCurrentSound,
} from "../lib/store/controlsSlice";
function SoundButtons() {
  const sounds = useAppSelector(selectSounds);
  const currentSound = useAppSelector(selectCurrentSound);

  return (
    <div className="grid grid-cols-3">
      <div><SoundButton value={sounds[0].name} id={sounds[0].id} currentSound={currentSound}/></div>
      <div><SoundButton value={sounds[1].name} id={sounds[1].id} currentSound={currentSound}/></div>
      <div></div>
    </div>
  )
}

export default SoundButtons;