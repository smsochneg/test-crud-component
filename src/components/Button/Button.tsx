import React from 'react';

interface IButtonProps {
    classNames?: string[];
    text: string;
    onClick: () => void;
}

export const Button: React.FC<IButtonProps> = ({ classNames, text, onClick }) => {
    return (
        <button
            type="button"
            className={`btn mr-1 ${classNames.join(' ')}`}
            onClick={() => { onClick() }}
        >
            {text}
        </button>
    );
}
