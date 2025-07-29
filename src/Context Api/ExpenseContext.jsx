import { createContext, useState } from "react";

const ExpenseContext = createContext(); 

const ExpenseProvider = ({ children }) => {
    const [expense, setExpense] = useState({});

    return (
        <ExpenseContext.Provider value={{ expense, setExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseProvider, ExpenseContext };
