import React, { useState } from 'react';
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Symptoms = () => {
  const [multiSelections, setMultiSelections] = useState([]);
  const options = ['The', 'quick brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Symptoms</MDBCardTitle>
      <p>Find and select your symptoms.</p>
      <form className='form'>
        <Typeahead
          id="symptoms-selection"
          multiple
          onChange={setMultiSelections}
          options={options}
          placeholder="Select your symptoms..."
          selected={multiSelections}
        />
      </form>
    </React.Fragment>
  )
}

export default Symptoms