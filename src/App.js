import { Container } from "@mui/material";
import "./App.css";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <MainContent />
      </Container>
    </div>
  );
}

export default App;
