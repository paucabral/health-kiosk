import React, { useState } from 'react';
import { MDBInput, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon } from 'mdb-react-ui-kit';

const PersonalInformationInput = () => {
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Please fill up your personal information.</MDBCardTitle>
      <MDBCardBody>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput id='first_name' label='First Name' />
          </MDBCol>
          <MDBCol>
            <MDBInput id='last_name' label='Last Name' />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-4'>
          <MDBCol className='col-2'>
            <MDBInput id='age' label='Age' type='number' />
          </MDBCol>
          <MDBCol>
            <MDBInput id='contact' label='Contact No.' />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput