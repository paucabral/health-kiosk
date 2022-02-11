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

const TemperatureModal = ({ temperatureModal, setTemperatureModal, toggleTemperatureModal }) => {
  const fetchTemperatureData = async () => {
    try {
      console.log("Fetching temperature...")
      setMeasure("loading")
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}/temperature`);
      if (response.status == 200) {
        console.log(response)
        setMeasure("done")
      }
    } catch (error) {
      console.log(JSON.stringify(error))
      setMeasure("error")
    }
  }

  const [measure, setMeasure] = useState("to_measure");

  return (
    <React.Fragment>
      <MDBModal staticBackdrop scrollable='true' show={temperatureModal} setShow={setTemperatureModal} tabIndex='-1'>
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
                {
                  measure === "to_measure" ?
                    <MDBBtn onClick={() => { fetchTemperatureData() }}>
                      Start Measurement
                    </MDBBtn>
                    : measure === "loading" ?
                      <div>
                        <MDBSpinner className='mx-2' color='warning'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                        <br />
                        <div className='d-flex align-items-center justify-content-center'>
                          <span>measuring...</span>
                        </div>
                      </div>
                      : measure === "done" ?
                        <div>
                          <MDBBtn onClick={() => { fetchTemperatureData() }} className='mx-2'>
                            Measure Again?
                          </MDBBtn>
                          <MDBBtn color='success' onClick={toggleTemperatureModal} className='mx-2'>
                            Save
                          </MDBBtn>
                        </div>
                        : <div><h1>Error</h1></div>
                }
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