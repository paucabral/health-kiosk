import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from '../components/triage/PersonalInformationInput';
import SensorData from '../components/triage/SensorData';
import Confirmation from '../components/triage/Confirmation';
import Symptoms from '../components/triage/Symptoms';
import '../styles/styles.css';

const Triage = () => {
  const [formData, setFormData] = useState(
    {
      first_name: "",
      last_name: "",
      age: "",
      sex: "",
      symptoms: [],
      contact_no: "",
      temperature: "",
      pulse_rate: "",
      systolic_bp: "",
      diastolic_bp: "",
      o2_saturation: ""
    }
  )

  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const FormTitles = ['Personal Information', 'Vital Signs', 'Symptoms', 'Next']

  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInformationInput formData={formData} setFormData={setFormData} />;
    }
    else if (page === 1) {
      return <SensorData formData={formData} setFormData={setFormData} />;
    }
    else if (page === 2) {
      return <Symptoms formData={formData} setFormData={setFormData} />;
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
            <MDBBtn outline id='prev' color='primary' className='w-75' disabled={page == 0} onClick={() => { setPage((currPage) => currPage - 1); setProgress((progress) => progress - 25); }}>Prev</MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn id='next' color='primary' className='w-75' disabled={page == FormTitles.length - 1} onClick={() => { setPage((currPage) => currPage + 1); setProgress((progress) => progress + 25); }}>Next</MDBBtn>
          </MDBCol>
        </MDBRow>
      </React.Fragment>;
    }
  }

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center mt-5'>
        {PageCard()}
        <MDBProgress height='10' className='rounded mt-3'>
          <MDBProgressBar width={progress} valuemin={0} valuemax={100} />
        </MDBProgress>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Triage