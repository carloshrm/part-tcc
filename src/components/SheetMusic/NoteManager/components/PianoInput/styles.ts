import { Button } from "antd";
import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 28rem;
`;

export const PianoContainer = styled.div<{ $expanded: boolean }>`
  padding: 1rem;
  display: flex;
  justify-content: center;
  width: ${({ $expanded }) => ($expanded ? "100%" : "30rem")};
  overflow: auto;
  margin: 0 auto;
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
  font-size: 1.2rem;
  text-align: center;
  align-self: flex-end;
`;

export const PianoModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
  padding: 1rem;
  top: 82%;
  left: 66%;
  transform: translate(-50%, -50%);
  border: 2px solid ${({ theme }) => theme.colors.highlightBackground};
  position: fixed;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  z-index: 1;
`;
