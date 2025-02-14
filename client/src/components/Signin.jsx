import { useState } from "react";
import LabelledInput from "./LabelledInput";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types";

const Signin = ({ onClick, setIsLoading }) => {
    const [formData, setFormData] = useState({
        username: 'Utkarsh',
        password: 'utk'
    })
    const [formError, setFormError] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

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
                const response = await axios.post(`https://numquest.onrender.com/login`, {
                    username: formData.username,
                    password: formData.password
                });
                localStorage.setItem('token', `Bearer ${response.data.token}`);
                setIsLoading(false)
                navigate('/game');
            } catch (error) {
                setServerError(error?.response?.data?.msg)
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
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="w-3/4 md:w-2/4">
                <p className="text-3xl font-bold text-center py-3">Login</p>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <LabelledInput 
                        label="Username" 
                        type="text"
                        placeholder="Enter your username"
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
                    <button type="submit" className="w-full border p-1 rounded-lg bg-[#273b40] text-white mt-4 hover:opacity-75 font-medium">Signin</button>
                </form>
                <p className="text-sm p-1 float-right">Create an account? <button onClick={() => onClick(false)} className="underline font-bold">Signup</button></p>
            </div>
        </div>
    );
};

export default Signin;

Signin.propTypes = {
    onClick: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired
};
