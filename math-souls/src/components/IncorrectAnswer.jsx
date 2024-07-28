// src/components/IncorrectAnswer.jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import './transition.css'


const IncorrectAnswer = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000); // 2 seconds
  
    return () => clearTimeout(timer);
  }, []);
  const messages = [
    "Thy path is misguided.",
    "A mistake hath been made.",
    "Alas, thy answer is wrong.",
    "Thou hast erred.",
    "Incorrect, try again.",
    "This is not thy destiny.",
    "A miscalculation, indeed.",
    "Nay, that is not correct.",
    "Thy response is false.",
    "Erroneous thou art.",
    "Thou hast been led astray.",
    "An error in judgment.",
    "Thy answer is flawed.",
    "A grievous error.",
    "Thy conclusion is false.",
    "A false step, indeed.",
    "Thou hast missed the mark.",
    "A misstep on thy journey.",
    "Thou art mistaken.",
    "Thy solution is incorrect."
  ];
  

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <Typography variant="h5" component="h2" color="red"sx={{paddingBottom: '25px',fontFamily: '"EB Garamond", serif'}}className={`fade-in ${visible ? 'visible' : ''}`}>
      {randomMessage}
    </Typography>
  );
};

export default IncorrectAnswer;
