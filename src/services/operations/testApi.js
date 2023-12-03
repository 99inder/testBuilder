// import toast from "react-hot-toast";
import { setLoading, setTestData } from "../../redux/slices/testDataSlice";
import { apiConnector } from "../apiconnector";
import { testEndpoints } from "../apis";

const {
    fetchTestsList,
    fetchTest,
} = testEndpoints;

export const handleFetchTestsList = async () => {
    // const toastId = toast.loading("Loading...");
    try {

        let response = await apiConnector("GET", fetchTestsList);
        response = response.data;
        return response;

    } catch (error) {
        console.log(error);

    }
    // toast.dismiss(toastId);
}

export const fetchTestData = (testId) => {
    return async (dispatch) => {

        // const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            let response = await apiConnector("GET", fetchTest + "/" + testId);
            response = response.data;

            if (!response.success)  // PENDING
                return;

            dispatch(setTestData(response.data));

        } catch (error) {
            console.log(error)
        }
        dispatch(setLoading(false));
        // toast.dismiss(toastId);
    }
}