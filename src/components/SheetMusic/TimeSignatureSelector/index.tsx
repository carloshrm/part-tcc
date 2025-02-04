import { useAppDispatch, useAppSelector } from "@/context/hooks";
import * as S from "./styles";
import { getTimeSig, setTimeSig } from "@/context/MusicData/musicDataSlice";

function TimeSignatureSelector() {
  const dispatch = useAppDispatch();
  const currentTimeSignature = useAppSelector(getTimeSig);

  const handleTimeSignatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "time-beats") {
      dispatch(
        setTimeSig({
          beats: parseInt(e.target.value),
          value: currentTimeSignature.value,
        }),
      );
    } else if (e.target.name === "time-value") {
      dispatch(
        setTimeSig({
          beats: currentTimeSignature.beats,
          value: parseInt(e.target.value),
        }),
      );
    }
  };

  return (
    <S.Container>
      <select name="time-beats" onChange={(e) => console.log(e.target.value)}>
        {[3, 4, 5, 6].map((val) => {
          return (
            <option value={val} key={val} selected={val === currentTimeSignature.beats}>
              {val}
            </option>
          );
        })}
      </select>
      <select name="time-value">
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
      </select>
    </S.Container>
  );
}

export default TimeSignatureSelector;
