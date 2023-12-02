import { useState } from 'react'
import Preview from './Preview';
import SentenceInput from './SentenceInput';
import Options from './Options';

const ClozeTypeQuestion = () => {

    const [question, setQuestion] = useState({
        sentence: "",
        previewSentence: "",
        options: [],
    });

    return (
        <div>
            <Preview
                previewSentence={question.previewSentence}
            />
            <SentenceInput
                question={question}
                setQuestion={setQuestion}
            />
            <Options
                options={question.options}
                setQuestion={setQuestion}
            />
        </div>
    )
}

export default ClozeTypeQuestion