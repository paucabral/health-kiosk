import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText } from 'mdb-react-ui-kit';

const Facilities = () => {
  const default_loc = {
    lat: 0,
    long: 0
  }
  const [location, setLocation] = useState(default_loc)

  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='4'>
            <MDBRow>
              <MDBCard>
                <MDBCardBody className='text-left'>
                  <MDBCardTitle className='text-uppercase'>Current Location</MDBCardTitle>
                  <MDBCardSubTitle className='text-muted'>Coordinates: {location.lat}° LAT, {location.long}° LONG</MDBCardSubTitle>
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
