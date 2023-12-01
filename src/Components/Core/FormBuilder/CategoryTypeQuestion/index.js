import { useState } from 'react'
import ItemInput from './ItemInput';
import CategoryInput from './CategoryInput';

const CategoryTypeQuestion = () => {

  const [question, setQuestion] = useState({
    description: "",
    categories: ["", ""],
    items: [{ name: "", category: "" }]
  });

  return (
    <div>
      {/* Question Description */}
      <div>
        <h3>Question 1</h3>
        <input
          type="text"
          name="description"
          id=""
          placeholder='Description'
          value={question.description}
          onChange={(e) => {
            setQuestion(prev => { return { ...prev, [e.target.name]: e.target.value } })
          }}
        />
      </div>

      {/* Categories */}
      <div>
        <h3>Categories</h3>
        <CategoryInput
          question={question}
          setQuestion={setQuestion}
        />
      </div>

      {/* Items */}
      <div>
        <h2>Items</h2>
        <ItemInput
          question={question}
          setQuestion={setQuestion}
        />
      </div>
    </div>
  )
}

export default CategoryTypeQuestion