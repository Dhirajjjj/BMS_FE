import { useContext, useState } from "react";
import Topbar from "../../components/topbar";
import { AccountContext } from "../../context/accountContext";
import { createAccount } from "../../services/accountService";
import { UserContext } from "../../context/userContext";

const AccountCard = ({ data, user }) => {
    return (
        <div class="flex flex-col px-6 py-8 rounded-lg drop-shadow-md bg-white w-full border">
            <text class="justify-center text-lg font-medium text-gray-600 leading-none">{user.name} <span class="ml-4 text-sm font-normal text-gray-400">User ID #{user.id}</span></text>
            <text class="text-sm text-gray-400 leading-1">{user.email}</text>
            <br />
            <text class="text-md font-medium text-gray-500"><span class="text-sm font-normal text-gray-400 leading-1">Account ID:</span> {data.accountId}</text>
            <text class="text-lg font-medium text-gray-900"><span class="text-sm font-normal text-gray-400 leading-1">Balance:</span> ${data.balance}</text>
        </div>
    );
}

function Account() {

    const { accountData, setAccountData } = useContext(AccountContext);
    const { userData } = useContext(UserContext);

    const [formData, setFormData] = useState({
        accountHolderId: '',
        balance: ''
    });

    const handleSubmitRequest = async (data) => {
        try {
            let accountData = await createAccount(data);
            console.log(accountData);
            setAccountData(accountData);
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
        <div class="flex flex-col w-full h-screen bg-gray-50">
            <Topbar />
            <div class="grid grid-cols-2">
                
                <div class="flex mt-8 justify-center w-full h-full xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div class="flex items-center justify-center w-full lg:p-12">
                        <div class="flex items-center xl:p-10">
                            <form class="flex flex-col w-full h-full p-8 pb-6 text-center bg-white rounded-md border" onSubmit={handleSubmit}>
                                <text class="text-3xl font-medium text-gray-600">Account</text>
                                
                                <label for="accountHolderId" class="mb-2 text-md text-start text-gray-900">User ID</label>
                                <input id="accountHolderId" type="accountHolderId" name="accountHolderId" value={formData.accountHolderId} onChange={handleChange} placeholder="#" class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                                
                                <label for="balance" class="mb-2 text-md text-start text-gray-900">Amount</label>
                                <input id="balance" type="number" name="balance" value={formData.balance} onChange={handleChange} placeholder="$" class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>

                                <button class="w-full px-6 py-4 mb-5 text-sm font-bold leading-none text-white bg-indigo-500 md:w-96 rounded-md">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 m-8">
                    {accountData.length > 0 ?
                        accountData.map(data => (
                            <AccountCard data={data} user={userData} />
                        )
                    ) : (
                        <div className="w-2/3 px-4 py-12 text-center">
                            <span className="text-md text-gray-400" >No accounts have been made</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Account;