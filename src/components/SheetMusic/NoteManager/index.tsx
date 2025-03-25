import * as S from "./styles";
import NoteCard from "./components/NoteCard";
import React, { useEffect } from "react";
import UseUtils from "@/utils/useUtils";
import { getAllMusicData, setNote } from "@/context/MusicData/musicDataSlice";
import { RESTS, sheetDisplaySettings, validNotes } from "@/context/MusicData/constants";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { useState } from "react";
import { Radio, Switch } from "antd";
import { addNote, addMeasure } from "@/context/MusicData/musicDataSlice";
import { Note } from "@/context/MusicData/types";

function NoteManager() {
  const [noteInput, setNoteInput] = useState<string>("");
  const [timeInput, setTimeInput] = useState<number>(4);
  const [restInput, setRestInput] = useState<boolean>(false);

  const { notes, timeSignature, selectedNote } = useAppSelector(getAllMusicData);
  const { mapNotesToMeasures, makeEmptyMeasure } = UseUtils();
  const stateDispatch = useAppDispatch();

  const measures = mapNotesToMeasures(notes, timeSignature);

  useEffect(() => {
    if (measures.length !== 0) setNoteInput(notes[selectedNote].keys.join(" "));
  }, [selectedNote]);

  const makeNote = (userInput: string, duration: number): Note => {
    const notes = userInput.split(" ");
    return { keys: notes, duration: `${duration}${restInput ? "r" : ""}`, voice: 1 };
  };

  const validateNoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const inputText = e.target.value.toLowerCase().trim();
    setNoteInput(e.target.value);
  };

  const handleSetNote = () => {
    if (measures.length === 0) {
      const newMeasure = makeEmptyMeasure(timeSignature, timeInput);
      newMeasure[0] = makeNote(noteInput, timeInput);
      stateDispatch(addMeasure(newMeasure));
    } else {
      const newNote = makeNote(noteInput, timeInput);
      stateDispatch(setNote(newNote));
    }
  };

  const handleAddMeasure = () => {
    const emptyMeasure = makeEmptyMeasure(timeSignature, timeInput);
    stateDispatch(addMeasure(emptyMeasure));
  };

  const handleRestToggle = (checked: boolean) => {
    setRestInput(!checked);
  };

  let indexControl = 0;
  return (
    <S.Container>
      <Switch checkedChildren={"n"} unCheckedChildren={"r"} defaultChecked onChange={handleRestToggle} />
      <input type="text" name="noteInput" id="noteInput" value={noteInput} onChange={validateNoteInputChange} />
      <button type="button" onClick={handleSetNote}>
        ok
      </button>
      <Radio.Group defaultValue={timeInput} buttonStyle="solid" onChange={(e) => setTimeInput(e.target.value)}>
        <Radio.Button value={2}>2</Radio.Button>
        <Radio.Button value={4}>4</Radio.Button>
        <Radio.Button value={8}>8</Radio.Button>
        <Radio.Button value={16}>16</Radio.Button>
      </Radio.Group>
      <S.NoteDisplayContainer>
        {measures.map((measure, i) => {
          return (
            <S.MeasuresContainer>
              {measure.map((note, j) => {
                return <NoteCard key={j} index={indexControl++} note={note} />;
              })}
            </S.MeasuresContainer>
          );
        })}
      </S.NoteDisplayContainer>
      <button type="button" onClick={handleAddMeasure}>
        +
      </button>
    </S.Container>
  );
}

export default NoteManager;
