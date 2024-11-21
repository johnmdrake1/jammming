import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 className="text-success text-center">JAMMMMMMMMING</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
