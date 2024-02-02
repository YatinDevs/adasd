import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Nav from './Components/Nav';
import Logout from './Components/Logout';
import PrivateComponent from './Components/PrivateComponent';
import Footer from './Components/Footer';
import Admin from './Components/Admin';
import History from './Components/History';
import Workday from './Components/Workday';
import AdminHome from './Components/AdminHome';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <BrowserRouter>
      <Nav />
      <Routes>
      <Route element={<PrivateComponent />} >
      
        <Route path="/" element={<Home />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/history" element={<History />} />
        <Route path="/workday" element={<Workday />} />
        <Route path="/logout" element={<Logout />} />
       </Route>
       
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
