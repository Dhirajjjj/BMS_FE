import React, { useContext, useState } from 'react';
import { loginUser } from '../../services/authService';
import { UserContext } from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import { getAccounts } from '../../services/accountService';
import { AccountContext } from '../../context/accountContext';
import { TransactionContext } from '../../context/transactionContext';
import { getTransactions } from '../../services/transactionService';

function Login() {

    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);
    const { setAccountData } = useContext(AccountContext);
    const { setTransactionData } = useContext(TransactionContext);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmitRequest = async (data) => {
        try {
            let newUserData = await loginUser(data);
            setUserData(newUserData);

            let userAccountData = await getAccounts(newUserData.id);
            setAccountData(userAccountData);
            
            if(userAccountData.length > 0) {
                let userTransactionData = await getTransactions( userAccountData[0].accountId);
                setTransactionData(userTransactionData);
            }

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
        <div class="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
            <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                <div class="flex items-center justify-center w-full lg:p-12">
                    <div class="flex items-center xl:p-10">
                        <form class="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl" onSubmit={handleSubmit}>
                            <h3 class="mb-3 text-4xl font-extrabold text-dark-gray-900">Login</h3>
                            <p class="mb-4 text-gray-600">Enter your email and password</p>
                            <label for="email" class="mb-2 text-md text-start text-gray-900">Email</label>
                            <input id="email" type="email" name="email" placeholder="mail@example.com" value={formData.email} onChange={handleChange} class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-7 placeholder:text-gray-400 rounded-md"/>
                            <label for="password" class="mb-2 text-md text-start text-gray-900">Password</label>
                            <input id="password" type="password" name="password" placeholder="Enter a password" value={formData.password} onChange={handleChange} class="flex items-center w-full px-5 py-2 mb-8 mr-2 text-md border border-gray-300 outline-none placeholder:text-gray-400 rounded-md"/>
                            <button class="w-full px-6 py-4 mb-5 text-sm font-bold leading-none text-white bg-indigo-500 md:w-96 rounded-md">Sign In</button>
                            <p class="text-md leading-relaxed text-gray-600">Not registered yet? <a href="/signup" class="font-bold text-gray-700">Create an Account</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;