import React, { useEffect, useState, useReducer } from 'react';
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
import axios from 'axios'

const PulseModal = ({ pulseModal, setPulseModal, togglePulseModal, formData, setFormData }) => {
  const fetchPulseData = async () => {
    try {
      console.log("Fetching pulse...");
      setMeasure("loading");
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}/pulse`);
      if (response.status == 200) {
        console.log(response.data[0]);

        const pulse_rate_data = response.data[0]["pulse_rate"];
        const systolic_bp_data = response.data[0]["systolic_bp"];
        const diastolic_bp_data = response.data[0]["diastolic_bp"];

        setFormData({ ...formData, pulse_rate: pulse_rate_data, systolic_bp: systolic_bp_data, diastolic_bp: diastolic_bp_data });
        setMeasure("done");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setMeasure("error");
    }
  }

  const [measure, setMeasure] = useState("to_measure");

  return (
    <React.Fragment>
      <MDBModal staticBackdrop scrollable='true' show={pulseModal} setShow={setPulseModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Pulse and Blood Pressure Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={togglePulseModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-4">
              <div>
                <p>Please follow these steps to measure your pulse and blood pressure.</p>
                <ol>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Aliquam interdum risus sit amet urna lacinia, sit amet efficitur augue bibendum.</li>
                  <li>Phasellus non ex condimentum, accumsan justo quis, molestie neque.</li>
                </ol>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                {
                  measure === "to_measure" ?
                    <MDBBtn onClick={() => { fetchPulseData() }}>
                      Start Measurement
                    </MDBBtn>
                    : measure === "loading" ?
                      <div>
                        <MDBSpinner className='mx-2' color='danger'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                        <br />
                        <div className='d-flex align-items-center justify-content-center'>
                          <span>measuring...</span>
                        </div>
                      </div>
                      : measure === "done" ?
                        <div>
                          <MDBBtn onClick={() => { fetchPulseData() }} className='mx-2'>
                            Measure Again?
                          </MDBBtn>
                          <MDBBtn color='success' onClick={togglePulseModal} className='mx-2'>
                            Save
                          </MDBBtn>
                        </div>
                        : <div style={{ textAlign: "center" }}>
                          <h6>There was an error.</h6>
                          <i>Please try again. If the issue persists, please reach the technician.</i>
                          <MDBBtn onClick={() => { fetchPulseData() }} className='mx-2'>
                            Try Again
                          </MDBBtn>
                        </div>
                }
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  );
}

export default PulseModal