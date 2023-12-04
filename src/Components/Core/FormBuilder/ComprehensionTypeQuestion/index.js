import React, { useEffect, useState } from 'react'
import PassageInput from './PassageInput';
import QuestionsSection from './QuestionsSection';
import { useDispatch } from 'react-redux';
import { deleteQuestion, updateQuestion } from '../../../../redux/slices/allQuestionsSlice';
import { Draggable } from 'react-beautiful-dnd';
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoMdCloseCircle } from 'react-icons/io';

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
    <Draggable draggableId={quesIndex.toString()} index={quesIndex}>
      {(provided) => (
        <div
          className='quesCard relative'
          ref={provided.innerRef}
          {...provided.draggableProps}
        >

          {/* Question Numbering */}
          <div
            className='quesNumbering flex items-center gap-x-3'
          >
            <span
              {...provided.dragHandleProps}
            >
              <PiDotsThreeCircleVerticalLight
                className='text-4xl text-slate-400 active:text-slate-600'
              />
            </span>
            <h3>Question {quesIndex + 1}</h3>
          </div>

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
          {/* Delete Question */}
          <div className='absolute top-2 right-2' onClick={() => dispatch(deleteQuestion(quesIndex))}>
            <IoMdCloseCircle className='crossIcon !text-3xl' />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default ComprehensionTypeQuestion