import { Button, Radio, Typography } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const DurationContainer = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;

export const RestContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  gap: 0.4rem;
`;

export const ControlTitle = styled(Typography.Title).attrs({ level: 4 })`
  margin: 0;
`;

export const DurationRadio = styled(Radio.Group)``;

export const MeasureContainer = styled.div<{ $count: number }>`
  display: flex;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.smallRadius};
  padding: 0.4rem 1rem;
  width: fit-content;
  border: 1px solid black;

  &::before {
    content: "${({ $count: $index }) => $index + 1}";
    position: absolute;
    top: -18%;
    left: -4%;
    width: 1rem;
    height: 1rem;
    text-align: center;
    padding: 0.2rem;
    background-color: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.border.defaultBorder};
    border-radius: 50%;
  }
`;

export const MeasureDisplayContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
`;

export const DurationOption = styled(Radio.Button)`
  font-family: "Bravura", sans-serif !important;
  padding-top: 0.2rem;
`;

export const SelectContainer = styled.div`
  margin: 1rem;
  display: flex;
  gap: 1rem;
`;

export const MuteButton = styled(Button).attrs({
  type: "default",
})<{ $isMuted: boolean }>`
  font-family: "Bravura", sans-serif !important;
  padding-top: 1rem;
  color: ${({ theme }) => theme.colors.highlightText};
  background-color: ${({ $isMuted, theme }) =>
    $isMuted ? theme.colors.warningColor : theme.colors.highlightBackground};
`;

export const PlayButton = styled(Button).attrs({
  type: "default",
})`
  font-family: "Bravura", sans-serif !important;
  font-size: 1.8rem;
  padding-top: 1rem;
`;
