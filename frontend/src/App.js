import './App.css';
import Navigation from './components/Navigation'
import Triage from './components/Triage';
import { MDBContainer } from 'mdb-react-ui-kit';
import Facilities from './Facilities';
import Maps from './Maps';

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Navigation />
      <div className='d-flex align-items-center justify-content-center' style={{ height: "90vh" }}>
        {/* <Triage /> */}
        <Facilities />
      </div>
    </div>
  );
}

export default App;
