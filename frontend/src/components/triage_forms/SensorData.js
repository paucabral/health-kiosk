import React from 'react';
import { MDBInput, MDBBtn, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';

const SensorData = () => {
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Vital Signs</MDBCardTitle>
      <MDBCardBody>
        <p>Measure your vital signs by selecting the options below.</p>
        <div>
          <MDBRow className='w-100'>
            <MDBCol>
              <MDBBtn color='warning' className='sensor-btn'>
                <h4><MDBIcon fas icon="thermometer-quarter" /> NA</h4>
                <br />
                <span>° C</span>
                <br />
                <b>Temperature</b>
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color='danger' className='sensor-btn'>
                <h4><MDBIcon fas icon="heartbeat" /> NA</h4>
                <br />
                <span>bpm</span>
                <br />
                <b>Pulse Rate</b>
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color='primary' className='sensor-btn'>
                <h4><MDBIcon fas icon="tint" /> NA</h4>
                <br />
                <span>mmHg</span>
                <br />
                <b>Systolic BP</b>
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color='secondary' className='sensor-btn'>
                <h4><MDBIcon fas icon="tint" /> NA</h4>
                <br />
                <span>mmHg</span>
                <br />
                <b>Diastolic BP</b>
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color='success' className='sensor-btn'>
                <h4><MDBIcon fas icon="wind" /> NA</h4>
                <br />
                <span>%</span>
                <br />
                <b>O2 Saturation</b>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default SensorData