import React, { useState } from 'react';
import ItemList from './ItemList';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddExpense = () => {
    // Validate input fields before adding an expense
    if (formData.enteredTitle.trim() === '' || formData.enteredAmount.trim() === '' || formData.enteredDate.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }

    // Create a new expense object
    const newExpense = {
      id: Math.random().toString(),
      title: formData.enteredTitle,
      amount: +formData.enteredAmount, // Convert to number
      date: new Date(formData.enteredDate),
    };
    console.log('New Expense:', newExpense);

    // Update the expenses state
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Clear the input fields
    setFormData({
      enteredTitle: '',
      enteredAmount: '',
      enteredDate: '',
    });
  };

  const handleDeleteExpense = (expenseId) => {
    // Filter out the expense with the specified ID
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="enteredTitle" value={formData.enteredTitle} onChange={handleInputChange} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" name="enteredAmount" value={formData.enteredAmount} onChange={handleInputChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="enteredDate" value={formData.enteredDate} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleAddExpense}>
          Add Expense
        </button>
      </form>

      <ItemList expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>
    </div>
  );
};

export default ExpenseTracker;
