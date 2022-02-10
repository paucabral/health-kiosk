import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBCol, MDBRow, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from './triage_forms/PersonalInformationInput';

const Triage = () => {
  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const FormTitles = ['Personal Information', 'Next']

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center'>
        <MDBCard className='p-5'>

          <PersonalInformationInput />

          <MDBRow className='mb-4 w-100'>
            <MDBCol>
              <MDBBtn className='w-50' disabled={page == 0} onClick={() => setPage((currPage) => currPage - 1)}>Prev</MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn className='w-50' disabled={page == FormTitles.length - 1} onClick={() => setPage((currPage) => currPage + 1)}>Next</MDBBtn>
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