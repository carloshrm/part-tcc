import styled from "styled-components";

export const ControlFieldset = styled.fieldset<{ $scroll: boolean }>`
  margin: 1rem;
  padding: 1rem;

  overflow-y: ${({ $scroll }) => ($scroll ? "scroll" : "hidden")};
  height: ${({ $scroll }) => ($scroll ? "30vh" : "auto")};
  legend {
    font-weight: bold;
    padding: 0.4rem 1rem;
    border: 1px solid gray;
    border-radius: ${({ theme }) => theme.borderRadius.defaultRadius};
    background-color: ${({ theme }) => theme.colors.highlightBackground};
    color: ${({ theme }) => theme.colors.highlightText};
  }
`;
