import Button from "antd/es/button";
import Radio from "antd/es/radio";
import Typography from "antd/es/typography";
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

export const DurationOption = styled(Radio.Button)`
  font-family: "Bravura", sans-serif !important;
  padding-top: 0.2rem;
`;

export const NoteSelectControls = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.6rem;
`;

export const NoteSelectControlsContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  button {
    width: fit-content;
  }
`;

export const AutoButton = styled(Button).attrs({
  type: "default",
})<{ $active?: boolean }>`
  border-left: none;
  text-orientation: upright;
  writing-mode: vertical-rl;
  line-height: 0;
  font-size: 0.8rem;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.highlightBackground : "")} !important;
  color: ${({ $active, theme }) => ($active ? theme.colors.highlightText : "")};
`;

export const NextContainer = styled.div`
  display: flex;
  margin: 0;
`;

export const NextButton = styled(Button).attrs({
  type: "default",
})`
  border-right: none;
`;
