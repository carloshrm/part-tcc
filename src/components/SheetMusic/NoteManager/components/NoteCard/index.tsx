import { Note } from "@/context/MusicData/types";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getSelectedNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";

export interface NoteCardProps {
  index: number;
  note: Note;
}

function NoteCard({ index, note }: NoteCardProps) {
  const selectedNote = useAppSelector(getSelectedNote);
  const dispatch = useAppDispatch();

  return (
    <S.CardContainer $selected={index === selectedNote} onClick={() => dispatch(setSelectedNote(index))}>
      {note.keys.join("-")}
    </S.CardContainer>
  );
}

export default NoteCard;
