import { MDBCardBody, MDBIcon, MDBCol, MDBRow, MDBCardTitle, MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
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
        <MDBContainer>
          <MDBRow className='mb-4' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
            <MDBRow>
              <MDBCol>
                <MDBRow>
                  <MDBCol size='3'>
                    <strong>NAME:</strong>
                  </MDBCol>
                  <MDBCol>
                    <span>{formData.first_name} {formData.last_name}</span>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow>
                  <MDBCol size='3'>
                    <strong>SEX:</strong>
                  </MDBCol>
                  <MDBCol>
                    <span>{formData.sex}</span>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBRow>
                  <MDBCol size='3'>
                    <strong>AGE:</strong>
                  </MDBCol>
                  <MDBCol>
                    <span>{formData.age}</span>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol>
                <MDBRow>
                  <MDBCol size='3'>
                    <strong>CONTACT:</strong>
                  </MDBCol>
                  <MDBCol>
                    <span>{formData.contact_no}</span>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBRow>
          <MDBRow className='mb-4' style={{ textAlign: "center" }}>
            <MDBCol>
              <span><strong><MDBIcon fas icon="thermometer-quarter" /> Body Temperature:</strong> {formData.temperature} °C</span>
            </MDBCol>
            <MDBCol>
              <span><strong><MDBIcon fas icon="wind" /> O2 Saturation:</strong> {formData.o2_saturation} %</span>
            </MDBCol>
            <MDBCol>
              <span><strong><MDBIcon fas icon="heartbeat" /> Pulse Rate:</strong> {formData.pulse_rate} bpm</span>
            </MDBCol>
            <MDBCol>
              <span><strong><MDBIcon fas icon="tint" /> Systolic BP:</strong> {formData.systolic_bp} mmHg</span>
            </MDBCol>
            <MDBCol>
              <span><strong><MDBIcon fas icon="tint" /> Diastolic BP:</strong> {formData.diastolic_bp} mmHg</span>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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