import React from "react";
import "../modules/Reply.css"
import juliusomo from "../assets/images/avatars/image-juliusomo.png"

const Reply = ({ setInputValue, buttonTxt, addComment, addReply, index, action }) => {
  // Define a function named 'handleButtonClick' that is invoked when the button is clicked
  const handleButtonClick = () => {
    // Check the value of 'buttonTxt' prop and perform different actions accordingly
    if (buttonTxt === 'send') {
      // If 'buttonTxt' is 'send', call the 'addComment' prop function
      addComment();
    } else if (buttonTxt === 'reply') {
      // If 'buttonTxt' is 'reply', call the 'addReply' prop function with 'index' and 'action' as arguments
      addReply(index, action);
    }
  };


  return (
    <div className="reply-container">
      <img src={juliusomo} alt="" />

      {/* Input field that triggers the 'setInputValue' prop function on change */}
      <input onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Add a comment..." />

      {/* Button with the 'button-send' class that triggers the 'handleButtonClick' function on click */}
      <button className='button-send' onClick={handleButtonClick}>{buttonTxt}</button>
    </div>
  );
};

export default Reply;
