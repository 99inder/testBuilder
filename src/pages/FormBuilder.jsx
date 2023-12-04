import { useSelector } from 'react-redux';
import CategoryTypeQuestion from '../Components/Core/FormBuilder/CategoryTypeQuestion';
import ClozeTypeQuestion from '../Components/Core/FormBuilder/ClozeTypeQuestion';
import ComprehensionTypeQuestion from '../Components/Core/FormBuilder/ComprehensionTypeQuestion';
import { addQuestion, reorderQuestions } from '../redux/slices/allQuestionsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const FormBuilder = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submit Triggered!");
    }

    const dispatch = useDispatch();
    const allQuestions = useSelector(state => state.allQuestions.questions);

    const handleAddQuestion = (e) => {
        const quesType = e.target.value;
        dispatch(addQuestion(quesType));
        e.target.value = "";
    }

    useEffect(() => {
        console.log("REDUX STATE UPDATED: ", allQuestions)
        // eslint-disable-next-line
    }, [allQuestions])

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        };

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        dispatch(reorderQuestions({ sourceIndex, destinationIndex }));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='max-w-[1440px] px-3 lg:px-0 h-full mx-auto lg:grid grid-cols-6 mt-[3.5rem] pb-10'>
                {allQuestions.length ? (
                    <form className='flex flex-col gap-y-5 col-span-4' onSubmit={handleSubmit}>
                        <div>
                            <input className='inputField w-full max-w-[500px]' type="text" required placeholder='Type Test Title Here' />
                        </div>

                        <Droppable droppableId="questions">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {allQuestions.map((ques, index) => (
                                        <div className='my-7'>
                                            {ques.type === "category" && <CategoryTypeQuestion key={index} quesIndex={index} />}
                                            {ques.type === "cloze" && <ClozeTypeQuestion key={index} quesIndex={index} />}
                                            {ques.type === "comprehension" && <ComprehensionTypeQuestion key={index} quesIndex={index} />}
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </form>
                ) : (
                    <div className='col-span-4 h- flex justify-center items-center sticky top-20 mb-10'>
                        <div className='text-3xl font-semibold text-slate-500'>
                            Form is Empty
                        </div>
                    </div>
                )}
                <div className='w-full col-start-5 col-span-2 flex justify-center'>
                    <div className='h-fit w-full flex flex-wrap gap-x-9 gap-y-2 items-center lg:block lg:w-fit lg:fixed top-[4.5rem] bg-slate-200 px-6 py-3 rounded-md'>
                        <h3 className='title-1 !mb-0'>Add a Question</h3>
                        <select
                            name="quesType"
                            className='inputField'
                            onChange={handleAddQuestion}
                        >
                            <option value="" disabled selected>Select the Question Type</option>
                            <option value="category">Category</option>
                            <option value="cloze">Cloze</option>
                            <option value="comprehension">Comprehension</option>
                        </select>
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default FormBuilder