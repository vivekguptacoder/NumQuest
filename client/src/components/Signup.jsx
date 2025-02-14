import { useState } from "react";
import LabelledInput from "./LabelledInput";
import axios from "axios";
import PropTypes from "prop-types";

const Signup = ({ onClick, setIsLoading }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formError, setFormError] = useState({});
    const [serverError, setServerError] = useState('');

    const validate = () => {
        const newErrors = {};

        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';

        setFormError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                setIsLoading(true)
                await axios.post('https://numquest.onrender.com/signup', formData);
                onClick(true);
                setFormData({
                    username: '',
                    password: ''
                });
                setIsLoading(false)
            } catch (error) {
                const axiosError = error;
                setServerError(axiosError.response?.data?.error || 'Something went wrong. Please try again.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setFormError(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));

        setServerError('');
    };

    return (
        <>  
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="w-3/4 md:w-2/4">
                    <p className="text-3xl font-bold text-center py-3">Create an account</p>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <LabelledInput 
                            label="Username" 
                            type="text"
                            placeholder="Enter your name"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            error={formError.username}
                        />
                        <LabelledInput 
                            label="Password" 
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={formError.password}
                        />
                        {serverError && (
                            <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
                        )}
                        <button type="submit" className="w-full border p-1 rounded-lg bg-[#273b40] text-white mt-4 hover:opacity-75">
                            Signup
                        </button>
                    </form>
                    <p className="text-sm float-right p-1">
                        Already have an account? 
                        <button onClick={() => onClick(true)} className="underline font-bold p-1">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;

Signup.propTypes = {
    onClick: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired
};