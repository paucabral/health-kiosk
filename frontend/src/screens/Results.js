import { MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';
import { useLocation } from 'react-router-dom';
import VitalSigns from '../components/results/VitalSigns';

const Results = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow className='mb-3' style={{ textAlign: "center", display: 'flex', justifyContent: "center" }}>
          <MDBCardTitle style={{ fontWeight: "bold" }}>Patient Assessment</MDBCardTitle>
        </MDBRow>
        <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
          <MDBRow>
            <MDBCol>
              <MDBRow>
                <MDBCol size='3'>
                  <strong>NAME:</strong>
                </MDBCol>
                <MDBCol>
                  {location.state.first_name && location.state.last_name ? <span>{location.state.first_name} {location.state.last_name}</span> : <i className='text-muted'>*MISSING</i>}
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <MDBCol size='3'>
                  <strong>SEX:</strong>
                </MDBCol>
                <MDBCol>
                  {location.state.sex ? <span>{location.state.sex}</span> : <i className='text-muted'>*MISSING</i>}
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
                  {location.state.age ? <span>{location.state.age}</span> : <i className='text-muted'>*MISSING</i>}
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol>
              <MDBRow>
                <MDBCol size='3'>
                  <strong>CONTACT:</strong>
                </MDBCol>
                <MDBCol>
                  {location.state.contact_no ? <span>{location.state.contact_no}</span> : <i className='text-muted'>*MISSING</i>}
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
          {
            location.state.symptoms.length != 0 ?
              <MDBRow className='mt-3 mb-2'>
                <MDBCol size='2'>
                  <strong>SYMPTOMS:</strong>
                </MDBCol>
                <MDBCol style={{ textAlign: 'left' }}>
                  {location.state.symptoms?.map((symptom) => (
                    <MDBBtn pill color='dark' className='shadow-0' key={symptom} style={{ display: 'inline', marginLeft: '0.3em', marginRight: '0.3em', marginBottom: '0.5em', borderRadius: '20px' }} disabled>{symptom}</MDBBtn>
                  ))}
                </MDBCol>
              </MDBRow>
              :
              <></>
          }
        </MDBRow>

        {location.state.first_name} {location.state.last_name}
        <VitalSigns
          temperature={location.state.temperature}
          pulse_rate={location.state.pulse_rate}
          systolic_bp={location.state.systolic_bp}
          diastolic_bp={location.state.diastolic_bp}
          o2_saturation={location.state.o2_saturation}
        />
      </MDBContainer>
    </React.Fragment>
  )
}

export default Results