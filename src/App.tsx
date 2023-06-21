import './reset.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import SignUp from './page/SignUp';
import SignIn from './page/SIgnIn';
import List from './page/List';
import Home from './page/Home';
import NotFound from './page/NotFound';
import useCompletedBadge from './hooks/auth/useCompletedBadge';


function App() {
  const { isShowCompletedBadge, showCompletedBadge, hideCompletedBadge } = useCompletedBadge();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<List />} />
      <Route path="/signup" element={<SignUp showCompletedBadge={showCompletedBadge} />} />
      <Route path="/signin" element={<SignIn isCompleteSingUp={isShowCompletedBadge} hideCompletedBadge={hideCompletedBadge} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
