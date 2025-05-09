import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { Clef, RESTS } from "./constants";
import { defaultMusicData, MusicDataState, Note, TimeSignature } from "./types";

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

      if (currentNoteDuration < newNoteDuration) {
        const splitNoteCount = newNoteDuration / currentNoteDuration;
        const fillNotes = Array(splitNoteCount).fill(RESTS[newNoteDuration]);
        fillNotes[0] = action.payload;

        state.notes.splice(state.selectedNote, 1, ...fillNotes);
      } else if (currentNoteDuration > newNoteDuration) {
        const newNotes = [...state.notes];
        newNotes.splice(state.selectedNote, 0, action.payload);

        const measureDuration = state.timeSignature.beats * (1 / state.timeSignature.value);
        let measureControl = 0;
        let overflownControl: Note[] | undefined = undefined;

        for (const note of newNotes) {
          const currentnoteValue = 1 / parseInt(note.duration);

          if (measureControl + currentnoteValue > measureDuration) {
            const remainingValue = measureDuration - measureControl;
            const overflown = currentnoteValue - remainingValue;

            // TODO: convert to stavetie when implemented
            const newIsRest = note.duration.includes("r");
            const adjustedNote = { ...note, duration: `${1 / remainingValue}${newIsRest ? "r" : ""}` };
            const overflownNote = { ...note, duration: `${1 / overflown}${newIsRest ? "r" : ""}` };
            overflownControl = [adjustedNote, overflownNote];
            measureControl = overflown;
            continue;
          } else {
            measureControl += currentnoteValue;
          }

          if (Math.abs(measureControl - measureDuration) < 1e-6) {
            measureControl = 0;
          }
        }

        if (measureControl > 0) {
          const noteValue = 1 / measureControl;
          if (noteValue in RESTS) {
            newNotes.push(RESTS[noteValue]);
          }
        }

        if (overflownControl) {
          newNotes.splice(state.selectedNote, 1, ...overflownControl);
        }

        state.notes = newNotes;
      } else {
        state.notes[state.selectedNote] = action.payload;
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
    setTempo(state, action: PayloadAction<string>) {
      state.tempo = action.payload;
    },
    setMusicImportData(state, action: PayloadAction<MusicDataState>) {
      const { clef, timeSignature, notes, selectedNote, hoverNote, keySignature, title, tempo } = action.payload;

      state.clef = clef;
      state.timeSignature = timeSignature;
      state.notes = notes;
      state.selectedNote = selectedNote;
      state.hoverNote = hoverNote;
      state.keySignature = keySignature;
      state.title = title;
      state.tempo = tempo;
    },
    setVoice(state, action: PayloadAction<number>) {
      state.activeVoice = action.payload;
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
    getTempo: (state: MusicDataState) => state.tempo,
    getVoice: (state: MusicDataState) => state.activeVoice,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => defaultMusicData);
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
  setTempo,
  setMusicImportData,
  setVoice,
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
  getTempo,
  getVoice,
} = musicDataSlice.selectors;

export default musicDataSlice.reducer;
