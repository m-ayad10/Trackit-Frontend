import { MdAccountBalanceWallet, MdMoneyOff } from "react-icons/md";
import "./style.css";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IncomeContext } from "../../Context Api/IncomeContext";
import { ExpenseContext } from "../../Context Api/ExpenseContext";
import { useContext } from "react";
export default function Summary() {
  const { income, setIncome } = useContext(IncomeContext);
  const { expense, setExpense } = useContext(ExpenseContext);

  return (
    <>
      <div className="Dashboard-summary">
        <div className="Dashboard-summary-box">
          <MdAccountBalanceWallet
            className="summary-icon"
            style={{ backgroundColor: "rgb(127, 6, 127)" }}
          />
          <div>
            {(income?.total||0) >= (expense.total||0 )? (
              <>
                <p>{(income?.total || 0) - (expense?.total || 0)}</p>
              </>
            ) : (
              <>
                <p> {(income?.total || 0) - (expense?.total || 0)}</p>
              </>
            )}
            <p>Balance</p>
          </div>
        </div>
        <div className="Dashboard-summary-box">
          <FaMoneyCheckAlt
            className="summary-icon"
            style={{ backgroundColor: "#2dab2d" }}
          />
          <div>
            <p>{income?.total || 0}</p>
            <p>Income</p>
          </div>
        </div>
        <div className="Dashboard-summary-box">
          <MdMoneyOff
            className="summary-icon"
            style={{ backgroundColor: "#f46c06" }}
          />
          <div>
            <p>{expense?.total || 0}</p>
            <p>Expense</p>
          </div>
        </div>
      </div>
    </>
  );
}
