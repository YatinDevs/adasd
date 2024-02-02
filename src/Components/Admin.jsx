import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { fetchCurrentTime } from './Nav';

const AdminForm = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [punchdata, setPanchData] = useState([]);
  const [punchinuser, setPanchinuser] = useState([]);
  // Retrieve the user information string from localStorage
  const userString = localStorage.getItem('user');

  // Parse the JSON string to get the user object
  const userObject = JSON.parse(userString);

  // Access the user id and assign it to the userid variable
  const userid = userObject && userObject.id ? userObject.id : null;

  // Now, you can use the userid variable in your code
 //console.log('User ID:', userid);

 const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const currentdate = getCurrentDateTime();
  useEffect(() => {
   // fetchAttendanceData();
    fetchPuncheData();
  }, []);

 

  //localStorage.setItem("local", JSON.stringify(punchinuser));
  const fetchPuncheData = async () => {
    try {
      const responsein = await axios.post(`${process.env.VITE_APP_API_ADDRESS}/user_intime`, {

        userid: userid,
        date: currentdate

      });
      const responseout = await axios.post(`${process.env.VITE_APP_API_ADDRESS}/user_outtime`, {

        userid: userid,
        date: currentdate

      });
      const userData = responsein.data.punchin;
      const userData2 = responseout.data.punchin;

      setPanchinuser(userData);
      setPanchData(userData2);
   // console.warn(userData,userData2)
    } catch (error) {
      console.error('Error fetching Punch data:', error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_APP_API_ADDRESS}/users`);
     // const response1 = await axios.get('http://localhost:3000/times');
      //console.warn(response1);

      setAttendanceData(response.data);
      //setPanchData(response1.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };


  return (
    <div>
      <main className='App' >
        <h2 align = 'center'>Attendance Data</h2>
        
        <table >
          <thead>
            <tr>
              <th>Index</th>
              <th>Employee ID</th>
              <th>date</th>
              <th>Punch in Time</th>
              <th>Punch out Time</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            
              <tr >
                <td>{ 1}</td>
                <td>{punchinuser.userid}</td>
                <td>{punchinuser.date}</td>
                <td>{punchinuser.logintime}</td>
                <td>{punchdata.logouttime}</td>
                <td>
                  <button>Update</button>
                </td>
              </tr>
           
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminForm;
