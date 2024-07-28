// src/components/QuestionSubmit.jsx
import React from 'react';
import { Button } from '@mui/material';
import buttonBackground from '../assets/buttonBackground.png';

const QuestionSubmit = ({ handleSubmit, disabled }) => {
  return (
    <Button 
      variant="contained" 
      onClick={handleSubmit}
      disabled={disabled}
      sx={{
        color: 'darkred',
        backgroundColor: 'gray'
      }}
    >
      Submit
    </Button>
  );
};

export default QuestionSubmit;
