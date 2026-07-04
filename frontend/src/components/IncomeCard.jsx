import React from "react";
import { FaMoneyBillWave, FaPen, FaTrash } from "react-icons/fa";
import "../styles/incomeCard.css";

const IncomeCard = ({ income, onEdit, onDelete }) => {
    return (
        <div className="income-card">

            <div className="income-card-header">

                <div className="income-icon">
                    <FaMoneyBillWave />
                </div>

                <div>
                    <h3>{income.description}</h3>

                    <span className="income-category">
                        {income.category}
                    </span>
                </div>

            </div>

            <h2 className="income-amount">
                ₹{Number(income.amount).toLocaleString("en-IN")}
            </h2>

            <div className="income-date">

                {new Date(income.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}

            </div>

            <div className="income-actions">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(income)}
                >
                    <FaPen /> Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(income._id)}
                >
                    <FaTrash /> Delete
                </button>

            </div>

        </div>
    );
};

export default IncomeCard;