import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from './triage_forms/PersonalInformationInput';
import SensorData from './triage_forms/SensorData';
import './styles.css';

const Triage = () => {
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const FormTitles = ['Personal Information', 'Sensor Data', 'Next']
  const PageDisplay = () => {
    if (page === 0) {
      return <PersonalInformationInput />;
    }
    else if (page === 1) {
      return <SensorData />;
    }
    else {
      return <div>Hello World</div>
    }
  }

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center'>
        <MDBCard className='p-5 shadow-3-strong'>

          <MDBCardBody>
            {PageDisplay()}
          </MDBCardBody>

          <MDBRow className='mb-4 w-100'>
            <MDBCol>
              <MDBBtn outline id='prev' color='primary' className='w-75' disabled={page == 0} onClick={() => { setPage((currPage) => currPage - 1); setProgress(progress - 50); }}>Prev</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn id='next' color='primary' className='w-75' disabled={page == FormTitles.length - 1} onClick={() => { setPage((currPage) => currPage + 1); setProgress(progress + 50); }}>Next</MDBBtn>
            </MDBCol>
          </MDBRow>

        </MDBCard>
        <MDBProgress className='m-3'>
          <MDBProgressBar width={progress} valuemin={0} valuemax={100} />
        </MDBProgress>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Triage