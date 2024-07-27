import React from "react";

const Home = () => {
  
  function handleClick() {
    alert('You clicked me!');
  }

  

  return (
    <button onClick={handleClick}>button</button>
  );
};

// function TextBoxButtonExample() {
//   // State to store the input value
//   const [inputValue, setInputValue] = useState('');

//   // Handler for input change
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   // Handler for button click
//   const handleButtonClick = () => {
//     alert(`Button clicked! Input value: ${inputValue}`);
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         value={inputValue} 
//         onChange={handleInputChange} 
//         placeholder="Enter text here"
//       />
//       <button onClick={handleButtonClick}>
//         Click Me
//       </button>
//     </div>
//   );
// }

export default Home;