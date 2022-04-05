import React from 'react';
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
  MDBCol
} from 'mdb-react-ui-kit';

const SMSStatus = ({ contact_no, message, smsModal, setSmsModal, toggleSmsModal }) => {
  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop show={smsModal} setShow={setSmsModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent style={{ height: '50vh' }}>
            <MDBModalHeader>
              <MDBModalTitle>Obtain Results Through SMS</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleSmsModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2' style={{ height: '80vh' }}>
              <MDBRow>
                <p>Sending the assessment results through SMS to</p>
                <h3>{contact_no}</h3>
                <p className="text-muted" style={{ fontSize: '0.75em' }}><i>NOTE: Ensure that you have entered a working number.</i></p>
              </MDBRow>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default SMSStatus