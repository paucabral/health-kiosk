import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import TermsAndConditions from '../components/disclaimer/disclaimer_modal/TermsAndConditions';

const Disclaimer = () => {
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const toggleDisclaimerModal = () => setDisclaimerModal(!disclaimerModal);

  return (
    <React.Fragment>
      <MDBContainer>
        <h1>Health Kiosk</h1>
        <MDBBtn onClick={toggleDisclaimerModal}>Read Terms and Conditions</MDBBtn>
        <TermsAndConditions disclaimerModal={disclaimerModal} setDisclaimerModal={setDisclaimerModal} toggleDisclaimerModal={toggleDisclaimerModal} />
      </MDBContainer>
    </React.Fragment>
  )
}

export default Disclaimer