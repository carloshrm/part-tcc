import { Note, TimeSignature } from "@/context/MusicData/types";
import { StaveNote } from "vexflow";

function UseUtils() {
  const timeSignatureToString = (timeSignature: TimeSignature) => {
    return `${timeSignature.beats}/${timeSignature.value}`;
  };

  const mapNotesToVexflow = (notes: Note[] | undefined) => {
    if (!notes) return [];

    return notes.map((note) => {
      return new StaveNote({
        keys: note.keys,
        duration: note.duration,
      });
    });
  };
  const makeEmptyMeasure = (timeSignature: TimeSignature, duration: number) => {
    const notesPerBeat = duration / timeSignature.value;
    return Array(timeSignature.beats * notesPerBeat).fill(RESTS[duration]);
  };

  return {
    timeSignatureToString,
    mapNotesToVexflow,
    makeEmptyMeasure,
  };
}

export default UseUtils;
