import { MDBBtn, MDBCard, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import cabral from '../assets/image/cabral.jpg';
import lopez from '../assets/image/lopez.png';
import lucana from '../assets/image/lucana.png';
import matienzo from '../assets/image/matienzo.png';

const About = () => {
  return (
    <React.Fragment>
      <MDBContainer id="confirmation" style={{ height: '100vh', overflowY: 'auto', scrollBehavior: 'smooth' }}>
        <MDBRow id="banner" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <MDBContainer>
            <MDBContainer className='mb-2'>
              <span style={{ fontSize: '0.75em' }}>BROUGHT TO YOU BY</span>
              <h2 style={{ fontSize: '1.25em', color: 'rgb(10, 165, 165)' }}>HIGH GROUNDS</h2>
            </MDBContainer>
            <MDBContainer className='mb-4'>
              <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '3em' }}>Health Kiosk</h1>
            </MDBContainer>
            <MDBContainer style={{ width: '65vw' }}>
              <p style={{ fontSize: '1.25em' }}>A self-service health kiosk that performs differential diagnosis and provide recommendations for the user, as well as locate the nearby health facilities.</p>
            </MDBContainer>
            <MDBContainer className='my-3'>
              <a href='#features'>
                <MDBBtn color='info'>Learn More</MDBBtn>
              </a>
            </MDBContainer>
          </MDBContainer>
        </MDBRow>
        <MDBRow id="features" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <MDBContainer>
            <MDBRow className='m-3'>
              <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>FEATURES</h2>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBCard className='p-2' shadow='0' border='danger' style={{ height: '12em', justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer>
                      <MDBIcon color='danger' size='2x' fas icon="heartbeat" />
                    </MDBContainer>
                    <MDBCardTitle>
                      Vital Signs
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <p style={{ fontSize: '0.8em' }}>Multiple sensors for measuring vital signs.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard className='p-2' shadow='0' border='success' style={{ height: '12em', justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer>
                      <MDBIcon color='success' size='2x' fas icon="comment-medical" />
                    </MDBContainer>
                    <MDBCardTitle>
                      Differential Diagnosis
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <p style={{ fontSize: '0.8em' }}>Performs differential diagnosis based on selected symptoms.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard className='p-2' shadow='0' border='primary' style={{ height: '12em', justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer>
                      <MDBIcon color='primary' size='2x' fas icon="info-circle" />
                    </MDBContainer>
                    <MDBCardTitle>
                      Disease Information
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <p style={{ fontSize: '0.8em' }}>Shows disease information including the precautions to take.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol>
                <MDBCard className='p-2' shadow='0' border='warning' style={{ height: '12em', justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer>
                      <MDBIcon color='warning' size='2x' fas icon="hospital" />
                    </MDBContainer>
                    <MDBCardTitle>
                      Nearby Facilities
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <p style={{ fontSize: '0.8em' }}>Locates the nearest facilities where the kiosk is deployed.</p>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow style={{ marginTop: '3em' }}>
              <MDBContainer>
                <a href='#developers'>
                  <MDBBtn color='dark' style={{ borderRadius: '50%', width: '60px', height: '60px' }}>
                    <MDBIcon fas icon="arrow-down" />
                  </MDBBtn>
                </a>
              </MDBContainer>
            </MDBRow>
          </MDBContainer>
        </MDBRow>
        <MDBRow id="developers" style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <MDBContainer>
            <MDBRow className='m-3'>
              <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>DEVELOPERS</h2>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBRow className='p-2' shadow='0' border='danger' style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer className='my-2'>
                      <img src={cabral} style={{ height: '110px', width: '110px', borderRadius: '50%' }} />
                    </MDBContainer>
                    <MDBCardTitle>
                      JOSE PAULO C. CABRAL
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>BS Computer Engineering</span>
                    <span style={{ fontSize: '0.85em' }}>Systems Administration</span>
                    <span style={{ fontSize: '0.75em', color: 'rgb(10, 165, 165)' }}>qjpccabral@tip.edu.ph</span>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow className='p-2' shadow='0' border='success' style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer className='my-2'>
                      <img src={lopez} style={{ height: '110px', width: '110px', borderRadius: '50%' }} />
                    </MDBContainer>
                    <MDBCardTitle>
                      JOSHUA ALBERT T. LOPEZ
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>BS Computer Engineering</span>
                    <span style={{ fontSize: '0.85em' }}>Intelligent Systems</span>
                    <span style={{ fontSize: '0.75em', color: 'rgb(10, 165, 165)' }}>qjatlopez@tip.edu.ph</span>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow className='p-2' shadow='0' border='primary' style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer className='my-2'>
                      <img src={lucana} style={{ height: '110px', width: '110px', borderRadius: '50%' }} />
                    </MDBContainer>
                    <MDBCardTitle>
                      REINHOLD E. LUCANA
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>BS Computer Engineering</span>
                    <span style={{ fontSize: '0.85em' }}>Systems Administration</span>
                    <span style={{ fontSize: '0.75em', color: 'rgb(10, 165, 165)' }}>qrelucana@tip.edu.ph</span>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow className='p-2' shadow='0' border='warning' style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MDBRow>
                    <MDBContainer className='my-2'>
                      <img src={matienzo} style={{ height: '110px', width: '110px', borderRadius: '50%' }} />
                    </MDBContainer>
                    <MDBCardTitle>
                      JOHN EDWARD SAM T. MATIENZO
                    </MDBCardTitle>
                  </MDBRow>
                  <MDBRow>
                    <span style={{ fontSize: '0.85em', fontWeight: 'bold' }}>BS Computer Engineering</span>
                    <span style={{ fontSize: '0.85em' }}>Systems Administration</span>
                    <span style={{ fontSize: '0.75em', color: 'rgb(10, 165, 165)' }}>qjestmatienzo@tip.edu.ph</span>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBContainer className='mt-5'>
                <h4 style={{ fontSize: '1.25em' }}>THE <span style={{ fontWeight: '1000', color: 'rgb(10, 165, 165)' }}>HIGH GROUNDS</span> TEAM</h4>
              </MDBContainer>
            </MDBRow>
          </MDBContainer>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default About