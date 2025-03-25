import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  overflow: scroll;
  background-color: #f5f5f5;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const SheetContainer = styled.div`
  margin: 2rem;
  overflow-x: scroll;
  white-space: nowrap;
`;

export const ControlsContainer = styled.div`
  width: 50%;
`;

export const SheetCanvas = styled.canvas`
  border: 1px solid black;
`;
