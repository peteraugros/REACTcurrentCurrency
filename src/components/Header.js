import React from 'react';
import { Jumbotron, Container } from "reactstrap";

const Header = props => {
    
    return(
      <div className="jumbo">
      <Jumbotron fluid>
        <Container fluid className="title">
          <h1 className="display-3">Current Currency</h1>
          <p className="lead">Up-to-date exchange rates for free</p>
        </Container>
      </Jumbotron>
    </div>
    )
}

export default Header









/*  */