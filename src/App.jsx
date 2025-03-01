import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import NextButton from "./components/NextButton";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "fetchedData":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "ready":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "Finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "Restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("not found");
  }
};

// loading error ready active finish

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructure my state since

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numberOfQuestion = questions?.length;

  const maxPoints = questions?.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok)
          throw new Error("There is a problem in fetching questions");
        const data = await res.json();
        dispatch({ type: "fetchedData", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err });
      }
    };
    fetchData();
  }, []);

  const handleStart = () => {
    dispatch({ type: "ready" });
  };

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestion={numberOfQuestion}
            handleStart={handleStart}
          />
        )}
        {status === "active" && questions.length > 0 && (
          <>
            {" "}
            <Progress
              index={index}
              numQuestion={numberOfQuestion}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <footer>
              <Timer dispatch={dispatch} timer={secondsRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numberQuestions={numberOfQuestion}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
