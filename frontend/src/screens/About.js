import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

const About = () => {
  return (
    <React.Fragment>
      <MDBContainer id="confirmation" style={{ height: '100vh', overflowY: 'auto' }}>
        <MDBRow id="banner" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <MDBContainer>
            <MDBContainer className='mb-2'>
              <span style={{ fontSize: '0.75em' }}>BROUGHT TO YOU BY</span>
              <h2 style={{ fontSize: '1.25em' }}>HIGH GROUNDS</h2>
            </MDBContainer>
            <MDBContainer className='mb-4'>
              <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '3em' }}>Health Kiosk</h1>
            </MDBContainer>
            <MDBContainer style={{ width: '65vw' }}>
              <p style={{ fontSize: '1.25em' }}>A self-service health kiosk that performs differential diagnosis and provide recommendations for the user, as well as locate the nearby health facilities.</p>
            </MDBContainer>
            <MDBContainer className='my-3'>
              <MDBBtn color='info'>Learn More</MDBBtn>
            </MDBContainer>
          </MDBContainer>
        </MDBRow>
        <MDBRow id="features" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <p>The kiosk has multiple sensors that allows the user to measure his/her vital signs; namely, these are body temperature, pulse rate, oxygen saturation, and blood pressure.</p>
              </MDBCol>
              <MDBCol>
                <p>With the use of machine learning, differential diagnosis can be performed based on the symptoms selected by the user. The likeliness of a disease, based on the algorithm's prediction will be presented to the user.</p>
              </MDBCol>
              <MDBCol>
                <p>Each classified disease after the differential diagnosis, contains recommendations and necessary precautions to take.</p>
              </MDBCol>
              <MDBCol>
                <p>Along with the recommendations and precautions, the nearest health facilities for each of the differentials will also be presented to the user.</p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBRow>
        <MDBRow id="developers" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>

        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default About