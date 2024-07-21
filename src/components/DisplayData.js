function DisplayData({ index, point, length }) {
  return (
    <div>
      <p>{`${index + 1}/${length}`}</p>
      <p>{`${point}/200`}</p>
    </div>
  );
}

export default DisplayData;
