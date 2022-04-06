import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import { Typeahead } from 'react-bootstrap-typeahead';
import symptoms from '../../data/symptoms-list';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../../styles/styles.css'

const Symptoms = ({ formData, setFormData }) => {
  const [multiSelections, setMultiSelections] = useState(formData.symptoms);
  const options = symptoms;

  useEffect(() => {
    console.log(multiSelections);
    setFormData({ ...formData, symptoms: multiSelections })
  }, [multiSelections]);

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Symptoms</MDBCardTitle>
      <p>Find and select your symptoms (if you experience any).</p>
      <form className='form' style={{ marginBottom: '5em' }}>
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