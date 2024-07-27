// src/pages/QuestionPage.jsx
import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import Question from '../components/Question';
import QuestionInput from '../components/QuestionInput';
import QuestionSubmit from '../components/QuestionSubmit';
import CorrectAnswer from '../components/CorrectAnswer';
import IncorrectAnswer from '../components/IncorrectAnswer';
import ButtonPressSound from '../assets/ButtonPress.mp3';

const QuestionPage = () => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // New state to track answer correctness
  const [correctAnswer, setCorrectAnswer] = useState(null); // New state to store correct answer

  const handleSubmit = () => {
    // Process the user input
    const noWhiteSpaceLowerCase = userInput.replace(/\s+/g, '').toLowerCase();
    console.log("Submitted Answer:", noWhiteSpaceLowerCase);
    const userInputValue = parseInt(noWhiteSpaceLowerCase, 10);
    if (userInputValue === correctAnswer) {
      console.log("Correct");
      setIsCorrect(true);
    } else {
      console.log("Incorrect");
      setIsCorrect(false);
    }
    const audio = new Audio(ButtonPressSound);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  };

  const handleMoveToMenu = () => {
    // Handle move to menu logic
    console.log("Move to Menu clicked");
  };

  const handleContinueConquering = () => {
    // Handle continue conquering logic
    console.log("Continue Conquering clicked");
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Question setCorrectAnswer={setCorrectAnswer} />
        <QuestionInput userInput={userInput} setUserInput={setUserInput} />
        <QuestionSubmit handleSubmit={handleSubmit} />
        {isCorrect === true && <CorrectAnswer />}
        {isCorrect === false && <IncorrectAnswer />}
        {(isCorrect === true || isCorrect === false) && (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleMoveToMenu}>
              Move to Menu
            </Button>
            <Button variant="contained" color="secondary" onClick={handleContinueConquering}>
              Continue Conquering
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default QuestionPage;
