import React,{ useState } from 'react'

const ExpenseForm = ({addExpense}) => {
    const [expense, setExpense] = useState({
        title:"",
        description:"",
        amount:"",
        date:"",
        tag:""  
      });

      const [errors, setErrors] = useState({});

      const tags = [
        "Food",
        "Transport",
        "Shoping",
        "Rent",
        "Bills",
      ];

      const handleChange = (event) => {
        setExpense({...expense, [event.target.name]: event.target.value});

      };

      const validateForm = () => {
        let validationErrors = {};


        if(!expense.title) validationErrors.title = "Title is required";
        if(!expense.amount)
          { 
            validationErrors.amount = "Amount is required";
          }else if (isNaN(expense.amount) || expense.amount <= 0) {
            validationErrors.amount = "Amount must be positive number";
          }

        
          if(!expense.date) validationErrors.date = "Date is required";
          if(!expense.tag) validationErrors.tag = "tag is required";
  
  
          setErrors(validationErrors);
          return Object.keys(validationErrors).length === 0;
        



      };

      const handleSubmit = (event) =>{
        event.preventDefault();
        if(validateForm()){
          const newExpense = {...expense,amount: parseFloat(expense.amount)};
          addExpense(newExpense);
          setExpense({title: "",description: "",amount:"",date:"", tag:""});
        }

      };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input type="text" placeholder='Expense Name' name="title"  value={expense.title} onChange={handleChange}/>
      {errors.title &&  <p>{errors.title}</p>}
     <textarea name='description' placeholder='Description' value={expense.description} onChange={handleChange}/>

      <input type="number" placeholder='Amount' name="amount" value={expense.amount} onChange={handleChange}/>
      {errors.amount  &&  <p>{errors.amount}</p>}
      <input type="date"  name="date" value={expense.date} onChange={handleChange}/>
      {errors.date &&  <p>{errors.date}</p>}


      <select name='tag' value={expense.tag} onChange={handleChange}>
        <option>Select options</option>
        {tags.map((tag) => ( <option key={tag} value={tag}>
          {tag}
        </option>))}
      </select>
      {errors.tag &&  <p>{errors.tag}</p>}

      <button type="submit">Add Expense</button>
    </form>
  )
}
export default ExpenseForm