import { Clef } from "./constants";

export interface NoteKey {
  note: string;
  octave: number;
}

export interface Note {
  keys: NoteKey[];
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
  hoverNote: number;
  keySignature: string;
  title: string;
}

export const defaultMusicData: MusicDataState = {
  clef: Clef.Treble,
  title: "Sem título",
  timeSignature: {
    beats: 4,
    value: 4,
  },
  keySignature: "C",
  selectedNote: 0,
  hoverNote: 0,
  notes: [
    {
      keys: [
        {
          note: "b",
          octave: 4,
        },
      ],
      duration: "4",
      voice: 1,
    },
    {
      keys: [
        {
          note: "b",
          octave: 4,
        },
      ],
      duration: "4r",
      voice: 1,
    },
    {
      keys: [
        {
          note: "b",
          octave: 4,
        },
      ],
      duration: "4r",
      voice: 1,
    },
    {
      keys: [
        {
          note: "b",
          octave: 4,
        },
      ],
      duration: "4r",
      voice: 1,
    },
  ],
};
