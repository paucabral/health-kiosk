import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import diseaseInfo from '../../../data/disease-info';

const DiseaseInfo = ({ entry, diseaseModal, setDiseaseModal, toggleDiseaseModal }) => {
  let overview = null
  let diagnosis = null
  let causes = null
  let symptoms = null
  let precautions = null
  let sources = null

  if (diseaseModal) {
    overview = diseaseInfo[entry]['Overview']
    diagnosis = diseaseInfo[entry]['Diagnosis']
    causes = diseaseInfo[entry]['Causes']
    symptoms = diseaseInfo[entry]['Symptoms']
    precautions = diseaseInfo[entry]['Precautions/Treatment']
    sources = diseaseInfo[entry]['Source']
  }

  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop scrollable='true' show={diseaseModal} setShow={setDiseaseModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent style={{ height: '80vh' }}>
            <MDBModalHeader>
              <MDBModalTitle className='text-uppercase'>{entry}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDiseaseModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2' style={{ textAlign: "justify", overflowY: 'auto', height: '100vh' }}>
              <MDBRow>
                <div>
                  <div className='mb-2'>
                    <h5>Overview</h5>
                    <p>{overview}</p>
                  </div>
                  <div className='mb-2'>
                    <h5>Diagnosis</h5>
                    <p>{diagnosis}</p>
                  </div>
                  <div className='mb-2'>
                    <h5>Symptoms</h5>
                    <ul>
                      {symptoms?.map((symptom) =>
                        <li>{symptom}</li>
                      )}
                    </ul>
                  </div>
                  <div className='mb-2'>
                    <h5>Causes</h5>
                    <p>{causes}</p>
                  </div>
                  <div className='mb-2'>
                    <h5>Precautions and/or Treatment</h5>
                    <ul>
                      {precautions?.map((precaution) =>
                        <li>{precaution}</li>
                      )}
                    </ul>
                  </div>
                  <div className='mb-2'>
                    <h5>Source/s</h5>
                    <ul>
                      {sources?.map((source) =>
                        <li>{source}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </MDBRow>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default DiseaseInfo