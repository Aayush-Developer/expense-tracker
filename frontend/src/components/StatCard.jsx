import React from "react";
import "../styles/statcard.css";

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="stat-card">

            <div
                className="stat-icon"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>

            <div className="stat-body">

                <p className="stat-title">
                    {title}
                </p>

                <h2 className="stat-value">
                    {value}
                </h2>

                <span className="stat-subtitle">
                    Updated just now
                </span>

            </div>

        </div>
    );
};

export default StatCard;