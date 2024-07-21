function Startscreen({ noofquestions, dispatch }) {
  return (
    <div className="start">
      <p>Welcome to React Quiz</p>
      <h3>{noofquestions} questions to test your React mastery</h3>
      <button
        className="btn  btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
    </div>
  );
}

export default Startscreen;
