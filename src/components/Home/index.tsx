import { Footer } from "antd/es/layout/layout";
import SheetMusic from "../SheetMusic";
import * as S from "./styles";

function Home() {
  return (
    <S.MainLayout>
      <S.Header>
        <S.Title>Editor de partituras</S.Title>
      </S.Header>
      <SheetMusic />
      <Footer>
        TCC Desenvolvido por Carlos H. R. Moraes - Sistemas de Informação UFU-MC, 2025. Código disponível em:{" "}
        <a href="https://github.com/carloshrm/part-tcc">https://github.com/carloshrm/part-tcc</a>{" "}
      </Footer>
    </S.MainLayout>
  );
}

export default Home;
