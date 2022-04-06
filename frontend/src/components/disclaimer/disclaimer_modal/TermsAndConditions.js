import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBFooter,
  MDBTabsLink,
} from 'mdb-react-ui-kit';

const TermsAndConditions = ({ disclaimerModal, setDisclaimerModal, toggleDisclaimerModal }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/check`;
    navigate(path);
  }

  return (
    <React.Fragment>
      <MDBModal id="" staticBackdrop scrollable='true' show={disclaimerModal} setShow={setDisclaimerModal} tabIndex='-1'>
        <MDBModalDialog centered size='xl'>
          <MDBModalContent style={{ height: '70vh' }}>
            <MDBModalHeader>
              <MDBModalTitle>Terms &amp; Conditions</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleDisclaimerModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='my-2 mr-3' style={{ textAlign: "justify", overflowY: 'auto', height: '100vh' }}>
              <MDBRow>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus aliquet ante, sed semper ligula consectetur tincidunt. Cras viverra accumsan odio a pharetra. Cras nisl dui, feugiat eget metus eu, efficitur convallis tortor. Donec ultricies massa neque, suscipit commodo lacus hendrerit a. Nulla finibus feugiat sem. Vivamus imperdiet tellus vitae tortor iaculis consequat. Ut efficitur ligula euismod quam maximus, nec imperdiet arcu aliquam. Vivamus eget tristique orci, eget egestas metus. Praesent ac massa eget sapien fringilla interdum. Sed semper neque et urna rutrum mattis. Sed sit amet magna accumsan, sagittis massa a, viverra nisl.</p>
                <p>Nulla facilisis purus sem, et pharetra ante posuere ac. Fusce blandit auctor rhoncus. Etiam eget enim at nisl rutrum dapibus. Duis elementum at augue eget imperdiet. Duis viverra placerat massa, vitae luctus nunc. Morbi aliquam porttitor velit, in pretium ex feugiat vitae. Vivamus et sapien ut sem commodo volutpat. Vivamus sit amet ornare nibh, vel elementum augue. Nullam auctor interdum vulputate. Sed laoreet diam congue, gravida felis convallis, rhoncus ex. Nunc molestie ullamcorper mauris, hendrerit imperdiet tellus accumsan vel. Nullam venenatis tempor erat ut dictum. Nulla nisi est, ultricies sed porta quis, porta congue urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                <p>Nunc id dui viverra, aliquam tellus et, sodales nisi. Maecenas vitae rhoncus massa. Nunc iaculis facilisis purus vitae scelerisque. Nulla ac consectetur nulla. Aliquam interdum mollis turpis a elementum. Aliquam mattis ligula et erat dignissim ornare. Proin ac feugiat dolor. Quisque quis purus libero. In in nunc elit. Sed sed feugiat massa, quis fringilla felis. In mattis ligula dignissim orci luctus ultrices. Donec ut orci ultrices diam imperdiet efficitur. Proin vehicula lectus a quam sodales, ac bibendum ante finibus. Cras sit amet ante dictum, pulvinar risus a, luctus velit.</p>
                <p>Aliquam erat volutpat. Sed quis augue non augue sodales faucibus. Maecenas vulputate lectus in orci placerat, id pellentesque mauris fermentum. Donec vehicula sodales arcu suscipit tempus. Aliquam augue nisi, egestas a magna ac, auctor condimentum erat. Aenean a enim sed sem ultrices posuere. Pellentesque vitae ipsum pretium, vulputate augue sed, lacinia nisi. Mauris semper tortor ac auctor fringilla. Donec non urna finibus, aliquam metus tincidunt, sodales turpis. Ut at congue nibh. Nunc egestas blandit justo, commodo pulvinar dui porttitor nec.</p>
                <p>Maecenas erat urna, aliquet at quam sed, sollicitudin rutrum sapien. Sed mattis volutpat ligula, vitae hendrerit justo cursus non. Pellentesque a luctus enim. Fusce vestibulum arcu et quam rutrum bibendum eu ut nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eleifend, ex ac eleifend mattis, urna nibh aliquet enim, ut varius orci dui varius quam. Ut eleifend non est sed consequat. Pellentesque auctor gravida felis, at semper quam posuere et. Curabitur eget tortor dui.</p>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBCol className='p-0 m-0' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <MDBBtn onClick={routeChange}>I AGREE</MDBBtn>
              </MDBCol>
              <MDBCol className='p-0 m-0' style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.85em', fontWeight: 'bold' }}>
                <MDBTabsLink style={{ textDecoration: 'underline' }} onClick={toggleDisclaimerModal}>CANCEL</MDBTabsLink>
              </MDBCol>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </React.Fragment>
  )
}

export default TermsAndConditions