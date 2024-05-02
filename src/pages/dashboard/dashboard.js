
import { useContext } from "react";
import Topbar from "../../components/topbar";
import { AccountContext } from "../../context/accountContext";
import { TransactionContext } from "../../context/transactionContext";

const DataCard = ({title, value}) => {
    return (
        <div class="flex flex-col px-6 py-2 rounded-lg drop-shadow-md bg-white w-fit mx-6 border">
            <text class="text-md text-gray-500">{title}</text>
            <text class="text-2xl font-medium text-gray-900">{value}</text>
        </div>
    );
}

const StatusCard = ({title, type}) => {
    return (
        <div class="flex flex-col px-6 py-2 rounded-lg drop-shadow-md bg-white w-fit mx-6 border">
            <text class="text-md text-gray-500">{title}</text>
            <text class={`text-2xl font-medium ${type ? "text-green-600" : "text-red-600"}`}>{type ? "Active" : "Blocked"}</text>
        </div>
    );
}

const ServiceCard = ({title, desc, route}) => {
    return (
        <a href={route}>
            <div class="flex flex-col px-10 py-6 rounded-lg drop-shadow-md bg-indigo-500 w-fit mx-6 border">
                <text class="py-2 text-2xl text-white font-medium leading-none">{title}
                <br/>
                <span class="text-sm text-gray-300 leading-none">{desc}</span>
                </text>
            </div>
        </a>
    );
}

function Dashboard() {

    const { accountData } = useContext(AccountContext);
    const { transactionData } = useContext(TransactionContext);
    const balance = accountData.reduce((acc, account) => acc + account.balance, 0);
    const totalBalanceFormatted = balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const recentTransaction = transactionData ? transactionData[0].amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) : "0";
    const totalAccounts = accountData.length;

    return (
        <div class="flex flex-col w-full h-screen bg-gray-50">
            <Topbar />
            <div class="pt-12 mx-12">
                {accountData.length !== 0 ? (
                    <div class="flex flex-row mt-6 mb-12">
                        <DataCard title={"Current balance"} value={`$${totalBalanceFormatted}`}/>
                        <DataCard title={"Current accounts"} value={totalAccounts} />
                        <DataCard title={"Recent transaction"} value={`$${recentTransaction}`} />
                        <StatusCard title={"Account status"} type={true} />
                    </div>
                ) : (
                    <div class="flex flex-row w-fit items-center text-lg text-gray-400 px-8 py-4 border border-gray-300 rounded-md mb-12">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5" stroke="#A0aec0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.995 16h.009" stroke="#A0aec0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <span class="ml-4">Please create your banking account to get started</span>
                    </div>
                )}
                <text class="px-6 text-2xl font-bold text-gray-800">Services</text>
                <div class="flex flex-row mt-4 mb-12">
                    <ServiceCard title={"Withdraw / Deposit"} desc={"Handle account funds"} route={"/dashboard/funds"}/>
                    <ServiceCard title={"Transactions"} desc={"Check your recent transactions"} route={"/dashboard/transactions"}/>
                    <ServiceCard title={"Account"} desc={"All your account details"} route={"/dashboard/account"}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;