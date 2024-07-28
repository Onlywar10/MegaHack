// src/components/CorrectAnswer.jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import './transition.css'
const CorrectAnswer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const messages = [
    "Fate smiles upon thee",
    "Thy wisdom knows no bounds",
    "Victory is thy destiny",
    "Thou hast proven thy worth",
    "A triumph of intellect",
    "The gods favor thee",
    "Thou art a true scholar",
    "Success is thine",
    "Thy mind is sharp as a blade",
    "A feat of great cleverness",
    "Thou art on the right path",
    "Wisdom guides thy way",
    "A glorious answer",
    "Thou hast prevailed",
    "Thy intellect is unmatched",
    "A wise and true solution",
    "Thy brilliance shines",
    "Thy answer is correct",
    "Thou hast achieved victory",
    "A testament to thy wisdom"
  ];
  

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <Typography variant="h5" component="h2" color="green" sx={{paddingBottom: '25px',fontFamily: '"EB Garamond", serif'}}className={`fade-in ${visible ? 'visible' : ''}`}>
      
      {randomMessage}
    </Typography>
  );
};

export default CorrectAnswer;
