import React, { useEffect, useState } from 'react'
import { handleFetchTestsList } from '../services/operations/testApi'
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/testDataSlice';
import { useNavigate } from 'react-router-dom';

const AllTestsList = () => {

    const [testsList, setTestsList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let response;
        (async () => {
            dispatch(setLoading(true));
            response = await handleFetchTestsList();
            setTestsList(response.data);
            dispatch(setLoading(false));
        })()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {
                testsList.length
                    ?
                    <>
                        {
                            testsList.map((test) => (
                                <div
                                    key={test._id}
                                    className='border border-black my-2 rounded-md cursor-pointer'
                                    onClick={() => navigate(`/test/${test._id}`)}
                                >
                                    <h5>Title: {test.testTitle}</h5>
                                    <p>Total no. of questions: {test.noOfQuestions}</p>
                                </div>
                            ))
                        }
                    </>
                    :
                    <div>
                        Not Found
                    </div>
            }

        </div>
    )
}

export default AllTestsList