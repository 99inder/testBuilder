import { useRef } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

const CategoryInput = ({ question, setQuestion }) => {

  const categoryChangeHandler = (e, index) => {
    let updatedCategories = [...question.categories];

    updatedCategories[index] = e.target.value;
    // updatedCategories.splice(index, 1, e.target.value)

    if (index >= 2 && e.target.value.length === 0)
      updatedCategories.splice(index, 1)

    setQuestion(prev => {
      return {
        ...prev,
        categories: updatedCategories
      }
    });
    // console.log(question)
  }

  const inputRef = useRef();
  useOnClickOutside(inputRef, () => addCategoryHandler());
  const addCategoryHandler = () => {
    if (inputRef.current.value.length === 0)
      return;

    let updatedCategories = [...question.categories, inputRef.current.value];

    setQuestion(prev => {
      return {
        ...prev,
        categories: updatedCategories
      }
    });

    inputRef.current.value = "";
  }

  const deleteCategoryHandler = (index) => {
    let updatedCategories = [...question.categories];
    updatedCategories.splice(index, 1);

    setQuestion(prev => {
      return {
        ...prev,
        categories: updatedCategories
      }
    });

  }

  return (
    <div>
      {
        question.categories.map((category, idx) => (
          <div key={idx} className='flex items-center gap-x-2'>
            <input
              type="text"
              placeholder={`Category ${idx + 1} (Required)`}
              value={category}
              onChange={(e) => categoryChangeHandler(e, idx)}
              className='inputField mb-inputField'
            />
            {
              idx >= 2 &&
              <button
                type='button'
                className='mb-inputField'
                onClick={() => deleteCategoryHandler(idx)}
              >
                <IoMdCloseCircle className='crossIcon' />
              </button>
            }
          </div>
        ))
      }
      {
        <input
          type="text"
          placeholder={`Category ${question.categories.length + 1} (Optional)`}
          ref={inputRef}
          className='inputField mb-inputField'
        />
      }
    </div>
  )
}

export default CategoryInput