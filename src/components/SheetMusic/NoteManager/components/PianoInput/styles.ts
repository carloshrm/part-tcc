import { Button, Modal } from "antd";
import styled, { css } from "styled-components";

export const PianoContainer = styled.div<{ $expanded: boolean }>`
  padding: 1rem;
  display: flex;
  justify-content: center;
  width: ${({ $expanded }) => ($expanded ? "100%" : "30vw")};
  overflow: auto;
`;

export const KeyContainer = styled.div`
  display: flex;
  position: relative;
`;

const buttonPreset = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: bold;
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.noteHighlight};
  }
`;

export const WhiteKey = styled.button<{ $isSelected?: boolean }>`
  ${buttonPreset}
  height: 120px;
  border: ${({ theme }) => theme.border.defaultBorder};
  width: 34px;
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.noteHighlight : theme.colors.white)};
`;

export const BlackKey = styled.button<{ $isSelected?: boolean }>`
  ${buttonPreset}
  position: absolute;
  height: 80px;
  background-color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.highlightBackground : theme.colors.main)};
  width: 26px;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.highlightText : theme.colors.white)};
  top: 0;
  left: 60%;
  z-index: 1;
`;

export const ExpandButton = styled(Button).attrs({
  type: "default",
})`
  background-color: red;
`;

export const PianoModal = styled(Modal).attrs({
  title: "Piano",
  width: {
    md: "100%",
    lg: "80%",
    xl: "80%",
    xxl: "70%",
  },
  footer: null,
})`
  top: 60%;
`;
