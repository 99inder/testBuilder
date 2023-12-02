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
            className='w-[200px] h-auto min-h-[50px] border-[1px] border-black p-2 overflow-y-hidden'
            value={passage}
            onChange={(e) => {
                handleChange(e);
                handleAutoResize(e);
            }}
        />
    );
}

export default PassageInput