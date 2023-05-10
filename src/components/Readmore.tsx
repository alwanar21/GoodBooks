import React, { useState } from 'react';
import { ReadMoreProps, ReadMoreQuillProps } from '../hooks/Types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export const ReadMoreQuill: React.FC<ReadMoreQuillProps> = ({ text, maxWords }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleReadMore = () => {
        setIsTruncated(!isTruncated);
    };

    const words = text.trim().split(' ');
    const truncatedWords = words.slice(0, maxWords);
    const displayText = isTruncated ? truncatedWords.join(' ') : text;

    return (
        <div>
            <ReactQuill
                readOnly
                value={displayText}
                theme="snow"
                modules={{ toolbar: false }}
                formats={[]}
                className='bg-slate-100'
            />
            {words.length > maxWords && (
                <span onClick={toggleReadMore} className="cursor-pointer text-secondary font-medium underline-offset-2 px-2 py-1 bg-orange-200">
                    {isTruncated ? 'Read more' : ' Read less'}
                </span>
            )}
        </div>
    );
};




const ReadMore: React.FC<ReadMoreProps> = ({ children, maxWords }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleReadMore = () => {
        setIsTruncated(!isTruncated);
    };

    const words = children.trim().split(' ');
    const truncatedWords = words.slice(0, maxWords);
    const displayText = isTruncated ? truncatedWords.join(' ') : children;

    return (
        <div>
            <p dangerouslySetInnerHTML={{ __html: displayText }} />
            {words.length > maxWords && (
                <span onClick={toggleReadMore} className="cursor-pointer text-secondary font-medium underline-offset-2 px-2 py-1 bg-orange-200">
                    {isTruncated ? 'Read more' : ' Read less'}
                </span>
            )}
        </div>
    );
};

export default ReadMore;
