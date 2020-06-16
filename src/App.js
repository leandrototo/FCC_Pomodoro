import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // ****************************  States   *****************************
  const initialPlayPause = false;
  const [playPause, setPlayPause] = useState(initialPlayPause);

  const initialBreakTime = { mins: 5, secs: 0, from: 'break' }
  const [breakTime, setBreakTime] = useState(initialBreakTime);

  const initialSessionTime = { mins: 0, secs: 3, from: 'session' }
  const [sessionTime, setSessionTime] = useState(initialSessionTime);

  const initialTimer = sessionTime;
  const [timer, setTimer] = useState(initialTimer);


  // ****************************  Button Handlers   **************************

  function handleReset() {
    setSessionTime(initialSessionTime);
    setBreakTime(initialBreakTime);
    setPlayPause(false);
  }
  function handleIncrementSession() {
    if (!playPause) {
      setSessionTime({
        mins: sessionTime.mins + 1,
        secs: 0
      });
    }
  }
  function handleDecrementSession() {
    if (!playPause) {
      setSessionTime({
        mins: sessionTime.mins - 1,
        secs: 0
      });
    }
  }
  function handleIncrementBreak() {
    if (!playPause) {
      setBreakTime({
        mins: breakTime.mins + 1,
        secs: 0,
        from: breakTime.from
      });
    }
  }
  function handleDecrementBreak() {
    if (!playPause) {
      setBreakTime({
        mins: breakTime.mins - 1,
        secs: 0,
        from: breakTime.from
      });
    }
  }

  // ****************************  Efectos   **************************
  useEffect(() => {
    console.log('mins: ', timer.mins, '- secs: ', timer.secs)
    setTimeout(() => {
      if (playPause === true) {
        if (timer.mins === 0 && timer.secs === 0) {
          timer.from === 'session' ? setTimer(breakTime) : setTimer(sessionTime);
        } else if (timer.secs !== 0) {
          setTimer({
            ...timer,
            secs: timer.secs - 1
          });
        } else {
          setTimer({
            mins: timer.mins - 1,
            secs: 59,
            from: timer.from
          });
        }
      }
    }, 1000)
  }, [timer, playPause])

  // Si está en Pausa, cuando se modificar SessionTime / BreakTime y está en dicho modo -> setTimer() con valor de sessionTime.
  useEffect(() => {
    if (timer.from === 'session') {
      setTimer({
        mins: sessionTime.mins,
        secs: 0,
        from: timer.from
      })
    } else if (timer.from === 'break') {
      setTimer({
        mins: breakTime.mins,
        secs: 0,
        from: timer.from
      })
    }
  }, [sessionTime, breakTime])

  // ****************** Logica del render
  const reloj = ((timer.mins > 9) ? timer.mins : ('0' + timer.mins.toString())) + " : " + ((timer.secs > 9) ? timer.secs : ('0' + timer.secs.toString()))

  return (
    <div className="App container">
      <h3 id="title">Pomodoro Toto</h3>
      <section className="configuracionTiempos">

        <div className="botonesFlechas">
          <h5 id="break-label">Break Length</h5>
          <i className="fas fa-arrow-up mr-2 mt-1" id="break-increment" onClick={handleIncrementBreak}></i>
          <h4 className="minutes" id="break-length">{breakTime.mins} mins</h4>
          <i className="fas fa-arrow-down ml-2 mt-1" id="break-decrement" onClick={handleDecrementBreak}></i>
        </div>

        <div className="botonesFlechas">
          <h5 id="session-label">Session Length</h5>
          <i className="fas fa-arrow-up mr-2 mt-1" id="session-increment" onClick={handleIncrementSession}></i>
          <h4 className="minutes" id="session-length">{sessionTime.mins} mins</h4>
          <i className="fas fa-arrow-down ml-2 mt-1" id="session-decrement" onClick={handleDecrementSession} ></i>
        </div>
      </section>
      <section className="pomodoro">
        <div className="timer">
          <h5 id="timer-label">
            {timer.from}
          </h5>
          <div className="flex">
            <h1 id="time-left">
              {reloj}
            </h1>
          </div>
        </div>
        <div className="play" >
          <button id="start_stop" className="btn btn-primary mr-2" onClick={() => setPlayPause(!playPause)}>Play/pause</button>
          <button id="reset" className="btn btn-secondary ml-2" onClick={handleReset} >Reset</button>
          {/* User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to it's default state. */}
        </div>
      </section>
    </div >
  );
}

export default App;
