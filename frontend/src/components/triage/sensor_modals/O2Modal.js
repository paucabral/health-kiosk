import React, { useEffect, useState, useReducer, useContext } from 'react';
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
import { LanguageContext } from '../../../contexts/LanguageContext';

const delay = ms => new Promise(res => setTimeout(res, ms));

const O2Modal = ({ o2Modal, setO2Modal, toggleO2Modal, formData, setFormData }) => {
  const fetchO2Data = async () => {
    try {
      console.log("Fetching o2...");
      setMeasure("loading");
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}/poxdata`);
      if (response.status == 200) {
        console.log(response.data[0]);

        const o2_saturation_data = response.data["spo2"];

        setFormData({ ...formData, o2_saturation: o2_saturation_data });
        setMeasure("done");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setMeasure("error");
    }
  }

  const [measure, setMeasure] = useState("to_measure");

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBModal id="o2-modal" staticBackdrop show={o2Modal} setShow={setO2Modal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{ fontSize: '1.5em' }}>Oxygen Saturation Sensor</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleO2Modal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ textAlign: "left" }} className="mb-2">
              <div className='mt-2 mb-3' style={{ textAlign: "left", overflowY: 'auto', height: '57vh' }}>
                {
                  measure === "to_measure" || measure === "loading" ?
                    <MDBContainer style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <MDBContainer><p style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.2em' }}>{language === "PH" ? "Mangyaring sundin ang mga hakbang na ito upang sukatin nang maayos ang iyong oxygen saturation" : "Please follow these steps to measure your oxygen saturation properly"}:</p></MDBContainer>
                      <InstructionStep img={o2_step_0} instruction={language === "PH" ? <span><b>Hakbang 1: </b>Hanapin ang <span className='text-success' style={{ fontWeight: 'bold' }}>oxygen saturation sensor</span> sa gitnang bahagi ng kiosk.</span> : <span><b>Step 1: </b>Locate the <span className='text-success' style={{ fontWeight: 'bold' }}>oxygen saturation sensor</span> at the middle section of the kiosk.</span>} />
                      <InstructionStep img={o2_step_1} instruction={language === "PH" ? <span><b>Hakbang 2: </b>Makikita mo ito sa kanang bahagi ang gitnang seksyon. Kamukha ito ng larawaan sa itaas.</span> : <span><b>Step 2: </b>You should be able to locate the device at the right side of the middle section. It looks similar to the image shown above.</span>} />
                      <InstructionStep img={o2_step_2} instruction={language === "PH" ? <span><b>Hakbang 3: </b>Ilagay ang isa sa iyong mga hintuturo nang nakarelax sa itaas ng maliit at itim na parihabang parte, at pindutin ang <span className='text-success'>Simulan ang Pagsusukat</span> na button. Ang pagsusukat ay tatagal ng <span style={{ fontWeight: 'bold' }}>10 segundo</span>. Huwag alisin ang daliri sa device hangga't hindi pa lumalabas ang resulta.</span> : <span><b>Step 3: </b>Place one of your index fingers in a relaxed state at the top of the small black rectangular area, then select the <span className='text-success'>Start Measurement</span> button. The measurement will last for about <span style={{ fontWeight: 'bold' }}>10 seconds</span>. Do not lift your finger from the device until the result is shown.</span>} />
                    </MDBContainer>
                    : measure === "done" ?
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBCard shadow='0' border='success' background='white'>
                          <MDBCardHeader className='text-success' style={{ fontSize: '1.5em' }}>
                            <strong><MDBIcon fas icon="wind" /> O<sub>2</sub> Saturation</strong>
                          </MDBCardHeader>
                          <MDBCardBody className='text-success text-center'>
                            <MDBCardText>
                              <h1 style={{ fontSize: '3em' }}>{formData.o2_saturation ? <span>{formData.o2_saturation} %</span> : <span>NA</span>}</h1>
                            </MDBCardText>
                          </MDBCardBody>
                        </MDBCard>
                      </div>
                      : <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: '1.3em' }}>
                          <h3>{language === "PH" ? "Mayroong error." : "There was an error."}</h3>
                          <i>{language === "PH" ? "Subukang muli ang pagsusukat. Kung patuloy ang error, mangyaring tawagin ang technician." : "Please try again. If the issue persists, please reach the technician."}</i>
                        </div>
                      </div>
                }
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                {
                  measure === "to_measure" ?
                    <MDBBtn color='success' style={{ fontSize: '1.2em' }} onClick={() => { fetchO2Data() }}>
                      {language === "PH" ? "Simulan ang pagsusukat" : "Start Measurement"}
                    </MDBBtn>
                    : measure === "loading" ?
                      <MDBContainer style={{ display: 'flex', justifyContent: 'center' }}>
                        <MDBSpinner className='mx-2' color='success'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                      </MDBContainer>
                      : measure === "done" ?
                        <div>
                          <MDBBtn color='primary' style={{ width: '15em', fontSize: '1.2em' }} onClick={() => { fetchO2Data() }} className='mx-2'>
                            {language === "PH" ? "Sukating Muli?" : "Measure Again?"}
                          </MDBBtn>
                          <MDBBtn color='success' style={{ width: '15em', fontSize: '1.2em' }} onClick={toggleO2Modal} className='mx-2'>
                            {language === "PH" ? "I-Save" : "Save"}
                          </MDBBtn>
                        </div>
                        : <div style={{ textAlign: "center" }}>
                          <MDBRow className='mt-3'>
                            <MDBContainer>
                              <MDBBtn color='success' onClick={() => { fetchO2Data() }} style={{ fontSize: '1.2em' }} className='mx-2'>
                                {language === "PH" ? "Uliting Muli" : "Try Again"}
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