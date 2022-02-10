import React, { useState } from 'react';
import { MDBInput, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon } from 'mdb-react-ui-kit';

const PersonalInformationInput = () => {
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Please fill up your personal information.</MDBCardTitle>
      <MDBCardBody>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput id='first_name' size='lg' label='First Name' />
          </MDBCol>
          <MDBCol>
            <MDBInput id='last_name' size='lg' label='Last Name' />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-4'>
          <MDBCol className='col-2'>
            <MDBInput id='age' size='lg' label='Age' type='number' />
          </MDBCol>
          <MDBCol>
            <MDBInput id='contact' size='lg' label='Contact No.' />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput