const Preview = ({ previewSentence }) => {

    return (
        <div>
            <p className="title-1">Preview<span className="text-red-700">*</span></p>
            <p
                className="min-h-[50px] bg-slate-100 inputField h-fit w-2/3 border border-black break-words"
                dangerouslySetInnerHTML={{ __html: previewSentence }}
            />
        </div>
    );
};

export default Preview;