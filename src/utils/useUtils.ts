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

  return {
    timeSignatureToString,
    mapNotesToVexflow,
  };
}

export default UseUtils;
