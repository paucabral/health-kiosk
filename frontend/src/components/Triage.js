import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import PersonalInformationInput from './triage_forms/PersonalInformationInput';

const Triage = () => {
  const [progress, setProgress] = useState(0);

  return (
    <React.Fragment>
      <MDBContainer className='align-items-center justify-content-center'>
        <MDBCard className='p-5'>

          <PersonalInformationInput />

        </MDBCard>
        <MDBProgress className='m-3'>
          <MDBProgressBar width={progress} valuemin={0} valuemax={100} />
        </MDBProgress>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Triage