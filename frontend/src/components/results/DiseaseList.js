import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import diseaseSymptomsList from '../../data/disease-symptoms-list';

const DiseaseList = ({ diseases, symptoms }) => {

  const renderDisease = () => {
    if (diseases) {
      let disease_list = [];
      for (const [key, value] of Object.entries(diseases)) {
        const content = [key, value]
        disease_list.push(content)
      }
      return disease_list;
    }
    else {
      return null;
    }
  }

  const diseases_list = renderDisease();

  return (
    <React.Fragment>
      <MDBContainer className='p-0' style={{ justifyContent: 'center' }}>
        <MDBCard shadow='0' border='info' background='white'>
          <MDBCardHeader className='text-white' background='info'>
            <strong>Differential Diagnosis</strong>
          </MDBCardHeader>
          <MDBRow id="confirmation" style={{ overflowY: 'auto', height: '53vh' }}>
            <MDBCardBody className='pt-2 pb-2'>
              <MDBRow className='mt-1 mb-1 pr-3 pb-3'>
                <MDBCol size='3' className='pr-0 pt-0 pl-2 pb-0'>
                  <strong>SYMPTOMS:</strong>
                </MDBCol>
                <MDBCol id="differential" className='p-0' style={{ textAlign: 'left', overflowX: 'auto', width: '10vw', whiteSpace: 'nowrap' }}>
                  {
                    symptoms.length != 0 ?
                      <MDBContainer className='p-0'>
                        {symptoms?.map((symptom) => (
                          <MDBBtn pill color='dark' className='shadow-0 px-3 py-1' key={symptom} style={{ display: 'inline', marginLeft: '0.3em', marginRight: '0.3em', marginBottom: '0.5em', borderRadius: '20px' }} disabled>{symptom}</MDBBtn>
                        ))}
                      </MDBContainer>
                      :
                      <MDBCardText className='text-muted'><i>NO SYMPTOMS SELECTED </i></MDBCardText>
                  }
                </MDBCol>
              </MDBRow>
              <MDBContainer className='pr-4 pt-0 pl-3 pb-0' id="differential" style={{ justifyContent: 'center', overflowY: 'auto', height: '43vh' }}>
                {
                  diseases_list ?
                    <MDBRow style={{ justifyContent: 'center' }}>
                      {diseases_list?.map((disease) =>
                        <MDBCard className='diseaseBox my-2 p-0 btn-light' style={{ justifyContent: 'center', borderRadius: '10px' }}>
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
                          <MDBCardBody style={{ textAlign: 'center' }}>
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
                    : <MDBCardText className='text-muted'>Not Available</MDBCardText>
                }
              </MDBContainer>

            </MDBCardBody>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </React.Fragment >
  )
}

export default DiseaseList