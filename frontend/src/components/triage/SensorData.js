import React, { useState, useEffect, useContext } from 'react';
import { MDBInput, MDBBtn, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import TemperatureModal from './sensor_modals/TemperatureModal';
import PulseModal from './sensor_modals/PulseModal';
import O2Modal from './sensor_modals/O2Modal';
import { LanguageContext } from '../../contexts/LanguageContext';

const SensorData = ({ formData, setFormData, setBtnDisable }) => {

  const [temperatureModal, setTemperatureModal] = useState(false);
  const toggleTemperatureModal = () => setTemperatureModal(!temperatureModal);

  const [pulseModal, setPulseModal] = useState(false);
  const togglePulseModal = () => setPulseModal(!pulseModal);

  const [o2Modal, setO2Modal] = useState(false);
  const toggleO2Modal = () => setO2Modal(!o2Modal);

  useEffect(() => {
    if (formData.temperature === "" | formData.temperature == 0 | formData.pulse_rate === "" | formData.pulse_rate == 0 | formData.systolic_bp === "" | formData.systolic_bp == 0 | formData.diastolic_bp === "" | formData.diastolic_bp == 0 | formData.o2_saturation === "" | formData.o2_saturation == 0) {
      setBtnDisable(true)
    }
    else {
      setBtnDisable(false)
    }
  }, [formData])

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold", fontSize: '1.75em' }}>Vital Signs</MDBCardTitle>
      {language === "PH" ?
        <p className='mb-2' style={{ fontSize: '1.25em' }} >
          Sukatin ang iyong vital signs sa pamamagitan ng pagpili sa mga opsyon sa ibaba.
        </p>
        :
        <p className='mb-2' style={{ fontSize: '1.25em' }} >
          Measure your vital signs by selecting the options below.
        </p>
      }
      <MDBCardBody className='py-0'>
        <div>
          <MDBRow className='w-100'>
            <MDBCol style={{ paddingTop: '1em', paddingBottom: '1em' }}>
              <MDBBtn color={formData.temperature === "" | formData.temperature == 0 ? 'dark' : 'warning'} className='sensor-btn' onClick={toggleTemperatureModal}>
                <h4><MDBIcon fas icon="thermometer-quarter" />
                  {formData.temperature === "" | formData.temperature == 0 ? <span> NA</span> : <span> {formData.temperature}</span>}
                </h4>
                <span>??C</span>
                <br />
                {language === "PH" ?
                  <b>
                    Temperatura
                  </b>
                  :
                  <b>
                    Temperature
                  </b>
                }
              </MDBBtn>
              <TemperatureModal temperatureModal={temperatureModal} formData={formData} setFormData={setFormData} setTemperatureModal={setTemperatureModal} toggleTemperatureModal={toggleTemperatureModal} />
            </MDBCol>
            <MDBCol style={{ paddingTop: '1em', paddingBottom: '1em' }}>
              <MDBBtn color={formData.o2_saturation === "" | formData.o2_saturation == 0 ? 'dark' : 'success'} className='sensor-btn' onClick={toggleO2Modal}>
                <h4><MDBIcon fas icon="wind" />
                  {formData.o2_saturation === "" | formData.o2_saturation == 0 ? <span> NA</span> : <span> {formData.o2_saturation}</span>}
                </h4>
                <span>%</span>
                <br />
                <b>O<sub>2</sub> Saturation</b>
              </MDBBtn>
              <O2Modal o2Modal={o2Modal} formData={formData} setFormData={setFormData} setO2Modal={setO2Modal} toggleO2Modal={toggleO2Modal} />
            </MDBCol>
            <MDBCol style={{ backgroundColor: '#d1e2e6', paddingTop: '1em', paddingBottom: '1em', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
              <MDBBtn color={formData.pulse_rate === "" | formData.pulse_rate == 0 ? 'dark' : 'danger'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="heartbeat" />
                  {formData.pulse_rate === "" | formData.pulse_rate == 0 ? <span> NA</span> : <span> {formData.pulse_rate}</span>}
                </h4>
                <span>bpm</span>
                <br />
                {language === "PH" ?
                  <b>
                    Pulso
                  </b>
                  :
                  <b>
                    Pulse Rate
                  </b>
                }
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} formData={formData} setFormData={setFormData} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol style={{ backgroundColor: '#d1e2e6', paddingTop: '1em', paddingBottom: '1em' }}>
              <MDBBtn color={formData.systolic_bp === "" | formData.systolic_bp == 0 ? 'dark' : 'primary'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="tint" />
                  {formData.systolic_bp === "" | formData.systolic_bp == 0 ? <span> NA</span> : <span> {formData.systolic_bp}</span>}
                </h4>
                <span>mmHg</span>
                <br />
                <b>Systolic BP</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} formData={formData} setFormData={setFormData} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
            <MDBCol style={{ backgroundColor: '#d1e2e6', paddingTop: '1em', paddingBottom: '1em', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
              <MDBBtn color={formData.diastolic_bp === "" | formData.diastolic_bp == 0 ? 'dark' : 'secondary'} className='sensor-btn' onClick={togglePulseModal}>
                <h4><MDBIcon fas icon="tint" />
                  {formData.diastolic_bp === "" | formData.diastolic_bp == 0 ? <span> NA</span> : <span> {formData.diastolic_bp}</span>}
                </h4>
                <span>mmHg</span>
                <br />
                <b>Diastolic BP</b>
              </MDBBtn>
              <PulseModal pulseModal={pulseModal} formData={formData} setFormData={setFormData} setPulseModal={setPulseModal} togglePulseModal={togglePulseModal} />
            </MDBCol>
          </MDBRow>
        </div>
      </MDBCardBody>
      <div className='mt-2'>
        <span className="text-muted" style={{ fontSize: '1em', width: '5em' }}>
          {language === "PH" ?
            <p>Ang Temperatura at Oxygen Saturation ay may mga indibidwal na sensor, habang ang Pulse Rate at Systolic &amp; Diastolic Blood Pressure ay may parehong sensor.</p>
            :
            <p>NOTE: Temperature and Oxygen Saturation have their own individual sensors, while the Pulse Rate and Systolic &amp; Diastolic Blood Pressure share the same sensor.</p>
          }
        </span>
      </div>
    </React.Fragment>
  )
}

export default SensorData