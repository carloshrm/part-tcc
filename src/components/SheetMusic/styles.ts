import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: #f5f5f5;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const SheetContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

export const SheetCanvas = styled.canvas`
  display: inline-block;
  border: 1px solid black;
`;
