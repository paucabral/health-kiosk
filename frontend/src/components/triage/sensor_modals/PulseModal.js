import React, { useEffect, useState, useContext } from 'react';
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
import bp_step_0 from '../../../assets/image/bp/0.png';
import bp_step_1 from '../../../assets/image/bp/1.png';
import bp_step_2 from '../../../assets/image/bp/2.png';
import bp_step_3 from '../../../assets/image/bp/3.png';
import bp_step_4 from '../../../assets/image/bp/4.png';
import { LanguageContext } from '../../../contexts/LanguageContext';

const delay = ms => new Promise(res => setTimeout(res, ms));

const PulseModal = ({ pulseModal, setPulseModal, togglePulseModal, formData, setFormData }) => {
  const fetchPulseData = async () => {
    try {
      console.log("Fetching pulse...");
      setMeasure("loading");
      await delay(60000);
      const response = await axios.get(`${process.env.REACT_APP_SENSORS_ENDPOINT}/bpdata`);
      if (response.status == 200) {
        console.log(response.data[0]);

        const pulse_rate_data = response.data["pr"];
        const systolic_bp_data = response.data["sys"];
        const diastolic_bp_data = response.data["dia"];

        setFormData({ ...formData, pulse_rate: pulse_rate_data, systolic_bp: systolic_bp_data, diastolic_bp: diastolic_bp_data });
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
                    <MDBContainer style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <MDBContainer><p style={{ fontWeight: 'bold', textAlign: 'center' }}>{language === "PH" ? "Mangyaring sundin ang mga hakbang na ito upang sukatin nang maayos ang iyong pulso at presyon ng dugo" : "Please follow these steps to measure your pulse rate and blood pressure properly"}:</p></MDBContainer>
                      <InstructionStep img={bp_step_0} instruction={language === "PH" ? <span><b>Hakbang 1: </b>Hanapain ang <span className='text-danger' style={{ fontWeight: 'bold' }}>pulse rate at blood pressure sensor</span> sa kanang bahagi kiosk (ang pulse rate at blood pressure sensor ay iisang aparato lamang).</span> : <span><b>Step 1: </b>Locate the <span className='text-danger' style={{ fontWeight: 'bold' }}>pulse rate and blood pressure sensor</span> at the right section of the kiosk (the pulse rate and blood pressure sensor is a single device only).</span>} />
                      <InstructionStep img={bp_step_1} instruction={language === "PH" ? <span><b>Hakbang 2: </b>Hawakan at ilabas ang aparato mula sa lalagyan. Kamukha ito ng larawang ipinakita sa itaas.</span> : <span><b>Step 2: </b>You should be able to get a hold of the device. It looks similar to the image shown above.</span>} />
                      <InstructionStep img={bp_step_2} instruction={language === "PH" ? <span><b>Hakbang 3: </b>Gamitin ang strap upang ilagay ang sensor sa iyong pulso. Siguraduhin na ang aparato ay nakatali sa iyong pulso sa isang komportableng posisyon (hindi masyadong masikip, o maluwag).</span> : <span><b>Step 3: </b>Use the strap to place the sensor on your wrist. Make sure that the device is strapped on your wrist at a comfortable position (not too tight, nor loose).</span>} />
                      <InstructionStep img={bp_step_4} instruction={language === "PH" ? <span><b>Hakbang 4: </b>Umupo sa isang upuan sa komportableng posisyon at itaas ang aparato sa antas ng iyong dibdib. Maaari mong gamitin ang platform sa kanang bahagi ng kiosk upang ipahinga ang iyong siko habang itinataas ang iyong pulso.</span> : <span><b>Step 4: </b>Sit down on a chair in a comfortable position and raise the device at your chest level. You may use the platform at the right side of the kiosk to rest your elbow while raising your wrist.</span>} />
                      <InstructionStep img={bp_step_3} instruction={language === "PH" ? <span><b>Hakbang 5: </b>Piliin ang <span className='text-danger'>Simulan ang Pagsusukat</span> na button, <span style={{ fontWeight: 'bold' }} > na sinusundan kaagad sa <span className='text-warning'>dilaw na pisikal na button</span> na matatagpuan sa ibabang bahagi ng device.</span> Ang pagsukat ay tatagal ng humigit-kumulang <span style={{ fontWeight: 'bold' }}>60 segundo</span>. Hintaying ipakita ang mga resulta sa screen bago alisin ang device at ibalik ito sa lagayan.</span> : <span><b>Step 5: </b>Select the <span className='text-danger'>Start Measurement</span> button, <span style={{ fontWeight: 'bold' }} > followed immediately by pressing the <span className='text-warning'>yellow physical button</span> located at the bottom part of the device.</span> The measurement will last for about <span style={{ fontWeight: 'bold' }}>60 seconds</span>. Wait for the results to be shown on the screen before removing the device and placing it back on the compartment.</span>} />
                    </MDBContainer>
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
                      {language === "PH" ? "Simulan ang pagsusukat" : "Start Measurement"}
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
                            {language === "PH" ? "Sukating Muli?" : "Measure Again?"}
                          </MDBBtn>
                          <MDBBtn color='danger' style={{ width: '15em' }} onClick={togglePulseModal} className='mx-2'>
                            {language === "PH" ? "I-Save" : "Save"}
                          </MDBBtn>
                        </div>
                        : <div style={{ textAlign: "center" }}>
                          <MDBRow>
                            <h6>{language === "PH" ? "Mayroong error." : "There was an error."}</h6>
                            <i>{language === "PH" ? "Subukang muli ang pagsusukat. Kung patuloy ang error, mangyaring tawagin ang technician." : "Please try again. If the issue persists, please reach the technician."}</i>
                          </MDBRow>
                          <MDBRow className='mt-3'>
                            <MDBContainer>
                              <MDBBtn color='danger' onClick={() => { fetchPulseData() }} className='mx-2'>
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
    </React.Fragment >
  );
}

export default PulseModal