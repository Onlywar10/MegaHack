// src/components/QuestionInput.jsx
import React from 'react';
import { TextField } from '@mui/material';

const QuestionInput = ({ userInput, setUserInput }) => (
  <TextField
    fullWidth
    margin="normal"
    label="Your Answer"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
  />
);

export default QuestionInput;
