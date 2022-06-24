import axios from "axios";
const backendUrl = "https://react-native-8b80d-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(backendUrl + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpense = async () => {
  const response = await axios.get(backendUrl + "/expenses.json");

  const expenses = [];

  for (let key in response.data) {
    let expense = {
      id: key,
      description: response.data[key].description,
      date: new Date(response.data[key].date),
      amount: response.data[key].amount,
    };

    expenses.push(expense);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(backendUrl + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(backendUrl + `/expenses/${id}.json`);
};
