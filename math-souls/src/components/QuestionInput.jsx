// src/components/QuestionInput.jsx
import React from 'react';
import { TextField } from '@mui/material';

const QuestionInput = ({ userInput, setUserInput }) => (
  <TextField
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // White outline
        },
        '&:hover fieldset': {
          borderColor: 'white', // White outline on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white', // White outline when focused
        },
      },
      '& .MuiInputBase-input': {
        color: 'white', // White text
      },
      '& .MuiInputLabel-root': {
        color: 'white', // White label text
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
