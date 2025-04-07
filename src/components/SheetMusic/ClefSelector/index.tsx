import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setClef, getClef } from "@/context/MusicData/musicDataSlice";
import * as S from "./styles";
import { Clef } from "@/context/MusicData/constants";
import { Radio, RadioChangeEvent, Typography } from "antd";

const ClefSelector = () => {
  const currentClef = useAppSelector(getClef);
  const dispatch = useAppDispatch();

  const handleClefChange = (e: RadioChangeEvent) => {
    dispatch(setClef(e.target.value));
  };

  return (
    <S.Container>
      <Typography.Title level={4}>Clave</Typography.Title>
      <Radio.Group
        defaultValue={currentClef}
        onChange={handleClefChange}
        value={currentClef}
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: "Sol", value: Clef.Treble },
          { label: "Fa", value: Clef.Bass },
        ]}
      />
    </S.Container>
  );
};

export default ClefSelector;
