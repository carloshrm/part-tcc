import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  flex-direction: row;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100vw;
    overflow: scroll;
  }

  align-items: flex-start;
`;

export const SheetContainer = styled.div`
  margin: 2rem;
  overflow-x: scroll;
  white-space: nowrap;
`;

export const ControlsContainer = styled.div`
  width: 30vw;
  min-width: 30rem;
  margin: 1rem 0.4rem;
  border-left: 1rem solid ${({ theme }) => theme.colors.highlightBackground};
`;

export const SheetCanvas = styled.canvas`
  border: 1px solid black;
`;
