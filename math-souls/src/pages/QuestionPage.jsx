import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Question from '../components/Question';
import QuestionInput from '../components/QuestionInput';
import QuestionSubmit from '../components/QuestionSubmit';
import ButtonPressSound from '../assets/ButtonPress.mp3';
const correctAns=42;
const QuestionPage = () => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    // Process the user input
    const noWhiteSpaceLowerCase = userInput.replace(/\s+/g, '').toLowerCase();
    console.log("Submitted Answer:", noWhiteSpaceLowerCase);
    const userInputValue = parseInt(noWhiteSpaceLowerCase, 10);
    if (userInputValue === correctAns) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
    const audio = new Audio(ButtonPressSound);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
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
