  import React,{ useState, useEffect} from 'react';

  import UserForm from './components/UserForm';
  import ExpenseForm from './components/ExpenseForm';
  import ExpenseList from './components/ExpenseList';
  import "./styles/styles.css";



  function App() {
    const [user, setUser] =useState(null);
    const [expenses, setExpenses] = useState([]);
    const [error, setError]= useState("");

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
        const total = updatedExpenses.reduce((total, expense) => total + expense.amount, 0);

        // if (total > user.income) {
        //     setError("Expense cannot exceed your income. Please adjust the amount.");
        //     return;
        // }

        setExpenses(updatedExpenses);
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      };

    
      const resetUser = () => {
        localStorage.removeItem("user");
          setUser(null);
          setExpenses([]);
          localStorage.removeItem("expenses");
      };
    
      const totalExpenses = expenses.reduce((total,expense) => total + expense.amount, 0);
    return (
      
        <div className='app-container'>
        <h3>Expense Tracker</h3>
        {!user ? (<UserForm setUser={setUser}/>): 
        (
        <>
        <h1>Welcome {user.name} </h1>
        <h3>Income: ${user.income}</h3>
        <h3>EXpenses : ${totalExpenses}</h3>
        <h3>Balance: ${user.income - totalExpenses}</h3>

        {error && <p className='error'>{error}</p>}
        
        <ExpenseForm addExpense={addExpense} totalExpenses={totalExpenses} income={user.income} />

        <ExpenseList expenses={expenses}/>
        <button onClick={resetUser}>Reset User</button>
        </>
        )}
        
        
      </div>
    );
  };

  export default App
