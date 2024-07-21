import { useEffect } from "react";
import Timer from "./Timer";
import Options from "./Options";
function Question({
  question,
  dispatch,
  answer,
  index,
  length,
  secondsRemaning,
}) {
  // useEffect(
  //   function () {
  //     setInterval(function () {
  //       // dispatch({ type: "tick" });
  //     }, 1000);
  //   },
  //   [dispatch]
  // );
  return (
    <div>
      {console.log(question)}
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
      ></Options>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <p style={{ fontSize: "18px" }}>timer</p> */}
        <Timer dispatch={dispatch}></Timer>
        {answer === null ? (
          ""
        ) : index < length - 1 ? (
          <button
            style={{ padding: "6px" }}
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          dispatch({ type: "finished" })
        )}
      </div>
    </div>
  );
}

export default Question;
