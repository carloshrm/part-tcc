import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicDataState, TimeSignature, Note, defaultMusicData } from "./types";
import { Clef, RESTS } from "./constants";

const musicDataSlice = createSlice({
  name: "musicData",
  initialState: defaultMusicData,
  reducers: {
    setClef(state, action: PayloadAction<Clef>) {
      state.notes.forEach((note) => {
        if (note.duration[1] === "r") {
          note.keys = [action.payload === Clef.Bass ? { note: "d", octave: 3 } : { note: "b", octave: 4 }];
        }
      });

      state.clef = action.payload;
    },
    setTimeSig(state, action: PayloadAction<TimeSignature>) {
      const newSignatureMeasure = action.payload.beats * (1 / action.payload.value);
      const measures: Note[][] = [];
      let currentMeasure: Note[] = [];
      let currentMeasureValue = 0;

      for (const note of state.notes) {
        currentMeasureValue += 1 / parseInt(note.duration);
        currentMeasure.push(note);

        if (Math.abs(currentMeasureValue - newSignatureMeasure) < 1e-6) {
          measures.push(currentMeasure);
          currentMeasure = [];
          currentMeasureValue = 0;
        }
      }

      if (currentMeasure.length > 0) {
        const remainingValue = newSignatureMeasure - currentMeasureValue;
        const noteValue = 1 / remainingValue;
        if (noteValue in RESTS) {
          state.notes.push(RESTS[noteValue]);
        }
      }
      state.timeSignature = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
    },
    setNote(state, action: PayloadAction<Note>) {
      const currentNoteDuration = parseInt(state.notes[state.selectedNote].duration);
      const newNoteDuration = parseInt(action.payload.duration);

      if (currentNoteDuration === newNoteDuration) {
        state.notes[state.selectedNote] = action.payload;
      }

      if (currentNoteDuration < newNoteDuration) {
        const splitNoteCount = newNoteDuration / currentNoteDuration;
        const fillNotes = Array(splitNoteCount).fill(RESTS[newNoteDuration]);
        fillNotes[0] = action.payload;
        state.notes.splice(state.selectedNote, 0, ...fillNotes);
      } else {
        const deleteCount = currentNoteDuration / newNoteDuration;
        state.notes.splice(state.selectedNote, deleteCount, action.payload);
      }
    },
    addMeasure(state, action: PayloadAction<Note[]>) {
      state.notes = [...state.notes, ...action.payload];
    },
    setSelectedNote(state, action: PayloadAction<number>) {
      state.selectedNote = action.payload;
      state.hoverNote = -1;
    },
    setHoverNote(state, action: PayloadAction<number>) {
      state.hoverNote = action.payload;
    },
    setKeySignature(state, action: PayloadAction<string>) {
      state.keySignature = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
  selectors: {
    getAllMusicData: (state: MusicDataState) => state,
    getClef: (state: MusicDataState) => state.clef,
    getTimeSig: (state: MusicDataState) => state.timeSignature,
    getNotes: (state: MusicDataState) => state.notes,
    getSelectedNoteIndex: (state: MusicDataState) => state.selectedNote,
    getHoverNote: (state: MusicDataState) => state.hoverNote,
    getSelectedNote: (state: MusicDataState) => state.notes[state.selectedNote],
    getKeySignature: (state: MusicDataState) => state.keySignature,
    getTitle: (state: MusicDataState) => state.title,
  },
});

export const getMeasures = createSelector(
  [musicDataSlice.selectors.getNotes, musicDataSlice.selectors.getTimeSig],
  (notes, timeSignature) => {
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
  },
);

export const {
  setClef,
  setTimeSig,
  addNote,
  addMeasure,
  setSelectedNote,
  setNote,
  setHoverNote,
  setKeySignature,
  setTitle,
} = musicDataSlice.actions;
export const {
  getAllMusicData,
  getClef,
  getTimeSig,
  getNotes,
  getSelectedNoteIndex,
  getSelectedNote,
  getHoverNote,
  getKeySignature,
  getTitle,
} = musicDataSlice.selectors;

export default musicDataSlice.reducer;
