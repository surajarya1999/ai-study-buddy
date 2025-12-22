import "./App.css";
import Flashcarddisplay from "./components/FlashcardDisplay";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

// Router import
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Generate from "./components/Generate";
import Saved from "./components/Saved";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              <i className="fas fa-brain me-2"></i>AI Study Buddy
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/generate">
                  <i className="fas fa-plus me-1"></i>Generate
                </Nav.Link>
                <Nav.Link as={Link} to="/saved">
                  <i className="fas fa-bookmark me-1"></i>Saved
                </Nav.Link>

                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i> Login

                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* ✅ Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Container fluid className="px-3">
                <Row className="justify-content-center">
                  <Col lg={10} xl={8}>
                    <Flashcarddisplay />
                  </Col>
                </Row>
              </Container>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/generate" element={<Generate />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
