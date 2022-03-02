import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const Facilities = () => {
  const default_loc = {
    lat: 37.423021,
    long: -122.083739
  }
  const [location, setLocation] = useState(default_loc)
  const [reverseGeocode, setReverseGeocode] = useState({})

  const googleMapsLibraries = ["places"]
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries
  })

  if (loadError) return "Error loading maps";
  if (isLoaded) return "Loading Maps";

  const fetchReverseGeocode = async () => {
    try {
      console.log("Fetching geocode...");
      const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${location.lat},${location.long}`
      console.log(url)
      const response = await axios.get(url);
      if (response.status == 200) {
        const reverse_geocode_data = response.data["results"][0]["locations"][0];
        setReverseGeocode(reverse_geocode_data)
        console.log(reverse_geocode_data)
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  useEffect(() => {
    fetchReverseGeocode();
  }, [])

  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='4'>
            <MDBRow>
              <MDBCard>
                <MDBCardBody className='text-left'>
                  <MDBCardHeader className='p-0 text-uppercase'><MDBIcon fas icon="map-marker-alt" /> Current Location</MDBCardHeader>
                  <MDBCardTitle className='text-uppercase py-2'>{reverseGeocode['street']}</MDBCardTitle>
                  <MDBCardSubTitle className='text-muted pt-2'>LAT: {location.lat}°</MDBCardSubTitle>
                  <MDBCardSubTitle className='text-muted pb-2'>LONG: {location.long}°</MDBCardSubTitle>
                  <MDBCardText>
                    {reverseGeocode['street']} {reverseGeocode['adminArea6']} {reverseGeocode['adminArea5']} {reverseGeocode['adminArea4']} {reverseGeocode['adminArea3']} {reverseGeocode['adminArea1']} {reverseGeocode['postalCode']}
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
