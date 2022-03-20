import { MDBCard, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCardBody, MDBIcon, MDBCol, MDBRow, MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'

const Confirmation = ({ formData, setPage, setProgress }) => {
  const checkEntry = () => {
    return formData.first_name === "" | formData.last_name === "" | formData.age === "" | formData.sex === "" | formData.contact_no === "" | formData.temperature === "" | formData.pulse_rate === "" | formData.systolic_bp === "" | formData.diastolic_bp === "" | formData.o2_saturation === ""
  }

  return (
    <React.Fragment>
      <div style={{ height: '67vh' }}>
        <MDBCardTitle style={{ fontWeight: "bold" }}>Confirm Entry</MDBCardTitle>
        <p>Please ensure that all the information are correct before you proceed.</p>
        <MDBCardBody>
          <div style={{ overflowY: 'auto', height: '40vh', marginTop: '0em', marginBottom: '1em' }}>
            <div className='container'>
              <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
                <MDBRow>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='3'>
                        <strong>NAME:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.first_name && formData.last_name ? <span>{formData.first_name} {formData.last_name}</span> : <i className='text-muted'>*MISSING</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='3'>
                        <strong>SEX:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.sex ? <span>{formData.sex}</span> : <i className='text-muted'>*MISSING</i>}
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
                        {formData.age ? <span>{formData.age}</span> : <i className='text-muted'>*MISSING</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                  <MDBCol>
                    <MDBRow>
                      <MDBCol size='3'>
                        <strong>CONTACT:</strong>
                      </MDBCol>
                      <MDBCol>
                        {formData.contact_no ? <span>{formData.contact_no}</span> : <i className='text-muted'>*MISSING</i>}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow className='mt-3 mb-2'>
                  <MDBCol size='2'>
                    <strong>SYMPTOMS:</strong>
                  </MDBCol>
                  <MDBCol style={{ textAlign: 'left' }}>
                    <ul style={{ display: 'inline', listStyleType: 'none' }}>
                      {formData.symptoms?.map((symptom) => (
                        <li key={symptom} style={{ display: 'inline', marginLeft: '0.5em', marginRight: '0.5em' }}>
                          <MDBBtn color='dark' disabled>{symptom}</MDBBtn>
                        </li>
                      ))}
                    </ul>
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
                        {formData.temperature ? <span>{formData.temperature} °C</span> : <span>NA</span>}
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
                        {formData.o2_saturation ? <span> {formData.o2_saturation} %</span> : <span>NA</span>}
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
                        {formData.pulse_rate ? <span>{formData.pulse_rate} bpm</span> : <span>NA</span>}
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
                        {formData.systolic_bp ? <span>{formData.systolic_bp} mmHg</span> : <span>NA</span>}
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
                        {formData.diastolic_bp ? <span>{formData.diastolic_bp} mmHg</span> : <span>NA</span>}
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
                <MDBBtn onClick={() => { setPage(0); setProgress(0); }} className='w-75' color='warning'>
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