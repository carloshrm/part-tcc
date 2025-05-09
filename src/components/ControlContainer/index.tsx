import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as S from "./styles";

export interface ControlContainerProps {
  children: React.ReactNode;
  name: string;
  scroll?: boolean;
  defaultCollapsed?: boolean;
}

function ControlContainer({ children, name, scroll = false, defaultCollapsed = false }: ControlContainerProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <S.ControlFieldset $scroll={scroll} $collapsed={collapsed}>
      <legend onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}
        {name}
      </legend>
      {collapsed ? <></> : children}
    </S.ControlFieldset>
  );
}

export default ControlContainer;
