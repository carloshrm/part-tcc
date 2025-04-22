import styled from "styled-components";

export const ControlFieldset = styled.fieldset<{ $scroll: boolean; $collapsed: boolean }>`
  margin: 1rem;
  padding: ${({ $collapsed }) => ($collapsed ? "0 1rem" : "1rem")};

  width: ${({ $collapsed }) => ($collapsed ? "32%" : "30rem")};

  overflow: ${({ $scroll, $collapsed }) => (!$scroll || $collapsed ? "hidden" : "scroll")};
  height: ${({ $scroll, $collapsed }) => {
    if ($collapsed) {
      return "0";
    } else {
      return $scroll ? "30vh" : "auto";
    }
  }};

  transition:
    height 0.1s ease-in-out,
    width 0.2s ease-out,
    padding 0.1s ease-out,
    background-color 0.1s ease-out,
    border-radius 0.1s ease-out;

  background-color: ${({ theme, $collapsed }) => ($collapsed ? theme.colors.highlightBackground : "")};

  border: 1px solid ${({ theme }) => theme.colors.highlightBackground};
  /* border-radius: ${({ theme, $collapsed }) => ($collapsed ? theme.borderRadius.defaultRadius : "")}; */
  legend {
    font-weight: bold;
    padding: 0.4rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.defaultRadius};
    background-color: ${({ theme }) => theme.colors.highlightBackground};
    color: ${({ theme }) => theme.colors.highlightText};
    transform: ${({ $collapsed }) => ($collapsed ? "translateY(20%)" : "")};
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.colors.highlightBackground};
    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.highlightText};
    }
  }
`;
