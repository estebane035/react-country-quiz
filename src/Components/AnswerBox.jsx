import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegTimesCircle } from 'react-icons/fa'
import { MdCheckCircleOutline } from 'react-icons/md'

const AnswerBox = ({answer, onClickHandler}) => {
    const onClick = () => {
        onClickHandler(answer);
    }

    return (
        <div 
            className={`z-10 px-4 py-2 rounded-xl border-2 cursor-pointer text-left ${answer.showResult ? (answer.isCorrect ? 'text-white bg-[#60BF88]' : 'text-white bg-[#EA8282]') : 'hover:bg-[#F9A826] hover:text-white hover:border-[#F9A826] border-[#6066d0bb] text-[#6066d0]'}`}
            onClick={onClick}
        >
            <span className="mr-10">{answer.letter}</span>
            <span>{answer.text} </span>
            {
                answer.showResult && (
                    answer.isCorrect
                    ?
                        <span className='float-right'><MdCheckCircleOutline className='text-xl mt-1'/></span>
                    :
                        <span className='float-right'><FaRegTimesCircle className='text-xl mt-1'/></span>
                )
            }
            
        </div>
    );
}

AnswerBox.propTypes = {
    answer: PropTypes.object,
    onClickHandler: PropTypes.func,
}

AnswerBox.defaultProps = {
    answer: null,
    onClickHandler: null,
}

export default AnswerBox;

