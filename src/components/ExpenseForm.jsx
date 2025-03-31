import React,{  useState } from 'react'
import "../styles/styles.css"

const ExpenseForm = ({addExpense , totalExpenses , income}) => {
  const [showForm, setShowForm] = useState(false);
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
        "rent",
        "entertainment",
        "Shoping",
        "Health",
        "Bills",
        "other"
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
          }else if (parseFloat(expense.amount) + totalExpenses >income){
            validationErrors.amount = "Amount can't be in minus";
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

    <div className='expense-form-container'>

    <button   onClick={() => setShowForm(!showForm)}>
      {showForm ? "Hide" : "Show Form"}
    </button>

    {showForm && (<form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <div className='form-group'>
      <input type="text" placeholder='Expense Name' name="title"  value={expense.title} onChange={handleChange}/>
      {errors.title &&  <p className='error'>{errors.title}</p>}
     <textarea name='description' placeholder='Description' value={expense.description} onChange={handleChange}/>

      <input type="number" placeholder='Amount' name="amount" value={expense.amount} onChange={handleChange}/>
      {errors.amount  &&  <p className='error'>{errors.amount}</p>}
      <input type="date"  name="date" value={expense.date} onChange={handleChange}/>
      {errors.date &&  <p className='error'>{errors.date}</p>}


      <select name='tag' value={expense.tag} onChange={handleChange}>
        <option>Select options</option>
        {tags.map((tag) => ( <option key={tag} value={tag}>
          {tag}
        </option>))}
      </select>
      {errors.tag &&  <p className='error'>{errors.tag}</p>}
      

      <button type="submit">Add Expense</button>
      </div>
    </form>
  )}
</div>
  );
};
export default ExpenseForm;