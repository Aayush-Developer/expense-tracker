import "../styles/analyticsCards.css";

const AnalyticsCards=({overview})=>{

    return(

        <div className="analytics-grid">

            <div className="analytics-box">

                <h4>Highest Income</h4>

                <h2>

                    ₹{overview?.highestIncome||0}

                </h2>

            </div>

            <div className="analytics-box">

                <h4>Highest Expense</h4>

                <h2>

                    ₹{overview?.highestExpense||0}

                </h2>

            </div>

            <div className="analytics-box">

                <h4>Average Income</h4>

                <h2>

                    ₹{overview?.averageIncome||0}

                </h2>

            </div>

            <div className="analytics-box">

                <h4>Average Expense</h4>

                <h2>

                    ₹{overview?.averageExpense||0}

                </h2>

            </div>

        </div>

    )

}

export default AnalyticsCards;