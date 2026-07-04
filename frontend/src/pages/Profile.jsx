
import React  from 'react'
import api from "../services/api"
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import "../styles/profile.css";
const Profile = () => {
  //user info states
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")

  //password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchProfile=async()=>{
        try{
          const response=await api.get('/user/me',{
              headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }
          })
          setName(response.data.user.name)
          setEmail(response.data.user.email)
        }
         catch(error){
        console.error(error)
        toast.error(
    error.response?.data?.message ||
    "Failed to fetch profile"
);
  } 
};
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name || !email) {
         toast.warning("All fields are required");
        return;
    }

    try {
        const response = await api.put(
            "/user/profile",
            {
                name,
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        toast.success(response.data.message);
        // Update localStorage with latest user details
        const user = JSON.parse(localStorage.getItem("user"));
        user.name = name;
        user.email = email;
        localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.error(error);

        toast.error(
    error.response?.data?.message ||
    "Failed to update profile "
);
    }
};
const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {
         toast.warning("All fields are required");
        return;
    }

    if (newPassword.length < 8) {
        
         toast.warning("New password must be at least 8 characters long");
        return;
    }

    if (newPassword !== confirmPassword) {
      
          toast.warning("Passwords do not match");
        
        return;
    }

    try {
        const response = await api.put(
            "/user/password",
            {
                currentPassword,
                newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

       toast.success(response.data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    } catch (error) {
        console.error(error);

       toast.error(
    error.response?.data?.message ||
    "Failed to update password"
);
    }
};
useEffect(() => {
    fetchProfile();
}, []);
  
   
   return (
    <div className="profile-page">

        <div className="profile-left">

            <ProfileCard
                name={name}
                email={email}
            />

        </div>

        <div className="profile-right">

            {/* Personal Information */}

            <div className="profile-section">

                <h2>Personal Information</h2>

                <form
                    onSubmit={handleUpdateProfile}
                    className="profile-form"
                >

                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Email Address</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <button
                        type="submit"
                        className="save-profile-btn"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

            {/* Change Password */}

            <div className="profile-section">

                <h2>Change Password</h2>

                <form
                    onSubmit={handleChangePassword}
                    className="profile-form"
                >

                    <div className="form-group">

                        <label>Current Password</label>

                        <input
                            type="password"
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>New Password</label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="change-password-btn"
                    >
                        Update Password
                    </button>

                </form>

            </div>

        </div>

    </div>
);

  
}


export default Profile