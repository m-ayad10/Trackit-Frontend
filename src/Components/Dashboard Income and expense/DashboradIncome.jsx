import { FaArrowRightLong } from "react-icons/fa6";
import "./style.css";
import {
  HiMiniArrowTrendingDown,
  HiMiniArrowTrendingUp,
} from "react-icons/hi2";
import { IncomeContext } from "../../Context Api/IncomeContext";
import { useContext } from "react";
import { ExpenseContext } from "../../Context Api/ExpenseContext";
import { useNavigate } from "react-router-dom";

export default function DashboardIncomeAndExpense() {
  const { income, setIncome } = useContext(IncomeContext);
  const { expense, setExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="dashboard-expense_income">
        <div className="dashboard-income-box">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Income</h5>
            <button
              className="btn bg-secondary text-white g-1 "
              onClick={() => navigate("/income")}
            >
              See All
              <FaArrowRightLong className="ms-1" />
            </button>
          </div>
          {income?.incomes?.length > 0 ? (
            income.incomes.slice(0, 5).map((income) => {
              return (
                <div className="transaction mt-2">
                 <div className="m-0 d-flex ">
                    <img src={income?.icon} className="me-2" style={{width:'3rem'}} alt="" />
                    <div>
                      <h6>{income?.source}</h6>
                      <p>{income?.date.substring(0,10)}</p>
                    </div>
                  </div>
                  <div className="transaction-income">
                    <p>+{income?.amount}</p>
                    <HiMiniArrowTrendingUp />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-3 m-2">
              <p className="text-muted">No Income found</p>
            </div>
          )}
        </div>
        <div className="dashboard-expense-box">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Expense</h5>
            <button
              className="btn bg-secondary text-white g-1"
              onClick={() => navigate("/expense")}
            >
              See All <FaArrowRightLong />
            </button>
          </div>
          {expense?.expenses?.length > 0 ? (
            expense.expenses.slice(0, 5).map((expense) => {
              return (
                <div className="transaction mt-2">
                  <div className="m-0 d-flex ">
                    <img src={expense?.icon} className="me-2" style={{width:'3rem'}} alt="" />
                    <div>
                      <h6>{expense?.category}</h6>
                      <p>{expense?.date.substring(0,10)}</p>
                    </div>
                  </div>
                  <div className="transaction-expense">
                    <p>-{expense?.amount}</p>
                    <HiMiniArrowTrendingDown />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-3 m-2">
              <p className="text-muted">No Expense found</p>
            </div>
          )}
         
        </div>
      </div>
    </>
  );
}
