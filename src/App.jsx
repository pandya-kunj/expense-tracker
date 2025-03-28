  import React,{ useState, useEffect} from 'react';

  import UserForm from './components/UserForm';
  import ExpenseForm from './components/ExpenseForm';
  import ExpenseList from './components/ExpenseList';
  import "./styles/styles.css";



  function App() {
    const [user, setUser] =useState(null);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
      const storedUser =localStorage.getItem("user");
      if(storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const savedExpenses =localStorage.getItem("expenses");
      if(savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      }
    },[]);

      const addExpense= (newExpense) => {
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      };
    

    return (
      
        <div className='left-container'>
        <h1>Expense Tracker</h1>
        {!user ? (<UserForm setUser={setUser}/>): 
        (
        <>
        <h1>Welcome {user.name} </h1>
        <h3>Income: ${user.income}</h3>
        <ExpenseForm addExpense={addExpense} />

        <ExpenseList expenses={expenses}/>
        </>
        )}
        
        
      </div>
    );
  };

  export default App
