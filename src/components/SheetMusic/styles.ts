import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  flex-direction: row;
  align-items: flex-start;
`;

export const SheetContainer = styled.div`
  margin: 2rem;
  overflow-x: scroll;
  white-space: nowrap;
`;

export const ControlsContainer = styled.div``;

export const SheetCanvas = styled.canvas`
  border: 1px solid black;
`;
