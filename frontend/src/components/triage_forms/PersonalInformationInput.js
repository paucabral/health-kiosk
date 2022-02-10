import React, { useState } from 'react';
import { MDBInput, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon } from 'mdb-react-ui-kit';

const PersonalInformationInput = () => {
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Personal Information</MDBCardTitle>
      <p>Please fill up your personal information.</p>
      <MDBCardBody>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput id='first_name' size='lg' label='First Name' type='text' icon="user" />
          </MDBCol>
          <MDBCol>
            <MDBInput id='last_name' size='lg' label='Last Name' type='text' icon="user" />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-4'>
          <MDBCol className='col-2'>
            <MDBInput id='age' size='lg' label='Age' type='number' icon="calendar-day" />
          </MDBCol>
          <MDBCol>
            <MDBInput id='contact' size='lg' label='Contact No.' type='tel' icon="phone" />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput