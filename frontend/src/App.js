import React, { useEffect, useState } from 'react';
import { ManagementForm } from './Components/ManagementForm'; 
import './App.css';

function App() {
  const [managerData, setManagerData] = useState([]);
  const isNotNumber = (val) => isNaN(val);

  useEffect(() => {
    fetch('/api/supervisors')
      .then(r => {
        return r.json()
      })
      .then(res => {
        const data = res.filter(m => isNotNumber(m.jurisdiction));
        data.sort((a, b) => {
          return a.jurisdiction.localeCompare(b.jurisdiction) 
            || a.lastName.localeCompare(b.lastName) 
            || a.firstName.localeCompare(b.firstName);
        })
        setManagerData(data);
      })
  }, []);

  

  return (
    <div className="App">
      <ManagementForm managerData={managerData} />
    </div>
  );
}

export default App;
