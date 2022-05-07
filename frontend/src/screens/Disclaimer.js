import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
import React, { useState, useContext } from 'react'
import TermsAndConditions from '../components/disclaimer/disclaimer_modal/TermsAndConditions';
import { LanguageContext } from '../contexts/LanguageContext';

const Disclaimer = () => {
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const toggleDisclaimerModal = () => setDisclaimerModal(!disclaimerModal);

  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <React.Fragment>
      <MDBContainer>
        <MDBContainer className='mb-2'>
          <span style={{ fontSize: '0.75em' }}>{language === "PH" ? "INIHAHANDOG NG" : "BROUGHT TO YOU BY"}</span>
          <h2 style={{ fontSize: '1.25em', color: 'rgb(10, 165, 165)' }}>HIGH GROUNDS</h2>
        </MDBContainer>
        <MDBContainer className='mb-4'>
          <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '3em' }}>Health Kiosk</h1>
        </MDBContainer>
        {language === "PH" ?
          <div>
            <p className='px-5' style={{ textAlign: 'center', fontSize: '1.25em' }}><b>Paunawa: </b>Ang kiosk na ito ay idinisenyo upang tumulong sa paggawa ng desisyon ng pasyente <i>(18 taong gulang pataas)</i> at magbigay gabay sa kanila patungo sa mga tamang channel para sa karagdagang konsultasyon at pagsusuri. Ang mga resulta ay <b>HINDI PINAL</b> <b>AT HINDI RIN PANAPOS NA KONKLUSYON</b>, ngunit isa lamang gabay na maaaring gamitin ng doktor sa pagtingin ng posibleng sakit ng pasyente batay sa mga sintomas.</p>
            <p style={{ color: 'gray', fontStyle: 'italic', fontSize: '1em' }}>*Mangyaring basahin ang mga tuntunin at kundisyon bago magpatuloy.*</p>
          </div>
          :
          <div>
            <p className='px-5' style={{ textAlign: 'center', fontSize: '1.25em' }}><b>Disclaimer: </b>This kiosk is designed to aid in the decision making of the patient <i>(18 years old and above)</i> and lead them proper channels for further consultation and analysis. The results are <b>NOT FINAL</b> <b>NOR A DEFINITIVE DIAGNOSIS</b>, but an indicator which can be used by the doctor to narrow down the patient's possible disease/s based on symptoms.</p>
            <p style={{ color: 'gray', fontStyle: 'italic', fontSize: '1em' }}>*Please read the terms and conditions before proceeding.*</p>
          </div>
        }

        <MDBBtn onClick={toggleDisclaimerModal} style={{ fontSize: '1em' }}>
          {language === "PH" ?
            "Basahin ang mga tuntunin at kundisyon"
            :
            "Read Terms and Conditions"
          }
        </MDBBtn>
        <TermsAndConditions disclaimerModal={disclaimerModal} setDisclaimerModal={setDisclaimerModal} toggleDisclaimerModal={toggleDisclaimerModal} />
      </MDBContainer>
    </React.Fragment>
  )
}

export default Disclaimer