import ControlContainer from "@/components/ControlContainer";
import { useAppSelector } from "@/context/hooks";
import { getMeasures } from "@/context/MusicData/musicDataSlice";
import NoteCard from "./components/NoteCard";
import * as S from "./styles";

function MeasureDisplay() {
  const measures = useAppSelector(getMeasures);

  let indexControl = 0;
  return (
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
  );
}

export default MeasureDisplay;
