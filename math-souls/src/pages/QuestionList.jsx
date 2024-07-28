import React from "react";
import { useNavigate } from 'react-router-dom';
import devil from '../assets/Devil_Fruits_10.png';


const QuestionList = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/question');
    }
    
    return(
        <body>
            <p className="titl">Choose your destiny</p>
            <div className="buttons">
                <div>
                <a onClick={handleClick} class="image-container">
                    <img src={devil} alt="Local Image" style={{border: 'none'}}/>
                    <div class="overlay-text">Basic math</div>
                </a>
                </div>
                <div>
                <a onClick={handleClick} class="image-container">
                    <img src={devil} alt="Local Image" style={{border: 'none'}}/>
                    <div class="overlay-text">Algebra</div>
                    <div class="underlying-text">Souls needed: 200</div>
                </a>
                </div>
                <div>
                <a onClick={handleClick} class="image-container">
                    <img src={devil} alt="Local Image" style={{border: 'none'}}/>
                    <div class="overlay-text">Algebra</div>
                    <div class="underlying-text">Souls needed: 600</div>
                </a>
                </div>
            </div>
        </body>
    );
};

export default QuestionList;