import Question from './Question';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { IoIosAddCircleOutline } from "react-icons/io";

const QuestionsSection = ({
  mainQuesIndex,
  question,
  setQuestion
}) => {

  // const setAnswer = (quesIndex, newAnswer) => {
  //   // make a deep copy of mcqs array
  //   let newMcqArr = [...question.mcq];

  //   // get the mcq question data that needs to be updated
  //   let updatedMcq = question.mcq[quesIndex];

  //   // update the answer
  //   updatedMcq["answer"] = newAnswer;

  //   // replace the old mcq question with the updated one
  //   newMcqArr[quesIndex] = updatedMcq;

  //   // update the state with the new data
  //   setQuestion((prev) => ({
  //     ...prev,
  //     mcq: newMcqArr,
  //   }));
  // };

  const addQuestionHandler = () => {
    setQuestion((prev) => ({
      ...prev,
      mcq: [
        ...prev.mcq,
        {
          ques: '',
          options: [],
          answer: '',
        },
      ],
    }));
  };

  const deleteQuestionHandler = (quesIndex) => {
    let updatedMcqArr = [...question.mcq];
    updatedMcqArr.splice(quesIndex, 1);
    setQuestion((prev) => ({
      ...prev,
      mcq: updatedMcqArr,
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // dropped outside the list
    }

    const reorderedMcq = [...question.mcq];
    const [removed] = reorderedMcq.splice(result.source.index, 1);
    reorderedMcq.splice(result.destination.index, 0, removed);

    setQuestion((prev) => ({
      ...prev,
      mcq: reorderedMcq,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {question.mcq.map((q, index) => (
              <Question
                key={index}
                question={q.ques}
                mainQuesIndex={mainQuesIndex}
                quesIndex={index}
                options={q.options}
                answer={q.answer}
                setQuestion={setQuestion}
                deleteQuestionHandler={deleteQuestionHandler}
                noOfQues={question.mcq.length}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Question Button */}
      <div className='mt-3'>
        <button type="button" className='flex items-center gap-x-2 group' onClick={addQuestionHandler}>
          <span className='text-slate-600 font-medium group-hover:scale-105 duration-200 group-hover:text-emerald-600'>Add Question</span>
          <span>
            <IoIosAddCircleOutline
              className='addCircleIcon'
            />
          </span>
        </button>
      </div>
    </DragDropContext>
  );
};

export default QuestionsSection;
