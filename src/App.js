import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Header from './components/Header'
import InfoForm from './components/InfoForm'
import ResultsBox from './components/ResultsBox'


function App() {

  return (

    <Container>
        <Row>
              <Header />
        </Row>
        <Row>
          <Col md={6} className="results-div">
      
              <InfoForm />
          </Col>     
          <Col md={6} className="results-div">
            
              <ResultsBox />
              
          </Col>   
        </Row>
    </Container>
  );
}

export default App;
