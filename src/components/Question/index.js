import React from 'react';

import './style.css';

const Question = ({
    showAnswers,
    handleAnswer,
    handleNextQuestion,
    data: {question, correct_answer, answers},
}) => {
    
    return (
        <div>
            <div className="card-detail">
                <h3 dangerouslySetInnerHTML={{__html:question}}/>
            </div>
            <div className="option">
                {answers.map((answer) => {
                    
                    return(
                    <button
                        style={showAnswers ? {color: answer===correct_answer ? "green" : "red"} : {}}
                        onClick={() => handleAnswer(answer)}
                        dangerouslySetInnerHTML={{__html: answer}}
                    />
                );
                })}
            </div>
            {showAnswers && (
                <button className="action-btn" onClick={handleNextQuestion}>Next</button>
            )}
        </div>
    );
};


export default Question;