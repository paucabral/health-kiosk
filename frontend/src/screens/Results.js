import { MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon, MDBBtn, MDBCard } from 'mdb-react-ui-kit';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DiseaseList from '../components/results/DiseaseList';
import VitalSigns from '../components/results/VitalSigns';

const Results = () => {
  const location = useLocation();

  let navigate = useNavigate();
  const routeChange = () => {
    // let path = `/nearest-facilities`;
    // setTimeout(function () {
    //   navigate(path);
    // }, 750)
    console.log('clicked')
  }

  return (
    <React.Fragment>
      <MDBContainer className='mt-5 mx-4' style={{ width: '100%', marginBottom: '-2.3em' }}>
        <MDBRow className='mb-2' style={{ textAlign: "center", display: 'flex', justifyContent: "center" }}>
          <MDBCardTitle style={{ fontWeight: "bold" }}>Patient Assessment</MDBCardTitle>
        </MDBRow>
        <MDBRow className='mb-3' style={{ textAlign: "left", display: 'flex', justifyContent: "center" }}>
          <MDBRow>
            <MDBCard className='px-5 py-3' shadow='1-strong'>
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
      <div id="arrow-btn">
        <MDBBtn color='dark' className='px-0' rounded style={{ height: '115px', width: '115px', lineHeight: '1' }} onClick={routeChange}>
          <div>
            <MDBRow>
              <MDBIcon size='2x' fas icon="sort-up" />
            </MDBRow>
            <MDBRow className='m-2'>
              <span style={{ fontSize: '0.75em' }}>SELECT</span>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
            <MDBRow className='m-2'>
            </MDBRow>
          </div>
        </MDBBtn>
      </div>
      <div id="hospital-btn">
        <MDBBtn color='danger' className='px-0' rounded style={{ height: '97px', width: '97px', lineHeight: '1' }} onClick={routeChange}>
          <div>
            <MDBRow>
              <MDBIcon size='2x' fas icon="hospital" />
            </MDBRow>
            <MDBRow className='m-2'>
              <span style={{ fontSize: '0.75em' }}>Find Nearby Facilities</span>
            </MDBRow>
          </div>
        </MDBBtn>
      </div>
      <div id="text-btn">
        <MDBBtn color='primary' className='px-0' rounded style={{ height: '97px', width: '97px', lineHeight: '1' }} onClick={routeChange}>
          <div>
            <MDBRow>
              <MDBIcon size='2x' fas icon="comment" />
            </MDBRow>
            <MDBRow className='m-2'>
              <span style={{ fontSize: '0.75em' }}>Send Results via SMS</span>
            </MDBRow>
          </div>
        </MDBBtn>
      </div>
    </React.Fragment>
  )
}

export default Results