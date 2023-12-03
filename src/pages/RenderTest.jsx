import React, { useEffect } from 'react'
import { fetchTestData } from '../services/operations/testApi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Category from '../Components/Core/RenderTest/Category';
import Cloze from '../Components/Core/RenderTest/Cloze';
import Comprehension from '../Components/Core/RenderTest/Comprehension';

const RenderTest = () => {

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let { testId } = params;
        dispatch(fetchTestData(testId));
        // eslint-disable-next-line
    }, [])

    const testData = useSelector(state => state.testData.data)

    useEffect(() => {
        console.log("Test Data>>>>>>", testData);
    }, [testData])

    return (
        testData !== null
            ?
            // Questions Sections
            <div className='max-w-[1440px] mx-auto grid grid-cols-6 mt-[3.5rem]'>
                <div className='col-span-4'>
                    <div className='my-5'>
                        <h3 className='testTitle'>{testData.testTitle}</h3>
                        <h5 className='font-medium text-slate-700 tracking-tighter'>No. of questions: <span className='text-xl font-bold'>{testData.noOfQuestions}</span></h5>
                    </div>
                    <div className='flex flex-col gap-y-20'>
                        {
                            testData.questions.map((ques, index) => {
                                if (ques.type === "category")
                                    return (
                                        <Category key={index} ques={ques} quesIdx={index} />
                                    )
                                if (ques.type === "cloze")
                                    return (
                                        <Cloze key={index} ques={ques} quesIdx={index} />
                                    )
                                if (ques.type === "comprehension")
                                    return (
                                        <Comprehension key={index} ques={ques} quesIdx={index} />
                                    )
                                else return <span key={index}></span>
                            })
                        }
                    </div>
                </div>

                {/* Buttons / Stats Section */}
                <div className='w-full col-start-5 col-span-2 flex justify-center'>
                    <div className='h-fit fixed top-[3.5rem] bg-slate-200 px-6 py-3 rounded-md'>
                        <h3>Actions:</h3>

                        <div>
                            <button type="button" className='bg-yellow-500 text-black hover:text-white hover:font-semibold px-3 py-2 rounded-md border border-black hover:border-white duration-200 hover:scale-110'>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>
                No Questions Found
            </div>
    )
}

export default RenderTest