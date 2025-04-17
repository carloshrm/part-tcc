import ControlContainer from "@/components/ControlContainer";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { validKeySignatures } from "@/context/MusicData/constants";
import { getKeySignature, setKeySignature } from "@/context/MusicData/musicDataSlice";
import { Typography } from "antd";
import ClefSelector from "../ClefSelector";
import * as S from "./styles";

function KeySelector() {
  const currentSignature = useAppSelector(getKeySignature);
  const dispatch = useAppDispatch();

  const handleSignatureChange = (value: string) => {
    dispatch(setKeySignature(value));
  };

  const sharpOptions = {
    label: "Sustenidos",
    title: "Sustenidos",
    options: validKeySignatures.sharps.map((key) => ({
      value: key,
      label: <S.KeyOptionLabel>{key}</S.KeyOptionLabel>,
    })),
  };

  const flatOptions = {
    label: "Bemóis",
    title: "Bemóis",
    options: validKeySignatures.flats.map((key) => ({ value: key, label: <S.KeyOptionLabel>{key}</S.KeyOptionLabel> })),
  };

  const keyOptions = [{ options: [{ value: "C", label: "C" }] }, sharpOptions, flatOptions];

  return (
    <ControlContainer name="Tonalidade" defaultCollapsed={true}>
      <Typography.Title level={4}>Armadura de Clave</Typography.Title>
      <S.KeySelect defaultValue={"C"} value={currentSignature} onChange={handleSignatureChange} options={keyOptions} />
      <ClefSelector />
    </ControlContainer>
  );
}

export default KeySelector;
