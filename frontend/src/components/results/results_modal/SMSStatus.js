import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';

const SMSStatus = ({ contact_no, message, smsModal, setSmsModal, toggleSmsModal }) => {
  const [smsStatus, setSmsStatus] = useState("SENDING");

  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop show={smsModal} setShow={setSmsModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent style={{ height: '50vh' }}>
            <MDBModalHeader>
              <MDBModalTitle>Send Results Through SMS</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleSmsModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2' style={{ height: '80vh' }}>
              <MDBContainer>
                {
                  smsStatus === "SENDING" ?
                    <div>
                      <p>Sending the assessment results through SMS to</p>
                      <h3>{contact_no}</h3>
                      <MDBContainer>
                        <MDBSpinner color='primary' />
                      </MDBContainer>
                      <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>NOTE: Ensure that the number you have entered is correct.</i></p>
                    </div>
                    : smsStatus === "SUCCESS" ?
                      <div>
                        <h3>The results has been sent successfully.</h3>
                        <MDBContainer>
                          <MDBIcon size='5x' color='success' fas icon="check-circle" />
                        </MDBContainer>
                        <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>NOTE: Ensure that the number you have entered is correct.</i></p>
                      </div>
                      :
                      <div>
                        <div>
                          <h3>There was an error in sending the message.</h3>
                          <MDBContainer>
                            <MDBIcon size='5x' color='danger' fas icon="ban" />
                          </MDBContainer>
                          <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>NOTE: Ensure that the number you have entered is correct. Otherwise, please reach a support personnel.</i></p>
                        </div>
                      </div>
                }
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default SMSStatus