import * as S from "./styles";
import NoteCard from "./components/NoteCard";
import UseUtils from "@/utils/useUtils";
import { getAllMusicData, setNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { useState } from "react";
import { Button, Switch, Tooltip } from "antd";
import { addMeasure } from "@/context/MusicData/musicDataSlice";
import { NoteKey } from "@/context/MusicData/types";
import UsePlayer from "@/utils/usePlayer";
import NoteInput from "./components/NoteInput";
import ControlContainer from "@/components/ControlContainer";
import { FIGURES, RESTS } from "@/context/MusicData/constants";
import TimeSignatureSelector from "../TimeSignatureSelector";

function NoteManager() {
  const [timeInput, setTimeInput] = useState<number>(4);
  const [restInput, setRestInput] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);

  const { notes, timeSignature, selectedNote } = useAppSelector(getAllMusicData);
  const { mapNotesToMeasures, makeEmptyMeasure } = UseUtils();
  const { playNote } = UsePlayer();
  const stateDispatch = useAppDispatch();

  const measures = mapNotesToMeasures(notes, timeSignature);
  const keys = notes[selectedNote].duration.includes("r") ? [] : notes[selectedNote].keys;

  const handleSetAccidental = (noteKey: NoteKey, accidental: string) => {
    if (noteKey.note[1] && (noteKey.note[1] === "#" || noteKey.note[1] === "b")) {
      accidental = "";
    }
    const currentKeys = keys.filter((key) => !(key.note === noteKey.note && key.octave === noteKey.octave));

    const newKey = { note: `${noteKey.note[0]}${accidental}`, octave: noteKey.octave };
    const newNote = { keys: [...currentKeys, newKey], duration: timeInput.toString(), voice: 1 };
    stateDispatch(setNote(newNote));
    if (!mute) {
      playNote(newNote.keys, timeInput);
    }
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
      stateDispatch(setNote(RESTS[timeInput]));
      return;
    }

    let newNote = { keys: currentKeys, duration: timeInput.toString(), voice: 1 };
    stateDispatch(setNote(newNote));
    if (!mute) {
      playNote(newNote.keys, timeInput);
    }
  };

  const handleAddMeasure = () => {
    const emptyMeasure = makeEmptyMeasure(timeSignature, timeInput);
    stateDispatch(addMeasure(emptyMeasure));
  };

  const handleRestToggle = (checked: boolean) => {
    if (!checked) {
      stateDispatch(setNote(RESTS[timeInput]));
    }

    setRestInput(!checked);
  };

  const handleMoveSelection = (direction: "left" | "right") => {
    if ((selectedNote === 0 && direction === "left") || (selectedNote === notes.length - 1 && direction === "right")) {
      return;
    }
    const nextSelectedNote = direction === "left" ? selectedNote - 1 : selectedNote + 1;
    stateDispatch(setSelectedNote(nextSelectedNote));
  };

  let indexControl = 0;
  return (
    <S.Container>
      <ControlContainer name="Notas">
        <Tooltip title="Liga ou Desliga o som">
          <S.MuteButton $isMuted={mute} onClick={() => setMute(!mute)}>
            {mute ? "\ueb26" : "\ueb27"}
          </S.MuteButton>
        </Tooltip>
        {/* <S.PlayButton>{"\ueb1c"}</S.PlayButton> */}
        {notes[selectedNote] && (
          <NoteInput noteSetter={handleSetNoteInput} accSetter={handleSetAccidental} noteInputState={keys} />
        )}
        <S.SelectContainer>
          <Button type="default" onClick={() => handleMoveSelection("left")}>
            Anterior
          </Button>
          <Button type="default" onClick={() => playNote(keys, timeInput)}>
            Ouvir
          </Button>
          <Button type="default" onClick={() => handleMoveSelection("right")}>
            Próxima
          </Button>
          <Button type="default" onClick={handleAddMeasure}>
            Novo Compasso
          </Button>
        </S.SelectContainer>

        <S.RestContainer>
          <S.ControlTitle>Pausa</S.ControlTitle>
          <Switch defaultChecked onChange={handleRestToggle} />
          <S.ControlTitle>Nota</S.ControlTitle>
        </S.RestContainer>

        <S.DurationContainer>
          <S.ControlTitle>Duração</S.ControlTitle>
          <S.DurationRadio defaultValue={timeInput} buttonStyle="solid" onChange={(e) => setTimeInput(e.target.value)}>
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
        <TimeSignatureSelector />
      </ControlContainer>

      <ControlContainer name="Compassos" scroll>
        <S.MeasureDisplayContainer>
          {measures.map((measure, i) => {
            return (
              <S.MeasureContainer key={i} $count={i}>
                {measure.map((note, j) => {
                  return <NoteCard key={j + i} index={indexControl++} note={note} />;
                })}
              </S.MeasureContainer>
            );
          })}
        </S.MeasureDisplayContainer>
      </ControlContainer>
    </S.Container>
  );
}

export default NoteManager;
