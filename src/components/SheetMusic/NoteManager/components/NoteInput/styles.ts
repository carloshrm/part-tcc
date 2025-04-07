import { Button, Carousel } from "antd";
import styled from "styled-components";

export const NoteControlCarousel = styled(Carousel).attrs({
  dots: true,
  dotPosition: "left",
  arrows: true,
})`
  width: 440px;
`;

export const NoteInputCard = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBackground};
  height: 11rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1.4rem;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.highlightBackground};
    z-index: 1;
  }
`;

export const OctaveIcon = styled.span`
  position: relative;
  top: 0.6rem;
  left: 2rem;
`;

export const NoteRowContainer = styled.div<{ $octave: number }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  padding: 1rem;
  width: fit-content;
  margin: 2rem auto;

  &::after {
    content: ${({ $octave }) => `'C${$octave}'`};
    position: absolute;
    top: ${({ $octave }) => {
      switch ($octave) {
        case 3:
          return "6%";
        case 4:
          return "28%";
        case 5:
          return "48%";
        case 6:
          return "68%";
      }
    }};
    left: -12.5%;
    width: 3rem;
    height: 1.4rem;
    text-align: right;
    padding: 0 0.4rem;
    background-color: ${({ theme }) => theme.colors.highlightBackground};
    color: ${({ theme }) => theme.colors.highlightText};
    font-weight: bold;
    border-radius: 10rem;
    z-index: 2;
  }
`;

export const NoteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const NoteButton = styled(Button).attrs({ type: "default", size: "middle" })<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.highlightBackground : theme.colors.white} !important;

  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.highlightText : theme.colors.main)} !important;
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.shadowColor};
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.white} !important;
  }
`;

export const AccidentalButton = styled(Button).attrs({ type: "default", size: "small" })<{
  $isSelected: boolean;
  $show: boolean;
  $direction?: "up" | "down";
}>`
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.highlightBackground : theme.colors.white} !important;

  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.highlightText : theme.colors.main)} !important;

  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  height: 1.6rem;
  width: 2.4rem;
  border: ${({ theme }) => theme.border.defaultBorder};
  font-size: 1.2rem;
  font-family: "Bravura", sans-serif !important;
  ${({ $direction }) => {
    switch ($direction) {
      case "up":
        return `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`;
      case "down":
        return `clip-path: polygon(50% 100%, 0% 0%, 100% 0%);`;
      default:
        return "";
    }
  }}
`;
