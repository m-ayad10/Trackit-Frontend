import "./style.css";
import Summary from "../Summary/Summary";
import AllTransactions from "../All Transactions/AllTransactions";
import DashboardIncomeAndExpense from "../Dashboard Income and expense/DashboradIncome";
export default function Dashboard() {
  return (
    <>
      <div className="Dashbord-spacing">
        <div className="Dashboard-container">
          <Summary/>
          <AllTransactions/>
          <DashboardIncomeAndExpense/>
        </div>
      </div>
    </>
  );
}
