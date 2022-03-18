import { MDBCard, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBCol, MDBRow, MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
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
              <MDBCard shadow='0' border='warning' background='white'>
                <MDBCardHeader className='text-warning'>
                  <strong><MDBIcon fas icon="thermometer-quarter" /> Body Temperature</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-warning'>
                  <MDBCardText>
                    <span>{formData.temperature} °C</span>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard shadow='0' border='success' background='white'>
                <MDBCardHeader className='text-success'>
                  <strong><MDBIcon fas icon="wind" /> O<sub>2</sub> Saturation</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-success'>
                  <MDBCardText>
                    <span> {formData.o2_saturation} %</span>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard shadow='0' border='danger' background='white'>
                <MDBCardHeader className='text-danger'>
                  <strong><MDBIcon fas icon="heartbeat" /> Pulse Rate</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-danger'>
                  <MDBCardText>
                    <span>{formData.pulse_rate} bpm</span>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard shadow='0' border='primary' background='white'>
                <MDBCardHeader className='text-primary'>
                  <strong><MDBIcon fas icon="tint" /> Systolic BP</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-primary'>
                  <MDBCardText>
                    <span>{formData.systolic_bp} mmHg</span>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard shadow='0' border='secondary' background='white'>
                <MDBCardHeader className='text-secondary'>
                  <strong><MDBIcon fas icon="tint" /> Diastolic BP</strong>
                </MDBCardHeader>
                <MDBCardBody className='text-secondary'>
                  <MDBCardText>
                    <span>{formData.diastolic_bp} mmHg</span>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
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