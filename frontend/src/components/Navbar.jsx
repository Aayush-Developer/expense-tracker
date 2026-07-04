import React from "react";
import "../styles/navbar.css";
import logo from "../assets/hero.png";

const Navbar = ({ user }) => {
   
  console.log("Navbar user:", user)
    return (
        <header className="navbar">

            <div className="navbar-left">

                <img
                    src={logo}
                    alt="Expense Tracker"
                    className="navbar-logo"
                />

                <h2 className="navbar-title">
                    Expense Tracker
                </h2>

            </div>

            <div className="navbar-right">

                <div className="navbar-avatar">
                    {user?.name?.charAt(0).toUpperCase() || "G"}
                </div>

                <div className="navbar-user">

                    <h4>{user?.name || "Guest"}</h4>

                    <p>{user?.email || "guest@email.com"}</p>

                </div>

            </div>

        </header>
    );
};

export default Navbar;