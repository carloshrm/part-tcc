export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

export interface Note {
  keys: string[];
  duration: string;
  voice: number;
}

export interface TimeSignature {
  beats: number;
  value: number;
}

export interface MusicDataState {
  clef: Clef;
  timeSignature: TimeSignature;
  measures: Note[][];
}

export const RESTS: { [key: string]: Note } = {
  WHOLE: { keys: ["b/4"], duration: "1r", voice: 1 },
  HALF: { keys: ["b/4"], duration: "2r", voice: 1 },
  QUARTER: { keys: ["b/4"], duration: "4r", voice: 1 },
  EIGHTH: { keys: ["b/4"], duration: "8r", voice: 1 },
  SIXTEENTH: { keys: ["b/4"], duration: "16r", voice: 1 },
};

export const defaultMusicData: MusicDataState = {
  clef: Clef.Treble,
  timeSignature: {
    beats: 4,
    value: 4,
  },
  measures: [Array(4).fill(RESTS.QUARTER), Array(2).fill(RESTS.HALF)],
};
