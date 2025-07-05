import React from 'react';
import { Menu, User, Calendar, BookOpen, Home, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'My Cycle', path: '/cycle', icon: <Calendar size={20} /> },
    { name: 'Journal', path: '/journal', icon: <BookOpen size={20} /> },
    { name: 'Community', path: '/community', icon: <User size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center">
            <Calendar size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800">CycleSage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated && navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'text-rose-600 font-medium'
                  : 'text-gray-600 hover:text-rose-500'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-rose-500 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          {isAuthenticated && navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 ${
                isActive(item.path)
                  ? 'bg-rose-50 text-rose-600 font-medium'
                  : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;