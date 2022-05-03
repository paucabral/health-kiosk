import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBFooter,
  MDBTabsLink,
} from 'mdb-react-ui-kit';
import { LanguageContext } from '../../../contexts/LanguageContext';

const TermsAndConditions = ({ disclaimerModal, setDisclaimerModal, toggleDisclaimerModal }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/check`;
    navigate(path);
  }

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBModal id="" staticBackdrop scrollable='true' show={disclaimerModal} setShow={setDisclaimerModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent style={{ height: '70vh' }}>
            <MDBModalHeader>
              <MDBModalTitle>
                {
                  language === "PH" ?
                    "Tuntuinin at mga Kundisyon"
                    :
                    "Terms & Conditions"
                }
              </MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDisclaimerModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2 mr-3' style={{ textAlign: "justify", overflowY: 'auto', height: '100vh' }}>
              <MDBRow className='px-2'>
                {
                  language === "PH" ?
                    <div>
                      <h4>Paunawa</h4>
                      <p>Ginawa ang lahat ng pagsisikap upang matiyak na ang lahat ng impormasyong pangkalusugan na nakolekta at ginamit sa kiosk ay nagbibigay-kaalaman at tumpak hangga't maaari. Ang impormasyong nalikom mula sa pasyente ay susuriin, at ang resulta ay magagamit para sa karagdagang konsultasyon sa presensya ng isang doktor o eksperto sa kalusugan. Ang mga resulta na ipinakita sa kiosk ay hindi pinal at nagsisilbi lamang bilang isang sanggunian para sa doktor upang mapabilis ang diagnosis o mga check-up.</p>
                      <h4>Mga Tuntunin at Kundisyon</h4>
                      <h5>Tungkol sa Kiosk</h5>
                      <p>Ang sistema ay self-service na health kiosk na sumusukat sa mga vital signs, nagsasagawa ng differential diagnosis, pati na rin ang paghahanap sa mga kalapit na pasilidad ng kalusugan. Dahil sa limitadong availability ng mga dataset, ang pagpili ng sakit/sintomas ay limitado sa general medicine upang paliitin ang pagtuon tungkol sa availability ng mga dataset. Susubukang alamin ng self-service health kiosk ang mga posibleng sakit na maaaring magkaroon ang pasyente depende sa mga sintomas na nakolekta mula sa kaniya. Dagdag pa, ang sistema ay magpapakita ng impormasyon tungkol sa mga sakit at ang mga pag-iingat sa doktor na maaari niyang ibigay sa pasyente base sa kanyang paghuhusga sa mga resulta. Ipapakita ang pinakamalapit na ospital batay sa pisikal na lokasyon kung saan naka-deploy ang kiosk. Ang paghahanap sa mga pinakamalapit na ospital ay gagawin sa pamamagitan ng mga tawag sa API mula sa third-party na API, kaya ang pangangailangan para sa device na palaging konektado sa internet. Ang mga serbisyo ng API na ito ay ang Maps API at Places API na ibinigay ng Google Maps. Samakatuwid, ang katumpakan ng mga kalapit na rekomendasyon sa ospital ay nakasalalay sa katumpakan ng natukoy na lokasyon ng GPS ng kiosk kasabay ng mga serbisyo ng API na ibinibigay ng Google.</p>
                      <h5>Seguridad at Pagkakumpidensyal</h5>
                      <p>Ang lahat ng nakolektang impormasyon mula sa mga pasyente ay naka-imbak sa database ng kiosk at gagamitin lamang para sa pagkakakilanlan ng pasyente. Hindi ito ibabahagi sa ibang mga organisasyon, at ang mga contact number na nakolekta ay gagamitin lamang para sa pagpapadala ng mga resulta at notification para sa mga posibleng appointment.</p>
                      <h5>Iyong Kasunduan</h5>
                      <p>Ang self-service na health kiosk ay hindi isang kapalit para sa diagnosis at mga check-up na may presensya ng isang doktor o isang eksperto sa kalusugan. Ang lahat ng impormasyon sa sintomas-sakit ay mula sa mga mapagkakatiwalaang klinikal na websites tulad ng Mayo Clinic at WebMD. Ang mga resultang ipinakita mula sa kiosk ay magsisilbi lamang na sanggunian para sa karagdagang konsultasyon sa presensya ng isang propesyonal na doktor. Samakatuwid, ang mga sakit na ipinapakita sa pahina ng mga resulta ay hindi pinal at kailangan ng pagpapatunay mula sa isang doktor para sa kumpirmasyon.</p>
                    </div>
                    :
                    <div>
                      <h4>Disclaimer</h4>
                      <p>All effort is taken to ensure that all health information collected and used in the kiosk is informative and accurate as possible. Information taken from the patient is secured and the kiosk will give a copy of the results for further consultation in a presence of a doctor or health expert. The results shown in the kiosk are not final and only serve as a reference for the doctor to speed up the diagnosis or check-ups.</p>
                      <h4>Terms & Conditions</h4>
                      <h5>About the Kiosk</h5>
                      <p>The system is self-service health kiosk that measures vital signs, performs differential diagnosis, as well as locate the nearby health facilities. Due to limited availability of datasets, the disease/symptoms selection are limited to general medicine to narrow the focus concerning the availability of datasets. The self-service health kiosk will predict the possible diseases that the patient may have depending on the symptoms that are collected from the patient. Further, the system will show information about the diseases and the precautions to the doctor which he/she may relay to the patient at his/her discretion and assessment. The nearest hospital will be shown based on the physical location where the kiosk is deployed. Locating the nearest hospitals will be done through API calls from third-party API, thus the need for the device to be always connected to the internet. These API services are the Maps API and Places API provided by Google Maps. Hence, the accuracy of nearby hospital recommendations will be dependent on the accuracy of the pinpointed GPS location of the kiosk in conjunction with API services provided by Google.</p>
                      <h5>Security and Confidentiality</h5>
                      <p>All of the collected data from the patients are stored on the kiosk’s database and will be used solely for patient identification. This will not be released to other organizations, and the contact numbers collected will only be used for sending results and notification for possible appointments.</p>
                      <h5>Your Agreement</h5>
                      <p>The self-service health kiosk is not a substitute for diagnosis and check-ups with a presence of a doctor or a health expert. All symptom-disease information is scraped from validated clinical sites such as Mayo Clinic and WebMD. The results shown from the kiosk will only serve as a reference for further consultation in the presence of a professional doctor. Hence, the diseases shown on the results page are not final and needed validation from a doctor for confirmation.</p>
                    </div>
                }
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBCol className='p-0 m-0' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <MDBBtn onClick={routeChange}>
                  {language === "PH" ?
                    "SUMASANGAYON"
                    :
                    "I AGREE"
                  }
                </MDBBtn>
              </MDBCol>
              <MDBCol className='p-0 m-0' style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.85em', fontWeight: 'bold' }}>
                <MDBTabsLink style={{ textDecoration: 'underline' }} onClick={toggleDisclaimerModal}>
                  {language === "PH" ?
                    "KANSELAHIN"
                    :
                    "CANCEL"
                  }
                </MDBTabsLink>
              </MDBCol>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default TermsAndConditions