import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText } from 'mdb-react-ui-kit';

const Facilities = () => {
  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='4'>
            <MDBRow>
              <MDBCard>
                <MDBCardBody className='text-left'>
                  <MDBCardTitle>Current Location</MDBCardTitle>
                  <MDBCardSubTitle className='text-muted'>Coordinates</MDBCardSubTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCol>
          <MDBCol md='8'>
            <MDBCard style={{ width: '100%', height: '100%' }}>

            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Facilities
