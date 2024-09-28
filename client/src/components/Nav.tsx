import { Link } from 'react-router-dom';
import { useAuth } from '../middleware/AuthContext'; // Import the useAuth hook
import { useState } from 'react'; // State for burger menu
import { Transition } from '@headlessui/react'; // For smooth animations

const Navigation = () => {
  const { user, logout } = useAuth(); // Destructure user and logout from AuthContext
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control burger menu

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">

        {/* Left-side link */}
        <div className="flex">
          <Link to="/" className="text-white hover:text-gray-300 font-semibold text-lg">
            Event Management
          </Link>
        </div>

        {/* Burger Menu Icon for Mobile */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link to="/organizers" className="text-white hover:text-gray-300 text-lg">
                Organizers
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-white hover:text-gray-300 text-lg">
                Events
              </Link>
            </li>
            <li>
              <Link to="/attendees" className="text-white hover:text-gray-300 text-lg">
                Attendees
              </Link>
            </li>
          </ul>
        </div>

        {/* Right-side Auth Links */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Authenticated User's Name */}
              <span className="text-white font-medium">Hello, {user.name}</span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/books" className="text-white hover:text-gray-300 text-lg">
              Books
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <Transition
        show={isMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        <div className="lg:hidden">
          <div className="flex flex-col items-center bg-gray-700 text-white py-4 space-y-4 shadow-lg">
            <Link
              to="/organizers"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setIsMenuOpen(false)} // Close the menu when clicking a link
            >
              Organizers
            </Link>
            <Link
              to="/events"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/attendees"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Attendees
            </Link>

            {user && (
              <div className="flex flex-col items-center space-y-2">
                <span className="text-white">Hello, {user.name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false); // Close the menu after logout
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navigation;
