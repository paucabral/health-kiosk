import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import '../styles/styles.css';

const Navigation = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const [isActiveHome, setActiveHome] = useState(true);
  const [isActiveAbout, setActiveAbout] = useState(false);

  const handleToggle = (item) => {
    if (item === "home") {
      setActiveHome(true);
      setActiveAbout(false);
    }
    else {
      setActiveHome(false);
      setActiveAbout(true);
    }
  };

  return (
    <React.Fragment>
      <MDBNavbar expand='lg' dark bgColor='dark' scrolling fixed="top" >
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>HEALTH KIOSK</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav right fullWidth={false}>
              <MDBNavbarItem className={isActiveHome ? "active" : null} onClick={() => handleToggle("home")}>
                <MDBNavbarLink aria-current='page' href='/'><MDBIcon fas icon="home" /> Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className={isActiveAbout ? "active" : null} onClick={() => handleToggle("about")}>
                <MDBNavbarLink href='#'><MDBIcon fas icon="info-circle" /> About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </React.Fragment>
  )
}

export default Navigation