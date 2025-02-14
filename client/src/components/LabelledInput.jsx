import React from 'react';

const LabelledInput = ({
    label,
    type,
    placeholder,
    name,
    value,
    onChange,
    error
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm text-white tracking-widest font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={`shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default LabelledInput;
