import { MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

const InstructionStep = ({ img, instruction }) => {
  return (
    <React.Fragment>
      <MDBContainer className='my-2 mx-2' style={{ width: "20em" }}>
        <MDBRow className='mb-2'>
          <img src={img} />
        </MDBRow>
        <MDBRow className='mb-2'>
          <div style={{ textAlign: 'justify', fontSize: '1.25em' }}>
            {instruction}
          </div>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default InstructionStep