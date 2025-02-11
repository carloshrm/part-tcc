import { useAppDispatch, useAppSelector } from "@/context/hooks";
import * as S from "./styles";
import { getTimeSig, setTimeSig } from "@/context/MusicData/musicDataSlice";

export const validTimeSignatureOptions = {
  beats: [3, 4, 5, 6],
  values: [4, 8, 12],
};

function TimeSignatureSelector() {
  const dispatch = useAppDispatch();
  const currentTimeSignature = useAppSelector(getTimeSig);

  const handleBeatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setTimeSig({
        beats: parseInt(e.target.value),
        value: currentTimeSignature.value,
      }),
    );
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setTimeSig({
        beats: currentTimeSignature.beats,
        value: parseInt(e.target.value),
      }),
    );
  };

  return (
    <S.Container>
      <select name="time-beats" onChange={(e) => handleBeatChange(e)} value={currentTimeSignature.beats}>
        {validTimeSignatureOptions.beats.map((val) => {
          return (
            <option value={val} key={val}>
              {val}
            </option>
          );
        })}
      </select>
      <select name="time-value" onChange={(e) => handleValueChange(e)} value={currentTimeSignature.value}>
        {validTimeSignatureOptions.values.map((val) => {
          return (
            <option value={val} key={val}>
              {val}
            </option>
          );
        })}
      </select>
    </S.Container>
  );
}

export default TimeSignatureSelector;
