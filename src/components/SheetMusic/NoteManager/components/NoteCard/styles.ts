import styled from "styled-components";

export const CardContainer = styled.div<{ $selected: boolean }>`
  margin: 0.2rem;
  background-color: ${({ $selected }) => ($selected ? "yellow" : "")};
`;
