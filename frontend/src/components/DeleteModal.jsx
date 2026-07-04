import React from "react";
import "../styles/deleteModal.css";
import { FaTrashCan } from "react-icons/fa6";

const DeleteModal = ({
    title,
    message,
    onCancel,
    onConfirm,
}) => {
    return (
        <div className="delete-overlay">

            <div className="delete-modal">

                <div className="delete-icon">
             <FaTrashCan />
           </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="delete-buttons">

                    <button
                        className="cancel-delete-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteModal;