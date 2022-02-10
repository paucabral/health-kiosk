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
  MDBCollapse
} from 'mdb-react-ui-kit';

const Navigation = () => {
  const [showNavColor, setShowNavColor] = useState(false);
  const [isActiveHome, setActiveHome] = useState(true);
  const [isActiveFeatures, setActiveFeatures] = useState(false);
  const [isActiveAbout, setActiveAbout] = useState(false);

  const handleToggle = (item) => {
    if (item === "home") {
      setActiveHome(true);
      setActiveFeatures(false);
      setActiveAbout(false);
    }
    else if (item === "features") {
      setActiveHome(false);
      setActiveFeatures(true);
      setActiveAbout(false);
    }
    else {
      setActiveHome(false);
      setActiveFeatures(false);
      setActiveAbout(true);
    }
  };

  return (
    <React.Fragment>
      <MDBNavbar expand='lg' dark bgColor='info'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
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
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className={isActiveHome ? "active" : null} onClick={() => handleToggle("home")}>
                <MDBNavbarLink aria-current='page' href='#'>Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className={isActiveFeatures ? "active" : null} onClick={() => handleToggle("features")}>
                <MDBNavbarLink href='#'>Features</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className={isActiveAbout ? "active" : null} onClick={() => handleToggle("about")}>
                <MDBNavbarLink href='#'>About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </React.Fragment>
  )
}

export default Navigation