import { useContext, useState } from "react";
import Topbar from "../../components/topbar";
import { accountDeposit, accountWithdraw } from "../../services/accountService";
import { AccountContext } from "../../context/accountContext";

function Funds() {

    const { setAccountData } = useContext(AccountContext);
    const [type, setType] = useState(1);

    const [formData, setFormData] = useState({
        accountId: '',
        amount: ''
    });

    const handleSubmitRequest = async (data) => {
        try {
            let accountData;
            if(type === 2) {
                accountData = await accountDeposit(data);
            } else if(type === 1) {
                accountData = await accountWithdraw(data);
            }
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
        <div class="flex flex-col w-full h-full bg-gray-50">
            <Topbar />
            <div class="flex mt-8 justify-center w-full h-full xl:gap-14 lg:justify-normal md:gap-5 draggable">
                <div class="flex items-center justify-center w-full lg:p-12">
                    <div class="flex items-center xl:p-10">
                        <form class="flex flex-col w-full h-full p-8 pb-6 text-center bg-white rounded-md border" onSubmit={handleSubmit}>
                            <text class="text-3xl font-medium text-gray-600">Funds</text>
                            
                            <label for="accountId" class="mb-2 text-md text-start text-gray-900">Account ID</label>
                            <input id="accountId" type="accountId" name="accountId" value={formData.accountId} onChange={handleChange} placeholder="#" class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="amount" class="mb-2 text-md text-start text-gray-900">Amount</label>
                            <input id="amount" type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="$" class="flex items-center w-full px-5 py-2 mr-2 text-md border border-gray-300 outline-none mb-4 placeholder:text-gray-400 rounded-md"/>
                            
                            <label for="type" class="mb-2 text-md text-start text-gray-900">Type</label>
                            
                            <div class={`flex flex-row w-full justify-between mb-8 font-medium text-gray-500`}>
                                <div class={`px-4 py-2 rounded-md border w-1/2 ${type === 1 ? "bg-indigo-50 border-indigo-300 text-indigo-500" : "border-gray-300"} hover:select cursor-pointer`}
                                    onClick={() => setType(1)}
                                >
                                    <text>Withdraw</text>
                                </div>
                                <div class={`px-4 py-2 rounded-md border w-1/2 ml-2 ${type === 2 ? "bg-indigo-50 border-indigo-300 text-indigo-500" : "border-gray-300"} cursor-pointer`}
                                    onClick={() => setType(2)}
                                >
                                    <text>Deposit</text>
                                </div>
                            </div>

                            <button class="w-full px-6 py-4 mb-5 text-sm font-bold leading-none text-white bg-indigo-500 md:w-96 rounded-md">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Funds;