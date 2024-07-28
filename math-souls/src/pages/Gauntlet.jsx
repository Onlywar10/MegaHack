import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import useSound from "use-sound";

import { supabase } from "../supabase";
import { deathSound, enemyFelled } from "../assets";
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
  const [quip, setQuip] = useState("");

  // Hooks
  let { category } = useParams();
  let navigate = useNavigate();
  const [playDeathSound] = useSound(deathSound, { volume: 0.2 });
  const [playVictorySound] = useSound(enemyFelled, { volume: 0.3 });

  const fetchGauntletQuestion = () => {
    axios
      .get("http://127.0.0.1:5000/question/?category=" + category)
      .then((res) => {
        setGauntletQuestion(res.data);
      });
  };

  const checkAnswer = () => {
    // console.log(userAnswer.replace(/\s+/g, ""));
    // console.log(gauntletQuestion.solution.replace(/\s+/g, ""));
    if (userAnswer.trim() == "") {
      alert("Answer box is empty!");
    } else {
      // Checking rounding error for geometry questiosn involving PI
      if (category == "geometry" && gauntletQuestion.solution.length > 5) {
        const solution =
          Math.round(
            Number(gauntletQuestion.solution.replace(/\s+/g, "")) * 100
          ) / 100;

        console.log(solution);
        console.log(Number(userAnswer));

        if (
          Number(userAnswer) >= solution + 0.2 ||
          Number(userAnswer) <= solution + 0.2
        ) {
          if (bossHealth - 10 == 0) {
            playVictorySound();
            setGameOver(true);
            setDefeatedMonster(true);
            updateSouls();
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
            playDeathSound();
          }

          // Reset bools
          setQuestionComplete(true);
          setQuestionCorrect(false);
        }
      }
      // Checking everything else
      else {
        if (
          userAnswer.replace(/\s+/g, "") ==
          gauntletQuestion.solution.replace(/\s+/g, "")
        ) {
          if (bossHealth - 10 == 0) {
            console.log("play sound");
            playVictorySound();
            setGameOver(true);
            setDefeatedMonster(true);
            updateSouls();
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
            playSound();
          }

          // Reset bools
          setQuestionComplete(true);
          setQuestionCorrect(false);
        }
      }
    }
  };

  const checkAnswerKeyDown = () => {
    if (event.key == "Enter") {
      //   console.log(userAnswer.replace(/\s+/g, ""));
      //   console.log(gauntletQuestion.solution.replace(/\s+/g, ""));
      if (userAnswer.trim() == "") {
        alert("Answer box is empty!");
      } else {
        // Checking rounding error for geometry questiosn involving PI
        if (category == "geometry" && gauntletQuestion.solution.length > 5) {
          const solution =
            Math.round(
              Number(gauntletQuestion.solution.replace(/\s+/g, "")) * 100
            ) / 100;

          console.log(solution);
          console.log(Number(userAnswer));

          if (
            Number(userAnswer) >= solution + 0.2 ||
            Number(userAnswer) <= solution + 0.2
          ) {
            if (bossHealth - 10 == 0) {
              playVictorySound();
              setGameOver(true);
              setDefeatedMonster(true);
              updateSouls();
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
              playDeathSound();
            }

            // Reset bools
            setQuestionComplete(true);
            setQuestionCorrect(false);
          }
        }
        // Checking everything else
        else {
          if (
            userAnswer.replace(/\s+/g, "") ==
            gauntletQuestion.solution.replace(/\s+/g, "")
          ) {
            if (bossHealth - 10 == 0) {
              playVictorySound();
              setGameOver(true);
              setDefeatedMonster(true);
              updateSouls();
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
              playSound();
            }

            // Reset bools
            setQuestionComplete(true);
            setQuestionCorrect(false);
          }
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

  const updateSouls = async () => {
    // fetching current souls
    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("userID", localStorage.getItem("userID"));

    var newSouls = Number(Users[0].souls);

    // Adding correct soul amount
    if (category == "basic_math") {
      newSouls = newSouls + 20;
    } else if (category == "algebra") {
      newSouls = newSouls + 30;
    } else if (category == "geometry") {
      newSouls = newSouls + 40;
    }

    // console.log(newSouls);

    const { data, error: soulsError } = await supabase
      .from("Users")
      .update({ souls: newSouls.toString() })
      .eq("userID", localStorage.getItem("userID"))
      .select();

    setUserUpdate(newSouls);
  };

  useEffect(() => {
    fetchGauntletQuestion();

    // setting player health
    var hearts = [];
    for (let i = 0; i < playerHealth; i++) {
      hearts.push(i);
    }
    setPlayerHealthTracker(hearts);

    // setting a quip
    updateQuip();
  }, []);

  return (
    <div className="gauntlet-page-container">
      {!gameOver ? (
        <>
          <div className="gaunlet-question-container">
            {category == "basic_math" && (
              <div className="gauntlet-question">
                {gauntletQuestion.problem} =
              </div>
            )}
            {category == "algebra" && (
              <div
                className="gauntlet-question"
                style={{
                  fontSize: "40px",
                }}
              >
                {gauntletQuestion.problem}
              </div>
            )}
            {category == "geometry" && (
              <div
                className="gauntlet-question"
                style={{
                  fontSize: "40px",
                }}
              >
                {gauntletQuestion.problem}
              </div>
            )}
            <div className="gauntlet-question-type">
              {gauntletQuestion.type}
            </div>
            <div
              className="gauntlet-question-type"
              style={{
                fontSize: "16px",
                color: "gray",
              }}
            >
              {gauntletQuestion.type == "Combining Like Terms" &&
                "Example answer: 10x+16x^2 (lower order terms first!)"}
              {gauntletQuestion.type == "Expanding Polynomials" &&
                "Example answer: 36x^2-12x (higher order terms first!"}
              {gauntletQuestion.type == "Linear Equations" &&
                "Example answer: x,y or -5,-1"}
              {gauntletQuestion.type == "System of Equations" &&
                "Example answer: x,y or -5,-1"}
              {category == "geometry" &&
                "Round TWO decimal places. Example: 12.43"}
            </div>
            {!questionComplete ? (
              <input
                type="text"
                className="gauntlet-question-input"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                onKeyDown={checkAnswerKeyDown}
              />
            ) : (
              <input
                type="text"
                className="gauntlet-question-input"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                onKeyDown={nextQuestion}
              />
            )}
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
              {category == "algebra" && "Lord Algebra, The Unknown"}
              {category == "geometry" &&
                "Lucious Cube, The Man With the Six Faces"}
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
        <div className="gauntlet-end">
          {playerLost && (
            <div className="gauntlet-fallen">YOU HAVE FALLEN.</div>
          )}
          {defeatedMonster && (
            <div
              className="gauntlet-fallen"
              style={{
                color: "gold",
              }}
            >
              MONSTER FELLED.
            </div>
          )}
          <button className="gauntlet-return" onClick={() => navigate("/")}>
            Return Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Gauntlet;