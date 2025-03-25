import { Clef, RESTS } from "./constants";

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
  selectedNote: number;
}

export const defaultMusicData: MusicDataState = {
  clef: Clef.Treble,
  timeSignature: {
    beats: 4,
    value: 4,
  },
  selectedNote: 0,
  notes: [
    // ...Array(2).fill({ keys: ["c/5"], duration: "2", voice: 1 }),
    // ...[
    //   { keys: ["b/4"], duration: "4", voice: 1 },
    //   { keys: ["a/4"], duration: "4", voice: 1 },
    //   { keys: ["g/4"], duration: "4", voice: 1 },
    //   { keys: ["e/5"], duration: "4", voice: 1 },
    // ],
    // ...Array(4).fill(RESTS.QUARTER),
    // ...Array(8).fill({ keys: ["b/4"], duration: "8", voice: 1 }),
    // ...Array(4).fill(RESTS.QUARTER),
    // ...Array(2).fill(RESTS.HALF),
    // ...Array(2).fill(RESTS.HALF),
  ],
};
