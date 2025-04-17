import ControlContainer from "@/components/ControlContainer";
import { FIGURES, RESTS } from "@/context/MusicData/constants";
import { addMeasure, getAllMusicData, setNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";
import { NoteKey } from "@/context/MusicData/types";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import UseHotkey from "@/utils/useHotkey";
import UsePlayer from "@/utils/usePlayer";
import UseUtils from "@/utils/useUtils";
import { Button, Radio, RadioChangeEvent, Switch, Tooltip } from "antd";
import { useState } from "react";
import NoteInput from "./components/NoteInput";
import PianoInput from "./components/PianoInput";
import * as S from "./styles";

enum InputTypes {
  Notes,
  Piano,
}

function NoteManager() {
  const [timeInput, setTimeInput] = useState<number>(4);
  const [restInput, setRestInput] = useState<boolean>(false);
  const [inputType, setInputType] = useState<InputTypes>(InputTypes.Notes);

  const { notes, timeSignature, selectedNote } = useAppSelector(getAllMusicData);
  const { makeEmptyMeasure } = UseUtils();
  const { playNote } = UsePlayer();
  const dispatch = useAppDispatch();

  const keys = notes[selectedNote].duration.includes("r") ? [] : notes[selectedNote].keys;

  const handleSetAccidental = (noteKey: NoteKey, accidental: string) => {
    if (noteKey.note[1] && (noteKey.note[1] === "#" || noteKey.note[1] === "b")) {
      accidental = "";
    }
    const currentKeys = keys.filter((key) => !(key.note === noteKey.note && key.octave === noteKey.octave));

    const newKey = { note: `${noteKey.note[0]}${accidental}`, octave: noteKey.octave };
    const newNote = { keys: [...currentKeys, newKey], duration: timeInput.toString(), voice: 1 };
    dispatch(setNote(newNote));
  };

  const handleSetNoteInput = (noteKey: NoteKey, deselect: boolean) => {
    if (restInput) {
      return;
    }

    let currentKeys: NoteKey[] = keys;
    if (deselect) {
      currentKeys = currentKeys.filter((key) => !(key.note === noteKey.note && key.octave === noteKey.octave));
    } else {
      currentKeys = [...currentKeys, noteKey];
    }

    if (currentKeys.length === 0) {
      dispatch(setNote(RESTS[timeInput]));
      return;
    }

    let newNote = { keys: currentKeys, duration: timeInput.toString(), voice: 1 };
    dispatch(setNote(newNote));
    playNote(newNote.keys, timeInput);
  };

  const handleAddMeasure = () => {
    const emptyMeasure = makeEmptyMeasure(timeSignature, timeInput);
    dispatch(addMeasure(emptyMeasure));
  };

  const handleRestToggle = (checked: boolean) => {
    if (!checked) {
      dispatch(setNote(RESTS[timeInput]));
    }

    setRestInput(!checked);
  };

  const handleMoveSelection = (direction: number) => {
    const nextSelectedNote = selectedNote + direction;
    if ((selectedNote === 0 && direction < 0) || (selectedNote === notes.length - 1 && direction > 0)) {
      return;
    }
    dispatch(setSelectedNote(nextSelectedNote));
  };

  const handleDurationChange = (e: RadioChangeEvent) => {
    setTimeInput(e.target.value);
  };

  const inputElement = () => {
    switch (inputType) {
      case InputTypes.Notes:
        return <NoteInput noteSetter={handleSetNoteInput} accSetter={handleSetAccidental} noteInputState={keys} />;
      case InputTypes.Piano:
        return <PianoInput noteSetter={handleSetNoteInput} accSetter={handleSetAccidental} noteInputState={keys} />;
    }
  };

  UseHotkey("ArrowLeft", () => handleMoveSelection(-1));
  UseHotkey("ArrowRight", () => handleMoveSelection(1));

  return (
    <>
      <ControlContainer name="Notas">
        <div>
          <Radio.Group
            defaultValue={InputTypes.Notes}
            buttonStyle="solid"
            onChange={(e) => setInputType(e.target.value)}
          >
            <Radio.Button value={InputTypes.Notes}>Notas</Radio.Button>
            <Radio.Button value={InputTypes.Piano}>Piano</Radio.Button>
          </Radio.Group>
        </div>

        {notes[selectedNote] && inputElement()}

        <S.NoteSelectControls>
          <Button type="default" onClick={() => handleMoveSelection(-1)}>
            Anterior
          </Button>
          <Button type="default" onClick={() => handleMoveSelection(1)}>
            Próxima
          </Button>
          <S.AutoButton>{">"}</S.AutoButton>
          <Button type="default" onClick={() => playNote(keys, timeInput)}>
            Ouvir
          </Button>
          <Button type="default" onClick={handleAddMeasure}>
            Novo Compasso
          </Button>
        </S.NoteSelectControls>

        <S.RestContainer>
          <S.ControlTitle>Pausa</S.ControlTitle>
          <Switch defaultChecked onChange={handleRestToggle} />
          <S.ControlTitle>Nota</S.ControlTitle>
        </S.RestContainer>

        <S.DurationContainer>
          <S.ControlTitle>Duração</S.ControlTitle>
          <S.DurationRadio defaultValue={timeInput} buttonStyle="solid" onChange={handleDurationChange}>
            <Tooltip title={"Mínima"}>
              <S.DurationOption value={2}>{FIGURES[2]}</S.DurationOption>
            </Tooltip>
            <Tooltip title={"Semínima"}>
              <S.DurationOption value={4}>{FIGURES[4]}</S.DurationOption>
            </Tooltip>
            <Tooltip title={"Colcheia"}>
              <S.DurationOption value={8}>{FIGURES[8]}</S.DurationOption>
            </Tooltip>
            <Tooltip title={"Semicolcheia"}>
              <S.DurationOption value={16}>{FIGURES[16]}</S.DurationOption>
            </Tooltip>
          </S.DurationRadio>
        </S.DurationContainer>
      </ControlContainer>
    </>
  );
}

export default NoteManager;
