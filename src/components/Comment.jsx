import { useState } from "react";
import "../modules/Comments.css"
import plus from "../assets/images/icon-plus.svg"
import minus from "../assets/images/icon-minus.svg"
import reply from "../assets/images/icon-reply.svg"
import deletes from "../assets/images/icon-delete.svg"
import edit from "../assets/images/icon-edit.svg"

const Comments = ({
  item,
  replyHandler,
  data,
  type,
  handleDelete,
  itemIndex,
  replyIndex,
  setDataState
}) => {
  const Current =
  // gansazgvrot tu current user aris author of the comment or the one logged in
    data?.currentUser?.username === item.user.username || item.isCurrentUser;  
    // ?. : If data is defined, it proceeds to 
    //the next level and checks if the property currentUser exists within data

  const [editToggle, setEditToggle] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const [score, setScore] = useState(item.score);
  const [scoreIncreased, setScoreIncreased] = useState(false);
  const [scoreDecreased, setScoreDecreased] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
  };

  const handleEditContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const increaseScore = () => {
    setScore(score + 1);
    setScoreIncreased(true);
    setScoreDecreased(false);
  };

  const decreaseScore = () => {
    if (score > 0) {
      setScore(score - 1);
      setScoreDecreased(true);
      setScoreIncreased(false);
    }
  };

  const handleEditingSave = () => {
    setDataState((prevDataState) => {
      // prevDataState = განკუთვნილია გარკვეული მონაცემების წინა states შესანახად React კომპონენტში.
      const updatedComments = prevDataState.comments.map((comment, index) => {
        if (index === itemIndex) {
          if (type) {
            // Update reply content
            const updatedReplies = comment.replies.map((reply, replyIndex) => {
              //comment (representing the current element of the array) and index (representing the index of the current element in the array).
              if (replyIndex === replyIndex) {
                return {
                  ...reply,
                  content: editedContent,
                  // creates a new object by copying all properties from the reply object 
                  //and updating the content property with the value of editedContent.
                };
              }
              return reply;
            });
  
            return {
              ...comment,
              replies: updatedReplies,
            };
          } else {
            // Update comment content
            return {
              ...comment,
              content: editedContent,
            };
          }
        }
        return comment;
      });
  
      return {
        ...prevDataState,
        comments: updatedComments,
      };
    });
  
    setEditToggle(false);
  };
  


  
  const handleDeleteConfirmation = () => {
    handleDelete(itemIndex, replyIndex);
    setModalToggle(false);
  };

  return (
    <div className="Main">
      <div className="rating">
        <button onClick={increaseScore}>
          <img src={plus} alt="" />
        </button>
        <button>
          <p>{score}</p>
        </button>
        <button onClick={decreaseScore}>
          <img src={minus} alt="" />
        </button>
      </div>
      <div className="text">
      <div className="Starter">
  <div className="Starter-title">
    <img src={item.user.image.png} alt="" />
    {Current && <div className="Person">you</div>}
    <p>{item.user.username}</p>
    <p className="postedAt">{item.createdAt}</p>
  </div>
  {!Current ? (
    <div className="reply" onClick={() => replyHandler(item.id - 1)}>
      <img src={reply} alt="" />
      <p>Reply</p>
    </div>
  ) : (
    <div className="config">
      <div className="delete" onClick={() => setModalToggle(true)}>
        <img src={deletes} alt="" />
        <p>delete</p>
      </div>
      <div className="edit" onClick={() => handleEditToggle()}>
        <img src={edit} alt="" />
        <p>edit</p>
      </div>
    </div>
  )}
  {modalToggle && (
    <div className="Secondary-half">
      <div className="Formal">
        <h2 className="Formal-title">
          <b>Delete Comment</b>
        </h2>
        <p>
          Are you sure you would like to delete this comment? This will remove
          the comment and can't be undone.
        </p>
        <div className="Formal-buttons">
          <button className="Formal-button undo" onClick={() => setModalToggle(false)}>
            No, cancel
          </button>
          <button className="Formal-button do" onClick={handleDeleteConfirmation}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  )}
</div>

        {!editToggle ? (
          <div className="Footer">
            {type ? (
              <p>
                <span>@{item.replyingTo}</span>
                {item.content}
              </p>
            ) : (
              <p>{item.content}</p>
            )}
          </div>
        ) : (
          <div className="Footer">
            <textarea
              className="edit-input"
              type="text"
              value={editedContent}
              onChange={handleEditContentChange}
            />
            <button onClick={handleEditingSave} className="editing-btn">
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
