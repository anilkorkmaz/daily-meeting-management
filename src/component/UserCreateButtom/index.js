import React, { useState } from "react";
import "./styles.css";

function AddUserButton({ onClick }) {
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState("");

  function handleInputChange(event) {
    setUsername(event.target.value);
  }

  function handleAddUser() {
    onClick(username);
    setUsername("");
    setShowInput(false);
  }

  function handleCancelAddUser() {
    setUsername("");
    setShowInput(false);
  }


  return (
    <div>
      {showInput ? (
        <form>
          <input 
            autoFocus
            className="input-text"
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Full name"
          />
          <button className="add-user-button" type="submit" onClick={handleAddUser}>
            ✔
          </button>
          <button className="add-user-button" onClick={handleCancelAddUser}>
            ✖
          </button>
        </form>
      ) : (
        <button className="add-user-button" onClick={() => setShowInput(true)}>
          +
        </button>
      )}
    </div>
  );
}

export default AddUserButton;
