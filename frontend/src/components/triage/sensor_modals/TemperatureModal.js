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
  MDBCol,
  MDBContainer
} from 'mdb-react-ui-kit';
import axios from 'axios'

const TemperatureModal = ({ temperatureModal, setTemperatureModal, toggleTemperatureModal, formData, setFormData }) => {
  const fetchTemperatureData = async () => {
    try {
      console.log("Fetching temperature...");
      setMeasure("loading");
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}/temperature`);
      if (response.status == 200) {
        const temperature_data = response.data[0]["temperature"];
        setFormData({ ...formData, temperature: temperature_data })
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
      <MDBModal id="temperature-modal" staticBackdrop show={temperatureModal} setShow={setTemperatureModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Temperature Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleTemperatureModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-4">
              <div className='mt-2 mb-3' style={{ textAlign: "left", overflowY: 'auto', height: '50vh' }}>
                <p>Please follow these steps to measure your body temperature.</p>
                <ol>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Aliquam interdum risus sit amet urna lacinia, sit amet efficitur augue bibendum.</li>
                  <li>Phasellus non ex condimentum, accumsan justo quis, molestie neque.</li>
                </ol>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                {
                  measure === "to_measure" ?
                    <MDBBtn onClick={() => { fetchTemperatureData() }}>
                      Start Measurement
                    </MDBBtn>
                    : measure === "loading" ?
                      <MDBContainer style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBSpinner className='mx-2' color='warning'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                      </MDBContainer>
                      : measure === "done" ?
                        <div>
                          <MDBBtn color='primary' style={{ width: '15em' }} onClick={() => { fetchTemperatureData() }} className='mx-2'>
                            Measure Again?
                          </MDBBtn>
                          <MDBBtn color='warning' style={{ width: '15em' }} onClick={toggleTemperatureModal} className='mx-2'>
                            Save
                          </MDBBtn>
                        </div>
                        : <div style={{ textAlign: "center" }}>
                          <h6>There was an error.</h6>
                          <i>Please try again. If the issue persists, please reach the technician.</i>
                          <MDBBtn onClick={() => { fetchTemperatureData() }} className='mx-2'>
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

export default TemperatureModal