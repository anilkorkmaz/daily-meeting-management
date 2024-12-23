import React from "react";
import "./styles.css";

function Participantlist({
  users,
  deleteAction,
  startAction,
  deactiveUser,
  isMeetingStarted,
  stopMeetingAction,
  isMeetingFinished,
  resetMeetingAction,
}) {
  if (isMeetingStarted && users.length === 0) {
    return isMeetingFinished ? (
      <button className="stop-meeting" onClick={resetMeetingAction}>
        İçeriği sıfırla
      </button>
    ) : (
      <button className="stop-meeting" onClick={stopMeetingAction}>
        Toplantıyı bitir
      </button>
    );
  }

  return users && users.length > 0 ? (
    <div className="nameList">
      {users.map((user) => (
        <div key={user.id} className="namelistItem">
          <div className="start" onClick={() => startAction(user)}>
            ➤
          </div>
          <div>{user.name}</div>
          {isMeetingStarted ? (
            <div></div>
          ) : (
            <div className="rigtc">
                 <div
                className="deleteUser"
                onClick={() => deactiveUser(user)}
              >
               💤     
              </div>
              <div
                className="deleteUser"
                onClick={() => deleteAction(user)}
              >
                ✖
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    "There is no one left who doesn't speak"
  );
}
export default Participantlist;
