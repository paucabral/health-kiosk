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
        </MDBRow>
        <MDBRow>
          <MDBCol className='pl-2 ml-1'>
            <VitalSigns
              temperature={location.state.temperature}
              pulse_rate={location.state.pulse_rate}
              systolic_bp={location.state.systolic_bp}
              diastolic_bp={location.state.diastolic_bp}
              o2_saturation={location.state.o2_saturation}
            />
          </MDBCol>
          <MDBCol size='1' className='p-0 m-0'>
            {/* Empty column for spacing */}
          </MDBCol>
          <MDBCol className='pr-2 mr-1'>
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