import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PiTrashFill, PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoIosAddCircleOutline } from "react-icons/io";

const Question = ({
    question,
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
            newMcqArr[quesIndex].ques = e.target.value;
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

        const updatedOptions = [...options, newOption.trim()];

        setQuestion(prev => {
            let copyMcqArr = [...prev.mcq];
            copyMcqArr[quesIndex]["options"] = updatedOptions;
            return {
                ...prev,
                mcq: copyMcqArr
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
                    <div>
                        <div>
                            <label>
                                {`Question: ${quesIndex + 1}`}
                                <input
                                    type="text"
                                    placeholder='Type Your Question Here'
                                    value={question}
                                    onChange={handleQuestionChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Options:
                                <ul>
                                    {options.map((option, index) => (
                                        <li key={index}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${quesIndex}`}
                                                    value={option}
                                                    checked={answer === option}
                                                    onChange={(e) => handleOptionChange(index, e)}
                                                />
                                                <input
                                                    type="text"
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
                                            placeholder={`Add Option ${options.length + 1}`}
                                            value={newOption}
                                            onChange={(e) => setNewOption(e.target.value)}
                                        />
                                        <button type="button" onClick={handleAddOption}>
                                            <IoIosAddCircleOutline
                                                className='text-3xl hover:text-emerald-500 active:text-emerald-600 active:scale-90 duration-200'
                                            />
                                        </button>
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div>
                            <label>
                                Answer:
                                <input type="text" value={answer} readOnly />
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
