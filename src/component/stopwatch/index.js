import React, { useState, useEffect, useRef } from 'react';
import './styles.css'

const Stopwatch = ({user, elapsedTime, setElapsedTime, isMeetingStarted, isMeetingFinished}) => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const totalTimeRef = useRef(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);


  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if(user.id){
        handleStart();
    }
    return () => clearInterval(intervalRef.current);
  }, [user.id])

  useEffect(() => {
    if(isMeetingStarted){
      totalTimeRef.current = setInterval(() => {
        setTotalElapsedTime((prevTotalElapsedTime) => prevTotalElapsedTime + 10);
      }, 10);
    }
  }, [isMeetingStarted]);

  useEffect(() => {
    if(isMeetingFinished){
      clearInterval(totalTimeRef.current);
    }else {
      setTotalElapsedTime(0)
    }
  }, [isMeetingFinished]);

  const handleStart = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
    }, 10);
  };

  const formatTime = (time,i,j) => {
    const date = new Date(time);
    return date.toISOString().slice(i, j);
  };

  return (
    <div className='stopwatchContainer'>
      <div className='username'>{user.name}</div>
      <div className='userTime'>{formatTime(elapsedTime,14,-5)}</div>
      <div className='totalTime'>Total time {formatTime(totalElapsedTime,11,-5)}</div>
    </div>
  );
};

export default Stopwatch;
