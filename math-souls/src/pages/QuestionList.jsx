import React from "react";
import { useNavigate } from 'react-router-dom';
import devil from '../assets/Devil_Fruits_10.png';


const QuestionList = () => {
    var souls = 100;
    // const [data, setData] = useState([]);
    const navigate = useNavigate();
    function handleClick() {
        navigate('/question');
    }

    const fetchData = async () => {
        let { data, error } = await supabase
          .from('Users')
          .select('souls');
      
        if (error) {
          console.error('Error fetching data:', error);
        } else {
            souls = data;
            // Use this data in your React component
        }
    };
    const navigate = useNavigate();
    function handleClick() {
        navigate('/question');
    }

    function sufficientSouls(){
        if(souls >= 200){
            navigate('/question');
        }
    }

    function sufficientSouls2(){
        if(souls >= 600){
            navigate('/question');
        }
    }

    return(
        <div>
            <p className="titl">Choose your destiny</p>
            <div className="buttons">
                <div>
                <a onClick={handleClick} className="image-container">
                    <img src={devil} alt="Local Image" style={{border: 'none'}}/>
                    <div className="overlay-text">Basic math</div>
                    <div className="underlying-text">   </div>
                </a>
                </div>
                <div>
                <a onClick={sufficientSouls} className="image-container">
                    {souls < 200 ? <img src={devil} alt="Local Image" style={{opacity: 0.3}}/> 
                    : <img src={devil} alt="Local Image" style={{opacity: 1}}/>}
                    <div className="overlay-text">Algebra</div>
                </a>
                    <div className="underlying-text">Souls needed: 200</div>
                </div>
                <div>
                <a onClick={sufficientSouls2} className="image-container">
                    {souls < 600 ? <img src={devil} alt="Local Image" style={{opacity: 0.3}}/>
                    : <img src={devil} alt="Local Image" style={{opacity: 1}}/>}
                    <div className="overlay-text">Algebra</div>
                </a>
                    <div className="underlying-text">Souls needed: 600</div>
                </div>
            </div>
        </div>
    );
};

export default QuestionList;
