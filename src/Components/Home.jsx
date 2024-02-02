import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [logintime, setLogintime] = useState('');
  const [userid, setUserid] = useState('');
  const navigate = useNavigate();
  let usertime;




  const fetchCurrentTime = () => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return formattedDateTime;
  };
  const currentTime = fetchCurrentTime();

  useEffect(() => {
    // Fetch user data from localStorage
    const userString = localStorage.getItem('user');
    let role;

    if (userString) {
      const userObject = JSON.parse(userString);
      setUsername(userObject.name);
      setLogintime(userObject.logintime);
      setUserid(userObject.id);
      role = userObject.roleid;
      if (role === 'Manager') {
        fetchDataFromApi();

        navigate('/adminhome');
      }
      //console.warn(userObject.id,userObject)
      // Call fetchDataFromApi only if userid is available
      if (userObject.id) {
        fetchDataFromApi();

      } else {
        window.location.reload();

      }


    }
  }, [userid]);


  const getCurrentDateTime = () => {
    const now = new Date();

    // Extract year, month, and day components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    // Combine components into 'YYYY-MM-DD' format
    const formattedDateTime = `${year}-${month}-${day}`;

    return formattedDateTime;
  };

  const currentdate = getCurrentDateTime();

  const fetchDataFromApi = async () => {
    try {
      // console.warn(userid, currentdate);
      const response = await axios.post(`${process.env.VITE_APP_API_ADDRESS}/user_intime`, {
        userid: userid,
        date: currentdate,
      });

      if (response.data.result === 'no data') {
        console.warn("no data")
        // alert("Today, no user logintime found..!");
      } else if (response.data && response.data.punchin) {
        const userData = response.data.punchin.logintime;
        localStorage.setItem("punchin", JSON.stringify(response.data.punchin));


        setData(userData);
        usertime = userData;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // if (userString) {
      await handleLogout();
      localStorage.removeItem('user');
      localStorage.removeItem('punchin');

      // navigate('/logout');
      // } else {
      //   console.error('user not login', userString);
      //  }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.put(`${process.env.VITE_APP_API_ADDRESS}/logout`, {
        userid: userid,
        logouttime: currentTime,
        logintime: data,
      });

      if (response.status === 200) {
        // Successful logout
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle other errors, display error message, etc.
    }
  };

  return (
    // <div className='app'>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <h3>
    //       Welcome, {username}. Your today's attendance time is {data}.
    //     </h3>
    //   )}
    // </div>
    <div className="App">
      <div className="login-card-container">

        <div className="login-card" >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <h3>
              Welcome, {username}. Your today's attendance time is {data}.
            </h3>
          )}


          <button onClick={logout} className="login-button">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;
