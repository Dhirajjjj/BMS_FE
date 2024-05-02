import React, { useContext, useState } from 'react';

import logo from "../assets/icons/logo.png"
import { UserContext } from '../context/userContext';
import { useNavigate } from "react-router-dom";

function Topbar() {
    
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div class="w-full px-8 py-6 flex flex-row justify-between items-center bg-white border border-bottom">
            <a href="/dashboard"><img src={logo} width={"140px"} /></a>
            <div class="flex justify-center">
            <div class="relative inline-block">
                <button class="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:outline-none"
                    onClick={toggleDropdown}
                >
                    <span class="mx-1">{userData ? userData.name : "User"}</span>
                </button>

                {dropdownVisible && (<div class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl border">
                    <a href="/dashboard" class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform">
                        <div class="mx-1">
                            <h1 class="text-sm font-semibold text-gray-700">{userData ? userData.name : "User"}</h1>
                            <p class="text-sm text-gray-500">{userData ? userData.email : "User"}</p>
                        </div>
                    </a>
                    
                    <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform">
                        view profile
                    </a>
                    <div class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform cursor-pointer"
                        onClick={() => {
                            localStorage.removeItem("userData");
                            localStorage.removeItem("AccountData");
                            localStorage.removeItem("TransactionData");
                            navigate("/login");
                        }}
                    >
                        Sign Out
                    </div>
                </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default Topbar;