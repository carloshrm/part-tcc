import ControlContainer from "@/components/ControlContainer";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { SaveOptions } from "@/context/MusicData/constants";
import { getTitle, setTitle } from "@/context/MusicData/musicDataSlice";
import useUtils from "@/utils/useUtils";
import { Button, Input, Select, Typography } from "antd";
import { useState } from "react";
import * as S from "./styles";

function BaseSettings() {
  const [saveChoice, setSaveChoice] = useState<SaveOptions>(SaveOptions.PDF);
  const dispatch = useAppDispatch();
  const title = useAppSelector(getTitle);
  const { saveAsPDF, saveAsPNG } = useUtils();

  const saveFunctionMap = { [SaveOptions.PDF]: saveAsPDF, [SaveOptions.PNG]: saveAsPNG, [SaveOptions.MIDI]: () => {} };

  const handleSave = () => {
    debugger;
    const canvas = document.getElementById("render-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    saveFunctionMap[saveChoice](canvas);
  };

  return (
    <ControlContainer name="Geral" defaultCollapsed={true}>
      <div>
        <Typography.Title level={3}>Título</Typography.Title>
        <Input
          type="text"
          placeholder="Sem título"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
      </div>
      <S.SaveContainer>
        <Button type="primary" onClick={handleSave}>
          Salvar
        </Button>
        <Select defaultValue={SaveOptions.PDF} onChange={(value) => setSaveChoice(value)}>
          {Object.values(SaveOptions).map((option) => (
            <Select.Option key={option} value={option}>
              {option.toLocaleUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </S.SaveContainer>
    </ControlContainer>
  );
}

export default BaseSettings;
