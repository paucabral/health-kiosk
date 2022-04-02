import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';

const VitalSigns = ({ temperature, pulse_rate, systolic_bp, diastolic_bp, o2_saturation }) => {
  return (
    <React.Fragment>
      <MDBContainer>
        Temperature: {temperature},
        Pulse Rate: {pulse_rate},
        Systolic Blood Pressure: {systolic_bp},
        Diastolic Blood Pressure: {diastolic_bp},
        O2 Saturation: {o2_saturation}
      </MDBContainer>
    </React.Fragment>
  )
}

export default VitalSigns