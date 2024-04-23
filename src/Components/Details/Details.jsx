import React, { useState,useEffect } from 'react';
import './Details.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const Toggle = () => {
  const [status, setStatus] = useState(false); // Initial status is off
  const [Temperature,setTemperature]=useState('0');




  const fetchStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/getStatus');
 // Assuming you have an endpoint to fetch the current state
      const data = await response.json();
      console.log(data)
      setStatus(data.status);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };


  const fetchTemp = async ()=>{
    try{
      const response = await fetch("http://localhost:4000/getTemp");
      const data = await response.json()
      setTemperature(data.temp)
    }
    catch (error) {
      console.error('Error fetching Temperature:', error);
    }

  }










  useEffect(() => {
    const interval = setInterval(fetchStatus, 1000); // Fetch status every second
    const interval2=setInterval(fetchTemp,1000);

    return () => clearInterval(interval,interval2); // Cleanup function to clear the interval when component unmounts
  }, []);


  // Function to handle toggling the status
  const toggleStatus = async () => {




    try {
      const resp = await fetch('http://localhost:4000/changestate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Send an empty object as the body
      });
  
      if (resp.ok) { // Check if the response is successful
        const data = await resp.json(); // Parse the response as JSON
        
      } else {
        console.error('Error:', resp.statusText); // Handle any HTTP error
      }
    } catch (error) {
      // Handle error here
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="toggle-container">
      <div className='Temp'>
        <span>Temperature: </span>
        {Temperature} °C</div>
      <div className={`status ${status=='ON' ? 'on' : 'off'}`}>{status=='ON' ? 'ON' : 'OFF'}</div>
      <div className="buttons">
        <button onClick={toggleStatus} className={`toggle-button ${status=='ON' ? 'on' : 'off'}`}>
          {status=='ON' ? 'Turn Off' : 'Turn On'}
        </button>
        {/* You can add another button here for more functionalities */}
      </div>
      <Link style={{marginTop:"30px"}} to="/Todisplay">Details&gt;</Link>

    </div>
  );
};

export default Toggle;
