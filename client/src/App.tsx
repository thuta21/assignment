import './App.css';
import Hero from './components/Hero';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentList from './components/students/List';
import StudentCreate from './components/students/Create';
import StudentDetail from './components/students/Detail';
import StudentUpdate from './components/students/Update';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/students" element={<StudentList />} />
          <Route path='/students/create' element={<StudentCreate/>}/>
          <Route path='/students/update/:id' element={<StudentUpdate/>}/>
          <Route path='/students/detail/:id' element={<StudentDetail/>}/>
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
