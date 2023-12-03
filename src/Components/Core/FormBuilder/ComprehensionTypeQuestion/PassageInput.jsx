import React from 'react'

const PassageInput = ({ passage, setQuestion }) => {

    const handleChange = (e) => {
        setQuestion(prev => {
            return {
                ...prev,
                passage: e.target.value
            }
        });
    };

    const handleAutoResize = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };

    return (
        <textarea
            className='inputField w-2/3 h-auto min-h-[100px]  overflow-y-hidden'
            value={passage}
            placeholder='Enter the passage here'
            onChange={(e) => {
                handleChange(e);
                handleAutoResize(e);
            }}
        />
    );
}

export default PassageInput