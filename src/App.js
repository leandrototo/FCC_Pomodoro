import React, { useState } from 'react';
import './App.css';

// const unSeg = new Date();
// unSeg.setSeconds(1);
// console.log(unSeg.getSeconds(), 'seg');

function App() {
  const initialPlayPause = 'Pause';
  const [playPause, setPlayPause] = useState(initialPlayPause);
  //  Le hago un useEffect que dependa de [playPause]
  const initialSessionTime = new Date(1000 * 60 * 25);
  console.log(initialSessionTime);

  const [sessionTime, setSessionTime] = useState(initialSessionTime);
  console.log(sessionTime, 'aca');

  const initialTimer = sessionTime;
  const [timer, setTimer] = useState(initialTimer);

  // const time = timer.getMinutes();
  const relojMins = (timer.getMinutes() > 10) ? timer.getMinutes() : ('0' + timer.getMinutes());
  const relojSecs = (timer.getSeconds() > 10) ? timer.getSeconds() : ('0' + timer.getSeconds());
  const reloj = relojMins + " : " + relojSecs;
  console.log('reloj: ', timer.getMinutes())
  return (
    <div className="App container">
      <h3 id="title">Pomodoro Toto</h3>
      <section className="configuracionTiempos">

        <div className="botonesFlechas">
          <h5 id="break-label">Break Length</h5>
          <i className="fas fa-arrow-up mr-2 mt-1" id="break-increment"></i>
          <h4 className="minutes" id="break-length">{/*breakLength*/} mins</h4>
          <i className="fas fa-arrow-down ml-2 mt-1" id="break-decrement"></i>
        </div>

        <div className="botonesFlechas">
          <h5 id="session-label">Session Length</h5>
          <i className="fas fa-arrow-up mr-2 mt-1" id="session-increment"></i>
          <h4 className="minutes" id="session-length">{/*sessionLength*/} mins</h4>
          <i className="fas fa-arrow-down ml-2 mt-1" id="session-decrement"></i>
        </div>
      </section>
      <section className="pomodoro">
        <div className="timer">
          <h5 id="timer-label">
            break/session
          </h5>
          <div className="flex">
            <h1 id="time-left">
              {reloj}
            </h1>
          </div>
        </div>
        <div className="play" >
          <button id="start_stop" className="btn btn-primary mr-2">Play/pause</button>
          <button id="reset" className="btn btn-secondary ml-2">Reset</button>
          {/* User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to it's default state. */}
        </div>
      </section>
    </div>
  );
}

export default App;
