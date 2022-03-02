import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

const Facilities = () => {
  const default_loc = {
    lat: 37.423021,
    long: -122.083739
  }
  const [location, setLocation] = useState(default_loc)
  const [reverseGeocode, setReverseGeocode] = useState({})

  const fetchReverseGeocode = async () => {
    try {
      console.log("Fetching geocode...");
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.long}&addressdetails=1`
      const response = await axios.get(url);
      if (response.status == 200) {
        const reverse_geocode_data = response.data;
        setReverseGeocode(reverse_geocode_data)
        console.log(reverse_geocode_data)
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  fetchReverseGeocode();

  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='4'>
            <MDBRow>
              <MDBCard>
                <MDBCardBody className='text-left'>
                  <MDBCardHeader className='p-0 text-uppercase'><MDBIcon fas icon="map-marker-alt" /> Current Location</MDBCardHeader>
                  <MDBCardTitle className='text-uppercase py-2'>{reverseGeocode['display_name']}</MDBCardTitle>
                  <MDBCardSubTitle className='text-muted pt-2'>LAT: {location.lat}°</MDBCardSubTitle>
                  <MDBCardSubTitle className='text-muted pb-2'>LONG: {location.long}°</MDBCardSubTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCol>
          <MDBCol md='8'>
            <MDBCard style={{ width: '100%', height: '100%' }}>

            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Facilities
