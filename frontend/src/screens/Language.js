import { MDBCol, MDBRow, MDBBtn, MDBIcon, MDBContainer } from 'mdb-react-ui-kit'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const Language = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const goToDisclaimer = () => {
    navigate('/disclaimer');
  }

  return (
    <React.Fragment>
      <MDBContainer>
        <h1>Select Language / Pumili ng Wika</h1>
        <MDBContainer>
          <MDBRow className='py-2 px-5 mx-5'>
            <MDBCol>
              <MDBBtn color='primary' style={{ width: '300px', height: '320px', borderRadius: '10%' }} onClick={() => { setLanguage('EN'); goToDisclaimer(); }}>
                <h3>
                  <MDBIcon fas icon="globe-asia" /> English
                </h3>
                <br />
                <p style={{ fontSize: '1.5em' }}>
                  The instructions will be shown using the English language.
                </p>
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color='danger' style={{ width: '300px', height: '320px', borderRadius: '10%' }} onClick={() => { setLanguage('PH'); goToDisclaimer(); }}>
                <h3>
                  <MDBIcon fas icon="globe-americas" /> Filipino
                </h3>
                <br />
                <p style={{ fontSize: '1.5em' }}>
                  Ang mga panuto ay ipapakita gamit ang wikang Filipino.
                </p>
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Language