// src/components/QuestionSubmit.jsx
import React from 'react';
import { Button } from '@mui/material';

const QuestionSubmit = ({ handleSubmit, disabled }) => {
  return (
    <Button 
      variant="contained" 
      onClick={handleSubmit}
      disabled={disabled}
      sx={{
        color: 'darkred',
        backgroundColor: 'gray',
        fontFamily: '"EB Garamond", serif'
      }}
    >
      Submit
    </Button>
  );
};

export default QuestionSubmit;
