import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';



const Logout = () => {



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
    const navigate = useNavigate();
    let userid, logintime; // Move outside the if block

    const userString = localStorage.getItem('user');
    if (userString) {
        const userObject = JSON.parse(userString);
        // Access the user id and assign it to the userid variable
        userid = userObject.id;
       // logintime = userObject.logintime;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {

                if (userString) {
                    const punchin = localStorage.getItem('punchin');

                    const userObject = JSON.parse(punchin);
                    logintime = userObject.logintime;
                    await handleLogout();
                    localStorage.removeItem('user','punchin');
                    navigate('/login');
                } else {
                    console.error('user not login', userString);
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
         console.warn(userid, logintime);
        try {
            const response = await axios.put(`${process.env.VITE_APP_API_ADDRESS}/logout`, {
                userid: userid,
                logouttime: currentTime,
                logintime: logintime,
                date : date,
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
        <div>
            <h2>Logout Page</h2>
        </div>
    );
};

export default Logout;
