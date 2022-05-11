import {
  MDBCard, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBCol, MDBRow, MDBBtn, MDBContainer,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/styles.css';
import moment from 'moment';
import { LanguageContext } from '../../contexts/LanguageContext';

const Confirmation = ({ formData, setFormData, setPage, setProgress }) => {
  const navigate = useNavigate();

  const [loadingModal, setLoadingModal] = useState(false);
  const toggleLoadingModal = () => {
    setLoadingModal(!loadingModal);
  }

  const checkEntry = () => {
    return formData.first_name === "" | formData.last_name === "" | formData.birth_date === null | formData.sex === "" | formData.contact_no === "" | formData.temperature === "" | formData.pulse_rate === "" | formData.systolic_bp === "" | formData.diastolic_bp === "" | formData.o2_saturation === ""
  }

  const submitForm = async () => {
    toggleLoadingModal();
    try {
      var symptoms = []
      for (let symptom of formData.symptoms) {
        symptoms.push(symptom.symptom)
      }
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/differential-diagnosis/`
      const json = JSON.stringify({
        "first_name": formData.first_name,
        "last_name": formData.last_name,
        "birth_date": formData.birth_date,
        "sex": formData.sex,
        "symptoms": symptoms,
        "differentials": [],
        "contact_no": formData.contact_no,
        "temperature": formData.temperature,
        "pulse_rate": formData.pulse_rate,
        "systolic_bp": formData.systolic_bp,
        "diastolic_bp": formData.diastolic_bp,
        "o2_saturation": formData.o2_saturation
      })
      const response = await axios.post(url, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status == 200) {
        console.log(response.data);
        navigate('/results', { state: response.data })
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <React.Fragment>
      <div style={{ height: '67vh' }}>
        <MDBCardTitle style={{ fontWeight: "bold", fontSize: '1.75em' }}>{language === "PH" ? "Kumpirmahin ang Impormasyon" : "Confirm Entry"}</MDBCardTitle>
        <p className='mb-0' style={{ fontSize: '1.25em' }}>{language === "PH" ? "Tiyakin na tama ang lahat ng impormasyon bago magpatuloy." : "Please ensure that all the information are correct before you proceed."}</p>
        <MDBCardBody>
          <div id="confirmation" style={{ overflowY: 'auto', height: '40vh', marginTop: '0em', marginBottom: '1em' }}>
            <div className='container'>
              <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center", fontSize: '1.2em' }}>
                <MDBRow>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='4'>
                        <strong>{language === "PH" ? "PANGALAN" : "NAME"}:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.first_name && formData.last_name ? <span>{formData.first_name} {formData.last_name}</span> : <i className='text-muted'>*{language === "PH" ? "NAWAWALA" : "MISSING"}</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='4'>
                        <strong>{language === "PH" ? "KASARIAN" : "SEX"}:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.sex ? <span>{formData.sex}</span> : <i className='text-muted'>*{language === "PH" ? "NAWAWALA" : "MISSING"}</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='4'>
                        <strong>{language === "PH" ? "KAARAWAN" : "BIRTHDAY"}:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.birth_date ? <span>{moment(formData.birth_date).format('MMMM DD, YYYY')}</span> : <i className='text-muted'>*MISSING</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='4'>
                        <strong>{language === "PH" ? "TELEPONO" : "CONTACT"}:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.contact_no ? <span>{formData.contact_no}</span> : <i className='text-muted'>*{language === "PH" ? "NAWAWALA" : "MISSING"}</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow className='mt-3 mb-2'>
                  <MDBCol size='2'>
                    <strong>{language === "PH" ? "MGA SINTOMAS" : "SYMPTOMS"}:</strong>
                  </MDBCol>
                  <MDBCol style={{ textAlign: 'left' }}>
                    {formData.symptoms.length != 0 ?
                      <MDBContainer>
                        {
                          formData.symptoms?.map((symptom) => (
                            <MDBBtn pill color='dark' className='shadow-0' key={symptom} style={{ display: 'inline', marginLeft: '0.3em', marginRight: '0.3em', marginBottom: '0.5em', borderRadius: '20px' }} disabled>{language === "PH" ? symptom.ph : symptom.en}</MDBBtn>
                          ))
                        }
                      </MDBContainer>
                      : <MDBCardText className='text-muted'><i>{language === "PH" ? "WALANG NAPILING SINTOMAS" : "NO SYMPTOMS SELECTED"} </i></MDBCardText>
                    }
                  </MDBCol>
                </MDBRow>
              </MDBRow>
              <MDBRow className='mb-4' style={{ textAlign: "center", fontSize: '1.23em' }}>
                <MDBCol className='mx-0 px-2'>
                  <MDBCard shadow='0' border='warning' background='white'>
                    <MDBCardHeader className='text-warning'>
                      <strong><MDBIcon fas icon="thermometer-quarter" /> {language === "PH" ? "Temperatura" : "Body Temperature"}</strong>
                    </MDBCardHeader>
                    <MDBCardBody className='text-warning'>
                      <MDBCardText>
                        {formData.temperature ? <span>{formData.temperature} °C</span> : <span>NA</span>}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol className='mx-0 px-2'>
                  <MDBCard shadow='0' border='success' background='white'>
                    <MDBCardHeader className='text-success'>
                      <strong><MDBIcon fas icon="wind" /> O<sub>2</sub> Saturation</strong>
                    </MDBCardHeader>
                    <MDBCardBody className='text-success'>
                      <MDBCardText>
                        {formData.o2_saturation ? <span> {formData.o2_saturation} %</span> : <span>NA</span>}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol className='mx-0 px-2'>
                  <MDBCard shadow='0' border='danger' background='white'>
                    <MDBCardHeader className='text-danger'>
                      <strong><MDBIcon fas icon="heartbeat" /> {language === "PH" ? "Bilis ng Pulso" : "Pulse Rate"}</strong>
                    </MDBCardHeader>
                    <MDBCardBody className='text-danger'>
                      <MDBCardText>
                        {formData.pulse_rate ? <span>{formData.pulse_rate} bpm</span> : <span>NA</span>}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol className='mx-0 px-2'>
                  <MDBCard shadow='0' border='primary' background='white'>
                    <MDBCardHeader className='text-primary'>
                      <strong><MDBIcon fas icon="tint" /> Systolic BP</strong>
                    </MDBCardHeader>
                    <MDBCardBody className='text-primary'>
                      <MDBCardText>
                        {formData.systolic_bp ? <span>{formData.systolic_bp} mmHg</span> : <span>NA</span>}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol className='mx-0 px-2'>
                  <MDBCard shadow='0' border='secondary' background='white'>
                    <MDBCardHeader className='text-secondary'>
                      <strong><MDBIcon fas icon="tint" /> Diastolic BP</strong>
                    </MDBCardHeader>
                    <MDBCardBody className='text-secondary'>
                      <MDBCardText>
                        {formData.diastolic_bp ? <span>{formData.diastolic_bp} mmHg</span> : <span>NA</span>}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          </div>

          <MDBContainer>
            <MDBRow className='w-100'>
              <MDBCol>
                <MDBBtn onClick={() => { setPage(0); setProgress(0); }} style={{ fontSize: '1em' }} className='w-75' color='warning'>
                  {language === "PH" ? "Bumalik" : "Go back"}
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn color='success' disabled={checkEntry()} style={{ fontSize: '1em' }} className='w-75' onClick={submitForm}>
                  {language === "PH" ? "Isumite" : "Submit"}
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </div>
      <LoadingModal loadingModal={loadingModal} setLoadingModal={setLoadingModal} />
    </React.Fragment>
  )
}

export default Confirmation

const LoadingModal = ({ loadingModal, setLoadingModal }) => {
  return <React.Fragment>
    <MDBModal id="temperature-modal" staticBackdrop show={loadingModal} setShow={setLoadingModal} tabIndex='-1'>
      <MDBModalDialog centered size='md'>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBContainer>
              <MDBModalTitle style={{ textAlign: 'center' }}>Loading...</MDBModalTitle>
            </MDBContainer>
          </MDBModalHeader>
          <MDBModalBody style={{ textAlign: "center" }} className="mb-2">
            <MDBContainer>
              <MDBSpinner className='mx-2' size='3x' color='info'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>
            </MDBContainer>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </React.Fragment>
}