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
            <MDBInput required value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value.toUpperCase() })} id='first_name' size='md' label='First Name' type='text' icon="user" />
          </MDBCol>
          <MDBCol>
            <MDBInput required value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value.toUpperCase() })} id='last_name' size='md' label='Last Name' type='text' icon="user" />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-2'>
          <MDBCol className='col-2'>
            <MDBInput required value={formData.age} onChange={(event) => setFormData({ ...formData, age: event.target.value })} id='age' size='md' label='Age' type='number' min='0' icon="calendar-day" />
          </MDBCol>
          <MDBCol className='col-2'>
            <select className='form-select' required onChange={(event) => setFormData({ ...formData, sex: event.target.value.toUpperCase() })} id="sex" label="Sex" value={formData.sex}>
              <option disabled default value={""}>Sex</option>
              <option value={"MALE"}>MALE</option>
              <option value={"FEMALE"}>FEMALE</option>
            </select>
          </MDBCol>

          <MDBCol>
            <MDBInput required value={formData.contact_no} onChange={(event) => setFormData({ ...formData, contact_no: event.target.value })} id='contact_no' size='md' label='Contact No.' type='tel' icon="phone" />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput