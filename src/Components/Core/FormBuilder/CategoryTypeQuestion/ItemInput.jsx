import { useRef } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

const ItemInput = ({ question, setQuestion }) => {

    const handleItemChange = (index, name, category) => {
        let newItems = [...question.items];
        newItems[index] = { name, category };
        setQuestion(prev => {
            return {
                ...prev,
                items: newItems
            }
        })
    }

    const deleteItemHandler = (index) => {
        const newItems = [...question.items]
        newItems.splice(index, 1);
        setQuestion(prev => {
            return {
                ...prev,
                items: newItems
            }
        })
    }

    const inputRef = useRef();
    useOnClickOutside(inputRef, () => addItemHandler());
    const addItemHandler = () => {
        if (inputRef.current.value.length === 0)
            return;

        let updatedItems = [
            ...question.items,
            {
                name: inputRef.current.value,
                category: ""
            }
        ];

        console.log(updatedItems);

        setQuestion(prev => {
            return {
                ...prev,
                items: updatedItems
            }
        });

        inputRef.current.value = "";
    }

    return (
        <div>
            <div className='w-2/3 grid grid-cols-2'>
                <p className='title-1'>Item</p>
                <p className='title-1 hidden md:block'>Belongs To</p>
            </div>
            {
                question.items.map((item, index) => (
                    <div className='w-2/3 md:grid grid-cols-2 mb-5 md:mb-0' key={index}>
                        <span className='flex items-center gap-x-2'>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, e.target.value, item.category)}
                                placeholder={question.items.length === 0 || "Item 1 (Required)"}
                                className='inputField mb-inputField'
                            />
                            {
                                !(question.items.length <= 1) &&
                                <button
                                    type='button'
                                    className='mb-inputField'
                                    onClick={() => deleteItemHandler(index)}
                                >
                                    <IoMdCloseCircle className='crossIcon' />
                                </button>
                            }
                        </span>

                        <select
                            value={item.category}
                            onChange={(e) => handleItemChange(index, item.name, e.target.value)}
                            className='inputField mb-inputField'
                        >
                            <option value="" selected disabled>
                                Select the Category
                            </option>

                            {question.categories.map((cat, i) => (
                                cat.length > 0 &&
                                <option key={i} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                ))
            }
            {
                <div>
                    <span>
                        <input
                            type="text"
                            placeholder={`Item ${question.items.length + 1} (Optional)`}
                            ref={inputRef}
                            className='inputField mb-inputField'
                        />
                    </span>
                </div>
            }
        </div>
    );
};

export default ItemInput;
