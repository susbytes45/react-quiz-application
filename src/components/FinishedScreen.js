function FinishedScreen({ points, maxPossiblepoints, dispatch }) {
  const percentage = (points / maxPossiblepoints) * 100;
  return (
    <>
      <p className="result">
        You Scored<strong>{points}</strong> out of {maxPossiblepoints}(
        {Math.ceil(percentage)}%)
      </p>
      <button onClick={() => dispatch({ type: "Reset" })}> Reset</button>
    </>
  );
}

export default FinishedScreen;
