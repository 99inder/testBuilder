import { useSelector } from 'react-redux';
import CategoryTypeQuestion from '../Components/Core/FormBuilder/CategoryTypeQuestion';
import ClozeTypeQuestion from '../Components/Core/FormBuilder/ClozeTypeQuestion';
import ComprehensionTypeQuestion from '../Components/Core/FormBuilder/ComprehensionTypeQuestion';
import { addQuestion } from '../redux/slices/allQuestionsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

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
        console.log(allQuestions)
        // eslint-disable-next-line
    }, [allQuestions])

    return (
        <div className='max-w-[1440px] mx-auto grid grid-cols-6 mt-[3.5rem]'>
            <form
                className='flex flex-col gap-y-20 col-span-4'
                onSubmit={handleSubmit}
            >
                {
                    allQuestions.map((ques, index) => {
                        if (ques.type === "category")
                            return <CategoryTypeQuestion key={index} quesIndex={index} />
                        if (ques.type === "cloze")
                            return <ClozeTypeQuestion key={index} quesIndex={index} />
                        if (ques.type === "comprehension")
                            return <ComprehensionTypeQuestion key={index} quesIndex={index} />
                        else
                            return <span key={index}></span>
                    })
                }
            </form>

            <div className='w-full col-start-5 col-span-2 flex justify-center'>
                <div className='h-fit fixed top-[3.5rem] bg-slate-200 px-6 py-3 rounded-md'>
                    <h3>Add a Question</h3>
                    <select
                        name="quesType"
                        onChange={handleAddQuestion}
                    >
                        <option value=""
                            disabled
                            selected
                        >
                            Select the Question Type
                        </option>
                        <option value="category">
                            Category
                        </option>
                        <option value="cloze">
                            Cloze
                        </option>
                        <option value="comprehension">
                            Comprehension
                        </option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FormBuilder