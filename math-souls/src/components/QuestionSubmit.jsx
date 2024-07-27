// src/components/QuestionSubmit.jsx
import React from 'react';
import { Button } from '@mui/material';

const QuestionSubmit = ({ handleSubmit }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
  >
    Submit Answer
  </Button>
);

export default QuestionSubmit;
