import styled from "styled-components";

export const CardContainer = styled.div<{ $selected: boolean; $hovered: boolean }>`
  margin: 0 0.4rem;
  /* height: 2.5rem; */
  background-color: ${({ $selected, $hovered, theme }) => {
    return $selected ? theme.colors.noteHighlight : $hovered ? theme.colors.noteHover : "";
  }};
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.borderRadius.smallRadius};

  span {
    font-family: "Bravura", sans-serif !important;
    line-height: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.noteHover};
  }
`;
