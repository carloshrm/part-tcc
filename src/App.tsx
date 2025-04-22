import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import "./assets/fonts/Bravura.css";
import Home from "./components/Home";
import { persistor, store } from "./context/store";
import { theme } from "./style/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ConfigProvider theme={{ token: { colorPrimary: theme.colors.primary } }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Home />
            </PersistGate>
          </Provider>
        </ConfigProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
