import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const googleMapsLibraries = ["places"]
const mapContainerStyle = {
  width: "100%",
  height: "85vh"
}

const Facilities = () => {
  const [status, setStatus] = useState("SUCCESS");

  const [location, setLocation] = useState({});

  const fetchLocation = async () => {
    try {
      console.log("Fetching location...");
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/location`
      console.log(url)
      const response = await axios.get(url);
      if (response.status == 200) {
        const location_data = response.data;
        setLocation(location_data)
        console.log(location)
        setStatus("SUCCESS")
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setStatus("ERROR")
    }
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries
  })

  const [map, setMap] = React.useState(null)
  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading Maps";

  const [reverseGeocode, setReverseGeocode] = useState({})

  const fetchReverseGeocode = async () => {
    if (status === "SUCCESS") {
      try {
        console.log("Fetching geocode...");
        console.log(location)
        const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${location.lat},${location.lng}`
        console.log(url)
        const response = await axios.get(url);
        if (response.status == 200) {
          const reverse_geocode_data = response.data["results"][0]["locations"][0];
          setReverseGeocode(reverse_geocode_data)
          console.log(reverse_geocode_data)
          setStatus("SUCCESS")
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        setStatus("ERROR")
      }
    }
  }

  const [nearestHospitals, setNearestHospitals] = useState([]);

  const fetchNearestHospitals = async () => {
    if (status === "SUCCESS") {
      try {
        console.log("Fetching nearest hospitals...");
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/nearby-hospitals?lat=${location.lat}&lng=${location.lng}`
        console.log(url)
        const response = await axios.get(url);
        if (response.status == 200) {
          const nearest_hospitals = response.data["results"];
          setNearestHospitals(nearest_hospitals)
          console.log(nearest_hospitals)
          setStatus("SUCCESS")
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        setStatus("ERROR")
      }
    }
  };

  const findFacilities = async () => {
    fetchLocation();
    // await fetchReverseGeocode();
    // await fetchNearestHospitals();
  }

  useEffect(() => {
    findFacilities();
  }, []);

  return (
    <React.Fragment>
      <div className='mt-5 mx-4' style={{ width: '100%', marginBottom: '-2em' }}>
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
            {
              nearestHospitals.length != 0 ?
                <MDBRow style={{ height: '20vh', overflow: 'scroll', marginTop: '0.5em', marginBottom: '0.5em' }}>
                  {nearestHospitals?.map((item) => (
                    <MDBCard style={{ marginTop: '0.5em', marginBottom: '0.5em' }} key={item.name}>
                      <img src={item.icon} width={20} />
                      {item.name}<br />
                      {item.rating ? `${item.rating}` : ''} {item.user_ratings_total ? `(${item.user_ratings_total})` : ''}<br />
                      {/* {item.business_status}: {item.opening_hours} <br /> */}
                      {/* {item.formatted_phone_number} */}
                      {item.geometry.location.lat},{item.geometry.location.lng}<br />
                      {item.vicinity}<br />
                    </MDBCard>
                  ))}
                </MDBRow>
                : <MDBRow></MDBRow>
            }
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
      </div >
    </React.Fragment >
  )
}

export default Facilities
