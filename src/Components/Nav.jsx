import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  let userid, logintime, role; // Move outside the if block



  const fetchCurrentTime1 = () => {
    const now = new Date();
    const formattedDateTime1 = now.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return formattedDateTime1;
  };
  const currentTime = fetchCurrentTime1();
  const userString = localStorage.getItem('user');
  if (userString) {
    const userObject = JSON.parse(userString);
    // Access the user id and assign it to the userid variable
    userid = userObject.id;
    // logintime = userObject.logintime;
    role = userObject.roleid;

  }

  const fetchData = async () => {
    try {
      if (userString) {
        const punchin = localStorage.getItem('punchin');

        const userObject = JSON.parse(punchin);
        logintime = userObject.logintime;

        await handleLogout();
        localStorage.removeItem('user');
        localStorage.removeItem('punchin');
        

        navigate('/login');
      } else {
        console.error('user not login', userString);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.put(`${process.env.VITE_APP_API_ADDRESS}/logout`, {
        userid: userid,
        logouttime: currentTime,
        logintime: logintime,
      });

      if (response.status === 200) {
        // Successful logout
        // navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle other errors, display error message, etc.
    }
  };


  return (
    <nav >
      <div >
        <div >
          <ul className="Nav-header">
            <li><img alt="logo" className="logo " src="https://play-lh.googleusercontent.com/4pPFZhXyGNov_2xXfNsokIWqAwRhh-Mu-QtQrD5Zcl8p0Z1F0aoYhvEvu_nIm2bJFWo=w240-h480-rw" />
            </li>
            <li><h2 className='h2-main'>Load Match</h2></li>
          </ul>
        </div>
        <div>
          {role === 'Manager' ? (<ul className="Nav-ul Nav-right">
            <li><Link to="/adminhome">Home</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/workday">working Days</Link></li>
            <li> <Link onClick={fetchData} to="/login">Logout</Link></li>
          </ul>
          ) : role === 'Employee' ? (<ul className="Nav-ul">
            <li></li>
            
          </ul>
          ) : (
            <ul className="Nav-ul Nav-right">
              <li><Link to="/login">Login</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>


    // <div>

    //   {auth ? <ul className="Nav-ul">
    //     <li><Link to="/">Dashboard</Link></li>
    //     <li><Link to="/">Order Details</Link></li>
    //     <li><Link to="/">Enquiry</Link></li>
    //     <li><Link to="/">Plsaced Vehicle</Link></li>
    //     <li><Link to="/">Quote</Link></li>
    //     <li><Link to="/">Vechicle Search </Link></li>
    //     <li><Link to="/">Rate Confirmed</Link></li>
    //     <li><Link to="/">Unplaced Orders</Link></li>
    //     <li> <Link onClick={fetchData} to="/login">Logout</Link></li>
    //   </ul>
    //     :
    //     <ul className="Nav-ul Nav-right">
    //       <li><Link to="/login">Login</Link></li>
    //     </ul>
    //   }
    // </div>
  );
};

export default Nav;