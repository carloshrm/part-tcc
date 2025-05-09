import styled from "styled-components";

export const SaveContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  button {
    width: fit-content;
  }
`;

export const SaveSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const JSONContainer = styled.div`
  border: ${({ theme }) => theme.border.defaultBorder};
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    width: fit-content;
  }
`;
