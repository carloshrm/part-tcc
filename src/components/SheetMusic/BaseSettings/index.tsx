import ControlContainer from "@/components/ControlContainer";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { SaveOptions } from "@/context/MusicData/constants";
import { setMusicImportData, setTempo, setTitle } from "@/context/MusicData/musicDataSlice";
import { setPlayerSettingsImportData } from "@/context/Player/playerSettingsSlice";
import { persistor, store } from "@/context/store";
import useUtils from "@/utils/useUtils";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Select, Typography, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import * as S from "./styles";

function BaseSettings() {
  const [saveChoice, setSaveChoice] = useState<SaveOptions>(SaveOptions.PDF);
  const dispatch = useAppDispatch();
  const storeState = useAppSelector((state) => state);
  const { title, tempo } = storeState.musicData;
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

  const handleExport = () => {
    const stateToExport = JSON.stringify(storeState, null, 2);
    const blob = new Blob([stateToExport], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title || "music-data"}_partitura.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (content) {
        try {
          const parsedData = JSON.parse(content as string);
          store.dispatch(setMusicImportData(parsedData.musicData));
          store.dispatch(setPlayerSettingsImportData(parsedData.playerSettings));
        } catch (error) {
          console.error("Failed to parse JSON file", error);
        }
      }
    };
    reader.readAsText(file);
    return false;
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
      <S.JSONContainer>
        <Typography.Title level={4}>Importar/Exportar JSON</Typography.Title>
        <Upload accept=".json" beforeUpload={handleImport} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Importar JSON</Button>
        </Upload>

        <Button type="primary" onClick={handleExport}>
          Exportar JSON
        </Button>
      </S.JSONContainer>
    </ControlContainer>
  );
}

export default BaseSettings;
