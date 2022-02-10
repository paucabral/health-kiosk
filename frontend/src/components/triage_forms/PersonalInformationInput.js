import React, { useState } from 'react';
import { MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBContainer, MDBInput, MDBCol, MDBRow, MDBIcon } from 'mdb-react-ui-kit';

const PersonalInformationInput = () => {
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Please fill up your personal information.</MDBCardTitle>
      <MDBCardBody>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput id='first_name' label='First Name' hint='First Name' />
          </MDBCol>
          <MDBCol>
            <MDBInput id='last_name' label='Last Name' />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput