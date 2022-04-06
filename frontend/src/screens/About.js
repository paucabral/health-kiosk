import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

const About = () => {
  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow id="banner">
          <MDBContainer className='mb-2'>
            <span style={{ fontSize: '0.75em' }}>BROUGHT TO YOU BY</span>
            <h5>HIGH GROUNDS</h5>
          </MDBContainer>
          <MDBContainer className='mb-4'>
            <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Health Kiosk</h1>
          </MDBContainer>
          <MDBContainer style={{ width: '70vw' }}>
            <p>A self-service health kiosk that performs differential diagnosis and provide recommendations for the user, as well as locate the nearby health facilities.</p>
          </MDBContainer>
        </MDBRow>
        <MDBRow id="features">

        </MDBRow>
        <MDBRow id="developers">

        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default About