import { useEffect, useState } from "react";
import "./App.css";
import UserService from "./service/UserService";
import AddUserButton from "./component/UserCreateButtom";
import Participantlist from "./component/ParticipantList";
import ComplatedList from "./component/CompletedList";
import Stopwatch from "./component/stopwatch";

function App() {
  const [participants, setParticipants] = useState([]);
  const [completedUsers, setCompletedUsers] = useState([]);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [isMeetingFinished, setIsMeetingFinished] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasAnyUser, setHasAnyUser] = useState(false);

  function handleAddUser(username) {
    if (username && username.trim() != "") {
      const userList = UserService.addUser(username);
      setCompletedUsers(userList);
    }
  }

  function handleDeleteUser(user) {
    const userList = UserService.removeUser(user.id);
    setCompletedUsers(userList);
  }

  function handleStartAction(user) {
    setCompletedUsers(completedUsers.filter((u) => u.id !== user.id));

    if (!isMeetingStarted) {
      setIsMeetingStarted(true);
    }
    if (currentUser.id !== null && currentUser.id !== user.id) {
      setElapsedTime(0);
    }

    if (currentUser.id === null) {
      setCurrentUser(user);
    } else if (currentUser.id !== user.id) {
      currentUser.time = elapsedTime;
      setParticipants([...participants, currentUser]);
      setCurrentUser(user);
      setElapsedTime(0);
    }
  }

  function handleStopMeeting() {
    currentUser.time = elapsedTime;
    setParticipants([...participants, currentUser]);
    setElapsedTime(0);
    setCurrentUser({ id: null });
    setIsMeetingFinished(true);
  }

  function handleResetMeeting() {
    setParticipants([]);
    setElapsedTime(0);
    setCurrentUser({ id: null });
    setIsMeetingFinished(false);
    setCompletedUsers(UserService.getAllUsers());
    setIsMeetingStarted(false);
  }

  useEffect(() => {
    const users = UserService.getAllUsers();
    setCompletedUsers(users);
  }, []);

  useEffect(() => {
    setHasAnyUser(UserService.getAllUsers().length>0)
  }, [participants, completedUsers]);

  return (
    <div className="container">
      <div className="column left">
        <div className="participants">
          {!isMeetingStarted && <AddUserButton onClick={handleAddUser} />}
          {hasAnyUser ?
            <Participantlist
              users={completedUsers}
              deleteAction={handleDeleteUser}
              startAction={handleStartAction}
              stopMeetingAction={handleStopMeeting}
              isMeetingStarted={isMeetingStarted}
              isMeetingFinished={isMeetingFinished}
              resetMeetingAction={handleResetMeeting}
            />
            : "Add users using + button"
          }
        </div>
      </div>
      <div className="column middle">
        <div className="stopwatch">
          <Stopwatch
            user={currentUser}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
            isMeetingStarted={isMeetingStarted}
            isMeetingFinished={isMeetingFinished}
          />
        </div>
      </div>
      <div className="column right">
        <div className="participants">
          <ComplatedList users={participants} />
        </div>
      </div>
    </div>
  );
}

export default App;
