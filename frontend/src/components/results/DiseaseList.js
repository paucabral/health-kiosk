import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBCardText } from 'mdb-react-ui-kit'
import React from 'react'

const DiseaseList = ({ diseases }) => {
  const renderDisease = () => {
    if (diseases) {
      let disease_list = [];
      for (const [key, value] of Object.entries(diseases)) {
        const content = <MDBRow><MDBCol>{key}</MDBCol><MDBCol>{value}</MDBCol></MDBRow>
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
                      {diseases_list?.map((disease) => <MDBRow className='diseaseBox' style={{ justifyContent: 'center' }}>{disease}</MDBRow>
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