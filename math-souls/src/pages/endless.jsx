import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import useSound from "use-sound";

import { supabase } from "../supabase";
import { deathSound } from "../assets";
import "./endless.css";

const Endless = ({ setUserUpdate }) => {
  const quipList = [
    "You've come a far way, traveler.",
    "Focus on what is in front of you.",
    "Don't turn back now.",
    "Many have fallen trying to reach where you are now.",
    "Never surrender.",
    "Self doubt is the greatest enemy.",
    "Don't underestimate yourself.",
  ];

  const [playerHealth, setPlayerHealth] = useState(3);
  const [playerHealthTracker, setPlayerHealthTracker] = useState([]);
  const [endlessQuestion, setEndlessQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState("");
  const [questionComplete, setQuestionComplete] = useState(false);
  const [questionCorrect, setQuestionCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerLost, setPlayerLost] = useState(false);
  const [score, setScore] = useState(0);
  const [quip, setQuip] = useState("");

  let { category } = useParams();
  let navigate = useNavigate();
  const [playDeathSound] = useSound(deathSound, { volume: 0.2 });

  const fetchEndlessQuestion = () => {
    axios
      .get("http://127.0.0.1:5000/question/?category=" + category)
      .then((res) => {
        setEndlessQuestion(res.data);
      });
  };

  const checkAnswer = () => {
    if (userAnswer.trim() === "") {
      alert("Answer box is empty!");
    } else {
      if (
        userAnswer.replace(/\s+/g, "") ===
        endlessQuestion.solution.replace(/\s+/g, "")
      ) {
        setQuestionComplete(true);
        setQuestionCorrect(true);
        setScore(score + 1);
      } else {
        const newPlayerHealth = playerHealthTracker;
        newPlayerHealth.pop();
        setPlayerHealthTracker(newPlayerHealth);
        if (playerHealthTracker.length === 0) {
          setGameOver(true);
          setPlayerLost(true);
          playDeathSound();
        }

        setQuestionComplete(true);
        setQuestionCorrect(false);
      }
    }
  };

  const nextQuestion = () => {
    setUserAnswer("");
    fetchEndlessQuestion();
    setQuestionComplete(false);
    setQuestionCorrect(false);
    updateQuip();
  };

  const updateQuip = () => {
    let newQuip = quipList[Math.floor(Math.random() * quipList.length)];
    setQuip(newQuip);
  };

  useEffect(() => {
    fetchEndlessQuestion();

    let hearts = [];
    for (let i = 0; i < playerHealth; i++) {
      hearts.push(i);
    }
    setPlayerHealthTracker(hearts);

    updateQuip();
  }, []);

  return (
    <div className="endless-page-container">
      {!gameOver ? (
        <>
          <div className="endless-question-container">
            <div className="endless-question">{endlessQuestion.problem}</div>
            <div className="endless-question-type">{endlessQuestion.type}</div>
            {!questionComplete ? (
              <input
                type="text"
                className="endless-question-input"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && checkAnswer()}
              />
            ) : (
              <input
                type="text"
                className="endless-question-input"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && nextQuestion()}
              />
            )}
            <div className="endless-solution">
              {questionComplete && questionCorrect && "Correct!"}
              {questionComplete &&
                !questionCorrect &&
                "Incorrect! Answer was: " + endlessQuestion.solution}
              {!questionComplete && !questionCorrect && quip}
            </div>
            {!questionComplete ? (
              <button className="endless-submit" onClick={checkAnswer}>
                Check Answer
              </button>
            ) : (
              <button className="endless-submit" onClick={nextQuestion}>
                Next Question
              </button>
            )}
          </div>
          <div className="endless-player-health">
            {playerHealthTracker.map((i, index) => {
              return (
                <FaHeart
                  key={index}
                  style={{
                    marginRight: "10px",
                  }}
                />
              );
            })}
          </div>
          <div className="endless-score">Score: {score}</div>
        </>
      ) : (
        <div className="endless-end">
          {playerLost && (
            <div className="endless-fallen">YOU HAVE FALLEN.</div>
          )}
          <button className="endless-return" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Endless;
