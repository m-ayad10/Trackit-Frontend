import { createContext, useState } from "react";

const IncomeContext = createContext(); 

const IncomeProvider = ({ children }) => {
    const [income, setIncome] = useState({});

    return (
        <IncomeContext.Provider value={{ income, setIncome }}>
            {children}
        </IncomeContext.Provider>
    );
};

export { IncomeProvider, IncomeContext };
