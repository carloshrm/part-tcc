import { Clef, RESTS } from "@/context/MusicData/constants";
import { Note, TimeSignature } from "@/context/MusicData/types";
import { StaveNote } from "vexflow";

function UseUtils() {
  const timeSignatureToString = (timeSignature: TimeSignature) => {
    return `${timeSignature.beats}/${timeSignature.value}`;
  };

  const mapNotesToVexflow = (notes: Note[] | undefined, clef: Clef) => {
    if (!notes) return [];

    return notes.map((note) => {
      const newNote = new StaveNote({
        clef,
        keys: note.keys.map((key) => `${key.note}/${key.octave}`),
        duration: note.duration,
        auto_stem: true,
      });
      return newNote;
    });
  };

  // const mapNotesToToneJS = (notes: Note[]) => {
  //   return notes.map((note) => {

  //   })
  // }

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

  const saveAsPDF = (canvas: HTMLCanvasElement) => {
    const document = new jsPDF();
    const imgData = canvas.toDataURL("image/png", 1.0);

    document.addImage(imgData, "PNG", 0, 0, 210, 297);
    document.save("Partitura.pdf");
  };

  const saveAsPNG = (canvas: HTMLCanvasElement) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "Partitura.png";
    link.click();
  };

  return {
    saveAsPDF,
    saveAsPNG,
    timeSignatureToString,
    mapNotesToVexflow,
    mapNotesToMeasures,
    makeEmptyMeasure,
  };
}

export default UseUtils;
