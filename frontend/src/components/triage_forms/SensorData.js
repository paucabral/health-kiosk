import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import TemperatureModal from './sensor_modals/TemperatureModal';
import PulseModal from './sensor_modals/PulseModal';

const SensorData = ({ formData, setFormData }) => {

  const [temperatureModal, setTemperatureModal] = useState(false);
  const toggleTemperatureModal = () => setTemperatureModal(!temperatureModal);

  const [pulseModal, setPulseModal] = useState(false);
  const togglePulseModal = () => setPulseModal(!pulseModal);

  console.log(formData)

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Vital Signs</MDBCardTitle>
      <MDBCardBody>
        <p>Measure your vital signs by selecting the options below.</p>
        <div>
          <MDBRow className='w-100'>
            <MDBCol>
              <MDBBtn color={formData.temperature === "" ? 'dark' : 'warning'} className='sensor-btn' onClick={toggleTemperatureModal}>
                <h4><MDBIcon fas icon="thermometer-quarter" /> NA</h4>
                <br />
                <span>° C</span>
                <br />
                <b>Temperature</b>
              </MDBBtn>
              <TemperatureModal temperatureModal={temperatureModal} setTemperatureModal={setTemperatureModal} toggleTemperatureModal={toggleTemperatureModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.pulse_rate === "" ? 'dark' : 'danger'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="heartbeat" /> NA</h4>
                <br />
                <span>bpm</span>
                <br />
                <b>Pulse Rate</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.systolic_bp === "" ? 'dark' : 'primary'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="tint" /> NA</h4>
                <br />
                <span>mmHg</span>
                <br />
                <b>Systolic BP</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.diastolic_bp === "" ? 'dark' : 'secondary'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="tint" /> NA</h4>
                <br />
                <span>mmHg</span>
                <br />
                <b>Diastolic BP</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.o2_saturation === "" ? 'dark' : 'success'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="wind" /> NA</h4>
                <br />
                <span>%</span>
                <br />
                <b>O2 Saturation</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
          </MDBRow>
        </div>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default SensorData