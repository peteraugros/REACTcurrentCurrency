import React from 'react'
import {Container} from 'reactstrap'



const Jumbotron = props =>{
    return(
    <div fluid className="jumbo">
        <Container fluid>
          <h1 className="display-3">Current Currency</h1>
          <p className="lead">The most up-to-date exchanges rate at the right price; free</p>
        </Container>
      </div>
)
}

export default Jumbotron