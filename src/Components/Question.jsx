import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AnswerBox from "./AnswerBox";

const Question = ({objQuestion, onCorrectAnswer, onIncorrectAnswer}) => {
  const [showOverallResult, setShowOverallResult] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const handleOnclick = (clickedAnswer) => {
    if (!showOverallResult) {
      setShowOverallResult(true);

      if(clickedAnswer.isCorrect){
        setAnsweredCorrectly(true);
      } else{
        // Search for the correct answer
        let correctAnswer = objQuestion.answers.find(answer => answer.isCorrect);
        correctAnswer.showResult = true;
      }

      clickedAnswer.showResult = true;
    }
  }

  const onNextClick = () => {
    answeredCorrectly ? onCorrectAnswer() : onIncorrectAnswer();
    setShowOverallResult(false);
    setAnsweredCorrectly(false);
  }

  return (
    <div className="bg-white px-6 py-10 rounded-xl text-center">
      <div className='inline-block absolute'>
        <img className="relative float-right -top-32 -right-20" src="/assets/img/question.svg" alt=""/>
      </div>
      
      {
        objQuestion
        ?
          <>
            { objQuestion.question.flag && <img className="mb-4" width="84" src={objQuestion.question.flag} />}
            <p className="text-2xl mb-8 font-bold text-[#2F527B]">{objQuestion.question.text}</p>
          </>
        :
          <div className="animate-pulse h-4 bg-slate-700 rounded mb-8 mt-4"></div>
      }

      {
        objQuestion
        ?
          <div className=" grid col-1 row-auto gap-5">
            { objQuestion.answers.map((answer, index) => <AnswerBox key={index} onClickHandler={handleOnclick} answer={answer} />)}
          </div>
        :
          <div className="mb-4 grid col-1 row-auto gap-5 animate-pulse">
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="h-3 bg-slate-700 rounded"></div>
            <div className="h-3 bg-slate-700 rounded"></div>
          </div>
      }

      { showOverallResult && <div className="flex place-content-end"><button className="mt-8 p-4 rounded-xl w-32 h-14 bg-[#F9A826] text-white text-center" onClick={onNextClick}> Next </button></div>}
    </div>
  );
}

AnswerBox.propTypes = {
  objQuestion: PropTypes.object,
  onCorrectAnswer: PropTypes.func,
  onIncorrectAnswer: PropTypes.func,
}

AnswerBox.defaultProps = {
  objQuestion: null,
  onCorrectAnswer: null,
  onIncorrectAnswer: null,
}

export default Question;
