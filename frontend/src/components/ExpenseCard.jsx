import React from "react";
import { FaShoppingCart, FaPen, FaTrash } from "react-icons/fa";
import "../styles/expenseCard.css";

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
    return (
        <div className="expense-card">

            <div className="expense-card-header">

                <div className="expense-icon">
                    <FaShoppingCart />
                </div>

                <div>

                    <h3>{expense.description}</h3>

                    <span className="expense-category">
                        {expense.category}
                    </span>

                </div>

            </div>

            <h2 className="expense-amount">
                ₹{Number(expense.amount).toLocaleString("en-IN")}
            </h2>

            <div className="expense-date">

                {new Date(expense.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}

            </div>

            <div className="expense-actions">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(expense)}
                >
                    <FaPen />
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(expense._id)}
                >
                    <FaTrash />
                    Delete
                </button>

            </div>

        </div>
    );
};

export default ExpenseCard;