import { useRef } from 'react'
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
          <div key={idx}>
            <input
              type="text"
              placeholder={`Category ${idx + 1} (Required)`}
              value={category}
              onChange={(e) => categoryChangeHandler(e, idx)}
            />
            {
              idx >= 2 &&
              <button
                onClick={() => deleteCategoryHandler(idx)}
              >
                X
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
        />
      }
    </div>
  )
}

export default CategoryInput