import { useEffect, useState } from 'react'
import ItemInput from './ItemInput';
import CategoryInput from './CategoryInput';
import { updateQuestion } from '../../../../redux/slices/allQuestionsSlice';
import { useDispatch } from 'react-redux';

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
    <div className='quesCard'>
      {/* Question Numbering */}
      <h3
        className='quesNumbering'
      >
        Question {quesIndex + 1}
      </h3>

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
    </div>
  )
}

export default CategoryTypeQuestion