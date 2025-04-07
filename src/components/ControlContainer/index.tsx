import * as S from "./styles";

export interface ControlContainerProps {
  children: React.ReactNode;
  name: string;
  scroll?: boolean;
}

function ControlContainer({ children, name, scroll = false }: ControlContainerProps) {
  return (
    <S.ControlFieldset $scroll={scroll}>
      <legend>{name}</legend>
      {children}
    </S.ControlFieldset>
  );
}

export default ControlContainer;
