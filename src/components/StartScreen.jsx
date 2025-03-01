function StartScreen({ numberOfQuestion, handleStart }) {
  return (
    <div className="start">
      <h2> Start Screen </h2>
      <h3>{numberOfQuestion} questions to Test your general Knowledge sense</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        {" "}
        Start
      </button>
    </div>
  );
}

export default StartScreen;
