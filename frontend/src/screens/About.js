import { MDBBtn, MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
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
                <MDBCard>
                  <MDBRow>

                  </MDBRow>
                  <MDBRow>
                    <p>Multiple sensors for measuring vital signs.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBRow>

                  </MDBRow>
                  <MDBRow>
                    <p>Performs differential diagnosis based on user-selected symptoms.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBRow>

                  </MDBRow>
                  <MDBRow>
                    <p>Shows disease information such as overview and precautions to take.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard>
                  <MDBRow>

                  </MDBRow>
                  <MDBRow>
                    <p>Locates the nearest hospital where the kiosk is deployed.</p>
                  </MDBRow>
                </MDBCard>
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