import React, { useState, useEffect, useContext } from 'react';
import { MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBRow, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../../styles/styles.css';
import { LanguageContext } from '../../contexts/LanguageContext';
// import symptoms from '../../data/symptoms-list.js';
import symptoms from '../../data/symptoms-list-revised-sample';

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

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold", fontSize: '1.75em' }}>
        {language === "PH" ?
          "Mga Sintomas"
          : "Symptoms"
        }
      </MDBCardTitle>
      <p style={{ fontSize: '1.25em' }}>
        {language === "PH" ?
          "Hanapin at piliin ang iyong mga sintomas (kung nakakaranas ka ng anuman)."
          : "Find and select your symptoms (if you experience any)."
        }
        <br />
        {multiSelections != null && multiSelections.length > 0 && multiSelections.length < 3 ? <span style={{ fontSize: '0.75em', color: 'gray', fontStyle: 'italic' }}>
          {language === "PH" ?
            "Mangyaring pumili ng hindi bababa sa tatlong (3) sintomas kung kailangan mong kumuha ng differential diagnosis."
            : "Please select at least three (3) symptoms if you need to acquire differential diagnosis."
          }
        </span>
          : multiSelections.length === 0 ?
            <span style={{ fontSize: '0.75em', color: 'gray', fontStyle: 'italic' }}>
              {language === "PH" ?
                "* PAUNAWA : Hindi magiging available ang differential diagnosis kung walang mapipiling sintomas.*"
                : "*NOTE: Differential diagnosis will not be available if no symptoms are selected.*"
              }
            </span>
            :
            <span style={{ fontSize: '0.75em', color: 'gray', fontStyle: 'italic' }}>
              {language === "PH" ?
                "Mangyaring pumili ng hindi bababa sa tatlong (3) sintomas kung kailangan mong kumuha ng differential diagnosis."
                : "Please select at least three (3) symptoms if you need to acquire differential diagnosis."
              }
            </span>
        }
      </p>
      <form className='form' style={{ marginBottom: '5em' }}>
        <Typeahead
          id="symptoms-selection"
          multiple
          onChange={setMultiSelections}
          options={options}
          filterBy={language === "PH" ? ['symptom', 'ph', 'ph_desc'] : ['symptom', 'en', 'en_desc']}
          placeholder={language === "PH" ? "Pillin ang iyong mga sintomas..." : "Select your symptoms..."}
          emptyLabel={language === "PH" ? "Walang nakitang tugma." : "No matches found."}
          selected={multiSelections}
          labelKey={(option) => language === "PH" ? option.ph : option.en}
          renderMenuItemChildren={(option) => (
            <div>
              {language === "PH" ? option.ph : option.en}
              <div>
                <small>{language === "PH" ? option.ph_desc : option.en_desc}</small>
              </div>
            </div>
          )}
        />
      </form>
    </React.Fragment>
  )
}

export default Symptoms