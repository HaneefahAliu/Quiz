import React, {useState, useEffect} from 'react';

import Question from './components/Question';

import './App.css';

const API_URL = 'https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple'

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const questions = data
                    .results
                    .map((question) => ({
                        ...question,
                        answers: [
                            question.correct_answer, ...question.incorrect_answers
                        ].sort(() => Math.random() - 0.5)
                    }));
                setQuestions(questions);
            });
    }, []);

    const handleAnswer = (answer) => {
        if (!showAnswers) {
            if (answer === questions[currentIndex].correct_answer) {
                setScore(score + 10);
            }
        }
        setShowAnswers(true)
    };

    const handleNextQuestion = () => {
        setCurrentIndex(currentIndex + 1);
        setShowAnswers(false);
    };

    const refreshPage = () => {
        window
            .location
            .reload();
    }

    return questions.length > 0
        ? (
            <div className="card">
                {
                    currentIndex >= questions.length
                        ? (
                            <div className="result">
                                <h1>Result</h1>
                                <p className="score-num">{score}</p>
                                <button className="action-btn" onClick={refreshPage}>Play Again</button>
                            </div>
                        )
                        : (
                            <div>
                                <div className="question-count">
                                    <p>Question {currentIndex + 1} of 10</p>
                                </div>
                                <Question
                                    data={questions[currentIndex]}
                                    showAnswers={showAnswers}
                                    handleNextQuestion={handleNextQuestion}
                                    handleAnswer={handleAnswer}/>
                            </div>

                        )
                }
            </div>
        )
        : (
            <div className="card">
                <div className="loader center-loader"></div>
            </div>

        );
}

export default App;