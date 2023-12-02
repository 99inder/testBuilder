// import React, { useRef } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const Options = ({ options, setQuestion }) => {

//     const newOptionRef = useRef();

//     const addOption = () => {
//         let newOption = newOptionRef.current.value;
//         if (newOption.length && newOption.trim() !== '') {
//             setQuestion((prev) => {
//                 return {
//                     ...prev,
//                     options: [...prev.options, newOption.trim()],
//                 };
//             });
//             newOptionRef.current.value = '';
//         }
//     };

//     const removeOption = (optionToRemove) => {
//         setQuestion((prev) => {
//             return {
//                 ...prev,
//                 options: prev.options.filter((option) => option !== optionToRemove),
//             };
//         });
//     };

//     const onDragEnd = (result) => {
//         if (!result.destination) {
//             return; // Dropped outside the list
//         }

//         const reorderedOptions = Array.from(options);
//         const [movedItem] = reorderedOptions.splice(result.source.index, 1);
//         reorderedOptions.splice(result.destination.index, 0, movedItem);

//         setQuestion((prev) => ({
//             ...prev,
//             options: reorderedOptions,
//         }));
//     };

//     return (
//         <div>
//             <h2>Options</h2>
//             <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId="options">
//                     {(provided) => (
//                         <ul {...provided.droppableProps} ref={provided.innerRef}>
//                             {options.map((option, index) => (
//                                 <Draggable key={index} draggableId={`option-${index}`} index={index}>
//                                     {(provided) => (
//                                         <li
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                         >
//                                             {option}{' '}
//                                             <button type="button" onClick={() => removeOption(option)}>
//                                                 X
//                                             </button>
//                                         </li>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </ul>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//             <div>
//                 <input
//                     type="text"
//                     ref={newOptionRef}
//                     placeholder="Enter a new option"
//                 />
//                 <button type="button" onClick={addOption}>
//                     Add Option
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Options;

import { useRef, useState } from 'react';
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi"
import { IoMdCloseCircle, IoIosAddCircleOutline } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Options = ({ options, setQuestion }) => {
    const newOptionRef = useRef();
    const [editingIndex, setEditingIndex] = useState(null);

    const addOption = () => {
        let newOption = newOptionRef.current.value;
        if (newOption.length && newOption.trim() !== '') {
            setQuestion((prev) => {
                return {
                    ...prev,
                    options: [...prev.options, newOption.trim()],
                };
            });
            newOptionRef.current.value = '';
        }
    };

    const removeOption = (index) => {
        setQuestion((prev) => {
            return {
                ...prev,
                options: prev.options.filter((_, i) => i !== index),
            };
        });
        setEditingIndex(null);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return; // Dropped outside the list
        }

        const reorderedOptions = Array.from(options);
        const [movedItem] = reorderedOptions.splice(result.source.index, 1);
        reorderedOptions.splice(result.destination.index, 0, movedItem);

        setQuestion((prev) => ({
            ...prev,
            options: reorderedOptions,
        }));
    };

    const startEditing = (index) => {
        setEditingIndex(index);
    };

    const stopEditing = () => {
        setEditingIndex(null);
    };

    const handleOptionChange = (index, newValue) => {
        setQuestion((prev) => {
            const updatedOptions = [...prev.options];
            updatedOptions[index] = newValue;
            return {
                ...prev,
                options: updatedOptions,
            };
        });
    };

    return (
        <div>
            <h2>Options</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="options">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {options.map((option, index) => (
                                <Draggable key={index} draggableId={`option-${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            style={{
                                                ...provided.draggableProps.style,
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: snapshot.isDragging ? '#e0e0e0' : 'white',
                                            }}
                                        >
                                            <div
                                                {...provided.dragHandleProps}
                                                style={{ marginRight: '8px', cursor: 'grab' }}
                                            >
                                                <PiDotsThreeCircleVerticalLight
                                                    className='text-4xl text-slate-400 active:text-slate-600'
                                                />
                                            </div>
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    onBlur={stopEditing}
                                                    autoFocus
                                                />
                                            ) : (
                                                <>
                                                    <span onClick={() => startEditing(index)} style={{ cursor: 'text' }}>
                                                        {option}
                                                    </span>{' '}
                                                    <button type="button" onClick={() => removeOption(index)}>
                                                        <IoMdCloseCircle
                                                            className='text-2xl hover:text-red-500 duration-200'
                                                        />
                                                    </button>
                                                </>
                                            )}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <div className='flex items-center'>
                <input
                    type="text"
                    ref={newOptionRef}
                    placeholder="Enter a new option"
                />
                <button type="button" onClick={addOption}>
                    <IoIosAddCircleOutline 
                    className='text-3xl hover:text-emerald-500 active:text-emerald-600 active:scale-90 duration-200'
                    />
                </button>
            </div>
        </div>
    );
};

export default Options;
