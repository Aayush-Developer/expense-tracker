import React from "react";
import {
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "react-icons/fa6";
import "../styles/transactionItem.css";


const TransactionItem = ({ transaction }) => {

    const isIncome = transaction.type === "income";

    return (

        <div className="transaction-item">

            <div className="transaction-left">

                <div
                    className={
                        isIncome
                            ? "transaction-icon income"
                            : "transaction-icon expense"
                    }
                >
                    {isIncome ? (
                        <FaArrowTrendUp />
                    ) : (
                        <FaArrowTrendDown />
                    )}
                </div>

                <div>

                    <h4>{transaction.description}</h4>

                    <span className="transaction-type">
                        {transaction.type}
                    </span>

                </div>

            </div>

            <div className="transaction-right">

                <h3
                    className={
                        isIncome
                            ? "income-amount"
                            : "expense-amount"
                    }
                >
                    {isIncome ? "+" : "-"}₹
                    {Number(transaction.amount).toLocaleString("en-IN")}
                </h3>

            </div>

        </div>

    );
};

export default TransactionItem;