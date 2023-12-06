import toast from "react-hot-toast";
import { resetTestBuilderState, setLoading } from "../../redux/slices/allQuestionsSlice";
import { apiConnector } from "../apiconnector";
import { createTestEndpoint } from "../apis";


export const submitCreatedTest = (testFormData) => {
    return async (dispatch) => {

        const toastId = toast.loading("Submitting...");
        let response = null;

        try {
            dispatch(setLoading(true));
            if (testFormData?.noOfQuestions <= 0) {
                toast.error("Empty test can't be created.")
                return;
            }
            response = await apiConnector("POST", createTestEndpoint, testFormData);
            response = response?.data;

            if (response.success)
                toast.success("Test Created Successfully.")

            dispatch(resetTestBuilderState());
        } catch (error) {
            toast.error("Failed to create test.")
            console.log(error);

        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}