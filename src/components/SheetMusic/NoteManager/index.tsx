import ControlContainer from "@/components/ControlContainer";
import { RESTS } from "@/context/MusicData/constants";
import { addMeasure, getAllMusicData, setNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";
import { NoteKey } from "@/context/MusicData/types";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import UseHotkey from "@/utils/useHotkey";
import UseMusicSymbol from "@/utils/useMusicSymbol";
import UsePlayer from "@/utils/usePlayer";
import UseUtils from "@/utils/useUtils";
import { Button, Radio, RadioChangeEvent, Switch, Tooltip } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import NoteInput from "./components/NoteInput";
import PianoInput from "./components/PianoInput";
import * as S from "./styles";

enum InputTypes {
  Notes,
  Piano,
}

function NoteManager() {
  const { notes, timeSignature, selectedNote } = useAppSelector(getAllMusicData);

  const [timeInput, setTimeInput] = useState<string>("4");
  const [restInput, setRestInput] = useState<boolean>(false);
  const [inputType, setInputType] = useState<InputTypes>(InputTypes.Notes);
  const [voice, setVoice] = useState<number>(1);
  const [autoNext, setAutoNext] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { makeEmptyMeasure } = UseUtils();
  const { playNote } = UsePlayer();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notes[selectedNote]) {
      setTimeInput(notes[selectedNote].duration.replace("r", ""));
      setRestInput(notes[selectedNote].duration.includes("r"));
      setVoice(notes[selectedNote].voice);
    }
  }, [notes, selectedNote, voice]);

  useEffect(() => {
    if (!autoNext && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [autoNext]);

  const keys = useMemo(
    () => (notes[selectedNote].duration.includes("r") ? [] : notes[selectedNote].keys),
    [notes, selectedNote, voice],
  );

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
    setRestInput(false);

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
    playNote();

    if (autoNext) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        let nextSelectedNote = selectedNote + 1;

        if (nextSelectedNote === notes.length) {
          nextSelectedNote = 0;
        }
        dispatch(setSelectedNote(nextSelectedNote));
      }, 2500);
    }

    if (selectedNote + 1 >= notes.length) {
      dispatch(addMeasure(makeEmptyMeasure(timeSignature, timeInput)));
    }
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
    let nextSelectedNote = selectedNote + direction;
    if (nextSelectedNote < 0) {
      nextSelectedNote = notes.length - 1;
    } else if (nextSelectedNote >= notes.length) {
      nextSelectedNote = 0;
    }
    dispatch(setSelectedNote(nextSelectedNote));
  };

  const handleDurationChange = (e: RadioChangeEvent) => {
    setTimeInput(e.target.value);
  };

  const handleToggleAutoNext = () => {
    setAutoNext(!autoNext);
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
  UseHotkey("!", () => setTimeInput("2"), { withShift: true });
  UseHotkey("@", () => setTimeInput("4"), { withShift: true });
  UseHotkey("#", () => setTimeInput("8"), { withShift: true });
  UseHotkey("$", () => setTimeInput("16"), { withShift: true });
  UseHotkey("Delete", () => handleRestToggle(false));

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
            <Radio.Button value={InputTypes.Piano}>Teclado</Radio.Button>
          </Radio.Group>
        </div>

        {notes[selectedNote] && inputElement()}

        <S.NoteSelectControlsContainer>
          <S.ControlTitle>Controles de seleção</S.ControlTitle>

          <S.NoteSelectControls>
            <Button type="default" onClick={() => handleMoveSelection(-1)}>
              Anterior
            </Button>
            <S.NextContainer>
              <S.NextButton onClick={() => handleMoveSelection(1)}>Próxima</S.NextButton>
              <S.AutoButton onClick={handleToggleAutoNext} $active={autoNext}>
                {UseMusicSymbol("REPEAT", "SMALL")}
              </S.AutoButton>
            </S.NextContainer>
          </S.NoteSelectControls>
          <Button type="default" onClick={handleAddMeasure}>
            Novo Compasso
          </Button>
        </S.NoteSelectControlsContainer>

        <S.RestContainer>
          <S.ControlTitle>Pausa</S.ControlTitle>
          <Switch
            defaultChecked
            onChange={handleRestToggle}
            value={!restInput}
            aria-label="Ativar ou desativar entrada de pausa"
          />
          <S.ControlTitle>Nota</S.ControlTitle>
        </S.RestContainer>

        <S.DurationContainer>
          <S.ControlTitle>Duração</S.ControlTitle>
          <S.DurationRadio value={timeInput} buttonStyle="solid" onChange={handleDurationChange}>
            <Tooltip title={"Mínima"}>
              <S.DurationOption aria-label="Duração de mínima" value={"2"}>
                {UseMusicSymbol("2", "SMALL")}
              </S.DurationOption>
            </Tooltip>
            <Tooltip title={"Semínima"}>
              <S.DurationOption aria-label="Duração de semínima" value={"4"}>
                {UseMusicSymbol("4", "SMALL")}
              </S.DurationOption>
            </Tooltip>
            <Tooltip title={"Colcheia"}>
              <S.DurationOption aria-label="Duração de colcheia" value={"8"}>
                {UseMusicSymbol("8", "SMALL")}
              </S.DurationOption>
            </Tooltip>
            <Tooltip title={"Semicolcheia"}>
              <S.DurationOption aria-label="Duração de semicolcheia" value={"16"}>
                {UseMusicSymbol("16", "SMALL")}
              </S.DurationOption>
            </Tooltip>
          </S.DurationRadio>
        </S.DurationContainer>
      </ControlContainer>
    </>
  );
}

export default NoteManager;
