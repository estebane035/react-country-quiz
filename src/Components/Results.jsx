import React from 'react';
import PropTypes from 'prop-types';

const Results = ({correctAnswers, onTryAgain}) => {
    return (
        <div className="bg-white px-6 py-8 rounded-3xl text-center text-lg text-[#1D355D]">
            <img className='mx-auto mb-20' src="/assets/img/win.svg" alt=""/>
            <p className="text-5xl mb-10 font-bold text-[#1D355D]">Results</p>
            <p className='mb-24'>
                You got <span className='text-4xl text-[#6FCF97]'>{correctAnswers}</span> correct answers
            </p>
            <button className='rounded-xl border-2 border-[#1D355D] w-1/2 h-16 text-lg font-bold hover:bg-[#1D355D] hover:text-white' onClick={onTryAgain}>Try again</button>
        </div>
    );
}

Results.propTypes = {
    correctAnswers: PropTypes.number,
    onTryAgain: PropTypes.func,
}

Results.defaultProps = {
    correctAnswers: 0,
    onTryAgain: () => {},
}

export default Results;
