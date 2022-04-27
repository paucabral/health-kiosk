import React, { useEffect, useState } from 'react';
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

const Disclaimer = ({ disclaimerModal, setDisclaimerModal, toggleDisclaimerModal }) => {

  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop show={disclaimerModal} setShow={setDisclaimerModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent style={{ height: '50vh' }}>
            <MDBModalHeader>
              <MDBModalTitle>Disclaimer</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDisclaimerModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2' style={{ height: '80vh' }}>
              <MDBContainer>
                <div>
                  <h3>The results for presented in this kiosk is NOT FINAL.</h3>
                  <MDBContainer>
                    <MDBIcon size='5x' color='warning' fas icon="exclamation-circle" />
                  </MDBContainer>
                  <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>Please consult an doctor for further checkup. You may use the kiosk's features to locate nearby facilities.</i></p>
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