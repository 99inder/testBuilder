import React, { useEffect, useState } from 'react'
import PassageInput from './PassageInput';
import QuestionsSection from './QuestionsSection';
import { useDispatch } from 'react-redux';
import { updateQuestion } from '../../../../redux/slices/allQuestionsSlice';

const ComprehensionTypeQuestion = ({ quesIndex }) => {

  const dispatch = useDispatch();

  const [question, setQuestion] = useState({
    type: "comprehension",
    passage: "",
    mcq: [{
      ques: "",
      options: [],
      answer: ""
    }],
  });

  useEffect(() => {
    const payload = {
      quesIndex,
      question
    };

    dispatch(updateQuestion(payload));

    // eslint-disable-next-line
  }, [question]);

  return (
    <div className='quesCard'>

      {/* Question Numbering */}
      <h3
        className='quesNumbering'
      >
        Question {quesIndex + 1}
      </h3>

      <div className='indent'>

        <PassageInput
          passage={question.passage}
          setQuestion={setQuestion}
        />
        <div className='mt-3'>
          <QuestionsSection
            mainQuesIndex={quesIndex}
            question={question}
            setQuestion={setQuestion}
          />
        </div>
      </div>
    </div>
  )
}

export default ComprehensionTypeQuestion