import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBIcon, MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { GoogleMap, DirectionsRenderer, DirectionsService, useLoadScript, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import '../styles/styles.css';
import mapStyles from '../styles/mapStyles';
import { LanguageContext } from '../contexts/LanguageContext';

const googleMapsLibraries = ["places"]
const mapContainerStyle = {
  width: "100%",
  height: "85vh"
}
const options = {
  styles: mapStyles
}

const Facilities = () => {
  const loc = useLocation();
  const keywords = loc.state ? loc.state.split(' ') : null

  const [status, setStatus] = useState("SUCCESS");
  const [location, setLocation] = useState({});
  const dataLoaded = useRef(false);

  const fetchLocation = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/location`
      const response = await axios.get(url);
      if (response.status == 200) {
        const location_data = response.data;
        setLocation(location_data)
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
        const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${location.lat},${location.lng}`
        const response = await axios.get(url);
        if (response.status == 200) {
          const reverse_geocode_data = response.data["results"][0]["locations"][0];
          setReverseGeocode(reverse_geocode_data)
          setStatus("SUCCESS")
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        setStatus("ERROR")
      }
    }
  }

  const [nearestHospitals, setNearestHospitals] = useState([]);
  const previousNearestHospitals = useRef([]);

  const [sortBools, setSortBools] = useState({
    isProminence: true,
    isKeyword: false,
  })

  const fetchNearestHospitals = async () => {
    var placesUrl = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/nearest-hospitals?lat=${location.lat}&lng=${location.lng}`

    if (sortBools.isKeyword) {
      placesUrl = placesUrl + `&keyword=${keywords.join('%20OR%20')}`
    }

    if (sortBools.isProminence) {
      placesUrl = placesUrl + "&rankby=prominence"
    }

    if (status === "SUCCESS") {
      try {
        const url = placesUrl
        const response = await axios.get(url);
        if (response.status == 200) {
          let nearest_hospitals = response.data["results"];
          nearest_hospitals = nearest_hospitals.filter(function (obj) {
            return obj.name.toLowerCase().indexOf("veterinary") === -1
          })
          console.log(nearest_hospitals)
          if (nearest_hospitals != nearestHospitals) {
            setNearestHospitals(nearest_hospitals)
            previousNearestHospitals.current = nearestHospitals
          }
          setStatus("SUCCESS")
        }
        else {
          let nearest_hospitals = response.data["results"];
          nearest_hospitals = nearest_hospitals.filter(function (obj) {
            return obj.name.toLowerCase().indexOf("veterinary") === -1
          })
          console.log(JSON.stringify(nearest_hospitals))
          if (nearest_hospitals != nearestHospitals) {
            setNearestHospitals(nearest_hospitals)
            previousNearestHospitals.current = nearestHospitals
          }
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

  const [targetLocation, setTargetLocation] = useState({});
  const [direction, setDirection] = useState({
    response: null,
    travelMode: 'WALKING',
    distance: 'NA',
    origin: '',
    destination: ''
  });

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        const distance = response['routes'][0]['legs'][0]['distance']['text'];
        setDirection({ ...direction, distance: distance, response: response })
      } else {
        console.log('response: ', response)
      }
    }
  }

  const handleCardClick = (e) => {
    e.preventDefault();
    const active = document.querySelector('.btn-info');
    if (active) {
      active.classList.remove('btn-info');
      active.classList.add('btn-light');
    }
    e.target.classList.remove('btn-light');
    e.target.classList.toggle('btn-info');
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
  }

  const handleBtnClick = (e) => {
    e.preventDefault();
    const active = document.querySelector('.btn-success');
    if (active) {
      active.classList.remove('btn-success');
      active.classList.add('btn-primary');
    }
    e.target.classList.remove('btn-primary');
    e.target.classList.toggle('btn-success');
  }

  const sortByList = () => {
    const newValue = !sortBools.isProminence
    setSortBools({ ...sortBools, isProminence: newValue })
  }

  const sortByKeyword = () => {
    const newValue = !sortBools.isKeyword
    setSortBools({ ...sortBools, isKeyword: newValue })
  }

  useEffect(() => {
    // console.log(targetLocation);
    // console.log(direction);
    // console.log(travelMode);
    if (location && !dataLoaded.current) {
      fetchLocation();
      findFacilities();
    }

    previousNearestHospitals.current = nearestHospitals
    // fetchNearestHospitals();
  }, [location, targetLocation, direction, nearestHospitals, sortBools]);

  const navigate = useNavigate();

  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <div className='mt-3 mx-4' style={{ width: '100%', marginBottom: '-2.3em' }}>
        <MDBRow>
          <MDBCol md='4'>
            <MDBRow>
              <MDBCard className='px-0 pt-0 pb-0'>
                <MDBCardHeader className='px-3 text-uppercase text-left' style={{ fontWeight: 'bold' }}>
                  <MDBRow>
                    <MDBCol style={{ fontSize: '1.12em' }}>
                      <MDBIcon fas icon="map-marker-alt" /> {language === "PH" ? "Iyong lokasyon" : "Current Location"}
                    </MDBCol>
                    <MDBCol size='4' className='mx-0'>
                      <MDBBtn color='dark' className='py-1 px-2' onClick={() => navigate(-1)}>
                        <span style={{ fontSize: '1em' }}><MDBIcon fas icon="arrow-left" /> {language === "PH" ? "Bumalik" : "Go back"}</span>
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardHeader>
                {
                  Object.keys(location).length === 0 ?
                    <MDBRow className='m-4'>
                      <MDBCardTitle className='text-uppercase py-2'>{language === "PH" ? "Hinahanap ang lokasyon..." : "Finding location..."}</MDBCardTitle>
                      <MDBContainer>
                        <MDBSpinner className='mx-2' color='info'>
                          <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                      </MDBContainer>
                    </MDBRow>
                    :
                    <MDBCardBody className='text-left py-3 px-3'>
                      <MDBCardTitle className='text-uppercase'>{reverseGeocode['street']}</MDBCardTitle>
                      <MDBCardText className='text-muted' style={{ fontSize: '0.75em' }}>
                        LAT: {location.lat}??&nbsp;&nbsp;&nbsp;LNG: {location.lng}??
                      </MDBCardText>
                      <MDBCardSubTitle style={{ fontSize: '1em' }}>
                        {reverseGeocode['street']} {reverseGeocode['adminArea6']} {reverseGeocode['adminArea5']} {reverseGeocode['adminArea4']} {reverseGeocode['adminArea3']} {reverseGeocode['adminArea1']} {reverseGeocode['postalCode']}
                      </MDBCardSubTitle>
                      <MDBRow>
                        <div style={{ lineHeight: '1' }}>
                          <MDBRow className='my-1'>
                            <MDBCol size='7'>
                              <span style={{ fontSize: '0.8em' }}><span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{language === "PH" ? "PAGLALAKBAY" : "TRAVEL MODE"}:</span> {direction.travelMode}</span> <br />
                            </MDBCol>
                            <MDBCol>
                              <span style={{ fontSize: '0.8em' }}><span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{language === "PH" ? "LAYO" : "DISTANCE"}:</span> {direction.distance}</span> <br />
                            </MDBCol>
                          </MDBRow>
                        </div>
                        <MDBCol style={{ display: 'flex', flexFlow: 'wrap', }}>
                          <MDBCard className='btn-success travelMode-btn p-2 text-center' style={{ borderRadius: '5px' }} onClick={(e) => { setDirection({ ...direction, travelMode: 'WALKING' }); handleBtnClick(e); }}><MDBIcon flat fas icon="walking" onClick={(e) => e.preventDefault()} style={{ pointerEvents: 'none' }} /></MDBCard>&nbsp;
                          <MDBCard className='btn-primary travelMode-btn p-2 text-center' style={{ borderRadius: '5px' }} onClick={(e) => { setDirection({ ...direction, travelMode: 'BICYCLING' }); handleBtnClick(e); }}><MDBIcon fas icon="biking" onClick={(e) => e.preventDefault()} style={{ pointerEvents: 'none' }} /></MDBCard>&nbsp;
                          <MDBCard className='btn-primary travelMode-btn p-2 text-center' style={{ borderRadius: '5px' }} onClick={(e) => { setDirection({ ...direction, travelMode: 'DRIVING' }); handleBtnClick(e); }}><MDBIcon fas icon="car-side" onClick={(e) => e.preventDefault()} style={{ pointerEvents: 'none' }} /></MDBCard>&nbsp;
                          <MDBCard className='btn-primary travelMode-btn p-2 text-center' style={{ borderRadius: '5px' }} onClick={(e) => { setDirection({ ...direction, travelMode: 'TRANSIT' }); handleBtnClick(e); }}><MDBIcon fas icon="train" onClick={(e) => e.preventDefault()} style={{ pointerEvents: 'none' }} /></MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                }
                {
                  nearestHospitals.length != 0 ?
                    <MDBRow className='px-2 m-0'>
                      <MDBRow className='px-1 py-0' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <strong className='pl-3' style={{ textAlign: 'left', fontSize: '1em' }}>{language === "PH" ? "MALAPIT NA MGA PASILIDAD" : "NEARBY FACILITIES"}:</strong>
                      </MDBRow>
                      <MDBRow>
                        {keywords ? <MDBCol>
                          <MDBCard className='py-2 px-3 mx-1' onClick={() => { sortByKeyword(); fetchNearestHospitals(); }}>{sortBools.isKeyword ? <MDBIcon onClick={(e) => e.preventDefault()} fas icon="book" /> : <MDBIcon onClick={(e) => e.preventDefault()} fas icon="globe-europe" />}</MDBCard>
                          <span style={{ fontSize: '0.65em' }}>{sortBools.isKeyword ? "SPECIALIZED" : "GENERAL"}</span>
                        </MDBCol> : <></>}
                        <MDBCol>
                          <MDBCard className='py-2 px-3 mx-1' onClick={() => { sortByList(); fetchNearestHospitals(); }}>{sortBools.isProminence ? <MDBIcon onClick={(e) => e.preventDefault()} fas icon="star" /> : <MDBIcon onClick={(e) => e.preventDefault()} fas icon="location-arrow" />}</MDBCard>
                          <span style={{ fontSize: '0.65em' }}>{sortBools.isProminence ? "PROMINENCE" : "DISTANCE"}</span>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow id='hospital-list' className='pl-0 pr-1 m-0' style={{ height: '28vh', overflowY: 'scroll', marginTop: '0.5em', fontSize: '1em' }}>
                        {
                          previousNearestHospitals.current.length != 0 ?
                            <div>
                              {previousNearestHospitals.current?.map((item) => (
                                <MDBCard className='btn-light' style={{ paddingLeft: '1.2em', paddingRight: '1.2em', paddingTop: '1em', paddingBottom: '1em', marginBottom: '0.3em', marginTop: '0.3em' }} key={item.name} onClick={handleCardClick} value={[item.geometry.location.lat, item.geometry.location.lng]}>
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
                                      <MDBRow style={{ fontSize: '0.8em' }}>
                                        LAT: {item.geometry.location.lat}??&nbsp;&nbsp;&nbsp;LNG: {item.geometry.location.lng}??
                                      </MDBRow>
                                    </MDBCol>
                                  </MDBRow>
                                  {/* {item.business_status}: {item.opening_hours} <br /> */}
                                  {/* {item.formatted_phone_number} */}
                                </MDBCard>
                              ))}
                            </div>
                            : <div>
                              {nearestHospitals?.map((item) => (
                                <MDBCard className='btn-light' style={{ paddingLeft: '1.2em', paddingRight: '1.2em', paddingTop: '1em', paddingBottom: '1em', marginBottom: '0.3em', marginTop: '0.3em' }} key={item.name} onClick={handleCardClick} value={[item.geometry.location.lat, item.geometry.location.lng]}>
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
                                      <MDBRow style={{ fontSize: '0.8em' }}>
                                        LAT: {item.geometry.location.lat}??&nbsp;&nbsp;&nbsp;LNG: {item.geometry.location.lng}??
                                      </MDBRow>
                                    </MDBCol>
                                  </MDBRow>
                                  {/* {item.business_status}: {item.opening_hours} <br /> */}
                                  {/* {item.formatted_phone_number} */}
                                </MDBCard>
                              ))}
                            </div>
                        }
                      </MDBRow>
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
              </MDBCard>
            </MDBRow>
          </MDBCol>
          <MDBCol md='8' className='p-0'>
            <MDBCard style={{ width: '100%', height: '100%' }}>
              {
                isLoaded ? <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location}
                  options={options}
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
                        travelMode: direction.travelMode
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
