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
      <MDBContainer>
        <MDBCard shadow='0' border='info' background='white'>
          <MDBCardHeader className='text-white' background='info'>
            <strong>Differential Diagnosis</strong>
          </MDBCardHeader>
          <MDBRow id="confirmation" style={{ overflowY: 'auto', height: '50vh' }}>
            <MDBCardBody>
              <MDBCardText style={{ justifyContent: 'center' }}>
                {
                  diseases_list ?
                    <MDBRow style={{ justifyContent: 'center' }} >
                      {diseases_list?.map((disease) => <MDBRow>{disease}</MDBRow>
                      )}
                    </MDBRow>
                    : <MDBCardText className='text-muted'>Not Available</MDBCardText>
                }
              </MDBCardText>
            </MDBCardBody>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </React.Fragment >
  )
}

export default DiseaseList