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

const O2Modal = ({ o2Modal, setO2Modal, toggleO2Modal, formData, setFormData }) => {
  const fetchO2Data = async () => {
    try {
      console.log("Fetching o2...");
      setMeasure("loading");
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}/o2`);
      if (response.status == 200) {
        console.log(response.data[0]);

        const o2_saturation_data = response.data[0]["o2_saturation"];

        setFormData({ ...formData, o2_saturation: o2_saturation_data });
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
      <MDBModal id="o2-modal" staticBackdrop scrollable='true' show={o2Modal} setShow={setO2Modal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Oxygen Saturation Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleO2Modal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-4">
              <div>
                <p>Please follow these steps to measure your oxygen saturation.</p>
                <ol>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Aliquam interdum risus sit amet urna lacinia, sit amet efficitur augue bibendum.</li>
                  <li>Phasellus non ex condimentum, accumsan justo quis, molestie neque.</li>
                </ol>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                {
                  measure === "to_measure" ?
                    <MDBBtn onClick={() => { fetchO2Data() }}>
                      Start Measurement
                    </MDBBtn>
                    : measure === "loading" ?
                      <div>
                        <MDBSpinner className='mx-2' color='success'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                        <br />
                        <div className='d-flex align-items-center justify-content-center'>
                          <span>measuring...</span>
                        </div>
                      </div>
                      : measure === "done" ?
                        <div>
                          <MDBBtn onClick={() => { fetchO2Data() }} className='mx-2'>
                            Measure Again?
                          </MDBBtn>
                          <MDBBtn color='success' onClick={toggleO2Modal} className='mx-2'>
                            Save
                          </MDBBtn>
                        </div>
                        : <div style={{ textAlign: "center" }}>
                          <h6>There was an error.</h6>
                          <i>Please try again. If the issue persists, please reach the technician.</i>
                          <MDBBtn onClick={() => { fetchO2Data() }} className='mx-2'>
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

export default O2Modal