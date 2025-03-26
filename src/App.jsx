import React,{ useState, useEffect} from 'react';

import UserForm from './components/UserForm';
import "./styles/styles.css";



function App() {
  const [user, setUser] =useState(null);

  useEffect(() => {
    const storedUser =localStorage.getItem("user");
    if(storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },[]);

  return (
    <div className='container'>
      <div className='left-container'>
      <h1>Expense Tracker</h1>
      <UserForm setUser={setUser}/>
      </div>
    </div>
  )
}

export default App
