import { ThemeProvider } from "styled-components";
import Home from "./components/Home";
import { theme } from "./style/theme";
import { Provider } from "react-redux";
import { store } from "./context/store";
import "./assets/fonts/Bravura.css";
import "./App.css";
import { ConfigProvider } from "antd";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ConfigProvider theme={{ token: { colorPrimary: theme.colors.primary } }}>
          <Provider store={store}>
            <Home />
          </Provider>
        </ConfigProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
