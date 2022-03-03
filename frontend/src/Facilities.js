import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const googleMapsLibraries = ["places"]
const mapContainerStyle = {
  width: "100%",
  height: "100%"
}

const Facilities = () => {
  const [location, setLocation] = useState({})
  const [reverseGeocode, setReverseGeocode] = useState({})

  const fetchLocation = async () => {
    try {
      console.log("Fetching location...");
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/location`
      console.log(url)
      const response = await axios.get(url);
      if (response.status == 200) {
        const location_data = response.data;
        setLocation(location_data)
        console.log(location_data)
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries
  })

  const [map, setMap] = React.useState(null)
  // if (loadError) return "Error loading maps";
  // if (isLoaded) return "Loading Maps";

  const fetchReverseGeocode = async () => {
    try {
      console.log("Fetching geocode...");
      const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${parseFloat(location["lat"])},${parseFloat(location["lng"])}`
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

  const [nearestHospitals, setNearestHospitals] = useState({});

  const fetchNearestHospitals = async () => {
    try {
      console.log("Fetching nearest hospitals...");
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/nearby-hospitals?lat=${parseFloat(location["lat"])}&lng=${parseFloat(location["lng"])}`
      console.log(url)
      const response = await axios.get(url);
      if (response.status == 200) {
        const nearest_hospitals = response.data["results"];
        setNearestHospitals(nearest_hospitals)
        console.log(nearest_hospitals)
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchReverseGeocode();
    fetchNearestHospitals();
  }, []);

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
                  <MDBCardSubTitle className='text-muted pt-2'>LAT: {parseFloat(location["lat"])}°</MDBCardSubTitle>
                  <MDBCardSubTitle className='text-muted pb-2'>LNG: {parseFloat(location["lng"])}°</MDBCardSubTitle>
                  <MDBCardText>
                    {reverseGeocode['street']} {reverseGeocode['adminArea6']} {reverseGeocode['adminArea5']} {reverseGeocode['adminArea4']} {reverseGeocode['adminArea3']} {reverseGeocode['adminArea1']} {reverseGeocode['postalCode']}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCol>
          <MDBCol md='8'>
            <MDBCard style={{ width: '100%', height: '100%' }}>
              {
                isLoaded ? <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location}
                  zoom={13}
                >
                  { /* Child components, such as markers, info windows, etc. */}
                  <></>
                </GoogleMap>
                  : !isLoaded && !loadError ? <></> : <>Failed to load maps.</>
              }
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  )
}

export default Facilities
