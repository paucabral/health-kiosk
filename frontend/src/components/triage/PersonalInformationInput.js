import React, { useEffect, useContext } from 'react';
import { MDBInput, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { LanguageContext } from '../../contexts/LanguageContext';

const defaultMaterialTheme = createTheme({
  palette: {
    primary: {
      main: '#1266F1',
    },
  }
});

const PersonalInformationInput = ({ formData, setFormData, setBtnDisable }) => {
  useEffect(() => {
    if (formData.first_name === "" | formData.last_name === "" | formData.birth_date === null | formData.sex === "" | formData.contact_no === "") {
      setBtnDisable(true)
    }
    else {
      setBtnDisable(false)
    }
  }, [formData])

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <MDBCardTitle className='mb-0' style={{ fontWeight: "bold", fontSize: '1.75em' }}>
        {language === "PH" ?
          "Personal na Impormasyon"
          :
          "Personal Information"
        }
      </MDBCardTitle>
      {language === "PH" ?
        <p className='mb-0' style={{ fontSize: '1.25em' }} >
          Mangyaring punan ang iyong personal na impormasyon.
        </p>
        :
        <p className='mb-0' style={{ fontSize: '1.25em' }} >
          Please fill up your personal information.
        </p>
      }
      <MDBCardBody>
        <MDBRow className='mb-4' style={{ fontSize: '1em' }}>
          <MDBCol>
            <MDBInput style={{ fontSize: '1.2em' }} required value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value.toUpperCase() })} id='first_name' size='md' label={language === "PH" ? 'Pangalan * ' : 'First Name * '} type='text' icon="user" />
          </MDBCol>
          <MDBCol>
            <MDBInput style={{ fontSize: '1.2em' }} required value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value.toUpperCase() })} id='last_name' size='md' label={language === "PH" ? 'Apelyido * ' : 'Last Name * '} type='text' icon="user" />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-2'>
          <MDBCol className='col-3'>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <DatePicker size='small' orientation='landscape' openTo='year' views={['year', 'month', 'date']} variant='dialog' inputVariant="outlined" minDate={moment().subtract(130, "years")} maxDate={moment().subtract(18, "years")} required format="MMM DD, YYYY" label={language === "PH" ? 'Kaarawan' : 'Birthday'} value={formData.birth_date} onChange={(event) => setFormData({ ...formData, birth_date: moment(event._d).format('YYYY-MM-DD') })} allowKeyboardControl={false} initialFocusedDate={moment().subtract(18, "years")} />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </MDBCol>
          <MDBCol className='col-3'>
            <select style={{ fontSize: '1.2em', paddingBottom: '3.5px' }} className='form-select' required onChange={(event) => setFormData({ ...formData, sex: event.target.value.toUpperCase() })} id="sex" label={language === "PH" ? 'Kasarian * ' : 'Sex * '} value={formData.sex}>
              <option disabled default value={""}>{language === "PH" ? 'Kasarian *' : 'Sex *'}</option>
              <option value={"MALE"}>{language === "PH" ? 'LALAKI' : 'MALE'}</option>
              <option value={"FEMALE"}>{language === "PH" ? 'BABAE' : 'FEMALE'}</option>
            </select>
          </MDBCol>
          <MDBCol>
            <MDBInput style={{ fontSize: '1.2em' }} required pattern='[0-9]*' value={formData.contact_no} onChange={(event) => {
              setFormData({ ...formData, contact_no: event.target.value.replace(/[^0-9]+/g, '') })
            }} id='contact_no' size='md' label={language === "PH" ? 'Numero ng Telepono * ' : 'Contact No. * '} type='tel' icon="phone" />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput