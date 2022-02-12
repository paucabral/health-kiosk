import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from './triage_forms/PersonalInformationInput';
import SensorData from './triage_forms/SensorData';
import Confirmation from './triage_forms/Confirmation';
import './styles.css';

const Triage = () => {
  const [formData, setFormData] = useState(
    {
      first_name: "",
      last_name: "",
      age: "",
      sex: "",
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
  const FormTitles = ['Personal Information', 'Sensor Data', 'Next']
  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInformationInput formData={formData} setFormData={setFormData} />;
    }
    else if (page === 1) {
      return <SensorData formData={formData} setFormData={setFormData} />;
    }
    else {
      return <Confirmation formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
    }
  }

  const PageCard = () => {
    if (page === 0) {
      return <React.Fragment>
        <MDBCard className='p-0 shadow-3-strong'>

          <MDBCardBody>
            {PageDisplay()}
          </MDBCardBody>

          {PageNav()}

        </MDBCard>
      </React.Fragment>
    }
    else if (page === 1) {
      return <React.Fragment>
        <MDBCardBody>
          {PageDisplay()}
        </MDBCardBody>

        {PageNav()}
      </React.Fragment>
    }
    else {
      return <React.Fragment>
        <MDBCard className='p-0 shadow-3-strong'>

          <MDBCardBody>
            {PageDisplay()}
          </MDBCardBody>

          {PageNav()}

        </MDBCard>
      </React.Fragment>
    }
  }

  const PageNav = () => {
    if (page === 2) {
      return <React.Fragment></React.Fragment>;
    }
    else {
      return <React.Fragment>
        <MDBRow className={`${page === 1 ? 'mb-0' : 'mb-5'} w-100`} >
          <MDBCol>
            <MDBBtn outline id='prev' color='primary' className='w-75' disabled={page == 0} onClick={() => { setPage((currPage) => currPage - 1); }}>Prev</MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn id='next' color='primary' className='w-75' disabled={page == FormTitles.length - 1} onClick={() => { setPage((currPage) => currPage + 1); }}>Next</MDBBtn>
          </MDBCol>
        </MDBRow>
      </React.Fragment>;
    }
  }

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center' style={{ marginTop: `-2rem` }}>
        {PageCard()}
        <MDBProgress height='10' className='rounded mt-3'>
          <MDBProgressBar width={page === 0 ? 0 : page === 1 ? 50 : 100} valuemin={0} valuemax={100} />
        </MDBProgress>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Triage