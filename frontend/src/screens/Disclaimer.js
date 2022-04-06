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
        <p className='px-5' style={{ textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue nulla id lacinia blandit. Curabitur luctus est vitae semper fringilla. Proin dignissim ante eget orci aliquam, eget feugiat magna vestibulum. In at mauris nec purus commodo dignissim vitae et turpis. Vivamus venenatis dignissim ullamcorper. Aenean ut nibh ut nibh aliquam ultrices in vel quam. Pellentesque non ligula nec risus viverra tristique. Donec pretium lacus tempus orci cursus, non blandit purus tempus.</p>
        <MDBBtn onClick={toggleDisclaimerModal}>Read Terms and Conditions</MDBBtn>
        <TermsAndConditions disclaimerModal={disclaimerModal} setDisclaimerModal={setDisclaimerModal} toggleDisclaimerModal={toggleDisclaimerModal} />
      </MDBContainer>
    </React.Fragment>
  )
}

export default Disclaimer