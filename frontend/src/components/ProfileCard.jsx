import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles/profileCard.css";

const ProfileCard = ({ name, email }) => {
    return (
        <div className="profile-card">

            <div className="profile-avatar">
                <FaUserCircle />
            </div>

            <h2>{name}</h2>

            <p>{email}</p>

            <div className="profile-divider"></div>

            <div className="profile-info">

                <div>
                    <span>Status</span>
                    <strong>Active</strong>
                </div>

                <div>
                    <span>Role</span>
                    <strong>User</strong>
                </div>

            </div>

        </div>
    );
};

export default ProfileCard;