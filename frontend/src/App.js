import './App.css';
import Navigation from './components/Navigation'
import Triage from './components/Triage';
import { MDBContainer } from 'mdb-react-ui-kit';

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <Navigation />
      <div className='d-flex align-items-center justify-content-center' style={{ height: "90vh" }}>
        <Triage />
      </div>
    </div>
  );
}

export default App;
