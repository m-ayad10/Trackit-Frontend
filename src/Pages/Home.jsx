import React, { useContext, useEffect } from "react";
import Dashboard from "../Components/Dashboard/Dashboard";
import axios from "axios";
import { IncomeContext } from "../Context Api/IncomeContext";
import { ExpenseContext } from "../Context Api/ExpenseContext";
import { UserContext } from "../Context Api/UserContext";

export default function Home() {
  const { setIncome } = useContext(IncomeContext);
  const {  setExpense } = useContext(ExpenseContext);
  const {  user } = useContext(UserContext);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (!user) {
        return
    }
    const fetchData = async () => {
      try {                
        const response = await axios.get(`${SERVER_URL}/expense/${user}`);
        setExpense(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

   useEffect(() => {
     if (!user) {
        return
    }
    const fetchData = async () => {
      try {        
        const response = await axios.get(`${SERVER_URL}/income/${user}`,);
        setIncome(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <>
      <Dashboard />
    </>
  );
}
