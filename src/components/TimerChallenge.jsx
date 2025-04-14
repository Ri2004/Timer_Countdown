import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  // const handleStart = function () {
  //   timer.current = setTimeout(() => {
  //     setTimerExpired(true);
  //     /*
  //       Through dialog ref dialog element in JSX in ResultModal component is connected, and using current
  //       property access that dialog element, so for display the dialog box, call showModal() of dialog element
  //       using current property of dialog ref
  //     */
  //     // dialog.current.showModal();

  //     dialog.current.open();
  //   }, targetTime * 1000);
  //   setTimerStarted(true);
  // };

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const handleReset = function () {
    setTimeRemaining(targetTime * 1000);
  };

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleStart = function () {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  // const handleStop = function () {
  //   clearTimeout(timer.current);
  // };

  const handleStop = function () {
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
