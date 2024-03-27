import React from "react";
import "./styles.css";

function ComplatedList({ users }) {

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toISOString().slice(14, -5);
  };
  
  return users && users.length > 0 ? (
    <div className="nameList">
      {users.map((user) => (
        <div key={user.id} className="namelistItem">
          <div>{user.name}</div>
          <div className="time">{formatTime(user.time)}</div>
        </div>
      ))}
    </div>
  ) : (
    "No one has spoken yet"
  );
}
export default ComplatedList;
