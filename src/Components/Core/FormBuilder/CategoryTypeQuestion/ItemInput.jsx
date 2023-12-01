import { useRef } from 'react';
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
    const selectRef = useRef();
    useOnClickOutside(inputRef, () => addItemHandler());
    const addItemHandler = () => {
        if (inputRef.current.value.length === 0)
            return;

        let updatedItems = [
            ...question.items,
            {
                name: inputRef.current.value,
                category: selectRef.current.value
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
        selectRef.current.value = "";
    }

    return (
        <div>
            {
                question.items.map((item, index) => (
                    <div key={index}>
                        <span>
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, e.target.value, item.category)}
                            />
                            <button
                                type='button'
                                onClick={() => deleteItemHandler(index)}
                            >
                                X
                            </button>
                        </span>

                        <select
                            value={item.category}
                            onChange={(e) => handleItemChange(index, item.name, e.target.value)}
                        >
                            <option selected disabled>
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
                        />
                    </span>

                    <select
                        ref={selectRef}
                    >
                        <option selected disabled>
                        </option>
                        {question.categories.map((cat, i) => (
                            cat.length > 0 &&
                            <option key={i} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            }
        </div>
    );
};

export default ItemInput;
