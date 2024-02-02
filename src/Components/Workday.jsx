import React, { useEffect, useState } from "react";
import axios from "axios";
// const response = await axios.get('http://192.168.0.117:5000/get-update-month');


const Workday = () => {
  const [MonthlyDetailsData, setMonthlyDetailsData] = useState([]);
  const [gettotaldays, settotaldays] = useState();
  const [getworkingdays, setworkingdays] = useState();




  useEffect(() => {


    // Function to fetch monthly Details data
    const fetchMonthlyDetailsData = async () => {
      try {
        const response = await axios.get(`${process.env.VITE_APP_API_ADDRESS}/get-month`); // Replace with your actual API endpoint
        setMonthlyDetailsData(response.data);
      } catch (error) {
        console.error("Error fetching monthly Details data:", error);
      }
    };

    // Call the functions to fetch data when the component mounts

    fetchMonthlyDetailsData();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts
  const updateMonthlyDetailsData = async (employee) => {

    const totaldays = employee.total_totaldays;
    const workingdays = employee.total_workingdays;
    const month = getMonthFromDate(employee.month);
    console.warn(employee.total_totaldays);
    console.warn(month);
    console.warn(employee.total_workingdays);
    // console.warn(updatedData);
    try {
      const response = await axios.patch(`${process.env.VITE_APP_API_ADDRESS}/update-months`, {
        totaldays: totaldays, workingdays: workingdays, month: month
      });
    
      // Handle the response as needed
      console.log("Monthly details updated:", response.data);
    } catch (error) {
      console.error("Error updating monthly details:", error);
    }
    
  };

  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // getMonth() returns 0 for January, so add 1
    return month;
  };
  
  const handleTotalTotalDaysChange = (index, value) => {
    // Implement the logic to update the total_totaldays field in your state or data
    // For example, if MonthlyDetailsData is a state, you can create a copy, update the value, and set it back.
    const updatedData = [...MonthlyDetailsData];
    updatedData[index].total_totaldays = value;
    setMonthlyDetailsData(updatedData);
    // console.warn(updatedData[index].total_totaldays)
    settotaldays(updatedData[index].total_totaldays)
  };

  const handleTotalWorkingDaysChange = (index, value) => {
    // Implement the logic to update the total_workingdays field in your state or data
    const updatedData = [...MonthlyDetailsData];
    updatedData[index].total_workingdays = value;
    //setMonthlyDetailsData(updatedData);
    setworkingdays(updatedData[index].total_workingdays)
  };


  return (
    <div className="">
      <div className="attend-card-container">
        <div className="attend-card">
          <h3>Working Days</h3>
          <div className="attend-card1">
            <table>
              <thead>
                <tr>
                  <th>Month name</th>
                  <th>Total Days</th>
                  <th>Working Days</th>
                  <th>Operation</th>

                </tr>
              </thead>
              <tbody>
                {MonthlyDetailsData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.month}</td>
                    <td>
                      <div
                        contentEditable={true}
                        onBlur={(e) => handleTotalTotalDaysChange(index, e.target.innerText)}
                        dangerouslySetInnerHTML={{ __html: employee.total_totaldays }}
                      />
                    </td>
                    <td>
                      <div
                        contentEditable={true}
                        onBlur={(e) => handleTotalWorkingDaysChange(index, e.target.innerText)}
                        dangerouslySetInnerHTML={{ __html: employee.total_workingdays }}
                      />
                    </td>

                    <td>
                      <button onClick={() => updateMonthlyDetailsData(employee)} className="Workday-button">Save</button>
                    </td>
                  </tr>

                ))}
                {/* {MonthlyDetailsData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.month}</td>
                    <td><input
                      type="text"
                      name={`totalTotalDays_${index}`}
                      value={employee.total_totaldays}
                      onChange={(e) => handleTotalTotalDaysChange(index, e.target.value)}
                    /></td>
                    <td>
                      <input
                        type="text"
                        name={`totalWorkingDays_${index}`}
                        value={employee.total_workingdays}
                        onChange={(e) => handleTotalWorkingDaysChange(index, e.target.value)}
                      />
                    </td>
                  </tr>
                ))} */}

              </tbody>
            </table>
            {/* <button onClick={updateMonthlyDetailsData} className="Workday-button">Save</button> */}
          </div>
        </div>
      </div>




    </div>
  );
};

export default Workday;
