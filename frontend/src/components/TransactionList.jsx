import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions }) => {

    if (!transactions || transactions.length === 0) {
        return <p>No Transactions Found</p>;
    }

    return (
        <div className="transaction-list">
         {
            transactions.map((transaction)=>(
         
               <TransactionItem  key={transaction._id} transaction={transaction}/>
             
                       
               
            ))
         }
        </div>
    );
};

export default TransactionList;