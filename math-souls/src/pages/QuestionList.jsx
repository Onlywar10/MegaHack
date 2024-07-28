import React from "react";
import { useNavigate } from "react-router-dom";
import { buttonBackground } from "../assets";

const QuestionList = () => {
  var souls = 100;
  // const [data, setData] = useState([]);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/question");
  }

  const fetchData = async () => {
    let { data, error } = await supabase.from("Users").select("souls");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      souls = data;
      // Use this data in your React component
    }
  };
  function handleClick() {
    navigate("/question");
  }

  function backMenu(){
    navigate("/");
  }

  function sufficientSouls() {
    if (souls >= 200) {
      navigate("/question");
    }
  }

  function sufficientSouls2() {
    if (souls >= 600) {
      navigate("/question");
    }
  }

  return (
    <div className="homepage-container">
      <p className="titl">Choose your fate.</p>
      <div className="buttons">
        <div className="button-underlyingtext-container">
          <a onClick={handleClick} className="image-container">
            <img
              src={buttonBackground}
              alt="Local Image"
              style={{ border: "none" }}
            />
            <div className="overlay-text">Basic math</div>
          </a>
          {(souls < 50) ? <div className="underlying-text">Souls needed: 50</div> : <div></div>}
        </div>
        <div>
          <a onClick={sufficientSouls} className="image-container">
            {souls < 200 ? (
              <img
                src={buttonBackground}
                alt="Local Image"
                style={{ opacity: 0.3 }}
              />
            ) : (
              <img
                src={buttonBackground}
                alt="Local Image"
                style={{ opacity: 1 }}
              />
            )}
            <div className="overlay-text">Algebra</div>
          </a>
          {(souls < 200) ? <div className="underlying-text">Souls needed: 200</div> : <div></div>}
        </div>
        <div>
          <a onClick={sufficientSouls2} className="image-container">
            {souls < 600 ? (
              <img
                src={buttonBackground}
                alt="Local Image"
                style={{ opacity: 0.3 }}
              />
            ) : (
              <img
                src={buttonBackground}
                alt="Local Image"
                style={{ opacity: 1 }}
              />
            )}
            <div className="overlay-text">Calculus</div>
          </a>
          {(souls < 600) ? <div className="underlying-text">Souls needed: 600</div> : <div></div>}
        </div>
      </div>
      <div className="backButton-text-container">
        <a onClick={backMenu}>
            <div className="backButton-text">Return to menu</div>  
        </a>
      </div>
    </div>
  );
};

export default QuestionList;
