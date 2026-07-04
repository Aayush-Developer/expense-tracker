import { Routes, Route,Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Profile from "./pages/Profile";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
    <Routes>
         <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login/>} />
     
     <Route path="/register" element={<Register />} />

    <Route element={<ProtectedRoute />}>

    <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/profile" element={<Profile />} />

    </Route>

</Route>
</Routes>
 <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
    />
</>
  );
}

export default App;