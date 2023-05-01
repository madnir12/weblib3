import react from "react";
const DeletePopup = ({ message, onDelete, onCancel }) => {
  return (
    <div className="delete-popup-container">
      <div className="delete-popup">
        <div className="delete-message">{message}</div>
        <div className="delete-buttons">
          <button onClick={onDelete}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default DeletePopup;
