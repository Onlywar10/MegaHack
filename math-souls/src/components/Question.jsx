// src/components/Question.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import styles from './Question.module.css'; // Import the CSS module

const Question = ({ setCorrectAnswer }) => {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get('http://localhost:5000/question/', {
          params: { category: 'basic_math' }, // Adjust the category as needed
        });
        setQuestion(response.data.problem);
        setCorrectAnswer(parseInt(response.data.solution, 10)); // Pass the correct answer
      } catch (err) {
        setError('Failed to fetch question');
      }
    };

    fetchQuestion();
  }, [setCorrectAnswer]);

  return (
    <div className={styles.questionContainer}>
      {error ? (
        <Typography variant="h6" component="p" className={styles.error}>
          {error}
        </Typography>
      ) : (
        <Typography variant="h4" component="h1" className={styles.questionTitle}>
          {question} = ?
        </Typography>
      )}
    </div>
  );
};

export default Question;
