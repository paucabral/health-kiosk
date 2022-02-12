import { MDBCardBody, MDBIcon, MDBCol, MDBRow, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'

const Confirmation = ({ formData, setFormData, page, setPage }) => {
  const checkEntry = () => {
    return formData.first_name === "" | formData.last_name === "" | formData.age === "" | formData.sex === "" | formData.contact_no === "" | formData.temperature === "" | formData.pulse_rate === "" | formData.systolic_bp === "" | formData.diastolic_bp === "" | formData.o2_saturation === ""
  }

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Confirm Entry</MDBCardTitle>
      <MDBCardBody>
        <div className='mb-4'>
          Please ensure all the information are correct before you proceed.
        </div>
        <MDBRow>
          <MDBCol className='mb-4' style={{ textAlign: "left" }}>
            <span><strong>Name:</strong> {formData.first_name} {formData.last_name}</span><br />
            <span><strong>Sex:</strong> {formData.sex}</span><br />
            <span><strong>Age:</strong> {formData.age}</span><br />
            <span><strong>Contact No:</strong> {formData.contact_no}</span><br />
          </MDBCol>
          <MDBCol className='mb-4' style={{ textAlign: "left" }}>
            <span><strong><MDBIcon fas icon="thermometer-quarter" /> Body Temperature:</strong> {formData.temperature} °C</span><br />
            <span><strong><MDBIcon fas icon="heartbeat" /> Pulse Rate:</strong> {formData.pulse_rate} bpm</span><br />
            <span><strong><MDBIcon fas icon="tint" /> Systolic BP:</strong> {formData.systolic_bp} mmHg</span><br />
            <span><strong><MDBIcon fas icon="tint" /> Diastolic BP:</strong> {formData.diastolic_bp} mmHg</span><br />
            <span><strong><MDBIcon fas icon="wind" /> O2 Saturation:</strong> {formData.o2_saturation} %</span><br />
          </MDBCol>
        </MDBRow>
        <div>
          <MDBBtn onClick={() => { setPage(0) }} className='mx-2'>
            Go Back
          </MDBBtn>
          <MDBBtn color='success' disabled={checkEntry()}>
            Submit
          </MDBBtn>
        </div>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default Confirmation