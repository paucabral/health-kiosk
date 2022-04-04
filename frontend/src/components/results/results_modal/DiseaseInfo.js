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

const DiseaseInfo = ({ diseaseModal, setDiseaseModal, toggleDiseaseModal }) => {
  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop scrollable='true' show={diseaseModal} setShow={setDiseaseModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Lorem Ipsum</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDiseaseModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-4">
              Lorem Ipsum
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default DiseaseInfo