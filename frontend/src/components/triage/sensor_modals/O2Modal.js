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
import axios from 'axios';
import InstructionStep from './InstructionStep';
import o2_step_0 from '../../../assets/image/o2/0.png';
import o2_step_1 from '../../../assets/image/o2/1.png';
import o2_step_2 from '../../../assets/image/o2/2.png';

const delay = ms => new Promise(res => setTimeout(res, ms));

const O2Modal = ({ o2Modal, setO2Modal, toggleO2Modal, formData, setFormData }) => {
  const fetchO2Data = async () => {
    try {
      console.log("Fetching o2...");
      setMeasure("loading");
      await delay(10000);
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}`);
      if (response.status == 200) {
        console.log(response.data[0]);

        const o2_saturation_data = response.data["variables"]["spo2"];

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
      <MDBModal id="o2-modal" staticBackdrop show={o2Modal} setShow={setO2Modal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Oxygen Saturation Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleO2Modal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-2">
              <div className='mt-2 mb-3' style={{ textAlign: "left", overflowY: 'auto', height: '50vh' }}>
                {
                  measure === "to_measure" || measure === "loading" ?
                    <MDBContainer style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <MDBContainer><p style={{ fontWeight: 'bold', textAlign: 'center' }}>Please follow these steps to measure your oxygen saturation properly:</p></MDBContainer>
                      <InstructionStep img={o2_step_0} instruction={<span><b>Step 1: </b>Locate the <span className='text-success' style={{ fontWeight: 'bold' }}>oxygen saturation sensor</span> at the middle section of the kiosk.</span>} />
                      <InstructionStep img={o2_step_1} instruction={<span><b>Step 2: </b>You should be able to locate the device at the right side of the middle section. It looks similar to the image shown above.</span>} />
                      <InstructionStep img={o2_step_2} instruction={<span><b>Step 3: </b>Place one of your index fingers in a relaxed state at the top of the small black rectangular area, then select the <span className='text-success'>Start Measurement</span> button. The measurement will last for about <span style={{ fontWeight: 'bold' }}>10 seconds</span>.</span>} />
                    </MDBContainer>
                    : measure === "done" ?
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBCard shadow='0' border='success' background='white'>
                          <MDBCardHeader className='text-success'>
                            <strong><MDBIcon fas icon="wind" /> O<sub>2</sub> Saturation</strong>
                          </MDBCardHeader>
                          <MDBCardBody className='text-success text-center'>
                            <MDBCardText>
                              <h1>{formData.temperature ? <span>{formData.o2_saturation} %</span> : <span>NA</span>}</h1>
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
                    <MDBBtn color='success' onClick={() => { fetchO2Data() }}>
                      Start Measurement
                    </MDBBtn>
                    : measure === "loading" ?
                      <MDBContainer style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBSpinner className='mx-2' color='success'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                      </MDBContainer>
                      : measure === "done" ?
                        <div>
                          <MDBBtn color='primary' style={{ width: '15em' }} onClick={() => { fetchO2Data() }} className='mx-2'>
                            Measure Again?
                          </MDBBtn>
                          <MDBBtn color='success' style={{ width: '15em' }} onClick={toggleO2Modal} className='mx-2'>
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
                              <MDBBtn color='success' onClick={() => { fetchO2Data() }} className='mx-2'>
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

export default O2Modal