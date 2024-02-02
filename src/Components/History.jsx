import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [todayAttendanceData, setTodayAttendanceData] = useState([]);
  const [monthlyReportData, setMonthlyReportData] = useState([]);
  const [employeename, setEmployeeName] = useState();
  const [currentDate, setCurrentDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const totalPresentDays = monthlyReportData.reduce((sum, employee) => sum + employee.presentdays, 0);
  const workingday = monthlyReportData.reduce((sum, employee) => employee.workingday, 0);

  const totaldays = monthlyReportData.reduce((sum, employee) => employee.totaldays, 0);

  const date = monthlyReportData.reduce((sum, employee) => employee.date, 0);

  useEffect(() => {
    const fetchTodayAttendanceData = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_APP_API_ADDRESS}/users`); 
        const allUsers = response.data;

        // Filter users with roleid equal to 3
        const usersWithRoleId3 = allUsers.filter(user => user.roleid === 'Employee');
    
        setTodayAttendanceData(usersWithRoleId3);
      } catch (error) {
        console.error("Error fetching today's attendance data:", error);
      }
    };
    const currentDateObj = new Date();
    const formattedCurrentDate = currentDateObj.toLocaleDateString("en-GB"); 
    setCurrentDate(formattedCurrentDate);


    const monthNames = [
      "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12"
    ];
    setCurrentMonth(monthNames[currentDateObj.getMonth()]);
    setCurrentYear(currentDateObj.getFullYear());

    fetchTodayAttendanceData();
  }, []); 
 


  const handleUserSelection = async (employee) => {
    console.log('Selected User:', employee);
    const empid = employee.id;

    const month = currentMonth;
    console.warn(month)
    setEmployeeName(employee.name)
    try {
      const response = await axios.get(`${process.env.VITE_APP_API_ADDRESS}/get-info/${empid}/${month}`); 
     
      setMonthlyReportData(response.data);
   

    } catch (error) {
      console.error("Error fetching monthly report data:", error);
    }

   
  };
  return (
    <div className="">
      <div className="history-card-container1">
        <div className="history-card2">
          <h3>employee Name </h3>

          <table>
            <thead>
              <tr>
                <th>Emp Name</th>

              </tr>
            </thead>
            <tbody>
              {todayAttendanceData.map((employee, index) => (
                <tr key={index} onClick={() => handleUserSelection(employee)}>
                  <td>{employee.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      <div className="history-card-container">
        <div className="history-card">
          <h3>Employee : {employeename} </h3>
          <div className="history-card1">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Absent</th>
                  <th>Present</th>
                  <th>Working Days</th>
                  <th>Total Days</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{date}</td>
                  <td>{workingday - totalPresentDays}</td>
                  <td>{totalPresentDays}</td>
                  <td>{workingday}</td>
                  <td>{totaldays}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
