// src/components/Question.jsx
import React from 'react';
import { Typography } from '@mui/material';
import styles from './Question.module.css'; // Import the CSS module

const Question = () => (
  <Typography
    variant="h4"
    component="h1"
    className={styles.questionTitle} // Apply the CSS class
  >
    14+34=?
  </Typography>
);

export default Question;
