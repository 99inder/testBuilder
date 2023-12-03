import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Cloze = ({ ques, quesIdx }) => {
  const sentence = ques.previewSentence;
  const [options, setOptions] = useState([...ques.options])

  const [splitSentenceArr, setSplitSentenceArr] = useState([]);
  const [blankIndexesArr, setBlankIndexesArr] = useState([]);

  // eslint-disable-next-line
  const [answer, setAnswer] = useState("");

  const handleDragEnd = (result) => {
    // Check if the item was dropped inside a valid droppable

    const sourceDroppableId = result.source.droppableId;
    const sourceIndex = result.source.index;

    const destinationDroppableId = result.destination.droppableId;
    const destinationIndex = result.destination.index;

    if (!result.destination || (destinationDroppableId !== "options" && !splitSentenceArr[result.destination.droppableId.replace("sentence-", '')].includes("_"))) {
      return;
    }

    // drag-drop from options to sentence
    if (sourceDroppableId === "options" && destinationDroppableId !== "options") {
      const optionsArr = Array.from(options);
      const [removed] = optionsArr.splice(sourceIndex, 1);

      setOptions(optionsArr);

      const newSentence = Array.from(splitSentenceArr);
      newSentence.splice(result.destination.droppableId.replace("sentence-", ''), 1, removed);

      setSplitSentenceArr(newSentence);
    }

    // drag-drop from sentence to  options
    if (sourceDroppableId !== "options" && destinationDroppableId === "options") {
      const newSentence = Array.from(splitSentenceArr);
      const [removed] = newSentence.splice(sourceIndex, 1, "_");

      setSplitSentenceArr(newSentence);

      const optionsArr = Array.from(options);
      optionsArr.splice(destinationIndex, 0, removed);

      setOptions(optionsArr);
    }
  };

  useEffect(() => {
    let blankIndexes = [];
    let splitSentence = sentence.split(' ').map((word, index) => {
      if (word.includes('_')) {
        blankIndexes.push(index)
      }
      return word;
    });

    setBlankIndexesArr(blankIndexes);
    setSplitSentenceArr(splitSentence);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAnswer(splitSentenceArr.join(' '));
  }, [splitSentenceArr])

  return (
    <div className='quesCard'>
      <h3 className='quesNumbering'>Question {quesIdx + 1}</h3>
      <div className='indent'>
        <p>Fill in the blank</p>

        <div className='mt-4 bg-slate-300'>
          {/* Use DragDropContext for the entire component */}
          <DragDropContext onDragEnd={handleDragEnd}>

            <div className='flex items-center'>
              {
                splitSentenceArr.map((word, index) => (
                  // word.includes('_')
                  blankIndexesArr.includes(index)
                    ?
                    (
                      <Droppable droppableId={`sentence-${index}`} direction="horizontal" key={index}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='flex w-[80px] bg-red-400 min-h-[20px]'
                          // onLoad={() => { ++droppableIndex }}
                          >
                            {
                              !word.includes("_")
                              &&
                              <Draggable draggableId={`sentence-${index}`} index={index}>
                                {(provided) => (
                                  <p
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {word}
                                  </p>
                                )}
                              </Draggable>
                            }
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    )
                    :
                    (
                      <div key={index} className='m-2'>
                        {word}
                      </div>
                    )

                ))}
            </div>

            {/* Droppable for the options */}
            <Droppable droppableId="options" direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='flex bg-red-300 min-h-[80px]'>
                  {options.map((option, index) => (
                    <Draggable key={index} draggableId={`option_${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='m-2 p-2 border border-black min-w-[50px] text-center rounded-md h-fit'
                        >
                          {option}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Cloze;
