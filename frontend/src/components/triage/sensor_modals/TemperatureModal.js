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
  MDBModalFooter,
  MDBSpinner,
  MDBRow,
  MDBCol,
  MDBContainer
} from 'mdb-react-ui-kit';
import axios from 'axios';
import InstructionStep from './InstructionStep';
import temp_step_0 from '../../../assets/image/temp/0.png';
import temp_step_1 from '../../../assets/image/temp/1.png';
import temp_step_2 from '../../../assets/image/temp/2.png';


const delay = ms => new Promise(res => setTimeout(res, ms));

const TemperatureModal = ({ temperatureModal, setTemperatureModal, toggleTemperatureModal, formData, setFormData }) => {
  const fetchTemperatureData = async () => {
    try {
      console.log("Fetching temperature...");
      setMeasure("loading");
      await delay(10000);
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}`);
      if (response.status == 200) {
        const temperature_data = response.data["variables"]["tempAvg"];
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
            <MDBModalBody style={{ textAlign: "left" }} className="mb-2">
              <div className='mt-2 mb-3' style={{ textAlign: "left", overflowY: 'auto', height: '50vh' }}>
                {
                  measure === "to_measure" || measure === "loading" ?
                    <MDBContainer style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <p style={{ fontWeight: 'bold' }}>Please follow these steps to measure your body temperature properly:</p>
                      <InstructionStep img={temp_step_0} instruction={<span><b>Step 1: </b>Locate the <span className='text-warning' style={{ fontWeight: 'bold' }}>temperature sensor</span> at the middle section of the kiosk.</span>} />
                      <InstructionStep img={temp_step_1} instruction={<span><b>Step 2: </b>You should be able to locate the device at the left side of the middle section. It looks similar to the image shown above.</span>} />
                      <InstructionStep img={temp_step_2} instruction={<span><b>Step 3: </b>Place one of your index fingers in a relaxed state at the top of the circular opening, then select the <span className='text-warning'>Start Measurement</span> button. The measurement will last for about <span style={{ fontWeight: 'bold' }}>10 seconds</span>.</span>} />
                    </MDBContainer>
                    : measure === "done" ?
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBCard shadow='0' border='warning' background='white'>
                          <MDBCardHeader className='text-warning'>
                            <strong><MDBIcon fas icon="thermometer-quarter" /> Body Temperature</strong>
                          </MDBCardHeader>
                          <MDBCardBody className='text-warning text-center'>
                            <MDBCardText>
                              <h1>{formData.temperature ? <span>{formData.temperature}°C</span> : <span>NA</span>}</h1>
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
                    <MDBBtn color='warning' onClick={() => { fetchTemperatureData() }}>
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
                          <MDBRow>
                            <h6>There was an error.</h6>
                            <i>Please try again. If the issue persists, please reach the technician.</i>
                          </MDBRow>
                          <MDBRow className='mt-3'>
                            <MDBContainer>
                              <MDBBtn color='warning' onClick={() => { fetchTemperatureData() }} className='mx-2'>
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

export default TemperatureModal