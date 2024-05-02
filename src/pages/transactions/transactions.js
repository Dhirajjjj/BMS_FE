import { useContext, useEffect } from "react";
import Topbar from "../../components/topbar";
import { TransactionContext } from "../../context/transactionContext";
import { UserContext } from "../../context/userContext";
import { AccountContext } from "../../context/accountContext";
import { getTransactions } from "../../services/transactionService";

const TransactionListHeader = () => {
    return (
        <div className="flex flex-row w-2/3 px-4 py-2 items-center bg-indigo-400 justify-between border border-solid border-1 rounded-t-md border-gray-200">
            <div className="py-1 flex flex-col items-start">
                <span className="text-2xl font-bold text-white">Transactions</span>
                <span className="text-xs font-medium text-gray-200">View all recent transactions</span>
            </div>
        </div>
    );
}

const TransactionColumnHeader = () => {
    return (
        <div className="w-2/3 px-4 py-2 grid grid-cols-10 border-x border-b border-gray-200 bg-gray-100">
            <span className="text-xs font-medium text-gray-500 col-span-3">NAME</span>
            <span className="text-xs font-medium text-gray-500 col-span-2 text-center">TYPE</span>
            <span className="text-xs font-medium text-gray-500 col-span-2 text-center">AMOUNT</span>
            <span className="text-xs font-medium text-gray-500 col-span-2 text-center">DATE</span>
        </div>
    );
}

const TransactionListCard = ({ data, userData }) => {

    const formatDOB = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    const formatCreatedDate = (dateTimeString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-GB', options);
    };

    const transactionAmount = data ? data.amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) : "0";

    return (
        <div className="flex flex-col w-2/3 bg-white">    
            <div className="px-4 py-2 gap-2 grid grid-cols-10 items-center border-b border-x border-gray-200 text-sm">
                <div className="col-span-3 py-1 flex flex-col items-start">
                    <span className="font-medium text-gray-500">{`#${data.transactionId}`}</span>
                    <span className="text-sm text-gray-500">{userData.email}</span>
                </div>
                <span className="col-span-2 font-normal text-gray-500 text-center">{data.type}</span>
                <span className="col-span-2 font-normal text-gray-500 text-center">{`$${transactionAmount}`}</span>
                <span className="col-span-2 font-normal text-gray-500 text-center">24 April 2024</span>
            </div>
        </div>
    );
}

const TransactionListFooter = ({ userListSize }) => {
    return (
        <div className="flex flex-row items-center bg-indigo-400 justify-between w-2/3 px-4 py-2 border-b border-x border-gray-200 rounded-b-md">
            <div className="text-sm font-medium text-gray-100">{userListSize} results</div>
        </div>
    );
}



function Transactions() {

    const { transactionData, setTransactionData } = useContext(TransactionContext);
    const { userData } = useContext(UserContext);
    const { accountData } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getTransactions(accountData[0].accountId);
            setTransactionData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [setTransactionData]);

    return (
        <div class="flex flex-col w-full h-fit bg-gray-50">
            <Topbar />
            <div class="flex flex-col items-center p-12 overflow-scroll-y">
                <TransactionListHeader />
                <TransactionColumnHeader />
                {transactionData.length > 0 ? 
                    transactionData.map(data => (
                        <TransactionListCard data={data} userData={userData}/>
                    )) : (
                    <div className="w-2/3 bg-gray-50 px-4 py-12 text-center border-x border-b border-gray-200">
                        <span className="text-md text-gray-400" >No transactions have been made</span>
                    </div>
                )}
                <TransactionListFooter userListSize={transactionData.length}/>
            </div>
        </div>
    );
}

export default Transactions;