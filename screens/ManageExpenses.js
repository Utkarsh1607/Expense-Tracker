import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/expenses-context";

import ExpenseForm from "../components/manageExpense/ExpenseForm.js";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

// import ExpenseForm from "../component~s/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();
  const editedParamsId = route.params?.expenseId;
  const isEditing = !!editedParamsId;

  const expensesCtx = useContext(ExpensesContext);

  async function deleteExpenseHandler() {
    setIsSending(true);
    try {
      await deleteExpense(editedParamsId);
      expensesCtx.deleteExpense(editedParamsId);
      navigation.goBack();
    } catch (err) {
      setError("Could not delete Expense- Please try again Later!");
      setIsSending(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add New Expense",
    });
  }, [isEditing, navigation]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  async function confirmHandler(expenseData) {
    setIsSending(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedParamsId, expenseData);
        await updateExpense(editedParamsId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (err) {
      setError("Could Not save data, Please try again later!");
      setIsSending(false);
    }
  }

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedParamsId
  );

  const errorHandler = () => {
    setError(null);
  };

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSending) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary500,
    alignItems: "center",
  },
});
