import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";

const AdminHome = () => {
  const [todayAttendanceData, setTodayAttendanceData] = useState([]);
  const [monthlyReportData, setMonthlyReportData] = useState([]);
  const [data, setData] = useState(null);
  const [userid, setUserid] = useState('');


  const [currentDate, setCurrentDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const totalPresentDays = monthlyReportData.reduce((sum, employee) => sum + employee.presentdays, 0);

  const totaldays = monthlyReportData.reduce((sum, employee) => employee.totaldays, 0);


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
    
    const userString = localStorage.getItem('user');
    let role;

    if (userString) {
      const userObject = JSON.parse(userString);
      setUserid(userObject.id);
      role = userObject.roleid;
     
      //console.warn(userObject.id,userObject)
      // Call fetchDataFromApi only if userid is available
      if (userObject.id) {
        fetchDataFromApi();

      } else {
        window.location.reload();

      }

     
    }
    // Function to fetch today's attendance data
    const fetchTodayAttendanceData = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_APP_API_ADDRESS}/users`); // Replace with your actual API endpoint
        const allUsers = response.data;

        // Filter users with roleid equal to 3
        const usersWithRoleId3 = allUsers.filter(user => user.roleid === 'Employee');
  //      console.warn(usersWithRoleId3);

        setTodayAttendanceData(usersWithRoleId3);
      } catch (error) {
        console.error("Error fetching today's attendance data:", error);
      }
    };
// Get current date, month, and year
    // Get current date, month, and year
    const currentDateObj = new Date();
    const formattedCurrentDate = currentDateObj.toLocaleDateString("en-GB"); // Adjust the locale as needed
    setCurrentDate(formattedCurrentDate);

    console.warn(currentDateObj.getMonth());

    const monthNames = [
      "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ];
    setCurrentMonth(monthNames[currentDateObj.getMonth()]);
    setCurrentYear(currentDateObj.getFullYear());

    // Function to fetch monthly report data
    const fetchMonthlyReportData = async () => {
      try {
        const month = currentMonth;
        const response = await axios.get(`${process.env.VITE_APP_API_ADDRESS}/get-month/${month}`);
        console.warn(response.data);
        setMonthlyReportData(response.data);
      } catch (error) {
        console.error("Error fetching monthly report data:", error);
      }
    };

    
    // Call the functions to fetch data when the component mounts
    fetchTodayAttendanceData();
    fetchMonthlyReportData();
    fetchDataFromApi();
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
      console.warn(userid, currentdate);
      const response = await axios.post(`${process.env.VITE_APP_API_ADDRESS}/user_intime`, {
        userid: userid,
        date: currentdate,
      });

      if (response.data.result === 'no data') {
        console.warn("no data")
        // alert("Today, no user logintime found..!");
      } else if (response.data && response.data.punchin) {
        const userData = response.data.punchin.logintime;
        console.warn(userData)
           localStorage.setItem("punchin",JSON.stringify(response.data.punchin));

        setData(userData);
             }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    } finally {
      //setLoading(false);
    }
  };

  // Calculate total present days for each userid
  const presentDaysByUserId = {};

  monthlyReportData.forEach((entry) => {
    const { userid, presentdays } = entry;
    presentDaysByUserId[userid] = (presentDaysByUserId[userid] || 0) + presentdays;
  });

  // Display last present days for user IDs 1 to 3
  const userIDsToDisplay = [1, 2, 3];

  return (
    <div className="">
      <div className="attend-card-container">
        <div className="attend-card">
          <h3>Attendance :  {currentDate}</h3>
          <div className="attend-card1">
            <table>
              <thead>
                <tr>
                  <th>Emp Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAttendanceData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{monthlyReportData[index]?.status === 1 ? "Present" : "Absent"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="attend-card-container">
        <div className="attend-card">
          <h3>Monthly Report: {currentMonth} - {currentYear}</h3>
          <div className="attend-card1">
            <table>
              <thead>
                <tr>
                  <th>Emp Name</th>
                  <th>Present / Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>


                  {/* <td>{totalPresentDays} / {totaldays}</td> */}
                </tr>
                {monthlyReportData.map((employee, index) => (
                  <tr key={index}>
                    <td>{todayAttendanceData[index]?.name}</td>
                    <td>{employee.presentdays} / {employee.workingday}</td>
                  </tr>
                ))}
                {/* 
                {monthlyReportData
                  .filter((employee) => userIDsToDisplay.includes(employee.userid))
                  .map((employee, index) => (
                    <tr key={index}>
                      <td>{todayAttendanceData[index]?.name}</td>
                      <td>{employee.presentdays} / {employee.workingday}</td>

                      {/* <td>{getLastPresentDays(employee.userid)} / {presentDaysByUserId[employee.userid]}</td> */}
                {/* </tr> */}
                {/* ))} */}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
