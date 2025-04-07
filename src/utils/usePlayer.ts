import { NoteKey } from "@/context/MusicData/types";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

function UsePlayer() {
  const synthRef = useRef<Tone.PolySynth | null>(null);

  useEffect(() => {
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.003,
        decay: 0.2,
        sustain: 0.2,
        release: 0.4,
      },
    }).toDestination();
  }, []);

  const playNote = (noteKeys: NoteKey[], noteValue: number) => {
    const keys = noteKeys.map((note) => `${note.note}${note.octave}`);
    synthRef.current?.triggerAttackRelease(keys, `${noteValue}n`);
  };

  // const playMusic = (notes: Note[]) => {};

  return {
    playNote,
    // playMusic,
  };
}

export default UsePlayer;
