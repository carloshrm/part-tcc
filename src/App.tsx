import { ThemeProvider } from "styled-components";
import Home from "./components/Home";
import { theme } from "./style/theme";
import { Provider } from "react-redux";
import { store } from "./context/store";
import "./assets/fonts/Bravura.css";
import "./App.css";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Home />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
