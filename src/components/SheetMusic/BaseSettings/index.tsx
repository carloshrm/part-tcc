import ControlContainer from "@/components/ControlContainer";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { SaveOptions } from "@/context/MusicData/constants";
import { getTempo, getTitle, setTempo, setTitle } from "@/context/MusicData/musicDataSlice";
import { persistor } from "@/context/store";
import useUtils from "@/utils/useUtils";
import { Button, Input, Popconfirm, Select, Typography } from "antd";
import { useState } from "react";
import * as S from "./styles";

function BaseSettings() {
  const [saveChoice, setSaveChoice] = useState<SaveOptions>(SaveOptions.PDF);
  const dispatch = useAppDispatch();
  const title = useAppSelector(getTitle);
  const tempo = useAppSelector(getTempo);
  const { saveAsPDF, saveAsPNG } = useUtils();

  const saveFunctionMap = { [SaveOptions.PDF]: saveAsPDF, [SaveOptions.PNG]: saveAsPNG, [SaveOptions.MIDI]: () => {} };

  const handleSave = () => {
    debugger;
    const canvas = document.getElementById("render-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    saveFunctionMap[saveChoice](canvas);
  };

  const handleClear = () => {
    persistor.purge();
  };

  return (
    <ControlContainer name="Geral" defaultCollapsed={true}>
      <div>
        <Typography.Title level={4}>Título</Typography.Title>
        <Input
          type="text"
          placeholder="Sem título"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
      </div>
      <div>
        <Typography.Title level={4}>Andamento</Typography.Title>
        <Input
          type="text"
          placeholder="Sem título"
          value={tempo}
          onChange={(e) => dispatch(setTempo(e.target.value))}
        />
      </div>
      <S.SaveContainer>
        <Typography.Title level={4}>Salvar</Typography.Title>
        <S.SaveSelectContainer>
          <Typography.Text>Formato:</Typography.Text>
          <Select defaultValue={SaveOptions.PDF} onChange={(value) => setSaveChoice(value)}>
            {Object.values(SaveOptions).map((option) => (
              <Select.Option key={option} value={option}>
                {option.toLocaleUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </S.SaveSelectContainer>
        <Button type="primary" onClick={handleSave}>
          Salvar
        </Button>
      </S.SaveContainer>
      <Popconfirm
        title="Você tem certeza que deseja apagar tudo?"
        onConfirm={handleClear}
        okText="Sim"
        cancelText="Não"
      >
        <Button type="primary" danger>
          Limpar
        </Button>
      </Popconfirm>
    </ControlContainer>
  );
}

export default BaseSettings;
