import React from 'react'

const ExpenseList = ({expenses}) => {
  return (
    <div>
      <h2>Expense List</h2>
      {expenses.length === 0 ?(
        <p>No expenses added yet</p>
      ):(
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Tag</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map ((expenses,index) => (
                    <tr key={index}>
                    <td>{expenses.title}</td>
                    <td>{expenses.amount}</td>
                    <td>{expenses.date}</td>
                    <td>{expenses.tag}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default ExpenseList
