import { useAppDispatch, useAppSelector } from "@/context/hooks";
import * as S from "./styles";
import { getKeySignature, setKeySignature } from "@/context/MusicData/musicDataSlice";
import { Typography } from "antd";
import { validKeySignatures } from "@/context/MusicData/constants";
import ControlContainer from "@/components/ControlContainer";
import ClefSelector from "../ClefSelector";

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
    <ControlContainer name="Tonalidade">
      <Typography.Title level={4}>Armadura de Clave</Typography.Title>
      <S.KeySelect defaultValue={"C"} value={currentSignature} onChange={handleSignatureChange} options={keyOptions} />
      <ClefSelector />
    </ControlContainer>
  );
}

export default KeySelector;
