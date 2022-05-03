import React, { useState, useContext } from 'react';
import { MDBCard, MDBCardBody, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from '../components/triage/PersonalInformationInput';
import SensorData from '../components/triage/SensorData';
import Confirmation from '../components/triage/Confirmation';
import Symptoms from '../components/triage/Symptoms';
import '../styles/styles.css';
import { LanguageContext } from '../contexts/LanguageContext';

const Triage = () => {
  const [formData, setFormData] = useState(
    {
      first_name: "",
      last_name: "",
      birth_date: null,
      sex: "",
      symptoms: [],
      differentials: [],
      contact_no: "",
      temperature: "",
      pulse_rate: "",
      systolic_bp: "",
      diastolic_bp: "",
      o2_saturation: ""
    }
  )

  const [btnDisable, setBtnDisable] = useState(false);

  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const FormTitles = ['Personal Information', 'Vital Signs', 'Symptoms', 'Next']

  const { language, setLanguage } = useContext(LanguageContext);

  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInformationInput formData={formData} setFormData={setFormData} setBtnDisable={setBtnDisable} />;
    }
    else if (page === 1) {
      return <SensorData formData={formData} setFormData={setFormData} setBtnDisable={setBtnDisable} />;
    }
    else if (page === 2) {
      return <Symptoms formData={formData} setFormData={setFormData} setBtnDisable={setBtnDisable} />;
    }
    else {
      return <Confirmation formData={formData} setFormData={setFormData} setProgress={setProgress} page={page} setPage={setPage} />;
    }
  }

  const PageCard = () => {
    return <React.Fragment>
      <MDBCard className='p-0 shadow-3-strong'>
        <MDBCardBody>
          {PageDisplay()}
        </MDBCardBody>

        {PageNav()}
      </MDBCard>
    </React.Fragment>
  }

  const PageNav = () => {
    if (page === 3) {
      return <React.Fragment></React.Fragment>;
    }
    else {
      return <React.Fragment>
        <MDBRow className='mb-5 w-100' >
          <MDBCol>
            <MDBBtn outline id='prev' color='primary' className='w-75' style={{ fontSize: '1em' }} disabled={page === 0} onClick={() => { setPage((currPage) => currPage - 1); setProgress((progress) => progress - 25); }}>{language === "PH" ? "Nakaraan" : "Prev"}</MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn id='next' color='primary' className='w-75' style={{ fontSize: '1em' }} disabled={page === FormTitles.length - 1 || btnDisable} onClick={() => { setPage((currPage) => currPage + 1); setProgress((progress) => progress + 25); }}>{language === "PH" ? "Kasunod" : "Next"}</MDBBtn>
          </MDBCol>
        </MDBRow>
      </React.Fragment>;
    }
  }

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center mt-2'>
        {PageCard()}
        <MDBProgress height='10' className='rounded mt-3'>
          <MDBProgressBar bgColor='primary' width={progress} valuemin={0} valuemax={100} />
        </MDBProgress>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Triage