import {
  HiMiniArrowTrendingDown,
  HiMiniArrowTrendingUp,
} from "react-icons/hi2";
import "./style.css";
import { PieChart } from "@mui/x-charts";
import { useContext } from "react";
import { IncomeContext } from "../../Context Api/IncomeContext";
import { ExpenseContext } from "../../Context Api/ExpenseContext";

export default function AllTransactions() {
  const { income } = useContext(IncomeContext);
  const { expense } = useContext(ExpenseContext);

  const combinedData = [...(income.incomes || []), ...(expense.expenses || [])];

  const sortedData = combinedData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => ({
      ...item,
      date: item.date?.substring(0, 10) || "",
    }));

  return (
    <>
      <div className="dashboard-transactions">
        <div className="dashboard-recent_transaction">
          <h5>Recent Transactions</h5>

          <div className="recent-transaction-box">
            {sortedData.length === 0 ? (
              <>
                <div className="text-center p-4">
                  <p>No Transaction found </p>
                </div>
              </>
            ) : (
              <>
                {sortedData.map((data) => {
                  return data.category ? (
                    <div className="transaction mb-3">
                      <div className="m-0 d-flex align-items-center ">
                        <img
                          src={data?.icon}
                          className="me-2"
                          style={{ width: "3rem" }}
                          alt=""
                        />
                        <div>
                          <h6>{data?.category}</h6>
                          <p>{data?.date}</p>
                        </div>
                      </div>
                      <div className="transaction-expense">
                        <p>-{data.amount}</p>
                        <HiMiniArrowTrendingDown />
                      </div>
                    </div>
                  ) : (
                    <div className="transaction mb-3">
                      <div className="m-0 d-flex align-items-center ">
                        <img
                          src={data?.icon}
                          className="me-2"
                          style={{ width: "3rem" }}
                          alt=""
                        />
                        <div>
                          <h6>{data?.source}</h6>
                          <p>{data?.date}</p>
                        </div>
                      </div>
                      <div className="transaction-income">
                        <p>+{data.amount}</p>
                        <HiMiniArrowTrendingUp />
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            
          </div>
        </div>
        <div className="dashboard-transaction_overview">
          <h5>Financial Overview</h5>
          <div className="d-flex text-center mt-3 w-100">
            <PieChart
              className="pie-chart w-75 "
              id="pie-chart-1"
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: income?.total || 10,
                      label: "Income",
                      color: "#2dab2d",
                    },
                    {
                      id: 1,
                      value: expense?.total || 10,
                      label: "Expense",
                      color: "#f46c06",
                    },
                    {
                      id: 2,
                      value: (income?.total || 10) - (expense?.total || 10),
                      label: "Balance",
                      color: "rgb(127, 6, 127)",
                    },
                  ],
                },
              ]}
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </>
  );
}
