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
        <MDBContainer className='mb-4'>
          Please ensure all the information are correct before you proceed.
        </MDBContainer>

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
              <MDBRow>
                <strong><MDBIcon fas icon="thermometer-quarter" /> Temperature:</strong>
              </MDBRow>
              <MDBRow>
                <span>{formData.temperature} °C</span>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <strong><MDBIcon fas icon="wind" /> O<sub>2</sub> Saturation:</strong>
              </MDBRow>
              <MDBRow>
                <span> {formData.o2_saturation} %</span>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <strong><MDBIcon fas icon="heartbeat" /> Pulse Rate:</strong>
              </MDBRow>
              <MDBRow>
                <span>{formData.pulse_rate} bpm</span>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <strong><MDBIcon fas icon="tint" /> Systolic BP:</strong>
              </MDBRow>
              <MDBRow>
                <span>{formData.systolic_bp} mmHg</span>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <strong><MDBIcon fas icon="tint" />Diastolic BP:</strong>
              </MDBRow>
              <MDBRow>
                <span>{formData.diastolic_bp} mmHg</span>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer>
          <MDBBtn onClick={() => { setPage(0) }} className='mx-2'>
            Go Back
          </MDBBtn>
          <MDBBtn color='success' disabled={checkEntry()}>
            Submit
          </MDBBtn>
        </MDBContainer>

      </MDBCardBody>
    </React.Fragment>
  )
}

export default Confirmation