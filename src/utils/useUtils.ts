import { Clef, RESTS } from "@/context/MusicData/constants";
import { Note, TimeSignature } from "@/context/MusicData/types";
import { StaveNote } from "vexflow";

function UseUtils() {
  const timeSignatureToString = (timeSignature: TimeSignature) => {
    return `${timeSignature.beats}/${timeSignature.value}`;
  };

  const mapNotesToVexflow = (notes: Note[] | undefined, clef: Clef) => {
    if (!notes) return [];

    return notes.map((note, i) => {
      const newNote = new StaveNote({
        clef,
        keys: note.keys,
        duration: note.duration,
      });
      newNote.setAttribute("note-id", i.toString());
      return newNote;
    });
  };

  const mapNotesToMeasures = (notes: Note[], timeSignature: TimeSignature) => {
    const measureDuration = timeSignature.beats * (1 / timeSignature.value);
    const measures: Note[][] = [];

    let currentMeasure: Note[] = [];
    let currentMeasureValue = 0;

    notes.forEach((note) => {
      currentMeasureValue += 1 / parseInt(note.duration);
      currentMeasure.push(note);

      if (Math.abs(currentMeasureValue - measureDuration) < 1e-6) {
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
