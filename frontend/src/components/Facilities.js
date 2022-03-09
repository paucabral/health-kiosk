import React, { useState, useEffect, useRef } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';
import axios from 'axios';
import { GoogleMap, DirectionsRenderer, DirectionsService, useLoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import './styles.css';

const googleMapsLibraries = ["places"]
const mapContainerStyle = {
  width: "100%",
  height: "85vh"
}

const Facilities = () => {
  const [status, setStatus] = useState("SUCCESS");

  const [location, setLocation] = useState({});

  const dataLoaded = useRef(false);

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
        dataLoaded.current = true;
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
    if (Object.keys(location).length != 0) {
      await fetchReverseGeocode();
      await fetchNearestHospitals();
    }
  }

  useEffect(() => {
    if (location && !dataLoaded.current) {
      fetchLocation();
      findFacilities();
    }
  }, [location]);

  const [targetLocation, setTargetLocation] = useState({});

  // DIRECTIONS
  const [direction, setDirection] = useState({
    response: null,
    travelMode: 'DRIVING',
    origin: '',
    destination: ''
  });

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log(response)
        setDirection({ ...direction, response: response })
      } else {
        console.log('response: ', response)
      }
    }
  }
  // END DIRECTIONS

  const handleCardClick = (e) => {
    e.preventDefault();
    const active = document.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }
    e.target.classList.toggle('active');
    const value = e.target.getAttribute('value');
    const coordinates = value.split(',');
    const target_lat = Number(coordinates[0]);
    const target_lng = Number(coordinates[1]);
    const target_location = {
      lat: target_lat,
      lng: target_lng
    };
    setTargetLocation(target_location);
    setDirection({ ...direction, origin: location, destination: targetLocation });
    console.log(direction);
  }

  useEffect(() => {
    // console.log(targetLocation);
    // console.log(direction);
  }, [targetLocation, direction]);

  return (
    <React.Fragment>
      <div className='mt-5 mx-4' style={{ width: '100%', marginBottom: '-2em' }}>
        <MDBRow>
          <MDBCol md='4'>
            <MDBRow>
              <MDBCard>
                {
                  Object.keys(location).length === 0 ?
                    <MDBRow className='m-4'>
                      <MDBCardTitle className='text-uppercase py-2'>Finding location...</MDBCardTitle>
                      <MDBContainer>
                        <MDBSpinner className='mx-2' color='info'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                      </MDBContainer>
                    </MDBRow>
                    :
                    <MDBCardBody className='text-left'>
                      <MDBCardHeader className='p-0 text-uppercase'><MDBIcon fas icon="map-marker-alt" /> Current Location</MDBCardHeader>
                      <MDBCardTitle className='text-uppercase py-2'>{reverseGeocode['street']}</MDBCardTitle>
                      <MDBCardText className='text-muted pt-2'>
                        LAT: {location.lat}°&nbsp;&nbsp;&nbsp;LNG: {location.lng}°
                      </MDBCardText>
                      <MDBCardSubTitle>
                        {reverseGeocode['street']} {reverseGeocode['adminArea6']} {reverseGeocode['adminArea5']} {reverseGeocode['adminArea4']} {reverseGeocode['adminArea3']} {reverseGeocode['adminArea1']} {reverseGeocode['postalCode']}
                      </MDBCardSubTitle>
                    </MDBCardBody>
                }
              </MDBCard>
            </MDBRow>
            {
              nearestHospitals.length != 0 ?
                <MDBRow style={{ height: '45vh', overflow: 'scroll', marginTop: '1em' }}>
                  {nearestHospitals?.map((item) => (
                    <MDBCard className='btn-light' style={{ padding: '2em', marginBottom: '1em', marginTop: '1em' }} key={item.name} onClick={handleCardClick} value={[item.geometry.location.lat, item.geometry.location.lng]}>
                      <MDBRow style={{ pointerEvents: 'none' }}>
                        <MDBCol className='text-left'>
                          <MDBRow className='font-weight-bold text-uppercase'>
                            {item.name}
                          </MDBRow>
                          <MDBRow>
                            <span style={{ marginLeft: '-1em' }}>{item.rating ? <span className='text-warning'> <MDBIcon fas icon="star" /> {item.rating} stars</span> : ''} {item.user_ratings_total ? `(${item.user_ratings_total} users)` : ''}</span>
                          </MDBRow>
                          <MDBRow>
                            {item.vicinity}
                          </MDBRow>
                          <MDBRow className='text-muted' style={{ fontSize: '0.8em' }}>
                            LAT: {item.geometry.location.lat}°&nbsp;&nbsp;&nbsp;LNG: {item.geometry.location.lng}°
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                      {/* {item.business_status}: {item.opening_hours} <br /> */}
                      {/* {item.formatted_phone_number} */}
                    </MDBCard>
                  ))}
                </MDBRow>
                :
                <MDBRow>
                  <MDBCardTitle className='text-uppercase py-2'>Finding nearest hospitals...</MDBCardTitle>
                  <MDBContainer>
                    <MDBSpinner className='mx-2' color='danger'>
                      <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                  </MDBContainer>
                </MDBRow>
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
                  <>
                    {
                      direction.response ?
                        <></>
                        :
                        <Marker position={location}>
                        </Marker>
                    }
                    <DirectionsService
                      options={{
                        destination: targetLocation,
                        origin: location,
                        travelMode: 'DRIVING'
                      }}
                      callback={directionsCallback}
                    />
                    <DirectionsRenderer options={{
                      directions: direction.response
                    }}
                      callback={handleCardClick}
                    />
                  </>
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
