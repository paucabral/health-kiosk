import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from './triage_forms/PersonalInformationInput';
import './styles.css';

const Triage = () => {
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const FormTitles = ['Personal Information', 'Next']

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center'>
        <MDBCard className='p-5 shadow-3-strong'>

          <PersonalInformationInput />

          <MDBRow className='mb-4 w-100'>
            <MDBCol>
              <MDBBtn id='prev' className='w-75' disabled={page == 0} onClick={() => setPage((currPage) => currPage - 1)}>Prev</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn id='next' className='w-75' disabled={page == FormTitles.length - 1} onClick={() => setPage((currPage) => currPage + 1)}>Next</MDBBtn>
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