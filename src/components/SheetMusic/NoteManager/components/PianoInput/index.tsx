import { musicNotes } from "@/context/MusicData/constants";
import { NoteKey } from "@/context/MusicData/types";
import { useState } from "react";
import { NoteInputProps } from "../NoteInput";
import * as S from "./styles";

function PianoInput({ noteInputState, noteSetter }: NoteInputProps) {
  const [expanded, setExpanded] = useState(false);

  const selectedNotes: NoteKey[] = noteInputState.map((note) => {
    if (note.note[1] === "b") {
      if (note.note[0] === "c") {
        return { ...note, note: "b", octave: note.octave - 1 };
      }
      if (note.note[0] === "f") {
        return { ...note, note: "e", octave: note.octave };
      }

      let enhIndex = musicNotes.findIndex((n) => n === note.note[0]);
      return { ...note, note: musicNotes[enhIndex - 1] + "#", octave: note.octave };
    } else if (note.note[1] === "#") {
      if (note.note[0] === "b") {
        return { ...note, note: "c", octave: note.octave + 1 };
      }
      if (note.note[0] === "e") {
        return { ...note, note: "f", octave: note.octave };
      }
    }
    return note;
  });

  const pianoContent = (
    <S.PianoContainer $expanded={expanded}>
      {Array(4)
        .fill(musicNotes)
        .flat()
        .map((note, i, allNotes) => {
          const currentOctave = Math.floor(i / musicNotes.length) + 3;

          const toggledNote = selectedNotes.find((n) => n.note[0] === note && n.octave === currentOctave);
          const isSharp = toggledNote?.note[1] === "#";

          const isSelected = toggledNote !== undefined;
          return (
            <S.KeyContainer key={note + currentOctave}>
              <S.WhiteKey
                $isSelected={isSelected && !isSharp}
                onClick={() => noteSetter(isSelected ? toggledNote : { note, octave: currentOctave }, isSelected)}
              >
                {note}
              </S.WhiteKey>
              {["e", "b"].includes(note) ? (
                <></>
              ) : (
                <S.BlackKey
                  $isSelected={isSelected && isSharp}
                  onClick={() =>
                    noteSetter(isSelected ? toggledNote : { note: note + "#", octave: currentOctave }, isSelected)
                  }
                >
                  <span>{note + "#"}</span>
                  <span>{allNotes[i + 1] + "b"}</span>
                </S.BlackKey>
              )}
            </S.KeyContainer>
          );
        })}
    </S.PianoContainer>
  );

  return expanded ? (
    <S.PianoModal title={"Piano"} open={expanded} onOk={() => setExpanded(false)} onCancel={() => setExpanded(false)}>
      {pianoContent}
    </S.PianoModal>
  ) : (
    <>
      <S.ExpandButton onClick={() => setExpanded(true)}>//</S.ExpandButton>
      {pianoContent}
    </>
  );
}

export default PianoInput;
