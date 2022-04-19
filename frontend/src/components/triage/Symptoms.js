import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import { Typeahead } from 'react-bootstrap-typeahead';
import symptoms from '../../data/symptoms-list';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../../styles/styles.css'

const Symptoms = ({ formData, setFormData, setBtnDisable }) => {
  const [multiSelections, setMultiSelections] = useState(formData.symptoms);
  const options = symptoms;

  useEffect(() => {
    console.log(multiSelections);
    setFormData({ ...formData, symptoms: multiSelections })

    if (multiSelections != null && multiSelections.length > 0 && multiSelections.length < 3) {
      setBtnDisable(true)
    }
    else {
      setBtnDisable(false)
    }
  }, [multiSelections]);

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Symptoms</MDBCardTitle>
      <p>
        Find and select your symptoms (if you experience any).
        <br />
        {multiSelections != null && multiSelections.length > 0 && multiSelections.length < 3 ? <span style={{ fontSize: '0.75em', color: 'gray', fontStyle: 'italic' }}>
          Please select at least three (3) symptoms if you need to acquire differential diagnosis.
        </span>
          : multiSelections.length === 0 ?
            <span style={{ fontSize: '0.75em', color: 'gray', fontStyle: 'italic' }}>*NOTE: Differential diagnosis will not be available if no symptoms are selected.*</span>
            :
            <span style={{ fontSize: '0.75em', color: 'gray', fontStyle: 'italic' }}>
              Please select at least three (3) symptoms if you need to acquire differential diagnosis.
            </span>
        }
      </p>
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