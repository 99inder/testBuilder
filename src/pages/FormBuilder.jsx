import CategoryTypeQuestion from '../Components/Core/FormBuilder/CategoryTypeQuestion';
import ClozeTypeQuestion from '../Components/Core/FormBuilder/ClozeTypeQuestion';
import ComprehensionTypeQuestion from '../Components/Core/FormBuilder/ComprehensionTypeQuestion';

const FormBuilder = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submit Triggered!");
    }


    // const [questions, setQuestions] = useState([]);

    return (
        <div className='ml-20 mt-10'>
            <form
                className='flex flex-col gap-y-20'
                onSubmit={handleSubmit}
            >
                <CategoryTypeQuestion />
                <ClozeTypeQuestion />
                <ComprehensionTypeQuestion />
            </form>
        </div>
    )
}

export default FormBuilder