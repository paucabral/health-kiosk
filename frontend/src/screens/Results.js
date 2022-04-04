import { MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBCardText, MDBBtn, MDBCard } from 'mdb-react-ui-kit';
import React from 'react';
import { useLocation } from 'react-router-dom';
import DiseaseList from '../components/results/DiseaseList';
import VitalSigns from '../components/results/VitalSigns';

const Results = () => {
  const location = useLocation();
  console.log(location.state)
  return (
    <React.Fragment>
      <MDBContainer className='mt-5 mx-4' style={{ width: '100%', marginBottom: '-2.3em' }}>
        <MDBRow className='mb-3' style={{ textAlign: "center", display: 'flex', justifyContent: "center" }}>
          <MDBCardTitle style={{ fontWeight: "bold" }}>Patient Assessment</MDBCardTitle>
        </MDBRow>
        <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
          <MDBRow>
            <MDBCard className='px-5 py-2'>
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
            </MDBCard>
          </MDBRow>
          <MDBRow className='mt-3 mb-2'>
            <MDBCol size='2'>
              <strong>SYMPTOMS:</strong>
            </MDBCol>
            <MDBCol id="confirmation" style={{ textAlign: 'left', overflowX: 'auto', width: '10vw', whiteSpace: 'nowrap' }}>
              {
                location.state.symptoms.length != 0 ?
                  <MDBContainer>
                    {location.state.symptoms?.map((symptom) => (
                      <MDBBtn pill color='dark' className='shadow-0 px-3 py-1' key={symptom} style={{ display: 'inline', marginLeft: '0.3em', marginRight: '0.3em', marginBottom: '0.5em', borderRadius: '20px' }} disabled>{symptom}</MDBBtn>
                    ))}
                  </MDBContainer>
                  :
                  <MDBCardText className='text-muted'><i>NO SYMPTOMS SELECTED </i></MDBCardText>
              }
            </MDBCol>
          </MDBRow>
        </MDBRow>
        <MDBRow>
          <MDBCol className='px-0'>
            <VitalSigns
              temperature={location.state.temperature}
              pulse_rate={location.state.pulse_rate}
              systolic_bp={location.state.systolic_bp}
              diastolic_bp={location.state.diastolic_bp}
              o2_saturation={location.state.o2_saturation}
            />
          </MDBCol>
          <MDBCol>
            <MDBCol className='px-0'>
              <DiseaseList diseases={location.state.predictions} symptoms={location.state.symptoms} />
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Results