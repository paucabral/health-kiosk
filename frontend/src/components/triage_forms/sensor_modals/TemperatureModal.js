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
} from 'mdb-react-ui-kit';

const TemperatureModal = ({ temperatureModal, setTemperatureModal, toggleTemperatureModal }) => {
  return (
    <React.Fragment>
      <MDBModal staticBackdrop show={temperatureModal} setShow={setTemperatureModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Temperature Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleTemperatureModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }}>
              <div>
                <p>Please follow these steps to measure your body temperature.</p>
                <ol>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Aliquam interdum risus sit amet urna lacinia, sit amet efficitur augue bibendum.</li>
                  <li>Phasellus non ex condimentum, accumsan justo quis, molestie neque.</li>
                </ol>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <MDBBtn>Start Measurement</MDBBtn> {/* BIND THIS LATER */}
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='danger' onClick={toggleTemperatureModal}>
                Close
              </MDBBtn>
              <MDBBtn color='primary'>
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  );
}

export default TemperatureModal