import React from "react";

const IncomeModal = ({
    description,
    amount,
    category,
    date,

    setDescription,
    setAmount,
    setCategory,
    setDate,

    editingId,

    handleAddIncome,

    onClose,
}) => {
    return (
        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        {editingId ? "Update Income" : "Add Income"}
                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <form onSubmit={handleAddIncome} className="modal-form">

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
                                <option value="">Select Category</option>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Business">Business</option>
                                <option value="Investment">Investment</option>
                                <option value="Bonus">Bonus</option>
                                <option value="Gift">Gift</option>
                                <option value="Rental">Rental</option>
                                <option value="Other">Other</option>
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
                            className="submit-btn"
                        >
                            {editingId ? "Update Income" : "Add Income"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default IncomeModal;