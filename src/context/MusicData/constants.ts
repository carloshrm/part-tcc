import { FontInfo } from "vexflow";
import { Note } from "./types";

export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

export const RESTS: { [key: string]: Note } = {
  WHOLE: { keys: ["b/4"], duration: "1r", voice: 1 },
  1: { keys: ["b/4"], duration: "1r", voice: 1 },
  HALF: { keys: ["b/4"], duration: "2r", voice: 1 },
  2: { keys: ["b/4"], duration: "2r", voice: 1 },
  QUARTER: { keys: ["b/4"], duration: "4r", voice: 1 },
  4: { keys: ["b/4"], duration: "4r", voice: 1 },
  EIGHTH: { keys: ["b/4"], duration: "8r", voice: 1 },
  8: { keys: ["b/4"], duration: "8r", voice: 1 },
  SIXTEENTH: { keys: ["b/4"], duration: "16r", voice: 1 },
  16: { keys: ["b/4"], duration: "16r", voice: 1 },
};

export const validTimeSignatureOptions = {
  beats: [3, 4, 5, 6, 9, 12],
  values: [4, 8, 16],
};

export const validNotes = ["a", "b", "c", "d", "e", "f", "g"];

export const sheetDisplaySettings = {
  measureWidth: 400,
  widthOffset: 10,
  heightOffset: 110,
  noteWidth: 26,
  maxMeasuresPerLine: 3,
};

export const defaultFontSettings: FontInfo = {
  family: "Arial",
  size: 10,
  weight: "",
  style: "",
};
