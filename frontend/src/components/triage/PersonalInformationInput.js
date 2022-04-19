import React, { useEffect } from 'react';
import { MDBInput, MDBCardBody, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

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
  return (
    <React.Fragment>
      <MDBCardTitle style={{ fontWeight: "bold" }}>Personal Information</MDBCardTitle>
      <p>Please fill up your personal information.</p>
      <MDBCardBody>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBInput required value={formData.first_name} onChange={(event) => setFormData({ ...formData, first_name: event.target.value.toUpperCase() })} id='first_name' size='md' label='First Name * ' type='text' icon="user" />
          </MDBCol>
          <MDBCol>
            <MDBInput required value={formData.last_name} onChange={(event) => setFormData({ ...formData, last_name: event.target.value.toUpperCase() })} id='last_name' size='md' label='Last Name * ' type='text' icon="user" />
          </MDBCol>
        </MDBRow>
        <MDBRow className='mb-2'>
          <MDBCol className='col-2'>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <DatePicker size='small' variant='dialog' inputVariant="outlined" minDate={moment().subtract(500, "years")} maxDate={moment().subtract(18, "years")} required format="MM/DD/YYYY" label="Birthday" value={formData.birth_date} onChange={(event) => setFormData({ ...formData, birth_date: moment(event._d).format('YYYY-MM-DD') })} />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </MDBCol>
          <MDBCol className='col-2'>
            <select className='form-select' required onChange={(event) => setFormData({ ...formData, sex: event.target.value.toUpperCase() })} id="sex" label="Sex * " value={formData.sex}>
              <option disabled default value={""}>Sex *</option>
              <option value={"MALE"}>MALE</option>
              <option value={"FEMALE"}>FEMALE</option>
            </select>
          </MDBCol>
          <MDBCol>
            <MDBInput required value={formData.contact_no} onChange={(event) => setFormData({ ...formData, contact_no: event.target.value })} id='contact_no' size='md' label='Contact No. *&nbsp;' type='tel' icon="phone" />
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </React.Fragment>
  )
}

export default PersonalInformationInput