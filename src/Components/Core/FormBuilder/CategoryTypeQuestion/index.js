import { useEffect, useState } from 'react'
import ItemInput from './ItemInput';
import CategoryInput from './CategoryInput';
import { deleteQuestion, updateQuestion } from '../../../../redux/slices/allQuestionsSlice';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoMdCloseCircle } from 'react-icons/io';

const CategoryTypeQuestion = ({ quesIndex }) => {

  const dispatch = useDispatch();

  const [question, setQuestion] = useState({
    type: "category",
    description: "",
    categories: ["", ""],
    items: [{ name: "", category: "" }]
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

          {/* Question Description */}
          <div className='indent'>
            <input
              type="text"
              name="description"
              placeholder='Description'
              value={question.description}
              onChange={(e) => {
                setQuestion(prev => { return { ...prev, [e.target.name]: e.target.value } })
              }}
              className='inputField w-2/3 min-w-[200px]'
            />

            {/* Categories */}
            <div className='mt-5'>
              <h3
                className='title-1'
              >
                Categories
              </h3>
              <CategoryInput
                question={question}
                setQuestion={setQuestion}
              />
            </div>

            {/* Items */}
            <div className='mt-5'>
              <ItemInput
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

export default CategoryTypeQuestion