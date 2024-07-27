import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Question from '../components/Question';
import QuestionInput from '../components/QuestionInput';
import QuestionSubmit from '../components/QuestionSubmit';

const QuestionPage = () => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    console.log("Submitted Answer:", userInput);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Question />
        <QuestionInput userInput={userInput} setUserInput={setUserInput} />
        <QuestionSubmit handleSubmit={handleSubmit} />
      </Box>
    </Container>
  );
}

export default QuestionPage;
