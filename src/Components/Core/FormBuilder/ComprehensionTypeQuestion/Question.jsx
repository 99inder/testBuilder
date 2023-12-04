import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PiTrashFill, PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoIosAddCircleOutline } from "react-icons/io";

const Question = ({
    question,
    mainQuesIndex,
    quesIndex,
    options,
    answer,
    setAnswer,
    setQuestion,
    deleteQuestionHandler,
    noOfQues,
}) => {
    const [newOption, setNewOption] = useState("");

    const handleQuestionChange = (e) => {
        setQuestion((prev) => {
            let newMcqArr = [...prev.mcq];
            newMcqArr[quesIndex] = { ...newMcqArr[quesIndex], ques: e.target.value };
            return {
                ...prev,
                mcq: newMcqArr,
            };
        });
    };

    const handleOptionChange = (optionIndex, e) => {
        const newOptionValue = e.target.value.trim();

        if (newOptionValue !== "") {
            setQuestion((prev) => {
                let newMcqArr = [...prev.mcq];
                newMcqArr[quesIndex].options[optionIndex] = newOptionValue;

                if (e.target.checked) {
                    setAnswer(quesIndex, newOptionValue);
                }

                return {
                    ...prev,
                    mcq: newMcqArr,
                };
            });
        } else {
            setQuestion((prev) => {
                let newMcqArr = [...prev.mcq];
                newMcqArr[quesIndex].options.splice(optionIndex, 1);

                setAnswer(quesIndex, '');

                return {
                    ...prev,
                    mcq: newMcqArr,
                };
            });
        }
    };

    const handleClearSelection = () => {
        setAnswer(quesIndex, '');
    };

    const handleAddOption = () => {

        if (newOption.trim() === '')
            return;

        setQuestion(prev => {
            let copyMcqArr = [...prev.mcq];
            let copyMcq = copyMcqArr[quesIndex];
            let copyOptions = [...copyMcq.options];
            let updatedOptions = [...copyOptions, newOption.trim()];

            let updatedMcq = copyMcqArr.map((mcq, i) => {
                if (i === quesIndex)
                    return { ...mcq, options: updatedOptions }
                else
                    return { ...mcq }
            })

            return {
                ...prev,
                mcq: updatedMcq
            }
        });

        setNewOption("");
    }

    return (
        <Draggable draggableId={`question-${quesIndex}`} index={quesIndex}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className='flex'
                >
                    <div {...provided.dragHandleProps}>
                        <PiDotsThreeCircleVerticalLight
                            className='text-4xl text-slate-400 active:text-slate-600'
                        />
                    </div>
                    <div className='ml-2'>
                        <div>
                            <label>
                                <p className='title-1'>{`Question ${mainQuesIndex + 1}.${quesIndex + 1}`}</p>
                                <input
                                    type="text"
                                    className='inputField mb-inputField'
                                    placeholder='Type Your Question Here'
                                    value={question}
                                    onChange={handleQuestionChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span className='title-2'>Options</span>
                                <ul>
                                    {options.map((option, index) => (
                                        <li key={index}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    className='inputField mb-inputField'
                                                    name={`question-${quesIndex}`}
                                                    value={option}
                                                    checked={answer === option}
                                                    onChange={(e) => handleOptionChange(index, e)}
                                                />
                                                <input
                                                    type="text"
                                                    className='inputField mb-inputField'
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e)}
                                                />
                                            </label>
                                        </li>
                                    ))}
                                    <li
                                        className='flex items-center'
                                    >
                                        <input
                                            type="text"
                                            className='inputField mb-inputField'
                                            placeholder={`Add Option ${options.length + 1}`}
                                            value={newOption}
                                            onChange={(e) => setNewOption(e.target.value)}
                                        />

                                        <button type="button" onClick={handleAddOption}>
                                            <IoIosAddCircleOutline
                                                className='addCircleIcon mb-inputField ml-3'
                                            />
                                        </button>
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div>
                            <label>
                                <span className='title-2'>Answer: </span>
                                <input type="text" disabled className='inputField mb-inputField' value={answer} readOnly />
                            </label>
                        </div>

                        {/* Clear Selection Button */}
                        <button type="button" onClick={handleClearSelection}>
                            Clear Selection
                        </button>

                        {/* Delete Question Button */}
                        {noOfQues !== 1 && (
                            <div className='my-5 font-semibold'>
                                <button
                                    type="button"
                                    onClick={() => deleteQuestionHandler(quesIndex)}
                                >
                                    <PiTrashFill
                                        className='text-3xl hover:text-red-600 hover:border-[1px] hover:p-[1px] rounded-full border-red-600 active:border-emerald-600 active:text-emerald-600 active:scale-90 duration-200'
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Question;
