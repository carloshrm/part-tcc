import styled from "styled-components";

export const MusicSymbol = styled.span<{ $size: Sizes }>`
  font-family: "Bravura", sans-serif !important;
  font-size: ${({ $size }) => ($size === "SMALL" ? "1rem" : "1.8rem")};
  padding-top: 1rem;
`;

const symbolKeys = {
  "1": "\u2669",
  "2": "\uE1D3",
  "4": "\uE1D5",
  "8": "\uE1D7",
  "16": "\uE1D9",
  WHOLE: "\u2669",
  HALF: "\uE1D3",
  QUARTER: "\uE1D5",
  EIGHTH: "\uE1D7",
  SIXTEENTH: "\uE1D9",
  PLAY: "\ueb1c",
  STOP: "\ueb1d",
  SPEAKER_OPEN: "\ueb27",
  SPEAKER_CLOSED: "\ueb26",
  REPEAT: "\ueb24",
  EXPAND: "\u2922",
};

export type AvailableSymbols = keyof typeof symbolKeys;

type Sizes = "SMALL" | "LARGE";

function UseMusicSymbol(symbol: AvailableSymbols, size: Sizes = "LARGE") {
  return <MusicSymbol $size={size}>{symbolKeys[symbol]}</MusicSymbol>;
}

export function CheckSymbol(input: string): input is AvailableSymbols {
  return input in symbolKeys;
}

export default UseMusicSymbol;
