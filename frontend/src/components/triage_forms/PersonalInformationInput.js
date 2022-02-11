import React, { useState } from 'react';
import { MDBInput, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon } from 'mdb-react-ui-kit';

const PersonalInformationInput = ({ formData, setFormData }) => {
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Personal Information</MDBCardTitle>
      <p>Please fill up your personal information.</p>
      <MDBCardBody>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value })} id='first_name' size='md' label='First Name' type='text' icon="user" />
          </MDBCol>
          <MDBCol>
            <MDBInput value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value })} id='last_name' size='md' label='Last Name' type='text' icon="user" />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-4'>
          <MDBCol className='col-2'>
            <MDBInput value={formData.age} onChange={(event) => setFormData({ ...formData, age: event.target.value })} id='age' size='md' label='Age' type='number' icon="calendar-day" />
          </MDBCol>
          <MDBCol>
            <MDBInput value={formData.contact_no} onChange={(event) => setFormData({ ...formData, contact_no: event.target.value })} id='contact_no' size='md' label='Contact No.' type='tel' icon="phone" />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput