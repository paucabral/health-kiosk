import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Triage from './screens/Triage';
import Facilities from './screens/Facilities';

function App() {
  return (
    <div className="App" style={{ height: "95vh", width: "100vw" }}>
      <Navigation />
      <div className='d-flex align-items-center justify-content-center' style={{ height: "100%" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Triage />} />
            <Route exact path="/check" element={<Triage />} />
            <Route path="/nearest-facilities" element={<Facilities />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
