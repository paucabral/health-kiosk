import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <MDBContainer>
        {location.state.first_name} {location.state.last_name}
      </MDBContainer>
    </React.Fragment>
  )
}

export default Results