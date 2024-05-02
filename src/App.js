import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/auth/login";  
import Signup from './pages/auth/signup';
import Dashboard from './pages/dashboard/dashboard';
import NotFound from './pages/default/notfound';
import Transactions from './pages/transactions/transactions';
import Funds from './pages/funds/funds';
import Home from './pages/home';
import { UserProvider } from './context/userContext';
import ProtectedRoute from './services/protectedRoute';
import { AccountProvider } from './context/accountContext';
import { TransactionProvider } from './context/transactionContext';
import Account from './pages/account/account';

function App() {
  return (
    <UserProvider>
      <AccountProvider>
        <TransactionProvider>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
                <Route
                    exact
                    path='/dashboard'
                    element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path='/dashboard/transactions'
                    element={
                        <ProtectedRoute>
                          <Transactions />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path='/dashboard/funds'
                    element={
                        <ProtectedRoute>
                          <Funds />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path='/dashboard/account'
                    element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                    }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </TransactionProvider>
      </AccountProvider>
    </UserProvider>
  );
}

export default App;
