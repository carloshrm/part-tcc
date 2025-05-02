import { FontInfo } from "vexflow";
import { Note } from "./types";

export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

export enum SaveOptions {
  PDF = "pdf",
  PNG = "png",
  MIDI = "midi",
}

export const RESTS: { [key: string]: Note } = {
  WHOLE: { keys: [{ note: "b", octave: 4 }], duration: "1r", voice: 1 },
  HALF: { keys: [{ note: "b", octave: 4 }], duration: "2r", voice: 1 },
  QUARTER: { keys: [{ note: "b", octave: 4 }], duration: "4r", voice: 1 },
  EIGHTH: { keys: [{ note: "b", octave: 4 }], duration: "8r", voice: 1 },
  SIXTEENTH: { keys: [{ note: "b", octave: 4 }], duration: "16r", voice: 1 },
  "1": { keys: [{ note: "b", octave: 4 }], duration: "1r", voice: 1 },
  "2": { keys: [{ note: "b", octave: 4 }], duration: "2r", voice: 1 },
  "4": { keys: [{ note: "b", octave: 4 }], duration: "4r", voice: 1 },
  "8": { keys: [{ note: "b", octave: 4 }], duration: "8r", voice: 1 },
  "16": { keys: [{ note: "b", octave: 4 }], duration: "16r", voice: 1 },
  "32": { keys: [{ note: "b", octave: 4 }], duration: "32r", voice: 1 },
  "3": { keys: [{ note: "b", octave: 4 }], duration: "1dr", voice: 1 },
  "6": { keys: [{ note: "b", octave: 4 }], duration: "2dr", voice: 1 },
  "12": { keys: [{ note: "b", octave: 4 }], duration: "4dr", voice: 1 },
  "24": { keys: [{ note: "b", octave: 4 }], duration: "8dr", voice: 1 },
  "48": { keys: [{ note: "b", octave: 4 }], duration: "16dr", voice: 1 },
  "96": { keys: [{ note: "b", octave: 4 }], duration: "32dr", voice: 1 },
};

export const validTimeSignatureOptions = {
  beats: [3, 4, 5, 6, 9, 12],
  values: [4, 8, 16],
};

export const validNotes = ["a", "b", "c", "d", "e", "f", "g"];

export const validKeySignatures = {
  sharps: ["G", "D", "A", "E", "B", "F#", "C#"],
  flats: ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
};

export const relativeMinors = {
  c: "a",
  g: "e",
  d: "b",
  a: "f#",
  e: "c#",
  b: "g#",
  f: "d",
  bb: "g",
  eb: "c",
  ab: "f",
  db: "bb",
  gb: "eb",
  cb: "ab",
};

export const sheetDisplaySettings = {
  measureWidth: 400,
  widthOffset: 10,
  heightOffset: 110,
  noteWidth: 26,
  maxMeasuresPerLine: 3,
  canvasWidth: 1240,
  canvasHeight: 1754,
};

export const defaultFontSettings: FontInfo = {
  family: "Roboto",
  size: 40,
  weight: "",
  style: "",
};

export const TEMPO = {
  24: "Larghissimo",
  40: "Adagissimo",
  41: "Largo",
  50: "Adagio",
  55: "Lento",
  72: "Andante",
  84: "Andantino",
  100: "Moderato",
  110: "Allegretto",
  120: "Allegro",
  132: "Allegro vivace",
  140: "Vivace",
  150: "Presto",
  160: "Prestissimo",
};

export const musicNotes = ["c", "d", "e", "f", "g", "a", "b"];

export const noteInputOctaves = [3, 4, 5, 6];
