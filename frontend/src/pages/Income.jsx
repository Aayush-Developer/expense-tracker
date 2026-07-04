import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/income.css";
import IncomeCard from "../components/IncomeCard";
import IncomeModal from "../components/IncomeModal";
import { useOutletContext } from "react-router-dom";

import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { FaPlus, FaFileExcel } from "react-icons/fa";

const Income = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [incomes, setIncomes] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const { refreshDashboard } = useOutletContext();

    useEffect(() => {
        fetchIncome();
    }, []);

    const fetchIncome = async () => {
        try {
            const response = await api.get("/income/get", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setIncomes(response.data.income);
        } catch (error) {
            console.error(error);

          toast.error(
    error.response?.data?.message ||
    "Failed to get income"
);
        }
    };
    const handleExport = async () => {
    try {

        const response = await api.get("/income/downloadIncome", {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;
        link.download = "income_details.xlsx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        toast.success("Income exported successfully");

    } catch (error) {
    console.error(error);

    console.log(error.response);

    toast.error(
        error.response?.data?.message || error.message
    );
}
};

    const handleEdit = (income) => {
        setDescription(income.description);
        setAmount(income.amount);
        setCategory(income.category);
        setDate(income.date.split("T")[0]);

        setEditingId(income._id);

        setShowModal(true);
    };
 const handleDelete = (id) => {

    setDeleteId(id);

    setShowDeleteModal(true);

};
    const confirmDelete = async (id) => {
        try {
            const response = await api.delete(`/income/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            
            toast.success(response.data.message);

            await fetchIncome();
            await refreshDashboard();
        } catch (error) {
            console.error(error);

           toast.error(
    error.response?.data?.message ||
    "Failed to delete income"
);
        }
    };

    const handleAddIncome = async (e) => {
        e.preventDefault();

        if (!description || !amount || !category || !date) {
            alert("All fields are required");
            return;
        }

        try {
            let response;

            if (editingId) {
                response = await api.put(
                    `/income/update/${editingId}`,
                    {
                        description,
                        amount,
                        category,
                        date,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
            } else {
                response = await api.post(
                    "/income/add",
                    {
                        description,
                        amount,
                        category,
                        date,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
            }

            await fetchIncome();
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

           toast.error(
    error.response?.data?.message ||
    "Failed to add income"
);
        }
    };

    return (
        <div className="income-page">

        <div className="income-header">

    <div className="income-header-left">

        <h1>Income Overview</h1>

        <p>Track and manage all your income.</p>

    </div>

    <div className="income-actions">

        <button
            className="export-btn"
            onClick={handleExport}
        >
            <FaFileExcel />
            Export Excel
        </button>

        <button
            className="add-income-btn"
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
            Add Income
        </button>

    </div>

</div>

            <div className="income-history">

                <h2>Income History</h2>

                <div className="income-grid">

                {incomes.map((income) => (
                    <IncomeCard
                    key={income._id}
                   income={income}
                   onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                    ))}

                 </div>

            </div>

            {showModal && (
                <IncomeModal
                    description={description}
                    amount={amount}
                    category={category}
                    date={date}
                    setDescription={setDescription}
                    setAmount={setAmount}
                    setCategory={setCategory}
                    setDate={setDate}
                    editingId={editingId}
                    handleAddIncome={handleAddIncome}
                    onClose={() => setShowModal(false)}
                />
            )}
            {showDeleteModal && (

    <DeleteModal

        title="Delete Income"

        message="Are you sure you want to delete this income? This action cannot be undone."

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

)}

        </div>
    );
};

export default Income;