import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { FIGURES } from "@/context/MusicData/constants";
import { getHoverNote, getSelectedNoteIndex, setHoverNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";
import { Note } from "@/context/MusicData/types";
import * as S from "./styles";

export interface NoteCardProps {
  index: number;
  note: Note;
}

function NoteCard({ index, note }: NoteCardProps) {
  const selectedNote = useAppSelector(getSelectedNoteIndex);
  const hoverNote = useAppSelector(getHoverNote);
  const dispatch = useAppDispatch();
  return (
    <S.CardContainer
      className={`index-${index}`}
      $selected={index === selectedNote}
      $hovered={index === hoverNote && index !== selectedNote}
      onClick={() => dispatch(setSelectedNote(index))}
      onMouseEnter={() => dispatch(setHoverNote(index))}
    >
      <span>{FIGURES[parseInt(note.duration)]}</span>
    </S.CardContainer>
  );
}

export default NoteCard;
