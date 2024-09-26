import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
      <div className="flex-1">
          <Link to="/" className="text-white hover:text-gray-300 font-medium">
            My Classroom
          </Link>
        </div>
        <div className="flex-1 text-center">
          <ul className="flex space-x-6 justify-center">
            <li>
              <Link to="/students" className="text-white hover:text-gray-300 font-medium">
                Students
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-white hover:text-gray-300 font-medium">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/classes" className="text-white hover:text-gray-300 font-medium">
                Classes
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex-1'></div>

      </div>
    </nav>
  );
};

export default Navigation;
