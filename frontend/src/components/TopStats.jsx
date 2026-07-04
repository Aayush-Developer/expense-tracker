import React from "react";
import StatCard from "./StatCard";
import {
    FaWallet,
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaChartPie,
} from "react-icons/fa6";
const TopStats = ({ overview }) => {
    return (
        <div className="top-stats">

         <StatCard
    title="Total Balance"
    value={`₹${Number(overview?.totalBalance ?? 0).toLocaleString("en-IN")}`}
    icon={<FaWallet />}
    color="#2563EB"
/>

<StatCard
    title="Monthly Income"
   value={`₹${Number(overview?.monthlyIncome ?? 0).toLocaleString("en-IN")}`}
    icon={<FaArrowTrendUp />}
    color="#22C55E"
/>

<StatCard
    title="Monthly Expense"
  value={`₹${Number(overview?.monthlyExpense ?? 0).toLocaleString("en-IN")}`}
    icon={<FaArrowTrendDown />}
    color="#EF4444"
/>

<StatCard
    title="Saving Rate"
    value={`${overview?.savingRate ?? 0}`}
    icon={<FaChartPie />}
    color="#F59E0B"
/>
        </div>
    );
};

export default TopStats;