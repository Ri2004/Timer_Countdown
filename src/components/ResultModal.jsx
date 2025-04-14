import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset
}) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    };
  });

  return createPortal(
    // <dialog ref={ref} className="result-modal">
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2> You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>{" "}
      </p>
      <p>
        You Stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>{" "}
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}

/*
  In Older version of react, ref is not passed as normal prop like in above code, in older version
  there is a function used named forwardRef, that function take whole component function as argument
  in that component function, first argument is normal props and second argument is ref prop, it is not
  property of props object then
*/

// const ResultModal = forwardRef(function ({ result, targetTime }, ref) {
//   useImperativeHandle(ref);
//   return (
//     <dialog ref={ref} className="result-modal">
//       <h2> You {result} </h2>
//       <p>
//         The target time was <strong>{targetTime} seconds.</strong>{" "}
//       </p>
//       <p>
//         You Stopped the timer with <strong>X seconds left.</strong>{" "}
//       </p>
//       <form method="dialog">
//         <button>Close</button>
//       </form>
//     </dialog>
//   );
// });

// export default ResultModal;
