const Preview = ({ previewSentence }) => {

    return (
        <div>
            Preview*
            <p
                style={{ minHeight: 20, width: 400, border: '1px solid black', wordWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: previewSentence }}
            />
        </div>
    );
};

export default Preview;