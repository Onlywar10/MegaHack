// src/components/QuestionInput.jsx
import React from 'react';
import { TextField } from '@mui/material';

const QuestionInput = ({ userInput, setUserInput }) => (
  <TextField
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'Red',
        },
        '&:hover fieldset': {
          borderColor: 'Darkred', 
        },
        '&.Mui-focused fieldset': {
          borderColor: 'Red', 
        },
      },
      '& .MuiInputBase-input': {
        color: 'gray', // White text
      },
      '& .MuiInputLabel-root': {
        color: 'gray', // White label text
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'gray', // White label text when focused
      },
    }}
    fullWidth
    margin="normal"
    label="Your Answer"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    variant="outlined" // Use outlined variant for the input field
  />
);

export default QuestionInput;
