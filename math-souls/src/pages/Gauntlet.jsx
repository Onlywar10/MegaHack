import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

import { supabase } from "../supabase";
import "./Gauntlet.css";

const Gauntlet = ({ setUserUpdate }) => {
  // list of quips
  const quipList = [
    "You've come a far way, traveler.",
    "Focus on what is in front of you.",
    "Don't turn back now.",
    "Many have fallen trying to reach where you are now.",
    "Never surrender.",
    "Self doubt is the greatest enemy.",
    "Don't underestimate yourself.",
  ];

  // player health states
  const [playerHealth, setPlayerHealth] = useState(3);
  const [playerHealthTracker, setPlayerHealthTracker] = useState([]);

  // boss health states
  const [bossHealth, setBossHealth] = useState(100);

  // question states
  const [gauntletQuestion, setGauntletQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState("");
  const [questionComplete, setQuestionComplete] = useState(false);
  const [questionCorrect, setQuestionCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [defeatedMonster, setDefeatedMonster] = useState(false);
  const [playerLost, setPlayerLost] = useState(false);

  // quips for fun
  const [quip, setQuip] = useState(quipList[0]);

  let { category } = useParams();

  const fetchGauntletQuestion = () => {
    axios
      .get("http://127.0.0.1:5000/question/?category=" + category)
      .then((res) => {
        console.log(res.data);
        setGauntletQuestion(res.data);
      });
  };

  const checkAnswer = () => {
    if (userAnswer.trim() == "") {
      alert("Answer box is empty!");
    } else {
      if (userAnswer.trim() == gauntletQuestion.solution.trim()) {
        if (bossHealth - 10 == 0) {
          setGameOver(true);
          setDefeatedMonster(true);
        } else {
          setBossHealth(bossHealth - 10);
          setQuestionComplete(true);
          setQuestionCorrect(true);
        }
      } else {
        // set player lives
        const newPlayerHealth = playerHealthTracker;
        newPlayerHealth.pop();
        setPlayerHealthTracker(newPlayerHealth);
        if (playerHealthTracker.length == 0) {
          setGameOver(true);
          setPlayerLost(true);
        }

        // Reset bools
        setQuestionComplete(true);
        setQuestionCorrect(false);
      }
    }
  };

  const checkAnswerKeyDown = () => {
    if (event.key == "Enter") {
      if (userAnswer.trim() == "") {
        alert("Answer box is empty!");
      } else {
        if (
          userAnswer.trim() == gauntletQuestion.solution.trim() &&
          questionComplete == false
        ) {
          setBossHealth(bossHealth - 10);
          questionComplete(true);
          setUserAnswer("");
        } else {
          nextQuestion();
        }
      }
    }
  };

  const nextQuestion = () => {
    setUserAnswer("");
    fetchGauntletQuestion();
    setQuestionComplete(false);
    setQuestionCorrect(false);
    updateQuip();
  };

  const updateQuip = () => {
    let newQuip = quipList[Math.floor(Math.random() * quipList.length)];
    setQuip(newQuip);
  };

  useEffect(() => {
    fetchGauntletQuestion();

    // setting player health
    var hearts = [];
    for (let i = 0; i < playerHealth; i++) {
      hearts.push(i);
    }
    setPlayerHealthTracker(hearts);
  }, []);

  return (
    <div className="gauntlet-page-container">
      {!gameOver ? (
        <>
          <div className="gaunlet-question-container">
            <div className="gauntlet-question">{gauntletQuestion.problem}</div>
            <div className="gauntlet-question-type">
              {gauntletQuestion.type}
            </div>
            <input
              type="text"
              className="gauntlet-question-input"
              value={userAnswer}
              onChange={(event) => setUserAnswer(event.target.value)}
              onKeyDown={checkAnswerKeyDown}
            />
            <div className="gauntlet-solution">
              {questionComplete && questionCorrect && "Correct!"}
              {questionComplete &&
                !questionCorrect &&
                "Incorrect! Answer was: " + gauntletQuestion.solution}{" "}
              {!questionComplete && !questionCorrect && quip}
            </div>
            {!questionComplete ? (
              <button className="gauntlet-submit" onClick={checkAnswer}>
                Check Answer
              </button>
            ) : (
              <button className="gauntlet-submit" onClick={nextQuestion}>
                Next Question
              </button>
            )}
          </div>
          <div className="gauntlet-boss-container">
            <div className="gauntlet-boss-name">
              {category == "basic_math" && "The Fundamental Fury"}
            </div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={bossHealth}
                sx={{
                  backgroundColor: "gray",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "red",
                  },
                }}
              />
            </Box>
          </div>
          <div className="gauntlet-player-health">
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
        </>
      ) : (
        <div
          style={{
            color: "white",
          }}
        >
          {playerLost && <div>You have fallen.</div>}
          {defeatedMonster && <div>Monster felled.</div>}
        </div>
      )}
    </div>
  );
};

export default Gauntlet;
