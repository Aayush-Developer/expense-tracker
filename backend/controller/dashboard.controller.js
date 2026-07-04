import incomeModel from "../model/income.model.js";
import expenseModel from "../model/expense.model.js";

//----------------Get Dashboard Overview----------------

export const getDashboardOverview=async (req,res)=>{
     const userId=req.user._id
     const now =new Date();
     const startOfMonth=new Date(now.getFullYear(),now.getMonth(),1);
     try{
        const incomes=await incomeModel.find({userId,
            date:{$gte:startOfMonth,$lte:now}
        }).lean()

        const expenses=await expenseModel.find({userId,
            date:{$gte:startOfMonth,$lte:now}
        }).lean()

        const monthlyIncome = incomes.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
    const monthlyExpense = expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
    const savings = monthlyIncome - monthlyExpense;
    const savingsRate = monthlyIncome === 0 ? 0 : Math.round((savings / monthlyIncome) * 100);

    const recentTransactions = [
      ...incomes.map((i) => ({ ...i, type: "income" })),
      ...expenses.map((e) => ({ ...e, type: "expense" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const spendByCategory = {};
    for (const exp of expenses) {
      const cat = exp.category || "Other";
      spendByCategory[cat] = (spendByCategory[cat] || 0) + Number(exp.amount || 0);
    }

    const expenseDistribution = Object.entries(spendByCategory).map(([category, amount]) => ({
      category,
      amount,
      percent: monthlyExpense === 0 ? 0 : Math.round((amount / monthlyExpense) * 100),
    }));

    return res.status(200).json({
        success:true,
        data:{
            totalBalance: savings,
        monthlyIncome,
        monthlyExpense,
        savingRate: savingsRate,
        recentTransactions,
        spendByCategory,
        expenseDistribution

        }
    })
     }
     catch(error){
          console.error(error)
          return res.status(500).json({
            success:false,
            message:'Dashboard data fetch failed'
          })
     }
}


// ---------------- Dashboard Analytics ----------------

export const getDashboardAnalytics = async (req, res) => {
    try {

        const userId = req.user._id;
        const range = req.query.range || "month";

        let labels = [];
        let trend = [];

        if (range === "year") {

            labels = [
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
            ];

            for (let i = 0; i < 12; i++) {

                const start = new Date(
                    new Date().getFullYear(),
                    i,
                    1
                );

                const end = new Date(
                    new Date().getFullYear(),
                    i + 1,
                    0,
                    23,
                    59,
                    59
                );

                const incomes = await incomeModel.find({
                    userId,
                    date: {
                        $gte: start,
                        $lte: end
                    }
                });

                const expenses = await expenseModel.find({
                    userId,
                    date: {
                        $gte: start,
                        $lte: end
                    }
                });

                trend.push({

                    label: labels[i],

                    income: incomes.reduce(
                        (sum, item) =>
                            sum + Number(item.amount),
                        0
                    ),

                    expense: expenses.reduce(
                        (sum, item) =>
                            sum + Number(item.amount),
                        0
                    )

                });

            }

        }

        else if (range === "month") {

            labels = [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4",
                "Week 5"
            ];

            const now = new Date();

            for (let i = 0; i < 5; i++) {

                const start = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    i * 7 + 1
                );

                const end = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    Math.min((i + 1) * 7, 31),
                    23,
                    59,
                    59
                );

                const incomes = await incomeModel.find({
                    userId,
                    date: {
                        $gte: start,
                        $lte: end
                    }
                });

                const expenses = await expenseModel.find({
                    userId,
                    date: {
                        $gte: start,
                        $lte: end
                    }
                });

                trend.push({

                    label: labels[i],

                    income: incomes.reduce(
                        (sum, item) =>
                            sum + Number(item.amount),
                        0
                    ),

                    expense: expenses.reduce(
                        (sum, item) =>
                            sum + Number(item.amount),
                        0
                    )

                });

            }

        }

       else {

    labels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

    const today = new Date();

    // Monday of current week
    const monday = new Date(today);

    const day = monday.getDay();

    const diff = day === 0 ? -6 : 1 - day;

    monday.setDate(monday.getDate() + diff);

    monday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {

        const start = new Date(monday);

        start.setDate(monday.getDate() + i);

        start.setHours(0, 0, 0, 0);

        const end = new Date(start);

        end.setHours(23, 59, 59, 999);

        const incomes = await incomeModel.find({
            userId,
            date: {
                $gte: start,
                $lte: end,
            },
        });

        const expenses = await expenseModel.find({
            userId,
            date: {
                $gte: start,
                $lte: end,
            },
        });

        trend.push({
            label: labels[i],
            income: incomes.reduce(
                (sum, item) => sum + Number(item.amount),
                0
            ),
            expense: expenses.reduce(
                (sum, item) => sum + Number(item.amount),
                0
            ),
        });

    }

}

        const totalIncome = trend.reduce(
            (sum, item) => sum + item.income,
            0
        );

        const totalExpense = trend.reduce(
            (sum, item) => sum + item.expense,
            0
        );

        const balance = totalIncome - totalExpense;

        const savingRate =
            totalIncome === 0
                ? 0
                : Math.round(
                      (balance / totalIncome) * 100
                  );

        return res.status(200).json({

            success: true,

            data: {

                summary: {

                    income: totalIncome,

                    expense: totalExpense,

                    balance,

                    savingRate

                },

                trend

            }

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Analytics fetch failed"

        });

    }

};