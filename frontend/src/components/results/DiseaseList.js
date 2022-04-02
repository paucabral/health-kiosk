import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';
import diseaseSymptomsList from '../../data/disease-symptoms-list';

const DiseaseList = ({ diseases }) => {

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
          <MDBRow id="confirmation" style={{ overflowY: 'auto', height: '46vh' }}>
            <MDBCardBody className='pt-2 pb-2'>
              <MDBContainer style={{ justifyContent: 'center' }}>
                {
                  diseases_list ?
                    <MDBRow style={{ justifyContent: 'center' }}>
                      {diseases_list?.map((disease) =>
                        <MDBRow className='diseaseBox' style={{ justifyContent: 'center' }}>
                          <MDBRow>
                            <MDBCol>{disease[0]}</MDBCol>
                            <MDBCol>{disease[1]}</MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol>
                              {diseaseSymptomsList?.map((instance) => {
                                return (
                                  instance["disease"] == disease[0] ?
                                    <MDBContainer>
                                      {instance['symptoms']?.map((symptom) => (
                                        <MDBBtn pill color='dark' className='shadow-0 px-2 py-1' key={symptom} style={{ display: 'inline', margin: '0.2em', borderRadius: '20px', fontSize: '0.65em' }} disabled>{symptom}</MDBBtn>
                                      ))}
                                    </MDBContainer>
                                    : <></>
                                )
                              })}
                            </MDBCol>
                          </MDBRow>
                        </MDBRow>
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