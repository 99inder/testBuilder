import React, { useState } from 'react'
import PassageInput from './PassageInput';
import QuestionsSection from './QuestionsSection';

const ComprehensionTypeQuestion = () => {

  const [question, setQuestion] = useState({
    passage: "",
    mcq: [{
      ques: "",
      options: [],
      answer: ""
    }],
  });

  return (
    <div>
      <PassageInput
        passage={question.passage}
        setQuestion={setQuestion}
      />
      <QuestionsSection
        question={question}
        setQuestion={setQuestion}
      />
    </div>
  )
}

export default ComprehensionTypeQuestion