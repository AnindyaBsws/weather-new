import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Gauge = ({ value, label }) => {
  return (
    <div className="gauge">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, ${value / 100})`,
          textColor: '#fff',
          trailColor: '#d6d6d6',
        })}
      />
      <div className="gauge-label">{label}</div>
    </div>
  );
};

export default Gauge;