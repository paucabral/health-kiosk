import React, { useEffect, useState, useReducer } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
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
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}`);
      if (response.status == 200) {
        console.log(response.data[0]);

        const pulse_rate_data = response.data["variables"]["pr"];
        const systolic_bp_data = response.data["variables"]["sys"];
        const diastolic_bp_data = response.data["variables"]["dia"];

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
      <MDBModal staticBackdrop show={pulseModal} setShow={setPulseModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Pulse and Blood Pressure Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={togglePulseModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-2">
              <div className='mt-2 mb-3' style={{ textAlign: "left", overflowY: 'auto', height: '50vh' }}>
                {
                  measure === "to_measure" || measure === "loading" ?
                    <div>
                      <p>Please follow these steps to measure your pulse and blood pressure.</p>
                      <ol>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Aliquam interdum risus sit amet urna lacinia, sit amet efficitur augue bibendum.</li>
                        <li>Phasellus non ex condimentum, accumsan justo quis, molestie neque.</li>
                      </ol>
                    </div>
                    : measure === "done" ?
                      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <MDBCard className='mx-3' shadow='0' border='danger' background='white'>
                          <MDBCardHeader className='text-danger'>
                            <strong><MDBIcon fas icon="heartbeat" /> Pulse Rate</strong>
                          </MDBCardHeader>
                          <MDBCardBody className='text-danger'>
                            <MDBCardText>
                              <h1>{formData.temperature ? <span>{formData.pulse_rate} bpm</span> : <span>NA</span>}</h1>
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>

                        <MDBCard className='mx-3' shadow='0' border='primary' background='white'>
                          <MDBCardHeader className='text-primary'>
                            <strong><MDBIcon fas icon="tint" /> Systolic BP</strong>
                          </MDBCardHeader>
                          <MDBCardBody className='text-primary'>
                            <MDBCardText>
                              <h1>{formData.temperature ? <span>{formData.systolic_bp} mmHg</span> : <span>NA</span>}</h1>
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>

                        <MDBCard className='mx-3' shadow='0' border='secondary' background='white'>
                          <MDBCardHeader className='text-secondary'>
                            <strong><MDBIcon fas icon="tint" /> Diastolic BP</strong>
                          </MDBCardHeader>
                          <MDBCardBody className='text-secondary'>
                            <MDBCardText>
                              <h1>{formData.temperature ? <span>{formData.diastolic_bp} mmHg</span> : <span>NA</span>}</h1>
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </div>
                      : <div style={{ textAlign: "center" }}>
                        <></>
                      </div>
                }
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                {
                  measure === "to_measure" ?
                    <MDBBtn color='danger' onClick={() => { fetchPulseData() }}>
                      Start Measurement
                    </MDBBtn>
                    : measure === "loading" ?
                      <MDBContainer style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBSpinner className='mx-2' color='danger'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                      </MDBContainer>
                      : measure === "done" ?
                        <div>
                          <MDBBtn color='primary' style={{ width: '15em' }} onClick={() => { fetchPulseData() }} className='mx-2'>
                            Measure Again?
                          </MDBBtn>
                          <MDBBtn color='danger' style={{ width: '15em' }} onClick={togglePulseModal} className='mx-2'>
                            Save
                          </MDBBtn>
                        </div>
                        : <div style={{ textAlign: "center" }}>
                          <MDBRow>
                            <h6>There was an error.</h6>
                            <i>Please try again. If the issue persists, please reach the technician.</i>
                          </MDBRow>
                          <MDBRow className='mt-3'>
                            <MDBContainer>
                              <MDBBtn color='danger' onClick={() => { fetchPulseData() }} className='mx-2'>
                                Try Again
                              </MDBBtn>
                            </MDBContainer>
                          </MDBRow>
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