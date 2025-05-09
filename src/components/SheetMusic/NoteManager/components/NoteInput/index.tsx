import { musicNotes, noteInputOctaves } from "@/context/MusicData/constants";
import { NoteKey } from "@/context/MusicData/types";
import UseHotkey from "@/utils/useHotkey";
import { CarouselRef } from "antd/es/carousel";
import { useEffect, useRef } from "react";
import * as S from "./styles";

export interface NoteInputProps {
  noteSetter: (noteKey: NoteKey, isSelected: boolean) => void;
  noteInputState: NoteKey[];
  accSetter: (noteKey: NoteKey, accidental: string) => void;
}

function NoteInput({ noteSetter, noteInputState, accSetter }: NoteInputProps) {
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    let octaveAvg = Math.round(
      noteInputState.reduce((octave, note) => octave + note.octave, 0) / noteInputState.length,
    );
    if (isNaN(octaveAvg)) {
      octaveAvg = 4;
    }

    if (carouselRef.current) {
      carouselRef.current.goTo(noteInputOctaves.indexOf(octaveAvg));
    }
  }, [noteInputState]);

  UseHotkey("ArrowUp", () => carouselRef.current?.next());
  UseHotkey("ArrowDown", () => carouselRef.current?.prev());

  return (
    <S.NoteControlCarousel ref={carouselRef}>
      {noteInputOctaves.map((octave) => (
        <S.NoteInputCard key={octave}>
          <S.NoteRowContainer $octave={octave}>
            {musicNotes.map((noteSymbol) => {
              const existingKey = noteInputState.find((n) => n.note[0] === noteSymbol && n.octave === octave);
              const isSelected = existingKey !== undefined;
              return (
                <S.NoteButtonContainer key={octave + noteSymbol}>
                  <S.AccidentalButton
                    $isSelected={existingKey?.note[1] === "#"}
                    $show={isSelected}
                    $direction="up"
                    onClick={() => accSetter({ note: existingKey?.note ?? "", octave }, "#")}
                  >
                    {"\uE262"}
                  </S.AccidentalButton>
                  <S.NoteButton
                    onClick={() => noteSetter(isSelected ? existingKey : { note: noteSymbol, octave }, isSelected)}
                    $isSelected={isSelected}
                  >
                    {noteSymbol}
                  </S.NoteButton>
                  <S.AccidentalButton
                    $isSelected={existingKey?.note[1] === "b"}
                    $show={isSelected}
                    $direction="down"
                    onClick={() => accSetter({ note: existingKey?.note ?? "", octave }, "b")}
                  >
                    {"\uE260"}
                  </S.AccidentalButton>
                </S.NoteButtonContainer>
              );
            })}
          </S.NoteRowContainer>
        </S.NoteInputCard>
      ))}
    </S.NoteControlCarousel>
  );
}

export default NoteInput;
