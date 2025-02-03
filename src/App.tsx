import { ThemeProvider } from "styled-components";
import Home from "./components/Home";
import { theme } from "./style/theme";

function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        </div>
    );
}

export default App;
