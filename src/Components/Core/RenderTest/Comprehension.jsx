import React, { useEffect, useState } from 'react'

const Comprehension = ({ ques }) => {

    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        let answersArr = ques.mcq.map(() => "");
        setAnswers(answersArr);
        // eslint-disable-next-line
    }, []);

    const handleAnswer = (mcqIdx, option) => {
        const answersArrCopy = [...answers];
        answersArrCopy.splice(mcqIdx, 1, option);

        setAnswers(answersArrCopy);
    }
    return (
        <div className='quesCard'>
            <div>
                <p>Passage</p>
                <p>{ques.passage}</p>
            </div>
            <div>
                {
                    ques.mcq.map((q, mcqIdx) => (
                        <div key={mcqIdx}>
                            <label>Question: {q.ques}</label>

                            <div>
                                <p>Options: </p>
                                {
                                    q.options.map((option, i) => (
                                        <div key={i}>
                                            <label onClick={() => handleAnswer(mcqIdx, option)}>
                                                <input
                                                    type="radio"
                                                    name={mcqIdx}
                                                    value={option}
                                                    className='inputField mb-inputField'
                                                // name={`question-${quesIndex}`}
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Comprehension