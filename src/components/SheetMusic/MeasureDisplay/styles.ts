import styled from "styled-components";

export const MeasureContainer = styled.div<{ $count: number }>`
  display: flex;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.smallRadius};
  padding: 0.4rem 1rem;
  width: fit-content;
  border: 1px solid black;

  &::before {
    content: "${({ $count: $index }) => $index + 1}";
    position: absolute;
    top: -18%;
    left: -4%;
    width: 1rem;
    height: 1rem;
    text-align: center;
    padding: 0.2rem;
    background-color: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.border.defaultBorder};
    border-radius: 50%;
  }
`;

export const MeasureDisplayContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
`;
