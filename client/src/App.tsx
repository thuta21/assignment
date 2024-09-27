import './App.css';
import Hero from './components/Hero';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import LoginForm from './components/Auth/Login';
import RegisterForm from './components/Auth/Register';
import { AuthProvider, useAuth } from './middleware/AuthContext'; // Import useAuth
import ProtectedRoute from './middleware/ProtectedRoute';
import EventCreate from './components/events/Create';
import EventDetail from './components/events/Detail';
import EventList from './components/events/List';
import EventUpdate from './components/events/Update';

// Create a component to protect routes for login and registration
const AuthRoute = ({ children }) => {
  const { user } = useAuth();

  // Redirect to home if user is logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children; // Render the children if not logged in
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Hero /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><EventList /></ProtectedRoute>} />
          <Route path="/events/create" element={<ProtectedRoute><EventCreate /></ProtectedRoute>} />
          <Route path="/event/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
          <Route path="/event/:id/edit" element={<ProtectedRoute><EventUpdate /></ProtectedRoute>} />

          <Route path='*' element={<h1>Not Found</h1>} />
          <Route
            path='/login'
            element={
              <AuthRoute>
                <LoginForm />
              </AuthRoute>
            }
          />
          <Route
            path='/register'
            element={
              <AuthRoute>
                <RegisterForm />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
