
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/Sidebar';
import Overview from './Components/Overview';
import PeopleDirectory from './Components/PeopleDirectory';
import Login from "./Components/Login"
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
  
      <div>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />

        <Route path="/user" element={<Sidebar />}> 
          <Route path=""element={<Overview/>}/>
          <Route path="/user/dashboard" element={<PeopleDirectory/>}/>
        </Route>
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
