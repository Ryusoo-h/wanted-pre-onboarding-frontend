import './reset.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import SignIn from './page/SIgnIn';
import List from './page/List';
import { useState } from 'react';
import Home from './page/Home';


function App() {
  const [isCompleteSingUp, setIsCompleteSingUp] = useState<boolean>(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<List />} />
      <Route path="/signup" element={<SignUp setIsCompleteSingUp={setIsCompleteSingUp} />} />
      <Route path="/signin" element={<SignIn isCompleteSingUp={isCompleteSingUp} setIsCompleteSingUp={setIsCompleteSingUp} />} />
    </Routes>
  );
}

export default App;
