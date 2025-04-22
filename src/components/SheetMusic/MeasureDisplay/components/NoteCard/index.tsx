import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getHoverNote, getSelectedNoteIndex, setHoverNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";
import { Note } from "@/context/MusicData/types";
import UseMusicSymbol, { AvailableSymbols, CheckSymbol } from "@/utils/useMusicSymbol";
import * as S from "./styles";

export interface NoteCardProps {
  index: number;
  note: Note;
}

function NoteCard({ index, note }: NoteCardProps) {
  const selectedNote = useAppSelector(getSelectedNoteIndex);
  const hoverNote = useAppSelector(getHoverNote);
  const dispatch = useAppDispatch();

  const getSymbol = (duration: string) => {
    if (CheckSymbol(duration.replace("r", ""))) {
      return UseMusicSymbol(duration as AvailableSymbols, "SMALL");
    }
    return UseMusicSymbol("4");
  };

  return (
    <S.CardContainer
      className={`index-${index}`}
      $selected={index === selectedNote}
      $hovered={index === hoverNote && index !== selectedNote}
      onClick={() => dispatch(setSelectedNote(index))}
      onMouseEnter={() => dispatch(setHoverNote(index))}
    >
      <span>{getSymbol(parseInt(note.duration).toString())}</span>
    </S.CardContainer>
  );
}

export default NoteCard;
