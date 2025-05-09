import { Layout } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import styled from "styled-components";

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.highlightText};
`;

export const Header = styled(AntdHeader)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.highlightBackground};
`;

export const MainLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

export const Footer = styled(Layout.Footer)`
  background-color: ${({ theme }) => theme.colors.highlightBackground};
  color: ${({ theme }) => theme.colors.highlightText};
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.linkColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
