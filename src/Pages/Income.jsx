import { LineChart } from "@mui/x-charts/LineChart";
import AllIncome from "../Components/All Income/All Income";
import { useContext, useState } from "react";
import { IncomeContext } from "../Context Api/IncomeContext";

export default function Income() {
  const { income, setIncome } = useContext(IncomeContext);
  const sortedData = [...(income?.incomes || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => ({
      ...item,
      date: item.date.substring(0, 10), 
    }));

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <h3 className="text-dark p-2">Income overview</h3>
        <LineChart
          xAxis={[
            { data: sortedData.slice(0,10).map((item) => item.date), scaleType: "band" },
          ]}
          series={[
            {
              data: sortedData.slice(0,10).map((item) => item.amount),
            },
          ]}
          height={300}
        />
      </div>
      <AllIncome />
    </>
  );
}
