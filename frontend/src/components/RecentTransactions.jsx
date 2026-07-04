import React from "react";
import TransactionList from "./TransactionList";
import "../styles/recentTransactions.css";
const RecentTransactions = ({ transactions }) => {
    return (
        <div className="recent-transactions">

            <h3>Recent Transactions</h3>

            <TransactionList
                transactions={transactions}
            />

        </div>
    );
};

export default RecentTransactions;