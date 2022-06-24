import { useContext } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      fallbackText="No Registered Expenses Found!"
      expenses={expensesCtx.expenses}
      expensesPeriod="total"
    />
  );
};

export default AllExpenses;
