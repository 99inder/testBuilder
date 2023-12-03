import { useEffect, useState } from 'react'
import Preview from './Preview';
import SentenceInput from './SentenceInput';
import Options from './Options';
import { updateQuestion } from '../../../../redux/slices/allQuestionsSlice';
import { useDispatch } from 'react-redux';

const ClozeTypeQuestion = ({ quesIndex }) => {

    const dispatch = useDispatch();

    const [question, setQuestion] = useState({
        type: "cloze",
        sentence: "",
        previewSentence: "",
        options: [],
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
        </div>
    )
}

export default ClozeTypeQuestion