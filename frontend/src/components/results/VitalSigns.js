import React, { useContext } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';
import VitalSignStatus from '../../handlers/VitalSignStatus';
import { LanguageContext } from '../../contexts/LanguageContext';

const VitalSigns = ({ temperature, pulse_rate, systolic_bp, diastolic_bp, o2_saturation }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBContainer className='p-0'>
        <MDBRow>
          <strong style={{ fontSize: '1.2em' }}>VITAL SIGNS</strong>
        </MDBRow>
        <MDBRow id="confirmation" style={{ overflowY: 'auto', height: '57vh', paddingBottom: '0' }}>
          <MDBRow className='p-0 m-0'>
            <MDBContainer style={{ marginBottom: '0.5em' }}>
              <MDBCard shadow='0' border='warning' background='white'>
                <MDBCardHeader className='text-white pt-2 pb-2' background='warning'>
                  <strong><MDBIcon fas icon="thermometer-quarter" /> {language === "PH" ? "Temperatura ng Katawan" : "Body Temperature"}</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-warning pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{temperature ? <span>{temperature} °C</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>{VitalSignStatus("TEMPERATURE", temperature)}</MDBCol>
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
                  <strong><MDBIcon fas icon="heartbeat" /> {language === "PH" ? "Bilis ng Pulso" : "Pulse Rate"}</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-danger pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{pulse_rate ? <span>{pulse_rate} bpm</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>{VitalSignStatus("PULSE_RATE", pulse_rate)}</MDBCol>
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
                  <strong><MDBIcon fas icon="tint" /> Blood Pressure</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-secondary pt-2 pb-2'>
                  <MDBCardText>
                    <MDBRow>
                      <MDBCol><strong>{systolic_bp && diastolic_bp ? <span>{systolic_bp} mmHg / {diastolic_bp} mmHg</span> : <span>NA</span>}</strong></MDBCol>
                      <MDBCol>{VitalSignStatus("BLOOD_PRESSURE", systolic_bp, diastolic_bp)}</MDBCol>
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
                      <MDBCol>{VitalSignStatus("O2_SATURATION", o2_saturation)}</MDBCol>
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