import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
  MDBModalFooter,
  MDBSpinner,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
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
    precautions = diseaseInfo[entry]['Precaution']
    sources = diseaseInfo[entry]['Source']
  }

  let navigate = useNavigate();

  return (
    <React.Fragment>
      <MDBModal id="disease-modal" staticBackdrop scrollable='true' show={diseaseModal} setShow={setDiseaseModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent style={{ height: '80vh', fontSize: '1.3em' }}>
            <MDBModalHeader>
              <MDBModalTitle className='text-uppercase' style={{ fontSize: '1.2em' }}>{entry}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDiseaseModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2 mr-3' style={{ textAlign: "justify", overflowY: 'auto', height: '100vh' }}>
              <MDBRow className='px-3'>
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
            <div id="hospital-specific-btn" style={{ position: 'fixed', bottom: 75, right: 150, zIndex: '5000' }}>
              <MDBBtn color='danger' className='px-0' rounded style={{ height: '97px', width: '97px', lineHeight: '1' }} onClick={() => navigate('/nearest-facilities', { state: entry })}>
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
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default DiseaseInfo