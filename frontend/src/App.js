import './App.css';
import Navigation from './components/Navigation'
import Triage from './components/Triage';
import { MDBContainer } from 'mdb-react-ui-kit';
import Facilities from './components/Facilities';

function App() {
  return (
    <div className="App" style={{ height: "95vh", width: "100vw" }}>
      <Navigation />
      <div className='d-flex align-items-center justify-content-center' style={{ height: "100%" }}>
        {/* <Triage /> */}
        <Facilities />
      </div>
    </div>
  );
}

export default App;
