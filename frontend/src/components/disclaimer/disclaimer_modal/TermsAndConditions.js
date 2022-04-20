import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBFooter,
  MDBTabsLink,
} from 'mdb-react-ui-kit';

const TermsAndConditions = ({ disclaimerModal, setDisclaimerModal, toggleDisclaimerModal }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/check`;
    navigate(path);
  }

  return (
    <React.Fragment>
      <MDBModal id="" staticBackdrop scrollable='true' show={disclaimerModal} setShow={setDisclaimerModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent style={{ height: '70vh' }}>
            <MDBModalHeader>
              <MDBModalTitle>Terms &amp; Conditions</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDisclaimerModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2 mr-3' style={{ textAlign: "justify", overflowY: 'auto', height: '100vh' }}>
              <MDBRow className='px-2'>
                <h4>Disclaimer</h4>
                <p>All effort is taken to ensure that all health information collected and used in the kiosk is informative and accurate. The kiosk is designed to accomodate <b>only adult patients (18 years old and above)</b>. Information taken from the patient is secured and the kiosk will give a copy of the results for further consultation in a presence of a doctor or health expert. The results shown in the kiosk are not final and only serve as a reference for the doctor to speed up the diagnosis or check-ups.</p>
                <h4>Terms & Conditions</h4>
                <h5>About the Kiosk</h5>
                <p>The system is limited to internal medicine symptoms and diseases to narrow the focus concerning the availability of datasets. The self-service health kiosk will predict the possible diseases that the patient may have depending on the symptoms that are collected from the patient. Further, the system will show information about the diseases and the precautions that the patient may take. The nearest hospital will be shown based on the physical location where the kiosk is deployed. Locating the nearest hospitals will be done through API calls from third-party API, thus the need for the device to be always connected to the internet. These API services are the Maps API and Places API provided by Google Maps. Hence, the accuracy of nearby hospital recommendations will be dependent on the accuracy of the pinpointed GPS location of the kiosk in conjunction with API services provided by Google.</p>
                <h5>Security and Confidentiality</h5>
                <p>All information collected at the kiosk is protected by the AES-256 algorithm. It is a variation of the Advanced Encryption Standard (AES) algorithm which has a key length of 256 bits will be utilized. It is resistant to brute force attacks which are essential considering that the design deploys the database locally.</p>
                <h5>Your Agreement</h5>
                <p>The self-service health kiosk is not a substitute for diagnosis and check-ups with a presence of a doctor or a health expert. All symptom-disease information is scraped from validated clinical sites such as Mayo Clinic and WebMD. The results shown from the kiosk will only serve as a reference for further consultation in the presence of a professional doctor. Hence, the diseases shown on the results page are not final and needed validation from a doctor for confirmation.</p>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBCol className='p-0 m-0' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <MDBBtn onClick={routeChange}>I AGREE</MDBBtn>
              </MDBCol>
              <MDBCol className='p-0 m-0' style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.85em', fontWeight: 'bold' }}>
                <MDBTabsLink style={{ textDecoration: 'underline' }} onClick={toggleDisclaimerModal}>CANCEL</MDBTabsLink>
              </MDBCol>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default TermsAndConditions