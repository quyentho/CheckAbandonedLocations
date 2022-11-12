import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { CheckLocationsPage } from "./pages/CheckLocationsPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container className="pb-5">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<CheckLocationsPage></CheckLocationsPage>} />
      </Routes>
    </Container>
  );
}

export default App;
