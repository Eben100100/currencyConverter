function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <div>
      <p className="result">
        you scored {points} /{maxPoints} ({percentage}%) HighScore:{highscore}
      </p>

      <button
        onClick={() => dispatch({ type: "Restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
