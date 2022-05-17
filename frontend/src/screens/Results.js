import { MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon, MDBBtn, MDBCard } from 'mdb-react-ui-kit';
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DiseaseList from '../components/results/DiseaseList';
import SMSStatus from '../components/results/results_modal/SMSStatus';
import VitalSigns from '../components/results/VitalSigns';
import VitalSignStatus from '../handlers/VitalSignStatus';
import Disclaimer from '../components/results/results_modal/Disclaimer';
import moment from 'moment';
import { LanguageContext } from '../contexts/LanguageContext';

const Results = () => {
  const location = useLocation();

  let navigate = useNavigate();

  const [disclaimerModal, setDisclaimerModal] = useState(true);
  const toggleDisclaimerModal = () => {
    setDisclaimerModal(!disclaimerModal)
  }

  const [smsModal, setSmsModal] = useState(false);
  const toggleSmsModal = () => {
    setSmsModal(!smsModal)
  }

  const [checked, setChecked] = useState(false);
  const handleFeature = () => {
    let checkbox = document.getElementById('arrow-toggler');
    checkbox.checked = !checkbox.checked;
    setChecked(checkbox.checked);
  }

  const message = {
    first_name: location.state.first_name,
    last_name: location.state.last_name,
    sex: location.state.sex,
    birth_date: location.state.birth_date,
    contact_no: location.state.contact_no,
    symptoms: location.state.symptoms,
    differentials: location.state.predictions ? Object.keys(location.state.predictions) : null,
    temperature: {
      value: location.state.temperature,
      status: `${VitalSignStatus("TEMPERATURE", location.state.temperature)}`
    },
    pulse_rate: {
      value: location.state.pulse_rate,
      status: `${VitalSignStatus("PULSE_RATE", location.state.pulse_rate)}`,
    },
    systolic_bp: {
      value: location.state.systolic_bp,
      status: "STATUS",
    },
    diastolic_bp: {
      value: location.state.diastolic_bp,
      status: "STATUS",
    },
    blood_pressure: {
      value: `${location.state.systolic_bp} mmhg / ${location.state.diastolic_bp} mmhg`,
      status: `${VitalSignStatus("BLOOD_PRESSURE", location.state.systolic_bp, location.state.diastolic_bp)}`
    },
    o2_saturation: {
      value: location.state.o2_saturation,
      status: `${VitalSignStatus("O2_SATURATION", location.state.o2_saturation)}`,
    },
  }

  const { language, setLanguage } = useContext(LanguageContext);

  const entry = location.state.predictions ? Object.keys(location.state.predictions).slice(0, 5).join(' ') : null

  return (
    <React.Fragment>
      <MDBContainer className='mt-4 mx-4' style={{ width: '100%', marginBottom: '-2.3em' }}>
        <MDBRow className='mb-2' style={{ textAlign: "center", display: 'flex', justifyContent: "center" }}>
          <MDBCardTitle style={{ fontWeight: "bold", fontSize: '1.5em' }}>{language === "PH" ? "Pagsusuri sa Pasyente" : "Patient Assessment"}</MDBCardTitle>
        </MDBRow>
        <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
          <MDBRow>
            <MDBCard className='px-5 py-2' shadow='1-strong' id='differential' style={{ overflowY: 'auto', height: '14vh', fontSize: "1.2em" }}>
              <MDBRow>
                <MDBCol>
                  <MDBRow>
                    <MDBCol size={language === "PH" ? "4" : "4"}>
                      <strong>{language === "PH" ? "PANGALAN" : "NAME"}:</strong>
                    </MDBCol>
                    <MDBCol>
                      {location.state.first_name && location.state.last_name ? <span>{location.state.first_name} {location.state.last_name}</span> : <i className='text-muted'>*MISSING</i>}
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol>
                  <MDBRow>
                    <MDBCol size={language === "PH" ? "4" : "4"}>
                      <strong>{language === "PH" ? "KASARIAN" : "SEX"}:</strong>
                    </MDBCol>
                    <MDBCol>
                      {location.state.sex ? <span>{location.state.sex}</span> : <i className='text-muted'>*MISSING</i>}
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBRow>
                    <MDBCol size={language === "PH" ? "4" : "4"}>
                      <strong>{language === "PH" ? "KAARAWAN" : "BIRTHDAY"}:</strong>
                    </MDBCol>
                    <MDBCol>
                      {location.state.birth_date ? <span>{moment(location.state.birth_date).format('MMMM DD, YYYY')}</span> : <i className='text-muted'>*MISSING</i>}
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol>
                  <MDBRow>
                    <MDBCol size={language === "PH" ? "4" : "4"}>
                      <strong>{language === "PH" ? "TELEPONO" : "CONTACT"}:</strong>
                    </MDBCol>
                    <MDBCol>
                      {location.state.contact_no ? <span>{location.state.contact_no}</span> : <i className='text-muted'>*MISSING</i>}
                      {
                        location.state.contact_no === "NA" || location.state.contact_no.length != 11 || !(location.state.contact_no.startsWith("09")) ?
                          <MDBContainer className='m-0 p-0' style={{ fontSize: '0.6em', fontStyle: 'italic' }}>{language === "PH" ? "Hindi makatatanggap ng SMS." : "Not eligible to receive SMS."}</MDBContainer>
                          : <></>
                      }
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBRow>
        </MDBRow>
        <MDBRow>
          <MDBCol className='pl-2 ml-1'>
            <VitalSigns
              temperature={location.state.temperature}
              pulse_rate={location.state.pulse_rate}
              systolic_bp={location.state.systolic_bp}
              diastolic_bp={location.state.diastolic_bp}
              o2_saturation={location.state.o2_saturation}
            />
          </MDBCol>
          <MDBCol className='pr-2 mr-1'>
            <MDBCol className='px-0'>
              <DiseaseList diseases={location.state.predictions} symptoms={location.state.symptoms} />
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <input id="arrow-toggler" type="checkbox" style={{ display: 'none' }} />
      <div id="arrow-btn">
        <MDBBtn color='dark' onClick={handleFeature} className='px-0' rounded style={{ height: '115px', width: '115px', lineHeight: '1' }}>
          <div>
            <MDBRow>
              <MDBIcon size='2x' fas icon={checked ? "sort-down" : "sort-up"} />
            </MDBRow>
            <MDBRow className='m-2'>
              <span style={{ fontSize: '1.2em' }}>{language === "PH" ? "PUMILI" : "SELECT"}</span>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
          </div>
        </MDBBtn>
      </div>
      <div id="hospital-btn" className='icons-btn'>
        <MDBBtn color='danger' className='px-0' rounded style={{ height: '130px', width: '130px', lineHeight: '1' }} onClick={() => navigate('/nearest-facilities', { state: entry })}>
          <div>
            <MDBRow>
              <MDBIcon size='3x' fas icon="hospital" />
            </MDBRow>
            <MDBRow className='m-2'>
              <span style={{ fontSize: '1.2em' }}>{language === "PH" ? "Pinaka-malapit na mga pasilidad" : "Find Nearby Facilities"}</span>
            </MDBRow>
          </div>
        </MDBBtn>
      </div>
      <div id="text-btn" className='icons-btn'>
        {
          location.state.contact_no != "NA" && location.state.contact_no.length === 11 && location.state.contact_no.startsWith("09") ?
            <MDBBtn color='primary' className='px-0' rounded style={{ height: '130px', width: '130px', lineHeight: '1' }} onClick={() => { toggleSmsModal(); handleFeature(); }}>
              <div>
                <MDBRow>
                  <MDBIcon size='3x' fas icon="comment" />
                </MDBRow>
                <MDBRow className='m-2'>
                  <span style={{ fontSize: '1.2em' }}>{language === "PH" ? "Ipadala ang resulta via SMS" : "Send Results via SMS"}</span>
                </MDBRow>
              </div>
            </MDBBtn>
            :
            <></>
        }
      </div>
      <SMSStatus contact_no={location.state.contact_no} message={message} smsModal={smsModal} setSmsModal={setSmsModal} toggleSmsModal={toggleSmsModal} />
      <div id="overlay"></div>
      <Disclaimer disclaimerModal={disclaimerModal} setDisclaimerModal={setDisclaimerModal} toggleDisclaimerModal={toggleDisclaimerModal} />
    </React.Fragment>
  )
}

export default Results