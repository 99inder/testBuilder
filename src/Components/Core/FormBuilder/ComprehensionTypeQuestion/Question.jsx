import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { PiTrashFill, PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineClearAll } from "react-icons/md";

const Question = ({
    question,
    mainQuesIndex,
    quesIndex,
    options,
    answer,
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

    const setAnswer = (quesIndex, newAnswer) => {
        setQuestion((prev) => {
            const newMcqArr = prev.mcq.map((mcq, index) => {
                if (index === quesIndex) {
                    console.log("New answer:", newAnswer);
                    return {
                        ...mcq,
                        answer: newAnswer,
                    };
                }
                return mcq;
            });

            return {
                ...prev,
                mcq: newMcqArr,
            };
        });
    };

    const handleOptionChange = (optionIndex, e) => {
        const newOptionValue = e.target.value.trim();

        setQuestion((prev) => {
            let newMcqArr = [...prev.mcq];
            let updatedOptions = [...newMcqArr[quesIndex].options];

            if (newOptionValue !== "") {
                updatedOptions[optionIndex] = newOptionValue;

                if (e.target.checked) {
                    setAnswer(quesIndex, newOptionValue);
                }
            } else {
                updatedOptions.splice(optionIndex, 1);
                setAnswer(quesIndex, '');
            }

            newMcqArr[quesIndex] = {
                ...newMcqArr[quesIndex],
                options: updatedOptions,
            };

            return {
                ...prev,
                mcq: newMcqArr,
            };
        });
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
                    className='flex py-5 border-b-2 border-slate-300 '
                >
                    <div {...provided.dragHandleProps} className='hidden md:block'>
                        <PiDotsThreeCircleVerticalLight
                            className='text-4xl text-slate-400 active:text-slate-600'
                        />
                    </div>
                    <div className='md:ml-2'>
                        <div>
                            <label>
                                <div className='flex items-center mb-2 gap-x-2'>
                                    <div {...provided.dragHandleProps} className='md:hidden'>
                                        <PiDotsThreeCircleVerticalLight
                                            className='text-4xl text-slate-400 active:text-slate-600'
                                        />
                                    </div>
                                    <p className='title-1 !mb-0'>{`Question ${mainQuesIndex + 1}.${quesIndex + 1}`}</p>
                                </div>
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
                                                    className='inputField mb-inputField mr-3'
                                                    name={`question-${quesIndex}`}
                                                    value={option}
                                                    checked={answer === option}
                                                    onClick={(e) => handleOptionChange(index, e)}
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

                        {/* Display Selected Answer */}
                        {/* <div>
                            <label>
                                <span className='title-2'>Answer: </span>
                                <input type="text" disabled className='inputField mb-inputField' value={answer} readOnly />
                            </label>
                        </div> */}

                        <div className='flex items-center gap-x-6'>
                            {/* Clear Selection Button */}
                            <button type="button" onClick={handleClearSelection} className='text-xl p-2 h-fit bg-slate-200 rounded-full border border-slate-700'>
                                <MdOutlineClearAll />
                            </button>

                            {/* Delete Question Button */}
                            {noOfQues !== 1 && (
                                <div className='font-semibold h-fit flex justify-center'>
                                    <button
                                        type="button"
                                        className='bg-slate-200 group p-2 border border-slate-700 text-xl hover:text-red-600 hover:border-[1px] rounded-full hover:border-red-600 active:border-emerald-600 active:text-emerald-600 active:scale-90 duration-200'
                                        onClick={() => deleteQuestionHandler(quesIndex)}
                                    >
                                        <PiTrashFill
                                            className='group-hover:scale-125 duration-200'
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Question;
