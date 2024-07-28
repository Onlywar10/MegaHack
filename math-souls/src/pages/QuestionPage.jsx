import React, { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Question from '../components/Question';
import QuestionInput from '../components/QuestionInput';
import QuestionSubmit from '../components/QuestionSubmit';
import CorrectAnswer from '../components/CorrectAnswer';
import IncorrectAnswer from '../components/IncorrectAnswer';
import ButtonPressSound from '../assets/ButtonPress.mp3';
import './QuestionPage.css'; // Import the CSS file
import { supabase } from '../supabase.js';

const QuestionPage = () => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // State to track answer correctness
  const [correctAnswer, setCorrectAnswer] = useState(null); // State to store correct answer
  const [submitDisabled, setSubmitDisabled] = useState(false); // State to track submit button disabled state
  const [visible, setVisible] = useState(false); // State to handle visibility
  const [algebraDefeated, setAlgebraDefeated] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    checkAlgebraDefeated();
    if(!algebraDefeated){
      console.log("NOT DEFEATED");
    }
    const fetchQuestion = async () => {
      try {
        const response = await axios.get('http://localhost:5000/question/', {
          params: { category: category || 'basic_math' },
        });
        setQuestion(response.data.problem);
        setCorrectAnswer(parseInt(response.data.solution, 10));
        setQuestionId(response.data.id); // Assume the response includes a question ID
      } catch (err) {
      }
    };
    
    fetchQuestion();
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, [category]);
  
  const checkAlgebraDefeated = async () => {
      const userID = localStorage.getItem("userID");
      const { data: userData, error: fetchError } = await supabase
        .from('Users')
        .select('algebraDefeated')
        .eq('userID', userID)
        .single();
  };
  const handleSubmit = () => {
    const noWhiteSpaceLowerCase = userInput.replace(/\s+/g, '').toLowerCase();
    console.log("Submitted Answer:", noWhiteSpaceLowerCase);
    const userInputValue = parseInt(noWhiteSpaceLowerCase, 10);
    if (userInputValue === correctAnswer) {
      console.log("Correct");
      setIsCorrect(true);
      updateSouls();
    } else {
      console.log("Incorrect");
      setIsCorrect(false);
    }
    const audio = new Audio(ButtonPressSound);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });

    setSubmitDisabled(true);
  };

  const updateSouls = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const { data: userData, error: fetchError } = await supabase
        .from('Users')
        .select('souls')
        .eq('userID', userID)
        .single();

      if (fetchError) throw fetchError;

      const currentSouls = userData.souls;
      const newSoulsCount = parseInt(currentSouls) + 1;
      const { error: updateError } = await supabase
        .from('Users')
        .update({ souls: newSoulsCount })
        .eq('userID', userID);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error updating souls:', error);
    }
  };

  const handleMoveToMenu = () => {
    console.log("Move to Menu clicked");
    setSubmitDisabled(false); // Re-enable submit button
  };

  const handleContinueConquering = () => {
    console.log("Continue Conquering clicked");
    setSubmitDisabled(false); // Re-enable submit button
    window.location.reload();
  };

  return (
    <Container maxWidth="sm" className="full-height-center">
      <div className={`fade-in ${visible ? 'visible' : ''}`}>
        <Question setCorrectAnswer={setCorrectAnswer} />
        <QuestionInput userInput={userInput} setUserInput={setUserInput} />
        <Box display="flex" justifyContent="center" mt={2}>
          <QuestionSubmit handleSubmit={handleSubmit} disabled={submitDisabled} />
        </Box>
      </div>
  
      {isCorrect === true && <CorrectAnswer />}
      {isCorrect === false && <IncorrectAnswer />}
      {(isCorrect === true || isCorrect === false) && (
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleMoveToMenu}
            sx={{
              color: 'darkred',
              backgroundColor: 'gray',
              border: '2px solid black' 
            }}
          >
            Move to Menu
          </Button>
          <Button
            variant="contained"
            onClick={handleContinueConquering}
            sx={{
              color: 'darkred',
              backgroundColor: 'gray',
              border: '10px blue'
            }}
          >
            Continue Conquering
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default QuestionPage;
