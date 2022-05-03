import React, { useEffect, useState, useContext } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
  MDBContainer,
  MDBModalFooter,
  MDBSpinner,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import diseaseInfo from '../../../data/disease-info';
import { LanguageContext } from '../../../contexts/LanguageContext';

const Disclaimer = ({ disclaimerModal, setDisclaimerModal, toggleDisclaimerModal }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop show={disclaimerModal} setShow={setDisclaimerModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent style={{ height: '50vh', fontSize: '1.3em' }}>
            <MDBModalHeader>
              <MDBModalTitle style={{ fontSize: '1.2em' }}>{language === "PH" ? "Paunawa" : "Disclaimer"}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDisclaimerModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2' style={{ height: '80vh' }}>
              <MDBContainer>
                <div>
                  <h3>{language === "PH" ? "Ang resulta na mula sa kiosk na ito ay HINDI PINAL" : "The results presented in this kiosk is NOT FINAL."}</h3>
                  <MDBContainer>
                    <MDBIcon size='5x' color='warning' fas icon="exclamation-circle" />
                  </MDBContainer>
                  <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>{language === "PH" ? "Mangyaring kumunsulta sa doktor para sa karagdagang pagsusuri. Maaaring gamitin ang mga features ng kiosk upang mahanap ang mga malalapit na pasilidad." : "Please consult an doctor for further checkup. You may use the kiosk's features to locate nearby facilities."}</i></p>
                </div>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default Disclaimer