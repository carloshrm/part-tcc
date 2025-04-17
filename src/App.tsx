import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import "./App.css";
import "./assets/fonts/Bravura.css";
import Home from "./components/Home";
import { store } from "./context/store";
import { theme } from "./style/theme";

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
