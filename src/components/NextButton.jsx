function NextButton({ answer, dispatch, index, numberQuestions }) {
  if (answer === null) return null;
  if (index === numberQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "Finished" })}
        className="btn btn-ui"
      >
        Finished
      </button>
    );
  return (
    <button
      onClick={() => dispatch({ type: "NextQuestion" })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
}

export default NextButton;
