import { LineChart } from "@mui/x-charts";
import AllExpense from "../Components/All Expense/AllExpense";
import { ExpenseContext } from "../Context Api/ExpenseContext";
import { useContext } from "react";

export default function Expense() {
  const { expense } = useContext(ExpenseContext);
  const sortedData = [...(expense?.expenses || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => ({
      ...item,
      date: item.date.substring(0, 10), // Ensure date is in 'YYYY-MM-DD' format
    }));

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <h3 className="text-dark p-2">Expense overview</h3>
        <LineChart
          xAxis={[
            { data: sortedData.map((item) => item.date), scaleType: "band" },
          ]}
          series={[
            {
              data: sortedData.map((item) => item.amount),
            },
          ]}
          height={300}
        />
      </div>
      <AllExpense />
    </>
  );
}
