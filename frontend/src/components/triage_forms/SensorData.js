import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import TemperatureModal from './sensor_modals/TemperatureModal';
import PulseModal from './sensor_modals/PulseModal';
import O2Modal from './sensor_modals/O2Modal';

const SensorData = ({ formData, setFormData }) => {

  const [temperatureModal, setTemperatureModal] = useState(false);
  const toggleTemperatureModal = () => setTemperatureModal(!temperatureModal);

  const [pulseModal, setPulseModal] = useState(false);
  const togglePulseModal = () => setPulseModal(!pulseModal);

  const [o2Modal, setO2Modal] = useState(false);
  const toggleO2Modal = () => setO2Modal(!o2Modal);

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
                <h4><MDBIcon fas icon="thermometer-quarter" />
                  {formData.temperature == "" ? <span> NA</span> : <span> {formData.temperature}</span>}
                </h4>
                <span>°C</span>
                <br />
                <b>Temperature</b>
              </MDBBtn>
              <TemperatureModal temperatureModal={temperatureModal} formData={formData} setFormData={setFormData} setTemperatureModal={setTemperatureModal} toggleTemperatureModal={toggleTemperatureModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.pulse_rate === "" ? 'dark' : 'danger'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="heartbeat" />
                  {formData.pulse_rate == "" ? <span> NA</span> : <span> {formData.pulse_rate}</span>}
                </h4>
                <span>bpm</span>
                <br />
                <b>Pulse Rate</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} formData={formData} setFormData={setFormData} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.systolic_bp === "" ? 'dark' : 'primary'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="tint" />
                  {formData.systolic_bp == "" ? <span> NA</span> : <span> {formData.systolic_bp}</span>}
                </h4>
                <span>mmHg</span>
                <br />
                <b>Systolic BP</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} formData={formData} setFormData={setFormData} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.diastolic_bp === "" ? 'dark' : 'secondary'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="tint" />
                  {formData.diastolic_bp == "" ? <span> NA</span> : <span> {formData.diastolic_bp}</span>}
                </h4>
                <span>mmHg</span>
                <br />
                <b>Diastolic BP</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} formData={formData} setFormData={setFormData} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol>
              <MDBBtn color={formData.o2_saturation === "" ? 'dark' : 'success'} className='sensor-btn' onClick={toggleO2Modal}>
                <h4><MDBIcon fas icon="wind" />
                  {formData.o2_saturation == "" ? <span> NA</span> : <span> {formData.o2_saturation}</span>}
                </h4>
                <span>%</span>
                <br />
                <b>O2 Saturation</b>
              </MDBBtn>
              <O2Modal o2Modal={o2Modal} formData={formData} setFormData={setFormData} setO2Modal={setO2Modal} toggleO2Modal={toggleO2Modal} />
            </MDBCol>
          </MDBRow>
        </div>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default SensorData