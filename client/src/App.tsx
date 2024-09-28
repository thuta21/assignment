import './App.css';
import Hero from './components/Hero';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/Login';
import RegisterForm from './components/Auth/Register';
import { AuthProvider, useAuth } from './middleware/AuthContext';
import ProtectedRoute from './middleware/ProtectedRoute';
import EventCreate from './components/events/Create';
import EventDetail from './components/events/Detail';
import EventList from './components/events/List';
import EventUpdate from './components/events/Update';
import AttendeeList from './components/attendees/List';
import OrganizerList from './components/organizers/List';
import Invite from './components/events/Invite';
import RegisterSuccess from './components/RegisterSuccess';

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
          <Route path="/events/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
          <Route path="/events/:id/edit" element={<ProtectedRoute><EventUpdate /></ProtectedRoute>} />

          <Route path="/attendees" element={<ProtectedRoute><AttendeeList /></ProtectedRoute>} />
          <Route path="/organizers" element={<ProtectedRoute><OrganizerList /></ProtectedRoute>} />

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
         <Route
            path='/events/:id/invite'
            element={
              <Invite />
            }
          />
          <Route
            path='/register-success'
            element={
              <RegisterSuccess />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
