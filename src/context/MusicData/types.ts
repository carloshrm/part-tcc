export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

export interface TimeSignature {
  beats: number;
  value: number;
}

export interface MusicDataState {
  clef: Clef;
  timeSignature: TimeSignature;
}
