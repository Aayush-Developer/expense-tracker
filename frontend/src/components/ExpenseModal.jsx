import React from "react";

const ExpenseModal = ({
    description,
    amount,
    category,
    date,

    setDescription,
    setAmount,
    setCategory,
    setDate,

    editingId,

    handleAddExpense,

    onClose,
}) => {
    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {editingId ? "Update Expense" : "Add Expense"}
                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <form
                    onSubmit={handleAddExpense}
                    className="modal-form"
                >

                    <div className="form-group">

                        <label>Description</label>

                        <input
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Amount</label>

                            <input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                            />

                        </div>

                        <div className="form-group">

                            <label>Category</label>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            >
                                <option value="">
                                    Select Category
                                </option>

                                <option value="Food">Food</option>

                                <option value="Transport">
                                    Transport
                                </option>

                                <option value="Shopping">
                                    Shopping
                                </option>

                                <option value="Rent">Rent</option>

                                <option value="Bills">Bills</option>

                                <option value="Entertainment">
                                    Entertainment
                                </option>

                                <option value="Healthcare">
                                    Healthcare
                                </option>

                                <option value="Education">
                                    Education
                                </option>

                                <option value="Travel">
                                    Travel
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        />

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-btn expense-submit-btn"
                        >
                            {editingId
                                ? "Update Expense"
                                : "Add Expense"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ExpenseModal;