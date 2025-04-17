import { useAppDispatch, useAppSelector } from "@/context/hooks";
// import * as S from "./styles";
import { getTimeSig, setTimeSig } from "@/context/MusicData/musicDataSlice";
import { validTimeSignatureOptions } from "@/context/MusicData/constants";
import { InputNumber, Select, Typography } from "antd";
import ControlContainer from "@/components/ControlContainer";
import { getAllPlayerSettings, setBpm } from "@/context/Player/playerSettingsSlice";

function TimeSignatureSelector() {
  const currentTimeSignature = useAppSelector(getTimeSig);
  const { bpm } = useAppSelector(getAllPlayerSettings);
  const dispatch = useAppDispatch();

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
    <ControlContainer name="Tempo" defaultCollapsed={true}>
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
      <Typography.Title level={4}>Andamento: </Typography.Title>
      <InputNumber
        size="small"
        min={30}
        max={260}
        defaultValue={bpm}
        onChange={(value) => {
          if (value !== null) {
            dispatch(setBpm(value));
          }
        }}
      />
    </ControlContainer>
  );
}

export default TimeSignatureSelector;
