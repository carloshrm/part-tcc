import { useAppDispatch, useAppSelector } from "@/context/hooks";
import * as S from "./styles";
import { getTimeSig, setTimeSig } from "@/context/MusicData/musicDataSlice";
import { validTimeSignatureOptions } from "@/context/MusicData/constants";
import { Select, Typography } from "antd";

function TimeSignatureSelector() {
  const dispatch = useAppDispatch();
  const currentTimeSignature = useAppSelector(getTimeSig);

  const handleBeatChange = (e: number) => {
    dispatch(
      setTimeSig({
        beats: e,
        value: currentTimeSignature.value,
      }),
    );
  };

  const handleValueChange = (e: number) => {
    dispatch(
      setTimeSig({
        beats: currentTimeSignature.beats,
        value: e,
      }),
    );
  };

  return (
    <S.Container>
      <Typography.Title level={4}>Fórmula de compasso: </Typography.Title>
      <Select
        defaultValue={currentTimeSignature.beats}
        options={validTimeSignatureOptions.beats.map((b) => ({ value: b, label: b }))}
        onChange={handleBeatChange}
      />
      <Typography.Text> / </Typography.Text>
      <Select
        defaultValue={currentTimeSignature.value}
        options={validTimeSignatureOptions.values.map((v) => ({ value: v, label: v }))}
        onChange={handleValueChange}
      />
    </S.Container>
  );
}

export default TimeSignatureSelector;
