import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import TermsAndConditions from '../components/disclaimer/disclaimer_modal/TermsAndConditions';

const Disclaimer = () => {
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const toggleDisclaimerModal = () => setDisclaimerModal(!disclaimerModal);

  return (
    <React.Fragment>
      <MDBContainer>
        <MDBContainer className='mb-2'>
          <span style={{ fontSize: '0.75em' }}>BROUGHT TO YOU BY</span>
          <h2 style={{ fontSize: '1.25em', color: 'rgb(10, 165, 165)' }}>HIGH GROUNDS</h2>
        </MDBContainer>
        <MDBContainer className='mb-4'>
          <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '3em' }}>Health Kiosk</h1>
        </MDBContainer>
        <p className='px-5' style={{ textAlign: 'center' }}><b>Disclaimer: </b>This kiosk was designed to aid the decision making of the patient and lead them proper channels for further consultation and analysis. The results are <b>NOT FINAL</b> <b>NOR A DEFINITIVE DIAGNOSIS</b>, but a indicator which can be used by a doctor to narrow down a patient's possible disease/s based on symptoms.</p>
        <p style={{ color: 'gray', fontStyle: 'italic', fontSize: '0.85em' }}>*Please read the terms and conditions before proceeding.*</p>
        <MDBBtn onClick={toggleDisclaimerModal}>Read Terms and Conditions</MDBBtn>
        <TermsAndConditions disclaimerModal={disclaimerModal} setDisclaimerModal={setDisclaimerModal} toggleDisclaimerModal={toggleDisclaimerModal} />
      </MDBContainer>
    </React.Fragment>
  )
}

export default Disclaimer