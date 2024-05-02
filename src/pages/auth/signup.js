import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { registerUser } from '../../services/authService';

function Signup() {

    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmitRequest = async (data) => {
        try {
            let newUserData = await registerUser(data);
            setUserData(newUserData);
            navigate("/dashboard");
        } catch (error) {
            console.log(`Error creating user: ${error.message}`);
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = (e) => {
        const isEmptyField = Object.values(formData).some(value => value.trim() === '');
        if (isEmptyField) {
            alert('Please fill in all fields.');
          } else {
            e.preventDefault();
            handleSubmitRequest(formData);
          }
    };

    return (
        <div class="container flex flex-col mx-auto bg-white rounded-lg pt-8">
            <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                <div class="flex items-center justify-center w-full lg:p-12">
                    <div class="flex items-center xl:p-10">
                        <form class="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit}>
                            <h3 class="mb-3 text-4xl font-extrabold text-dark-gray-900">Signup</h3>
                            <p class="mb-4 text-gray-600">Let us know about you</p>
                            <label for="name" class="mb-2 text-md text-start text-gray-900">Name</label>
                            <input id="name" type="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="email" class="mb-2 text-md text-start text-gray-900">Email</label>
                            <input id="email" type="email" name="email" placeholder="mail@example.com" value={formData.email} onChange={handleChange} class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="phone" class="mb-2 text-md text-start text-gray-900">Phone number</label>
                            <input id="phone" type="tel" name="phoneNumber" placeholder="+91" value={formData.phoneNumber} onChange={handleChange} class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="dob" class="mb-2 text-md text-start text-gray-900">Date of Birth</label>
                            <input id="dob" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="address" class="mb-2 text-md text-start text-gray-900">Address</label>
                            <input id="address" type="address" name="address" value={formData.address} onChange={handleChange} placeholder="House No. / Street / Loc" class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="password" class="mb-2 text-md text-start text-gray-900">Password</label>
                            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter a password" class="flex items-center w-full px-5 py-2 mb-4 mr-2 text-md border border-gray-300 outline-none placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="confirmPassword" class="mb-2 text-md text-start text-gray-900">Confirm Password</label>
                            <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" class="flex items-center w-full px-5 py-2 mb-4 mr-2 text-md border border-gray-300 outline-none placeholder:text-gray-400 rounded-md"/>
                            
                            <button class="w-full px-6 py-4 mb-5 text-sm font-bold leading-none text-white bg-indigo-500 md:w-96 rounded-md">Sign Up</button>
                            <p class="text-md leading-relaxed text-gray-600">Already have an account? <a href="/login" class="font-bold text-gray-700">Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;