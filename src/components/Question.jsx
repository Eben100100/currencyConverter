function Question({ questions, dispatch, answer }) {
  const { question, options, correctOption } = questions;
  const hasAnswered = answer !== null;

  return (
    <div>
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
            }  `}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
