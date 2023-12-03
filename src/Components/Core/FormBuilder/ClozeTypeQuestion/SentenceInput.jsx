import { useState } from 'react';
import { FaUnderline } from "react-icons/fa";

const SentenceInput = ({ question, setQuestion }) => {
    const [selectedText, setSelectedText] = useState('');
    const [allowUnderline, setAllowUnderline] = useState(false);

    const updateUnderlineButton = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText && selection.rangeCount > 0) {
            setAllowUnderline(true);
            setSelectedText(selectedText);
        } else {
            setAllowUnderline(false);
        }
    };

    const underlineText = () => {
        const underlinedText = `<u>${selectedText}</u>`;
        const isAlreadyUnderlined = document.queryCommandState('underline');

        if (isAlreadyUnderlined) {
            document.execCommand('underline', false, null); // Remove underline
            removeFromOptions(selectedText);
        } else {
            document.execCommand('insertHTML', false, underlinedText); // Add underline
            addToOptions(selectedText);
        }

        setAllowUnderline(false);
    };

    const addToOptions = (text) => {
        setQuestion((prev) => {
            return {
                ...prev,
                options: [...prev.options, text],
            };
        });
    };

    const removeFromOptions = (text) => {
        setQuestion((prev) => {
            return {
                ...prev,
                options: prev.options.filter((option) => option !== text),
            };
        });
    };

    const changeHandler = (e) => {
        // Function to replace underlined text with underscores
        function generatePreviewSentence(text) {
            return text.replace(/<u>(.*?)<\/u>/g, (_, match) => '_'.repeat(match.length));
        }
        setQuestion((prev) => {
            return {
                ...prev,
                previewSentence: generatePreviewSentence(e.target.innerHTML),
                sentence: e.target.innerHTML, // Use innerHTML for contentEditable
            };
        });
    };

    return (
        <div className='group flex flex-col-reverse mt-2'>
            <label htmlFor='sentenceInput' className='text-sm font-medium italic'>Enter Sentence Above</label>
            <div
                id="sentenceInput"
                className='peer inputField'
                contentEditable
                style={{ width: '400px', border: '1px solid #ccc', padding: '8px' }}
                dangerouslySetInnerHTML={{ __html: question.sentence }}
                onBlur={changeHandler}
                onMouseUp={updateUnderlineButton}
            />
            <button
                type="button"
                className={`border-black border-1px rounded-lg w-10 flex justify-center items-center border-[1px] ${allowUnderline ? "text-slate-950 bg-slate-200 border-slate-950" : "text-slate-50 bg-slate-300 border-slate-400"} duration-200 aspect-square invisible peer-focus:visible opacity-0 peer-focus:opacity-100 my-2`}
                disabled={!allowUnderline}
                onClick={underlineText}
            >
                <FaUnderline />
            </button>

        </div>
    );
};

export default SentenceInput;
