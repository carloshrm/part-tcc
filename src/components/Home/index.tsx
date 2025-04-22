import SheetMusic from "../SheetMusic";
import * as S from "./styles";

function Home() {
  return (
    <S.MainLayout>
      <S.Header>
        <S.Title>Editor de partituras</S.Title>
      </S.Header>
      <SheetMusic />
      <S.Footer>
        <p>TCC Desenvolvido por Carlos H. R. Moraes - Sistemas de Informação UFU-MC, 2025.</p>
        <p>
          Código disponível em:{" "}
          <a href="https://github.com/carloshrm/part-tcc">https://github.com/carloshrm/part-tcc</a>
        </p>
      </S.Footer>
    </S.MainLayout>
  );
}

export default Home;
