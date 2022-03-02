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
  const default_loc = {
    lat: 14.6507,
    lng: 121.1029
  }
  const [location, setLocation] = useState(default_loc)
  const [reverseGeocode, setReverseGeocode] = useState({})

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
      const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${location.lat},${location.lng}`
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
    // try {
    //   console.log("Fetching nearest hospitals...");
    //   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&type=hospital&rankby=distance&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    //   console.log(url)
    //   const response = await axios.get(url);
    //   if (response.status == 200) {
    //     const nearest_hospitals = response.data["results"];
    //     setNearestHospitals(nearest_hospitals)
    //     console.log(nearest_hospitals)
    //   }
    // } catch (error) {
    //   console.log(JSON.stringify(error));
    // }

    const searchLocation = new window.google.maps.LatLng(location.lat, location.lng);

    var request = {
      location: searchLocation,
      radius: '500',
      type: ['hospital']
    };

    const service = new window.google.maps.places.PlacesService(request);
    const res = service.nearbySearch(request);
    console.log(res)
  }

  useEffect(() => {
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
                  <MDBCardSubTitle className='text-muted pt-2'>LAT: {location.lat}°</MDBCardSubTitle>
                  <MDBCardSubTitle className='text-muted pb-2'>LNG: {location.lng}°</MDBCardSubTitle>
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
