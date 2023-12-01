import { useState } from 'react';

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
        } else {
            document.execCommand('insertHTML', false, underlinedText); // Add underline
        }

        setAllowUnderline(false);
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
        <div>
            <button
                type="button"
                className={`border-black border-1px rounded-md  px-4 py-2 ${allowUnderline ? "text-black bg-slate-200" : "text-slate-50 bg-slate-300"}`}
                disabled={!allowUnderline}
                onClick={underlineText}
            >
                U
            </button>
            <div
                id="sentenceInput"
                contentEditable
                style={{ width: '400px', border: '1px solid #ccc', padding: '8px' }}
                dangerouslySetInnerHTML={{ __html: question.sentence }}
                onBlur={changeHandler}
                onMouseUp={updateUnderlineButton}
            />
        </div>
    );
};

export default SentenceInput;