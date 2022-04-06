import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';

const VitalSigns = ({ temperature, pulse_rate, systolic_bp, diastolic_bp, o2_saturation }) => {
  return (
    <React.Fragment>
      <MDBContainer className='p-0'>
        <MDBRow>
          <strong>VITAL SIGNS</strong>
        </MDBRow>
        <MDBRow id="confirmation" style={{ overflowY: 'auto', height: '57vh', paddingBottom: '0' }}>
          <MDBRow className='p-0 m-0'>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='warning' background='white'>
                <MDBCardHeader className='text-white pt-2 pb-2' background='warning'>
                  <strong><MDBIcon fas icon="thermometer-quarter" /> Body Temperature</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-warning pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{temperature ? <span>{temperature} °C</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>STATUS</MDBCol>
                    </MDBRow>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow className='p-0 m-0'>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='danger' background='white'>
                <MDBCardHeader className='text-white pt-2 pb-2' background='danger'>
                  <strong><MDBIcon fas icon="heartbeat" /> Pulse Rate</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-danger pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{pulse_rate ? <span>{pulse_rate} bpm</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>STATUS</MDBCol>
                    </MDBRow>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow className='p-0 m-0'>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='primary' background='white'>
                <MDBCardHeader className='text-white pt-2 pb-2' background='primary'>
                  <strong><MDBIcon fas icon="tint" /> Systolic Blood Pressure</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-primary pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{systolic_bp ? <span>{systolic_bp} mmHg</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>STATUS</MDBCol>
                    </MDBRow>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow className='p-0 m-0'>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='secondary' background='white'>
                <MDBCardHeader className='text-white pt-2 pb-2' background='secondary'>
                  <strong><MDBIcon fas icon="tint" /> Diastolic Blood Pressure</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-secondary pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{diastolic_bp ? <span>{diastolic_bp} mmHg</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>STATUS</MDBCol>
                    </MDBRow>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </MDBRow>
          <MDBRow className='p-0 m-0'>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='success' background='white'>
                <MDBCardHeader className='text-white pt-2 pb-2' background='success'>
                  <strong><MDBIcon fas icon="wind" /> Oxygen Saturation</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-success pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{o2_saturation ? <span> {o2_saturation} %</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>STATUS</MDBCol>
                    </MDBRow>
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