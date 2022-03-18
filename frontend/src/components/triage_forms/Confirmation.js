import { MDBCard, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBCol, MDBRow, MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'

const Confirmation = ({ formData, setFormData, page, setPage }) => {
  const checkEntry = () => {
    return formData.first_name === "" | formData.last_name === "" | formData.age === "" | formData.sex === "" | formData.contact_no === "" | formData.temperature === "" | formData.pulse_rate === "" | formData.systolic_bp === "" | formData.diastolic_bp === "" | formData.o2_saturation === ""
  }

  return (
    <React.Fragment>
      <div style={{ height: '67vh' }}>
        <MDBCardTitle style={{ fontWeight: "bold" }}>Confirm Entry</MDBCardTitle>
        <MDBCardBody>
          <MDBContainer className='mb-3'>
            Please ensure that all the information are correct before you proceed.
          </MDBContainer>

          <div style={{ overflowY: 'auto', height: '40vh', marginTop: '1em', marginBottom: '1em' }}>
            <div className='container'>
              <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
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
            </div>
          </div>

          <MDBContainer>
            <MDBRow className='w-100'>
              <MDBCol>
                <MDBBtn onClick={() => { setPage(0) }} className='w-75' color='warning'>
                  Go Back
                </MDBBtn>
              </MDBCol>
              <MDBCol>
                <MDBBtn color='success' disabled={checkEntry()} className='w-75'>
                  Submit
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

        </MDBCardBody>
      </div>
    </React.Fragment>
  )
}

export default Confirmation