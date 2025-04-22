import { Clef, RESTS } from "@/context/MusicData/constants";
import { Note, TimeSignature } from "@/context/MusicData/types";
import { jsPDF } from "jspdf";
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

  const makeEmptyMeasure = (timeSignature: TimeSignature, duration: string) => {
    const notesPerBeat = parseInt(duration) / timeSignature.value;
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
    makeEmptyMeasure,
  };
}

export default UseUtils;
