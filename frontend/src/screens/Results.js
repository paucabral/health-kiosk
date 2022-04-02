import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import { useLocation } from 'react-router-dom';
import VitalSigns from '../components/results/VitalSigns';

const Results = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <MDBContainer>
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