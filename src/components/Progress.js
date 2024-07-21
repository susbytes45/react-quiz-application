function Progress({ index, point, length, total, answer }) {
  return (
    <header className="progress">
      <progress max={length} value={index + Number(answer !== null)}></progress>
      <p> Question{` ${index + 1}/${length}`} </p>
      <p>
        <strong>
          {point}/{total}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
