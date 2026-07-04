import React, { useState, useEffect } from "react";
import api from "../services/api";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseModal from "../components/ExpenseModal";
import { useOutletContext } from "react-router-dom";

import { toast } from "react-toastify";
import "../styles/expense.css";
import DeleteModal from "../components/DeleteModal";
import { FaPlus, FaFileExcel } from "react-icons/fa";

const Expense = () => {
    const [expenses, setExpenses] = useState([]);

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
  
    const [editingId, setEditingId] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const { refreshDashboard } = useOutletContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchExpense();
    }, []);

    const fetchExpense = async () => {
        try {
            const response = await api.get("/expense/get", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setExpenses(response.data.expense);
        } catch (error) {
            console.error(error);

            alert(
    error.response?.data?.message ||
    "Failed to fetch expense"
);
        }
    };
    const handleExport = async () => {
    try {
        const response = await api.get(
            "/expense/downloadExpense",
            {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;
        link.download = "expense_details.xlsx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast.success("Expense exported successfully");

    } catch (error) {
        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Failed to export expense"
        );
    }
};

    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!description || !amount || !category || !date) {
          
             toast.warning("All fields are required");
            return;
        }

        try {
            let response;

            if (editingId) {
                response = await api.put(
                    `/expense/update/${editingId}`,
                    {
                        description,
                        amount,
                        category,
                        date,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            } else {
                response = await api.post(
                    "/expense/add",
                    {
                        description,
                        amount,
                        category,
                        date,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
            }

            await fetchExpense();
            await refreshDashboard();

            setDescription("");
            setAmount("");
            setCategory("");
            setDate("");

            setEditingId(null);

            setShowModal(false);

           toast.success(response.data.message);
        } catch (error) {
            console.error(error);

           alert(
    error.response?.data?.message ||
    "Failed to add expense"
);
        }
    };

    const handleEdit = (expense) => {
        setDescription(expense.description);
        setAmount(expense.amount);
        setCategory(expense.category);
        setDate(expense.date.split("T")[0]);

        setEditingId(expense._id);

        setShowModal(true);
    };
   const handleDelete=async(id)=>{
    setDeleteId(id)
    setShowDeleteModal(true)

   }
    const confirmDelete = async (id) => {
        try {
            const response = await api.delete(
                `/expense/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            toast.success(response.data.message);

            await fetchExpense();

            await refreshDashboard();
        } catch (error) {
            console.error(error);

           toast.error(
        error.response?.data?.message ||
        "Failed to edit expense"
    );

        }
    };

    return (
        <div className="expense-page">

          <div className="expense-header">

    <div className="expense-header-left">

        <h1>Expense Overview</h1>

        <p>Track and manage all your expenses.</p>

    </div>

    <div className="expense-actions">

        <button
            className="export-btn"
            onClick={handleExport}
        >
            <FaFileExcel />
            Export Excel
        </button>

        <button
            className="add-expense-btn"
            onClick={() => {

                setEditingId(null);

                setDescription("");

                setAmount("");

                setCategory("");

                setDate("");

                setShowModal(true);

            }}
        >
            <FaPlus />
            Add Expense
        </button>

    </div>

</div>

            <div className="expense-history">

                <h2>Expense History</h2>

                <div className="expense-grid">

                    {expenses.map((expense) => (
                        <ExpenseCard
                            key={expense._id}
                            expense={expense}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

            </div>

            {showModal && (
                <ExpenseModal
                    description={description}
                    amount={amount}
                    category={category}
                    date={date}

                    setDescription={setDescription}
                    setAmount={setAmount}
                    setCategory={setCategory}
                    setDate={setDate}

                    editingId={editingId}

                    handleAddExpense={handleAddExpense}

                    onClose={() => setShowModal(false)}
                />
            )}
           {
            showDeleteModal && (
               <DeleteModal

        title="Delete Expense"

        message="Are you sure you want to delete this expense? This action cannot be undone."

        onCancel={() => {

            setShowDeleteModal(false);

            setDeleteId(null);

        }}

        onConfirm={async () => {

            await confirmDelete(deleteId);

            setShowDeleteModal(false);

            setDeleteId(null);

        }}

    />
            )
           }
        </div>
    );
};

export default Expense;