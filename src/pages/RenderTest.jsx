import React, { useEffect } from 'react'
import { fetchTestData } from '../services/operations/testApi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import Category from '../Components/Core/RenderTest/Category';
import Cloze from '../Components/Core/RenderTest/Cloze';
// import Comprehension from '../Components/Core/RenderTest/Comprehension';

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
            <div>
                <div className='my-5'>
                    <h3>Title: {testData.testTitle}</h3>
                    <h3>No. of questions: {testData.noOfQuestions}</h3>
                </div>
                <div className='mt-3'>
                    {
                        testData.questions.map((ques, index) => {
                            // if (ques.type === "category")
                            //     return (
                            //         <Category key={index} ques={ques} />
                            //     )
                            if (ques.type === "cloze")
                                return (
                                    <Cloze key={index} ques={ques} />
                                )
                            // if (ques.type === "comprehension")
                            //     return (
                            //         <Comprehension key={index} ques={ques} />
                            //     )
                            else return <></>
                        })
                    }
                </div>
            </div>
            :
            <div>
            </div>
    )
}

export default RenderTest