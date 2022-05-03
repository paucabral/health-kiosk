import React, { useEffect, useState, useContext } from 'react';
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
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { LanguageContext } from '../../../contexts/LanguageContext';

const SMSStatus = ({ contact_no, message, smsModal, setSmsModal, toggleSmsModal }) => {
  const [smsStatus, setSmsStatus] = useState("SENDING");

  const sendSms = async () => {
    setSmsStatus("SENDING")
    try {
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/sms/`
      const json = JSON.stringify(message)
      const response = await axios.post(url, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status == 200) {
        console.log(response.data);
        setSmsStatus("SUCCESS")
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setSmsStatus("ERROR")
    }
  }

  useEffect(() => {
    if (smsModal === true) {
      sendSms()
    }
  }, [smsModal])

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop show={smsModal} setShow={setSmsModal} tabIndex='-1'>
        <MDBModalDialog centered size='lg'>
          <MDBModalContent style={{ height: '60vh', fontSize: '1.3em' }}>
            <MDBModalHeader>
              <MDBModalTitle style={{ fontSize: '1.2em' }}>{language === "PH" ? "Ipadala ang Resulta Gamit ang SMS" : "Send Results Through SMS"}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleSmsModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2' style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <MDBContainer>
                {
                  smsStatus === "SENDING" ?
                    <div>
                      <p>{language === "PH" ? "Ipinapadala ang resulta ng pagsusuri sa pamamagitan ng SMS sa numerong" : "Sending the assessment results through SMS to"}</p>
                      <h3>{contact_no}</h3>
                      <MDBContainer>
                        <MDBSpinner color='primary' />
                      </MDBContainer>
                      <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>NOTE: Ensure that the number you have entered is correct.</i></p>
                    </div>
                    : smsStatus === "SUCCESS" ?
                      <div>
                        <h3>{language === "PH" ? "Matagumpay na naipadala ang mga resulta." : "The results has been sent successfully."}</h3>
                        <MDBContainer>
                          <MDBIcon size='5x' color='success' fas icon="check-circle" />
                        </MDBContainer>
                        <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>{language === "PH" ? "TANDAAN: Siguraduhing tama ang numero na iyong inilagay." : "NOTE: Ensure that the number you have entered is correct."}</i></p>
                      </div>
                      :
                      <div>
                        <div>
                          <h3>{language === "PH" ? "Nagkaroon ng error sa pagpapadala ng mensahe." : "There was an error in sending the message."}</h3>
                          <MDBContainer>
                            <MDBIcon size='5x' color='danger' fas icon="ban" />
                          </MDBContainer>
                          <p className="text-muted pt-3" style={{ fontSize: '0.75em' }}><i>{language === "PH" ? "TANDAAN: Siguraduhing tama ang numero na iyong inilagay. Kung may problema, mangyaring makipag-ugnayan sa isang tauhan ng suporta." : "NOTE: Ensure that the number you have entered is correct. Otherwise, please reach a support personnel."}</i></p>
                        </div>
                      </div>
                }
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default SMSStatus