// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Startscreen from "./Startscreen";
// import DisplayData from "./DisplayData";
import Progress from "./Progress";
import Question from "./Question";
import FinishedScreen from "./FinishedScreen";
const intialstate = {
  questions: [],
  index: 0,
  answer: null,
  point: 0,
  // loading error ready active finished
  status: "loading",
  secondsRemaning: 10,
};

const reducer = function (state, actions) {
  switch (actions.type) {
    case "dataRecieved":
      return { ...state, questions: actions.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: actions.payload,
        point:
          actions.payload === question.correctOption
            ? state.point + question.points
            : state.point,
        // index: state.index + 1,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "Reset":
      return { ...intialstate, questions: state.questions, status: "ready" };
    // case "tick":
    //   return { ...state, secondsRemaning: state.secondsRemaning - 1 };

    default:
      throw new Error("not found");
  }
};
export default function App() {
  const [state, dispatch] = useReducer(reducer, intialstate);
  const { status, questions, index, answer, point, secondsRemaning } = state;
  const total = questions.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);
  console.log(total);
  useEffect(function () {
    const fetchdata = async () => {
      try {
        // const res = await fetch("http://localhost:8000/questions");
        const res = await fetch("fakeapi");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };

    fetchdata();
  }, []);
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && (
          <Startscreen
            noofquestions={questions.length}
            dispatch={dispatch}
          ></Startscreen>
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              point={point}
              length={questions.length}
              total={total}
              answer={answer}
            ></Progress>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              length={questions.length}
              secondsRemaning={secondsRemaning}
            ></Question>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={point}
            maxPossiblepoints={total}
          ></FinishedScreen>
        )}
      </Main>
    </div>
  );
}
