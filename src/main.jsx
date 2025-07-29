import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Context Api/UserContext.jsx";
import { IncomeProvider } from "./Context Api/IncomeContext.jsx";
import { ExpenseProvider } from "./Context Api/ExpenseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <IncomeProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </IncomeProvider>
    </UserProvider>
  </StrictMode>
);
