import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';

const VitalSigns = ({ temperature, pulse_rate, systolic_bp, diastolic_bp, o2_saturation }) => {
  return (
    <React.Fragment>
      <MDBContainer id="confirmation" style={{ overflowY: 'auto', height: '50vh', }}>
        <MDBRow>
          <strong>Vital Signs</strong>
        </MDBRow>
        <MDBRow>
          <MDBRow>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='warning' background='white'>
                <MDBCardHeader className='text-white' background='warning'>
                  <strong><MDBIcon fas icon="thermometer-quarter" /> Body Temperature</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-warning'>
                  <MDBCardText>
                    {temperature ? <span>{temperature} °C</span> : <span>NA</span>}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='danger' background='white'>
                <MDBCardHeader className='text-white' background='danger'>
                  <strong><MDBIcon fas icon="heartbeat" /> Pulse Rate</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-danger'>
                  <MDBCardText>
                    {pulse_rate ? <span>{pulse_rate} bpm</span> : <span>NA</span>}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='primary' background='white'>
                <MDBCardHeader className='text-white' background='primary'>
                  <strong><MDBIcon fas icon="tint" /> Systolic Blood Pressure</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-primary'>
                  <MDBCardText>
                    {systolic_bp ? <span>{systolic_bp} mmHg</span> : <span>NA</span>}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='secondary' background='white'>
                <MDBCardHeader className='text-white' background='secondary'>
                  <strong><MDBIcon fas icon="tint" /> Diastolic Blood Pressure</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-secondary'>
                  <MDBCardText>
                    {diastolic_bp ? <span>{diastolic_bp} mmHg</span> : <span>NA</span>}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='success' background='white'>
                <MDBCardHeader className='text-white' background='success'>
                  <strong><MDBIcon fas icon="wind" /> Oxygen Saturation</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-success'>
                  <MDBCardText>
                    {o2_saturation ? <span> {o2_saturation} %</span> : <span>NA</span>}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default VitalSigns