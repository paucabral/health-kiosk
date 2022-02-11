import { MDBCardBody, MDBCardTitle, MDBBtn } from 'mdb-react-ui-kit'
import React from 'react'

const Confirmation = ({ formData, setFormData, page, setPage }) => {
  return (
    <React.Fragment>
      <MDBCardTitle>Confirm Entry</MDBCardTitle>
      <MDBCardBody>
        <div className='mb-4'>
          Please ensure all the information are correct before you proceed.
        </div>
        <div className='mb-4' >
          <span><strong>Name:</strong> {formData.first_name} {formData.last_name}</span><br />
          <span><strong>Age:</strong> {formData.age}</span><br />
          <span><strong>Contact No:</strong> {formData.contact_no}</span><br />
        </div>
        <div>
          <MDBBtn onClick={() => { setPage(0) }} className='mx-2'>
            Go Back
          </MDBBtn>
          <MDBBtn color='success'>
            Submit
          </MDBBtn>
        </div>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default Confirmation