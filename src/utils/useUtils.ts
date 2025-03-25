import { RESTS } from "@/context/MusicData/constants";
import { Note, TimeSignature } from "@/context/MusicData/types";
import { StaveNote } from "vexflow";

function UseUtils() {
  const timeSignatureToString = (timeSignature: TimeSignature) => {
    return `${timeSignature.beats}/${timeSignature.value}`;
  };

  const mapNotesToVexflow = (notes: Note[] | undefined) => {
    if (!notes) return [];

    return notes.map((note, i) => {
      const newNote = new StaveNote({
        keys: note.keys,
        duration: note.duration,
      });
      newNote.setAttribute("note-id", i.toString());
      return newNote;
    });
  };

  const mapNotesToMeasures = (notes: Note[], timeSignature: TimeSignature) => {
    const measures: Note[][] = [];

    let currentMeasure: Note[] = [];
    let currentMeasureValue = 0;
    notes.forEach((note) => {
      const noteValue = parseInt(note.duration);
      currentMeasureValue += timeSignature.value / noteValue;
      currentMeasure.push(note);

      if (currentMeasureValue === timeSignature.value) {
        measures.push(currentMeasure);
        currentMeasure = [];
        currentMeasureValue = 0;
      }
    });
    return measures;
  };

  const makeEmptyMeasure = (timeSignature: TimeSignature, duration: number) => {
    const notesPerBeat = duration / timeSignature.value;
    return Array(timeSignature.beats * notesPerBeat).fill(RESTS[duration]);
  };

  return {
    timeSignatureToString,
    mapNotesToVexflow,
    mapNotesToMeasures,
    makeEmptyMeasure,
  };
}

export default UseUtils;
