import { useEffect, useState } from 'react'
import Preview from './Preview';
import SentenceInput from './SentenceInput';
import Options from './Options';
import { deleteQuestion, updateQuestion } from '../../../../redux/slices/allQuestionsSlice';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoMdCloseCircle } from 'react-icons/io';

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
                    {/* Delete Question */}
                    <div className='absolute top-2 right-2' onClick={() => dispatch(deleteQuestion(quesIndex))}>
                        <IoMdCloseCircle className='crossIcon !text-3xl' />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default ClozeTypeQuestion