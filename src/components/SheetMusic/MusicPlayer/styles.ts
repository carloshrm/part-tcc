import { Button } from "antd";
import styled from "styled-components";

export const MusicControlButton = styled(Button).attrs({
  type: "default",
})`
  font-family: "Bravura", sans-serif !important;
  font-size: 1.8rem;
  padding-top: 1rem;
`;

export const PlayButton = styled(MusicControlButton)<{ $isPlaying: boolean }>`
  background-color: ${({ $isPlaying, theme }) => ($isPlaying ? theme.colors.secondary : "")};
`;

export const MuteButton = styled(Button).attrs({
  type: "default",
})<{ $isMuted: boolean }>`
  font-family: "Bravura", sans-serif !important;
  padding-top: 1rem;
  color: ${({ theme }) => theme.colors.highlightText};
  background-color: ${({ $isMuted, theme }) => ($isMuted ? theme.colors.warning : theme.colors.highlightBackground)};
`;
