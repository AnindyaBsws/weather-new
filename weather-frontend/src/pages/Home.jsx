import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gauge from '../components/Gauge';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    light: 0,
    rain: 0,
    moisture: 0,
    pressure: 0
  });
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSensorData = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/sensors/latest');
//         const status = await axios.get('http://localhost:5000/api/sensors/nodemcu-status');
//         setSensorData(res.data);
//         setConnected(status.data.connected);
//       } catch (error) {
//         setConnected(false);
//       }
//     };

//     const interval = setInterval(fetchSensorData, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="home-container">
//       <div className="status-bar">
//         <span>ID: 01</span>
//         <span className={`status ${connected ? 'online' : 'offline'}`}>{connected ? 'Online' : 'Offline'}</span>
//       </div>
//       <div className="gauges-container">
//         <Gauge value={sensorData.temperature} label="Temperature" />
//         <Gauge value={sensorData.humidity} label="Humidity" />
//         <Gauge value={sensorData.light} label="Light" />
//         <Gauge value={sensorData.rain} label="Rain" />
//         <Gauge value={sensorData.moisture} label="Soil Moisture" />
//         <Gauge value={sensorData.pressure} label="Pressure" />
//       </div>
//       <div className="button-container">
//         <button className="satellite-button" onClick={() => navigate('/satellite')}>
//           Satellite Weather Data
//         </button>
//       </div>
//       <footer id="footer" className="footer">
//         <p>Mentor's Name: Sudipta Ghosh</p>
//         <p>Project Group No.: 15</p>
//         <p>Project Group Members: Anindya Biswas, Sidam Masanta, Soumik Roy, Pritam Mondal</p>
//       </footer>
//     </div>
//   );
// };

useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/stream');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(data); // Update state with new data
    };
    return () => eventSource.close(); // Cleanup on unmount
  }, []);

  // return (
  //   <div>
  //     <h1>Sensor Dashboard</h1>
  //     <div>Temperature: {sensorData.temperature} °C</div>
  //     <div>Pressure: {sensorData.pressure} hPa</div>
  //     <div>Rain: {sensorData.rain}</div>
  //     <div>Soil Moisture: {sensorData.soilMoisture}</div>
  //     <div>Light: {sensorData.light}</div>
  //     {/* Replace with your gauge components */}
  //   </div>
  // );
  
 return (
    <div className="home-container">
      <div className="status-bar">
        <span>ID: 01</span>
        <span className={`status ${connected ? 'online' : 'offline'}`}>{connected ? 'Online' : 'Offline'}</span>
      </div>
      <div className="gauges-container">
        <Gauge value={sensorData.temperature} label="Temperature" />
        <Gauge value={sensorData.humidity} label="Humidity" />
        <Gauge value={sensorData.light} label="Light" />
        <Gauge value={sensorData.rain} label="Rain" />
        <Gauge value={sensorData.moisture} label="Soil Moisture" />
        <Gauge value={sensorData.pressure} label="Pressure" />
      </div>
      <div className="button-container">
        <button className="satellite-button" onClick={() => navigate('/satellite')}>
          Satellite Weather Data
        </button>
      </div>
      <footer id="footer" className="footer">
        <p>Mentor's Name: Sudipta Ghosh</p>
        <p>Project Group No.: 15</p>
        <p>Project Group Members: Anindya Biswas, Sidam Masanta, Soumik Roy, Pritam Mondal</p>
      </footer>
    </div>
  );



};










export default Home;
