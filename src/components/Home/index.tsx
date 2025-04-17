import Layout, { Footer, Header } from "antd/es/layout/layout";
import SheetMusic from "../SheetMusic";
import * as S from "./styles";

function Home() {
  return (
    <Layout>
      <Header>
        <S.Title>Editor de partituras</S.Title>
      </Header>
      <SheetMusic />
      <Footer>Abcd</Footer>
    </Layout>
  );
}

export default Home;
