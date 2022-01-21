import { useState, useEffect } from "react";

import Question from "./Components/Question";
import Results from "./Components/Results";
import { getAllCountries } from "./Helpers/Api"

function App() {
  const [isFinished, setIsfinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [objQuestion, setObjQuestion] = useState(null);

  const tryAgainHandler = () => {
    setObjQuestion(null);
    setIsfinished(false);

    if(correctAnswers === 0){
      refreshQuestion();
    } else{
      setCorrectAnswers(0);
    }
  }

  const createQuestion = (countries) => {
    let objQuestion = {};
    let answers = [];
    let letters = ['A', 'B', 'C', 'D']

    // Define randomly type of aswer flag or capital answer
    let answerType = parseInt(Math.random() * 2 + 1 )

    // Select 4 countries and define the correct answer index
    let indexCountries = Array.from({length: 4}, () => Math.floor(Math.random() * countries.length));
    let correctAnswerIndex = parseInt(Math.random() * 4 )
    let correctAnswerCountry = countries[indexCountries[correctAnswerIndex]];

    if(answerType === 1){
      objQuestion.question = {
        "text": `${correctAnswerCountry.capital[0]} is the capital of`,
      }
    } else{
      objQuestion.question = {
        "text": '¿Wich country does this flag belong to?',
        "flag": correctAnswerCountry.flags.svg,
      }
    }

    indexCountries.forEach((element, index) => {
      let country = countries[element];
      let answer = {
        "letter": letters[index],
        "text": country.name.common,
        "isCorrect": element === indexCountries[correctAnswerIndex],
        "showResult": false,
      };

      answers.push(answer);
    });

    objQuestion.answers = answers;
    setObjQuestion(objQuestion);
  }

  const onCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
  }

  const onIncorrectAnswer = () => {
    setIsfinished(true);
  }

  const refreshQuestion = () => {
    setObjQuestion(null);
    getAllCountries()
    .then(response => {
      createQuestion(response.data);
    })
    .catch(error => {
      alert("An error with the API has ocurred.");
      console.log(error);
    })
  }

  useEffect(() => {
    refreshQuestion();  
  }, [correctAnswers]);
  
  

  return (
    <>
      <div className="flex flex-col items-center bg-main-background min-h-screen text-lg font-poppins">
        <div className="w-1/4 m-auto">
          <p className="mb-4 text-white text-4xl font-bold">Country Quiz</p>
          {
            isFinished
            ? <Results correctAnswers={correctAnswers} onTryAgain={tryAgainHandler}/>
            : <Question objQuestion={objQuestion} onCorrectAnswer={onCorrectAnswer} onIncorrectAnswer={onIncorrectAnswer}/>
          }
        </div>
        <footer className='mb-4 text-center text-white'>
          Created by <a className='underline' href='https://github.com/estebane035' target='_blank'>Esteban Bocardo</a> - <a className='font-bold' href='https://devchallenges.io/' target='_blank'>devChallenges.io</a>
        </footer>
      </div>
    </>
  );
}

export default App;
