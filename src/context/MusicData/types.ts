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
  notes: Note[];
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

export const defaultMusicData: MusicDataState = {
  clef: Clef.Treble,
  timeSignature: {
    beats: 4,
    value: 4,
  },
  notes: [
    ...Array(2).fill(RESTS.HALF),
    ...Array(4).fill(RESTS.QUARTER),
    ...Array(4).fill(RESTS.QUARTER),
    ...Array(8).fill({ keys: ["b/4"], duration: "8", voice: 1 }),
    ...Array(4).fill(RESTS.QUARTER),
    ...Array(2).fill(RESTS.HALF),
    ...Array(2).fill(RESTS.HALF),
  ],
};

export const validTimeSignatureOptions = {
  beats: [3, 4, 5, 6],
  values: [4, 6, 8, 12, 16],
};
