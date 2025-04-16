import { useState, useRef } from "react";

// Using two way binding
// export default function Player() {
//   const [enteredPlayerName, setEnteredPlayerName] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleClick = function () {
//     setSubmitted(true);
//   };

//   return (
//     <section id="player">
//       <h2>Welcome {submitted ? enteredPlayerName : "unknown entity"}</h2>
//       <p>
//         <input type="text" value={enteredPlayerName} onChange={(e) => setEnteredPlayerName(e.target.value)} />
//         <button onClick={handleClick}>Set Name</button>
//       </p>
//     </section>
//   );
// }

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  const handleClick = function () {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
