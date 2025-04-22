import { Button } from "antd";
import styled from "styled-components";

export const ControlButton = styled(Button).attrs({
  type: "default",
})<{ $isPlaying?: boolean }>`
  background-color: ${({ $isPlaying, theme }) => ($isPlaying ? theme.colors.secondary : "")};
  &:hover {
    background: ${({ $isPlaying, theme }) => ($isPlaying ? theme.colors.secondary : "")} !important;
  }
`;

export const MuteButton = styled(Button).attrs({
  type: "default",
})<{ $isMuted: boolean }>`
  background-color: ${({ $isMuted, theme }) => ($isMuted ? theme.colors.warning : theme.colors.highlightBackground)};
  span {
    color: ${({ theme }) => theme.colors.highlightText};
  }
`;

export const VolumeContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const SliderContainer = styled.div`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;
