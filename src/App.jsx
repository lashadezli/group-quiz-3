 import "./App.css";

 import React, { useState } from "react";
 import Comment from "./components/Comment";
 import Reply from "./components/Reply";
 import data from "./data.json";

 const App = () => {
   const [dataState, setDataState] = useState(data);
   const [inputValue, setInputValue] = useState("");
   const [modalToggle, setModalToggle] = useState(false);

   const [replyToggle, setReplyToggle] = useState(
     Array(dataState.comments.length).fill(false)
     //Array(dataState.comments.length).fill(false): This part initializes the initial state value 
     // replyToggle. It creates a new array with a length equal to the number of main comments in 
     //dataState.comments. Each element of this array is set to false initially.
   ); 

   const [replyToggleSecond, setReplyToggleSecond] = useState(
     Array(dataState.comments[1].replies.length).fill(false)

     //dataState.comments[1].replies.length: Accesses the replies array of the second main comment (dataState.comments[1]) 
     //and retrieves its length. This length represents the number of replies to the second main comment.
     //Array(...): Creates a new array.
     //.fill(false): Fills each element of the array with the boolean value false. This means that, initially, all replies to the second main comment are considered hidden.
  
   );



   const replyHandlerSecond = (index) => {
     setReplyToggleSecond((prev) => {
       const updated = [...prev];
       updated[index] = !updated[index];
       return updated;
     });
   };

   const handleDelete = (commentIndex, replyIndex) => {
    setDataState((prevDataState) => {
      const updatedComments = [...prevDataState.comments];
  
      if (replyIndex !== undefined) {
        const updatedReplies = [...updatedComments[commentIndex].replies];
        updatedReplies.splice(replyIndex, 1);
         //splice() is a JavaScript Array method that is used to remove,
        //replace or insert items starting at a chosen index. It is also an 
        // effective tool for adding items to the end of an array.2
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          replies: updatedReplies,
        };
      } else {
        updatedComments.splice(commentIndex, 1);
      }
      return {
        ...prevDataState,
        comments: updatedComments,
      };
    });
  };
  
  
  
  

   const replyHandler = (index) => {
     setReplyToggle((prevState) => {
       const updatedToggle = [...prevState];
       updatedToggle[index] = !updatedToggle[index];
       return updatedToggle;
     });
   };

   const addReply = (index, action) => {
     if (inputValue.trim() !== "") {  //The trim method in JavaScript is a built-in string method that removes whitespace 
     // characters from the beginning and end of a string. The whitespace characters
      //include spaces, tabs, and newline characters.
       const updatedComments = [...dataState.comments];
       const updatedReplies = [...updatedComments[index].replies];

       updatedReplies.push({
         id: updatedReplies.length + 1,
         content: inputValue,
         createdAt: `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`,
         score: 0,
         user: {
           image: {
             png: "/images/avatars/image-juliusomo.png",
           },
           username: "julisomo",
         },
         isCurrentUser: true,
         replyingTo: action ? updatedReplies[index-1].user.username : updatedComments[index].user.username
       });

       updatedComments[index] = {
         ...updatedComments[index],
         replies: updatedReplies,
       };

       setDataState({
         ...dataState,
         comments: updatedComments,
       });
       !action ? replyHandler(index) : replyHandlerSecond(0)

     } else {
       window.alert("Please Fill Input Field");
     }
   };

    const addComment = () => {
      if (inputValue.trim() !== "") {
        setDataState({
          ...dataState,
          comments: [
            ...dataState.comments,
            {
              id: dataState.comments.length + 1,
              content: inputValue,
              createdAt: `${new Date().getUTCHours()}:${new Date().getUTCMinutes()}`,
              score: 0,
              user: {
                image: {
                  png: "/images/avatars/image-juliusomo.png",
                },
                username: "juliusomo",
              },
              replies: [],
            },
          ],
        });
      } else {
        window.alert("Fill The Comment Input Please.");
      }
    };

   const commentData = dataState.comments.map((item, index) => (
     <React.Fragment key={index}>
       <Comment
         item={item}
         itemIndex={index}
         data={dataState}
         replyHandler={() => replyHandler(index)}
         type={false}
         handleDelete={handleDelete}
         setDataState={setDataState}
       />
       {replyToggle[index] && (
         <Reply
           buttonTxt={"reply"}
           setInputValue={setInputValue}
           addReply={addReply}
           action={false}
           index={index}
         />
       )}

      {/*{item.replies.length !== 0 ? (...) : (...)}: This is a ternary operator in 
      JSX. It checks if the length of the item.replies array is not equal to 0. If it's true, 
      the content inside the first set of parentheses is rendered; otherwise, the content inside the 
      econd set of parentheses is rendered.
     
       <div className="reply-div" key={index + 100}>: This is the container div element with a 
       class name "reply-div" and a unique key based on the index value. The key is important for React to 
       efficiently update and re-render components in lists.

       {item.replies.map((reply, replyIndex) => (...))}: If there are replies 
       (length is not 0), this maps over the item.replies array, and for each reply, it renders 
       the content specified inside the parentheses. */}

       {item.replies.length !== 0 ? (
         <div className="reply-div" key={index + 100}>
           {item.replies.map((reply, replyIndex) => (
             <>
               <Comment
                 item={reply}
                 itemIndex={index}
                 key={replyIndex}
                 setDataState={setDataState}
                 replyIndex={replyIndex}
                 data={dataState}
                 type={true}
                 replyHandler={()=>replyHandlerSecond(replyIndex)}
                 handleDelete={handleDelete}
               />
               {replyToggleSecond[replyIndex] && reply.guestReply ? (
                 <Reply
                   buttonTxt={'reply'}
                   setInputValue={setInputValue}
                   addReply={addReply}
                   action={true}
                   index={index}
                 />
               ):''}
             </>
           ))}
         </div>
       ) : (
         ""
       )}
     </React.Fragment>
   ));

   return (
     <div>
       {commentData}
       <Reply
         buttonTxt={"send"}
         setInputValue={setInputValue}
         inputValue={inputValue}
         addComment={addComment}
       />
     </div>
   );
 };

 export default App;


