import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React, { useState, useContext } from 'react';
import diseaseSymptomsList from '../../data/disease-symptoms-list';
import DiseaseInfo from './results_modal/DiseaseInfo';
import { LanguageContext } from '../../contexts/LanguageContext';

const DiseaseList = ({ diseases, symptoms }) => {
  const renderDisease = () => {
    if (diseases) {
      let disease_list = [];
      for (const [key, value] of Object.entries(diseases)) {
        const content = [key, value]
        disease_list.push(content)
      }
      return disease_list.slice(0, 5);
    }
    else {
      return null;
    }
  }

  const diseases_list = renderDisease();

  const [diseaseModal, setDiseaseModal] = useState(false);
  const [diseaseEntry, setDiseaseEntry] = useState(null);
  const toggleDiseaseModal = (disease_entry) => {
    if (diseaseModal === true) {
      setDiseaseEntry(null);
    }
    else {
      setDiseaseEntry(disease_entry);
    }
    setDiseaseModal(!diseaseModal);
  }

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBContainer className='p-0' style={{ justifyContent: 'center' }}>
        <MDBCard shadow='0' border='info' background='white'>
          <MDBCardHeader className='text-white' background='info'>
            <strong>DIFFERENTIAL DIAGNOSIS</strong>
          </MDBCardHeader>
          <MDBRow id="confirmation" style={{ overflowY: 'auto', height: '53vh' }}>
            <MDBCardBody className='pt-2 pb-2'>
              <MDBRow className='mt-1 mb-1 pr-3 pb-3'>
                <MDBCol size='4' className='px-3' style={{ textAlign: 'left' }}>
                  <strong>{language === "PH" ? "SINTOMAS" : "SYMPTOMS"}:</strong>
                </MDBCol>
                <MDBCol id="differential" className='p-0' style={{ textAlign: 'left', overflowX: 'auto', width: '10vw', whiteSpace: 'nowrap' }}>
                  {
                    symptoms.length != 0 ?
                      <MDBContainer className='p-0'>
                        {symptoms?.map((symptom) => (
                          <MDBBtn pill color='dark' className='shadow-0 px-3 py-1' style={{ display: 'inline', marginLeft: '0.3em', marginRight: '0.3em', marginBottom: '0.5em', borderRadius: '20px' }} disabled>{symptom}</MDBBtn>
                        ))}
                      </MDBContainer>
                      :
                      <MDBCardText className='text-muted'><i>{language === "PH" ? "WALANG NAPILING SINTOMAS" : "NO SYMPTOMS SELECTED"} </i></MDBCardText>
                  }
                </MDBCol>
                <MDBRow className='p-0 m-0'>
                  {
                    symptoms.length != 0 ?
                      <span style={{ textAlign: 'center', fontSize: '0.7em' }}><i>{language === "PH" ? "Tandaan: HINDI PINAL ang mga resulta. Mangyaring kumunsulta sa doktor para sa karagdagang pagsusuri." : "Note: The results are NOT FINAL. Please consult a doctor for further checkup."}</i></span>
                      :
                      <></>
                  }
                </MDBRow>
              </MDBRow>
              <div className='pr-4 pt-0 pl-3 pb-0' style={{ justifyContent: 'center', height: '37vh', width: '42.7%', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '1em', backdropFilter: 'blur(4px)', position: 'fixed', zIndex: '2000' }}></div>
              <MDBContainer className='pr-4 pt-0 pl-3 pb-0' id="differential" style={{ justifyContent: 'center', overflowY: 'auto', height: '37vh' }}>
                {
                  diseases_list ?
                    <MDBRow style={{ justifyContent: 'center' }}>
                      {diseases_list?.map((disease) =>
                        <MDBCard className='diseaseBox my-2 p-0 btn-light' style={{ justifyContent: 'center', borderRadius: '10px' }} onClick={() => toggleDiseaseModal((disease[0]))}>
                          <MDBCardHeader className='pl-3' style={{ textAlign: 'left' }}>
                            <MDBRow>
                              <MDBCol size='11'>
                                <strong className='text-uppercase'>{disease[0]}</strong>
                              </MDBCol>
                              <MDBCol size='1' style={{ justifyContent: 'flex-end', textAlign: 'right !important' }}>
                                <MDBIcon fas icon="info-circle" />
                              </MDBCol>
                            </MDBRow>
                            {/* <MDBCol>weight: {disease[1]}</MDBCol> */}
                          </MDBCardHeader>
                          <MDBCardBody className='p-3' style={{ textAlign: 'center' }}>
                            <MDBRow>
                              {diseaseSymptomsList?.map((instance) => {
                                return (
                                  instance["disease"] == disease[0] ?
                                    <MDBContainer>
                                      {instance['symptoms']?.map((symptom) => (
                                        <MDBBtn pill color={`${symptoms.includes(symptom) ? 'info' : 'dark'}`} className='shadow-0 px-2 py-1' key={symptom} style={{ display: 'inline', margin: '0.2em', borderRadius: '20px', fontSize: '0.65em' }} disabled>{symptom}</MDBBtn>
                                      ))}
                                    </MDBContainer>
                                    : <></>
                                )
                              })}
                            </MDBRow>
                          </MDBCardBody>
                        </MDBCard>
                      )}
                    </MDBRow>
                    : <MDBCardText className='text-muted'><i>{language === "PH" ? "HINDI AVAILABLE" : "NOT AVAILABLE"}</i></MDBCardText>
                }
              </MDBContainer>
              <DiseaseInfo entry={diseaseEntry} diseaseModal={diseaseModal} setDiseaseModal={setDiseaseModal} toggleDiseaseModal={toggleDiseaseModal} />
            </MDBCardBody>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </React.Fragment >
  )
}

export default DiseaseList